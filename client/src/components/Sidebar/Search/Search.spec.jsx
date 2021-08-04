import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Search } from './Search'

describe('Search', () => {
  it('Should Search render', () => {
    render(<Search />)

    expect(screen.getByTestId('search')).toBeInTheDocument()
  })

  it('Should input work correctly', () => {
    const testSearchValue = 'search'

    render(<Search />)

    const inputSearch = screen.getByPlaceholderText('Enter user name')

    fireEvent.change(inputSearch, {
      target: { value: testSearchValue },
    })

    expect(inputSearch.value).toMatch(testSearchValue)
  })

  it('Should onChange handler work correctly', () => {
    const initialDialogs = [{ id: 1 }, { id: 2 }]
    const setDialogs = jest.fn()
    const testSearchValue = ''

    render(
      <Search
        initialDialogs={initialDialogs}
        setDialogs={setDialogs}
      />
    )

    const inputSearch = screen.getByPlaceholderText('Enter user name')

    fireEvent.change(inputSearch, {
      target: { value: '123' },
    })

    fireEvent.change(inputSearch, {
      target: { value: testSearchValue },
    })

    expect(setDialogs).toHaveBeenCalledWith(initialDialogs)
  })
})
