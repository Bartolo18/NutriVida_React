import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioContacto from '../components/FormularioContacto'

const mensajeCorrecto =
  'Datos correctos. El mensaje no se ha enviado ni guardado.'

const errorMensaje = 'Escribe un mensaje (máximo 500 caracteres).'

function prepararFormulario() {
  const user = userEvent.setup()
  render(<FormularioContacto />)

  return {
    user,
    enviar: () =>
      user.click(screen.getByRole('button', { name: 'Revisar mensaje' })),
  }
}

async function completarContacto(user) {
  const campos = [
    ['Nombre completo', 'María Muñoz'],
    ['Correo electrónico', 'maria@gmail.com'],
    ['Mensaje', 'Quiero conocer los planes disponibles.'],
  ]

  for (const [etiqueta, valor] of campos) {
    await user.type(screen.getByLabelText(etiqueta), valor)
  }

  await user.selectOptions(
    screen.getByLabelText('Motivo del mensaje'),
    'Consultas y planes',
  )
}

async function enviarContactoValido() {
  const formulario = prepararFormulario()
  await completarContacto(formulario.user)
  await formulario.enviar()

  expect(await screen.findByText(mensajeCorrecto)).toBeInTheDocument()

  return formulario.user
}

describe('Formulario de contacto', () => {
  it('CP-03: impide revisar un mensaje con campos obligatorios vacíos', async () => {
    const { enviar } = prepararFormulario()

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
    const { user, enviar } = prepararFormulario()
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