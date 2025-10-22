import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '../pages/Home'

describe('Home Page', () => {
  it('renders home page heading', () => {
    render(<Home />)
    const heading = screen.getByText(/Explore Countries/i)
    expect(heading).toBeInTheDocument()
  })
})
