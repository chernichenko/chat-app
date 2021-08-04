import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Top } from './Top'
import { getFormatedTime } from 'utils/date'

const testUserToInfo = {
  name: 'name',
  lastSeen: '2021-08-03T08:08:36.262+00:00',
}

describe('Top', () => {
  it('Should Top render correctly', () => {
    render(<Top userTo={testUserToInfo} />)

    expect(screen.getByTestId('top')).toBeInTheDocument()
    expect(screen.getByText(testUserToInfo.name)).toBeInTheDocument()
    expect(screen.getByText(getFormatedTime(new Date(testUserToInfo.lastSeen)))).toBeInTheDocument()
  })

  it('Should render online circle', () => {
    const userToInfo = {
      ...testUserToInfo,
      isOnline: true,
    }

    render(<Top userTo={userToInfo} />)

    expect(screen.getByText(/online/)).toBeInTheDocument()
  })
})
