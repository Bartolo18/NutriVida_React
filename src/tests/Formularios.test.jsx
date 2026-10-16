import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioContacto from '../components/FormularioContacto'
import FormularioHora from '../components/FormularioHora'
import FormularioProducto from '../components/FormularioProducto'
import FormularioUsuario from '../components/FormularioUsuario'

const mensajeCorrecto =
  'Datos correctos. El mensaje no se ha enviado ni guardado.'

const horaCorrecta =
  'Datos correctos. La solicitud no se ha enviado ni guardado; no hay una hora reservada.'

const productoCorrecto =
  'Datos correctos. El cambio fue revisado, pero no se ha guardado.'

const errorMensaje = 'Escribe un mensaje (máximo 500 caracteres).'

function prepararFormulario(componente, boton) {
  const user = userEvent.setup()
  render(componente)

  return {
    user,
    enviar: () =>
      user.click(screen.getByRole('button', { name: boton })),
  }
}

async function escribirCampos(user, campos) {
  for (const [etiqueta, valor] of campos) {
    await user.type(screen.getByLabelText(etiqueta), valor)
  }
}

async function completarContacto(user) {
  await escribirCampos(user, [
    ['Nombre completo', 'María Muñoz'],
    ['Correo electrónico', 'maria@gmail.com'],
    ['Mensaje', 'Quiero conocer los planes disponibles.'],
  ])

  await user.selectOptions(
    screen.getByLabelText('Motivo del mensaje'),
    'Consultas y planes',
  )
}

async function enviarContactoValido() {
  const formulario = prepararFormulario(
    <FormularioContacto />,
    'Revisar mensaje',
  )

  await completarContacto(formulario.user)
  await formulario.enviar()

  expect(await screen.findByText(mensajeCorrecto)).toBeInTheDocument()

  return formulario.user
}

async function revisarSolicitudConFecha(fecha) {
  const { user, enviar } = prepararFormulario(
    <FormularioHora />,
    'Revisar solicitud',
  )

  await escribirCampos(user, [
    ['Nombre completo', 'María Muñoz'],
    ['Correo electrónico', 'maria@duoc.cl'],
  ])

  await user.selectOptions(
    screen.getByLabelText('Atención que te interesa'),
    'Primera consulta nutricional',
  )

  fireEvent.change(screen.getByLabelText('Fecha preferida'), {
    target: { value: fecha },
  })

  await user.selectOptions(
    screen.getByLabelText('Jornada preferida'),
    'Mañana',
  )

  await enviar()
}

async function revisarProducto(precio, stock) {
  const { user, enviar } = prepararFormulario(
    <FormularioProducto onVolver={() => {}} />,
    'Revisar datos',
  )

  await escribirCampos(user, [
    ['Código', 'CN099'],
    ['Nombre', 'Consulta de ejemplo'],
  ])

  for (const [etiqueta, valor] of [
    ['Precio', precio],
    ['Stock', stock],
  ]) {
    fireEvent.change(screen.getByLabelText(etiqueta), {
      target: { value: valor },
    })
  }

  await user.selectOptions(
    screen.getByLabelText('Categoría'),
    'Consulta',
  )

  await enviar()
}

describe('Formulario de contacto', () => {
  it('CP-03: impide revisar un mensaje con campos obligatorios vacíos', async () => {
    const { enviar } = prepararFormulario(
      <FormularioContacto />,
      'Revisar mensaje',
    )

    await enviar()

    expect(await screen.findByText('Selecciona un motivo.')).toBeInTheDocument()
    expect(screen.getByText(errorMensaje)).toBeInTheDocument()
    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
  })

  it('CP-04: permite revisar un mensaje válido dejando el teléfono opcional vacío', async () => {
    await enviarContactoValido()

    expect(screen.getByLabelText('Teléfono (opcional)')).toHaveValue('')
  })

  it('CP-05: rechaza un dominio de correo no admitido y un teléfono incompleto', async () => {
    const { user, enviar } = prepararFormulario(
      <FormularioContacto />,
      'Revisar mensaje',
    )

    await completarContacto(user)

    const correo = screen.getByLabelText('Correo electrónico')
    await user.clear(correo)
    await user.type(correo, 'maria@outlook.com')
    await user.type(screen.getByLabelText('Teléfono (opcional)'), '123')
    await enviar()

    expect(
      await screen.findByText('Usa 9 dígitos o deja el teléfono vacío.'),
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).',
      ),
    ).toBeInTheDocument()

    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
  })

  it('CP-06: retira la confirmación anterior cuando se cambia el mensaje', async () => {
    const user = await enviarContactoValido()

    await user.clear(screen.getByLabelText('Mensaje'))

    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
    expect(await screen.findByText(errorMensaje)).toBeInTheDocument()
  })
})

describe('Formulario de solicitud de hora', () => {
  it('CP-07: rechaza una solicitud que tiene fecha pasada', async () => {
    await revisarSolicitudConFecha('2000-01-01')

    expect(
      await screen.findByText('Selecciona una fecha futura.'),
    ).toBeInTheDocument()

    expect(screen.queryByText(horaCorrecta)).not.toBeInTheDocument()
  })

  it('CP-08: revisa una solicitud válida e informa que no existe una reserva', async () => {
    await revisarSolicitudConFecha('2099-01-01')

    expect(await screen.findByText(horaCorrecta)).toBeInTheDocument()
  })
})

describe('Formularios de administración', () => {
  it('CP-13: rechaza un precio negativo y un stock con decimales', async () => {
    await revisarProducto('-1', '1.5')

    expect(
      await screen.findByText('Escribe un precio igual o mayor que 0.'),
    ).toBeInTheDocument()

    expect(
      screen.getByText('Escribe un stock entero igual o mayor que 0.'),
    ).toBeInTheDocument()

    expect(screen.queryByText(productoCorrecto)).not.toBeInTheDocument()
  })

  it('CP-14: acepta precio y stock cero y explica que el cambio no se guarda', async () => {
    await revisarProducto('0', '0')

    expect(await screen.findByText(productoCorrecto)).toBeInTheDocument()
  })

  it('CP-15: revisa un usuario ficticio sin afirmar que creó una cuenta', async () => {
    const { user, enviar } = prepararFormulario(
      <FormularioUsuario onVolver={() => {}} />,
      'Revisar datos',
    )

    await escribirCampos(user, [
      ['Nombre', 'María'],
      ['Apellidos', 'Muñoz Soto'],
      ['Correo', 'maria@profesor.duoc.cl'],
    ])

    await user.selectOptions(screen.getByLabelText('Perfil'), 'Cliente')
    await enviar()

    expect(
      await screen.findByText(
        'Datos correctos. No se ha creado ni modificado una cuenta; los accesos de prueba siguen iguales.',
      ),
    ).toBeInTheDocument()
  })
})