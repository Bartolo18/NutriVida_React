import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FormularioContacto from '../components/FormularioContacto'

const mensajeCorrecto = 'Datos correctos. El mensaje no se ha enviado ni guardado.'
const horaCorrecta = 'Datos correctos. La solicitud no se ha enviado ni guardado; no hay una hora reservada.'

// Estos datos ficticios se escriben igual que lo haría una persona.
async function completarContacto(user) {
  await user.type(screen.getByLabelText('Nombre completo'), 'María Muñoz')
  await user.type(screen.getByLabelText('Correo electrónico'), 'maria@gmail.com')
  await user.selectOptions(screen.getByLabelText('Motivo del mensaje'), 'Consultas y planes')
  await user.type(screen.getByLabelText('Mensaje'), 'Quiero conocer los planes disponibles.')
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
})
