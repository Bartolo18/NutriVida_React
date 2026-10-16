import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import TarjetaProducto from '../components/TarjetaProducto'
import { productos } from '../data/productos'

describe('Navegación y componentes reutilizables', () => {
  it('CP-01: el menú abre las páginas públicas y sus contenidos', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><App /></MemoryRouter>)
    const menu = within(screen.getByRole('navigation', { name: 'Menú principal' }))

    await user.click(menu.getByRole('link', { name: 'Nosotros' }))
    expect(screen.getByRole('heading', { name: 'Nutrición con sentido humano.' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Servicios' }))
    expect(screen.getByRole('heading', { name: 'Servicios nutricionales.' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Productos' }))
    expect(screen.getByRole('heading', { name: 'Primera consulta nutricional' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(18)
    await user.click(menu.getByRole('link', { name: 'Blog' }))
    expect(screen.getByRole('heading', { name: 'Conoce más sobre NutriVida.' })).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Contacto' }))
    expect(screen.getByLabelText('Mensaje')).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Solicitar hora' }))
    expect(screen.getByLabelText('Fecha preferida')).toBeInTheDocument()
    await user.click(menu.getByRole('link', { name: 'Inicio' }))
    expect(screen.getByRole('heading', { name: 'Tu bienestar empieza con una buena nutrición.' })).toBeInTheDocument()
  })
  it('CP-02: la tarjeta muestra los datos recibidos por props y conduce a solicitar hora', () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: 'Primera consulta nutricional' })).toBeInTheDocument()
    expect(screen.getByText('$35.000')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAccessibleName('Plato con huevo, palta, tomates y verduras variadas')
    expect(screen.getByRole('link', { name: 'Solicitar hora' })).toHaveAttribute('href', '/solicitar-hora')
  })

  it('CP-22: mostrarDetalle dirige la tarjeta a la URL propia del producto', () => {
    render(<MemoryRouter><TarjetaProducto producto={productos[0]} mostrarDetalle /></MemoryRouter>)

    expect(screen.getByRole('link', { name: 'Ver detalles' })).toHaveAttribute('href', '/productos/cn001')
    expect(screen.queryByRole('link', { name: 'Solicitar hora' })).not.toBeInTheDocument()
  })
  it('CP-20: una URL de producto abre su detalle con nombre, precio y solicitud de hora', () => {
    render(<MemoryRouter initialEntries={['/productos/cn001']}><App /></MemoryRouter>)

    const detalle = within(screen.getByRole('main'))
    expect(detalle.getByRole('heading', { name: 'Detalle de la atención' })).toBeInTheDocument()
    expect(detalle.getByRole('heading', { name: 'Primera consulta nutricional' })).toBeInTheDocument()
    expect(detalle.getByText('$35.000')).toBeInTheDocument()
    expect(detalle.getByRole('link', { name: 'Solicitar hora' })).toHaveAttribute('href', '/solicitar-hora')
  })

  it('CP-21: una URL con un código inexistente vuelve al catálogo completo', async () => {
    render(<MemoryRouter initialEntries={['/productos/no-existe']}><App /></MemoryRouter>)

    expect(await screen.findByRole('heading', { name: 'Un plan para cada etapa.' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(18)
    expect(screen.queryByRole('heading', { name: 'Detalle de la atención' })).not.toBeInTheDocument()
  })
})