import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import FormularioAcceso from '../components/FormularioAcceso'

async function ingresar(user, correo) {
  await user.type(screen.getByLabelText('Correo'), correo)
  await user.type(screen.getByLabelText('Contraseña'), 'nutrivida')
  await user.click(screen.getByRole('button', { name: 'Ingresar' }))
}

describe('Acceso de demostración', () => {
  it('CP-09: rechaza una contraseña incorrecta sin ejecutar onIngresar', async () => {
    const user = userEvent.setup()
    const onIngresar = vi.fn()
    render(<FormularioAcceso onIngresar={onIngresar} />)

    await user.type(screen.getByLabelText('Correo'), 'admin@duoc.cl')
    await user.type(screen.getByLabelText('Contraseña'), 'incorrecta')
    await user.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(await screen.findByText('Correo o contraseña incorrectos. Revisa las cuentas de prueba.')).toBeInTheDocument()
    expect(onIngresar).not.toHaveBeenCalled()
  })

  it('CP-10: entrega el perfil de administrador al ingresar con la cuenta válida', async () => {
    const user = userEvent.setup()
    const onIngresar = vi.fn()
    render(<FormularioAcceso onIngresar={onIngresar} />)

    await ingresar(user, 'admin@duoc.cl')

    expect(onIngresar).toHaveBeenCalledTimes(1)
    expect(onIngresar).toHaveBeenCalledWith(expect.objectContaining({ correo: 'admin@duoc.cl', perfil: 'Administrador' }))
  })
})
