import { render, screen } from '@testing-library/react'
import { ResultsDisplay } from '@/src/components/results-display'

describe('ResultsDisplay', () => {
  it('renders loading skeletons', () => {
    render(<ResultsDisplay status="loading" />)
    expect(screen.getAllByRole('generic').length).toBeGreaterThan(0)
  })

  it('renders error message', () => {
    render(<ResultsDisplay status="error" message="Oops" />)
    expect(screen.getByText('Oops')).toBeInTheDocument()
  })

  it('renders markdown content', () => {
    render(<ResultsDisplay status="success" markdown={"## Title\n\nHello"} />)
    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})


