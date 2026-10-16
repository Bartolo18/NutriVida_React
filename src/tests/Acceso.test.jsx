import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import FormularioAcceso from '../components/FormularioAcceso'
import Administracion from '../pages/Administracion'

async function ingresar(user, correo) {
  await user.type(screen.getByLabelText('Correo'), correo)
  await user.type(screen.getByLabelText('Contraseña'), 'nutrivida')
  await user.click(screen.getByRole('button', { name: 'Ingresar' }))
}

describe('Acceso de demostración y permisos de cada perfil', () => {
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

  it('CP-11: muestra las herramientas de usuarios y nuevos productos al administrador', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'admin@duoc.cl')

    expect(await screen.findByRole('button', { name: 'Nuevo producto' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Usuarios' }))
    expect(screen.getByRole('button', { name: 'Nuevo usuario' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Salir' }))
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Nuevo usuario' })).not.toBeInTheDocument()
  })

  it('CP-12: permite consultar al vendedor sin mostrar herramientas exclusivas del administrador', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'vendedor@duoc.cl')

    expect(await screen.findByRole('button', { name: 'Solicitudes' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Usuarios' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Nuevo producto' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Solicitudes' }))
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('CP-16: el cliente accede a la vista pública sin herramientas de gestión', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'cliente@gmail.com')

    expect(await screen.findByRole('button', { name: 'Salir' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ver catálogo' })).toHaveAttribute('href', '/productos')
    expect(screen.queryByRole('button', { name: 'Ingresar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Productos' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Usuarios' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Solicitudes' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Nuevo producto' })).not.toBeInTheDocument()
  })

  it('CP-17: carga un producto para editarlo y vuelve al catálogo de ejemplo sin modificarlo', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'admin@duoc.cl')
    await user.click(screen.getByRole('button', { name: 'Editar CN001' }))
    expect(screen.getByLabelText('Nombre')).toHaveValue('Primera consulta nutricional')
    expect(screen.getByLabelText('Precio')).toHaveValue(35000)
    expect(screen.getByLabelText('Stock')).toHaveValue(10)

    // Primero se revisan los números precargados; después se prueba un cambio de un peso.
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))
    expect(await screen.findByText('Datos correctos. El cambio fue revisado, pero no se ha guardado.')).toBeInTheDocument()
    await user.clear(screen.getByLabelText('Precio'))
    await user.type(screen.getByLabelText('Precio'), '35001')
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))
    expect(await screen.findByText('Datos correctos. El cambio fue revisado, pero no se ha guardado.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Volver al listado' }))

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('$35.000')).toBeInTheDocument()
    expect(screen.queryByText('$35.001')).not.toBeInTheDocument()
  })

  it('CP-18: carga un usuario para editarlo y conserva la cuenta de prueba al volver', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'admin@duoc.cl')
    await user.click(screen.getByRole('button', { name: 'Usuarios' }))
    await user.click(screen.getByRole('button', { name: 'Editar Camila' }))
    expect(screen.getByLabelText('Nombre')).toHaveValue('Camila')
    expect(screen.getByLabelText('Apellidos')).toHaveValue('Soto')
    expect(screen.getByLabelText('Correo')).toHaveValue('admin@duoc.cl')
    expect(screen.getByLabelText('Perfil')).toHaveValue('Administrador')

    await user.clear(screen.getByLabelText('Correo'))
    await user.type(screen.getByLabelText('Correo'), 'camila@gmail.com')
    await user.click(screen.getByRole('button', { name: 'Revisar datos' }))
    expect(await screen.findByText('Datos correctos. No se ha creado ni modificado una cuenta; los accesos de prueba siguen iguales.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Volver al listado' }))

    expect(screen.getByText('admin@duoc.cl')).toBeInTheDocument()
    expect(screen.queryByText('camila@gmail.com')).not.toBeInTheDocument()
  })

  it('CP-19: el vendedor abre y cambia el detalle de las solicitudes ficticias', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><Administracion /></MemoryRouter>)

    await ingresar(user, 'vendedor@duoc.cl')
    await user.click(screen.getByRole('button', { name: 'Solicitudes' }))
    await user.click(screen.getByRole('button', { name: 'Ver detalle S001' }))
    expect(screen.getByRole('heading', { name: 'S001 · Primera consulta' })).toBeInTheDocument()
    expect(screen.getByText('Paciente de ejemplo: Andrea Muñoz. Jornada preferida: mañana.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ver detalle S002' }))

    expect(screen.getByRole('heading', { name: 'S002 · Evaluación' })).toBeInTheDocument()
    expect(screen.getByText('Paciente de ejemplo: Tomás Pérez. Jornada preferida: tarde.')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'S001 · Primera consulta' })).not.toBeInTheDocument()
  })
})
