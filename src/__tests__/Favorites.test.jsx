import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Favorites from '../pages/Favorites'

describe('Favorites Page', () => {
  it('renders favorites page heading', () => {
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    )
    const heading = screen.getByText(/Favorites/i)
    expect(heading).toBeInTheDocument()
  })
})
