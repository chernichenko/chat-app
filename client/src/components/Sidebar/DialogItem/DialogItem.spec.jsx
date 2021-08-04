import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Router, BrowserRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { DialogItem } from './DialogItem'

describe('DialogItem', () => {
  it('Should DialogItem render with correctly info', () => {
    const testName = 'test name'
    const testLastMessage = 'test last message'
    const testNewMessagesCount= 5
    const testTime = '10:00'
    const testIsOnline = true
    
    const { container } = render(
      <BrowserRouter>
        <DialogItem
          name={testName}
          lastMessage={testLastMessage}
          newMessagesCount={testNewMessagesCount}
          time={testTime}
          isOnline={testIsOnline}
        />
      </BrowserRouter>
    )

    expect(screen.getByTestId('dialog-item')).toBeInTheDocument()
    expect(container.querySelector('.noAvatar')).toBeInTheDocument()
    expect(screen.getByText(testName[0].toUpperCase()))
    expect(screen.getByText(testName)).toBeInTheDocument()
    expect(screen.getByText(testTime)).toBeInTheDocument()
    expect(screen.getByText(testNewMessagesCount)).toBeInTheDocument()
    expect(container.querySelector('.online')).toBeInTheDocument()
  })

  it('Should render my last message correctly', () => {
    const testLastMessage = 'test last message'
    const testIsMe = true

    const { container } = render(
      <BrowserRouter>
        <DialogItem
          lastMessage={testLastMessage}
          isMe={testIsMe}
        />
      </BrowserRouter>
    )

    expect(container.querySelector('.messageStatus')).toBeInTheDocument()
  })

  it('Should go to anoter route after click', async () => {
    const testUserToId = '555'

    const history = createMemoryHistory()

    history.push('/some/test/route')

    render(
      <Router history={history}>
        <DialogItem
          userToId={testUserToId}
        />
      </Router>
    )

    fireEvent.click(screen.getByTestId('dialog-item'))

    expect(history.location.pathname).toEqual(`/dialog/${testUserToId}`)
  })
})
