import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import TarjetaProducto from '../components/TarjetaProducto'
import { productos } from '../data/productos'

describe('Navegación y componentes reutilizables', () => {
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
})