import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CountryDetails from '../pages/CountryDetails'

describe('CountryDetails Page', () => {
  it('renders country details heading', () => {
    render(
      <MemoryRouter initialEntries={['/country/USA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    )

    const heading = screen.getByText(/Country Details/i)
    expect(heading).toBeInTheDocument()
  })
})
