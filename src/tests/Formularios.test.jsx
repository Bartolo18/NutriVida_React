import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioContacto from '../components/FormularioContacto'
import FormularioHora from '../components/FormularioHora'
import FormularioProducto from '../components/FormularioProducto'
import FormularioUsuario from '../components/FormularioUsuario'

const mensajeCorrecto = 'Datos correctos. El mensaje no se ha enviado ni guardado.'
const horaCorrecta = 'Datos correctos. La solicitud no se ha enviado ni guardado; no hay una hora reservada.'

// Estos datos ficticios se escriben igual que lo haría una persona.
async function completarContacto(user) {
  await user.type(screen.getByLabelText('Nombre completo'), 'María Muñoz')
  await user.type(screen.getByLabelText('Correo electrónico'), 'maria@gmail.com')
  await user.selectOptions(screen.getByLabelText('Motivo del mensaje'), 'Consultas y planes')
  await user.type(screen.getByLabelText('Mensaje'), 'Quiero conocer los planes disponibles.')
}

async function completarHora(user, fecha) {
  await user.type(screen.getByLabelText('Nombre completo'), 'María Muñoz')
  await user.type(screen.getByLabelText('Correo electrónico'), 'maria@duoc.cl')
  await user.selectOptions(screen.getByLabelText('Atención que te interesa'), 'Primera consulta nutricional')
  fireEvent.change(screen.getByLabelText('Fecha preferida'), { target: { value: fecha } })
  await user.selectOptions(screen.getByLabelText('Jornada preferida'), 'Mañana')
}

describe('Formularios de contacto y solicitud de hora', () => {
  it('CP-03: impide revisar un mensaje con campos obligatorios vacíos', async () => {
    const user = userEvent.setup()
    render(<FormularioContacto />)

    await user.click(screen.getByRole('button', { name: 'Revisar mensaje' }))

    expect(await screen.findByText('Selecciona un motivo.')).toBeInTheDocument()
    expect(screen.getByText('Escribe un mensaje (máximo 500 caracteres).')).toBeInTheDocument()
    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
  })

  it('CP-04: permite revisar un mensaje válido dejando el teléfono opcional vacío', async () => {
    const user = userEvent.setup()
    render(<FormularioContacto />)

    await completarContacto(user)
    await user.click(screen.getByRole('button', { name: 'Revisar mensaje' }))

    expect(await screen.findByText(mensajeCorrecto)).toBeInTheDocument()
    expect(screen.getByLabelText('Teléfono (opcional)')).toHaveValue('')
  })

  it('CP-05: rechaza un dominio de correo no admitido y un teléfono incompleto', async () => {
    const user = userEvent.setup()
    render(<FormularioContacto />)

    await completarContacto(user)
    await user.clear(screen.getByLabelText('Correo electrónico'))
    await user.type(screen.getByLabelText('Correo electrónico'), 'maria@outlook.com')
    await user.type(screen.getByLabelText('Teléfono (opcional)'), '123')
    await user.click(screen.getByRole('button', { name: 'Revisar mensaje' }))

    expect(await screen.findByText('Usa 9 dígitos o deja el teléfono vacío.')).toBeInTheDocument()
    expect(screen.getByText('Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).')).toBeInTheDocument()
    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
  })

  it('CP-06: retira la confirmación anterior cuando se cambia el mensaje', async () => {
    const user = userEvent.setup()
    render(<FormularioContacto />)

    await completarContacto(user)
    await user.click(screen.getByRole('button', { name: 'Revisar mensaje' }))
    expect(await screen.findByText(mensajeCorrecto)).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Mensaje'))

    expect(screen.queryByText(mensajeCorrecto)).not.toBeInTheDocument()
    expect(await screen.findByText('Escribe un mensaje (máximo 500 caracteres).')).toBeInTheDocument()
  })

  it('CP-07: rechaza una solicitud que tiene fecha pasada', async () => {
    const user = userEvent.setup()
    render(<FormularioHora />)

    await completarHora(user, '2000-01-01')
    await user.click(screen.getByRole('button', { name: 'Revisar solicitud' }))

    expect(await screen.findByText('Selecciona una fecha futura.')).toBeInTheDocument()
    expect(screen.queryByText(horaCorrecta)).not.toBeInTheDocument()
  })

  it('CP-08: revisa una solicitud válida e informa que no existe una reserva', async () => {
    const user = userEvent.setup()
    render(<FormularioHora />)

    await completarHora(user, '2099-01-01')
    await user.click(screen.getByRole('button', { name: 'Revisar solicitud' }))

    expect(await screen.findByText(horaCorrecta)).toBeInTheDocument()
  })
})

describe('Formularios de administración', () => {
  it('CP-13: rechaza un precio negativo y un stock con decimales', async () => {
    const user = userEvent.setup()
    render(<FormularioProducto onVolver={() => {}} />)

    await user.type(screen.getByLabelText('Código'), 'CN099')
    await user.type(screen.getByLabelText('Nombre'), 'Consulta de ejemplo')
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '-1' } })
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '1.5' } })
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Consulta')
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))

    expect(await screen.findByText('Escribe un precio igual o mayor que 0.')).toBeInTheDocument()
    expect(screen.getByText('Escribe un stock entero igual o mayor que 0.')).toBeInTheDocument()
    expect(screen.queryByText('Datos correctos. El cambio fue revisado, pero no se ha guardado.')).not.toBeInTheDocument()
  })

  it('CP-14: acepta precio y stock cero y explica que el cambio no se guarda', async () => {
    const user = userEvent.setup()
    render(<FormularioProducto onVolver={() => {}} />)

    await user.type(screen.getByLabelText('Código'), 'CN099')
    await user.type(screen.getByLabelText('Nombre'), 'Consulta de ejemplo')
    fireEvent.change(screen.getByLabelText('Precio'), { target: { value: '0' } })
    fireEvent.change(screen.getByLabelText('Stock'), { target: { value: '0' } })
    await user.selectOptions(screen.getByLabelText('Categoría'), 'Consulta')
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))

    expect(await screen.findByText('Datos correctos. El cambio fue revisado, pero no se ha guardado.')).toBeInTheDocument()
  })

  it('CP-15: revisa un usuario ficticio sin afirmar que creó una cuenta', async () => {
    const user = userEvent.setup()
    render(<FormularioUsuario onVolver={() => {}} />)

    await user.type(screen.getByLabelText('Nombre'), 'María')
    await user.type(screen.getByLabelText('Apellidos'), 'Muñoz Soto')
    await user.type(screen.getByLabelText('Correo'), 'maria@profesor.duoc.cl')
    await user.selectOptions(screen.getByLabelText('Perfil'), 'Cliente')
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))

    expect(await screen.findByText('Datos correctos. No se ha creado ni modificado una cuenta; los accesos de prueba siguen iguales.')).toBeInTheDocument()
  })
})
