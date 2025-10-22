import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import CountryDetails from '../pages/CountryDetails'

// Mock the API
vi.mock('../api/countriesApi', () => ({
  fetchCountryByCode: vi.fn(() =>
    Promise.resolve([{
      name: {
        common: 'United States',
        nativeName: {
          eng: {
            common: 'United States'
          }
        }
      },
      flags: {
        svg: 'https://flagcdn.com/us.svg'
      },
      capital: ['Washington, D.C.'],
      population: 331000000,
      region: 'Americas',
      subregion: 'North America',
      timezones: ['UTC-05:00', 'UTC-06:00'],
      currencies: {
        USD: {
          name: 'United States dollar'
        }
      },
      languages: {
        eng: 'English'
      },
      borders: ['CAN', 'MEX'],
      cca3: 'USA'
    }])
  ),
}))

describe('CountryDetails Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders country details', async () => {
    render(
      <MemoryRouter initialEntries={['/country/USA']}>
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    )

    // Wait for the country name to appear (the h3 heading)
    const countryName = await screen.findByText('United States')
    expect(countryName).toBeDefined()

    // Check that population is displayed
    const population = await screen.findByText(/331,000,000/i)
    expect(population).toBeDefined()

    // Check that region is displayed
    const region = await screen.findByText(/Americas/i)
    expect(region).toBeDefined()

    // Check that capital is displayed
    const capital = await screen.findByText(/Washington, D\.C\./i)
    expect(capital).toBeDefined()
  })
})