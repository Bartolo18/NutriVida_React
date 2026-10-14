import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Cada prueba comienza con una página limpia.
afterEach(() => {
  cleanup()
})