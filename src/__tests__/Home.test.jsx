import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from '../pages/Home'
import * as api from '../api/countriesApi'
import { MemoryRouter } from 'react-router-dom'

// Mock the API call
vi.spyOn(api, 'fetchAllCountries').mockResolvedValue([
  {
    cca3: 'USA',
    name: { common: 'United States' },
    flags: { svg: 'flag.svg' },
    population: 331000000,
    region: 'Americas',
    capital: ['Washington D.C.']
  }
])

describe('Home Page', () => {
  it('renders home page heading', async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    
    await waitFor(() => screen.getByText(/Explore Countries/i))

    expect(screen.getByText(/Explore Countries/i)).toBeInTheDocument()
    expect(screen.getByText(/United States/i)).toBeInTheDocument()
  })
})

