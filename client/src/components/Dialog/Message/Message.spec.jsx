import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Message } from './Message'

describe('Message', () => {
  it('Should Message render correctly', () => {
    const testIsMe = true
    const testText = 'text'
    const testTime = '10:00'
    const testUserName = 'name'

    const { container } = render(
      <Message
        isMe={testIsMe}
        text={testText}
        time={testTime}
        name={testUserName}
      />
    )

    const message = screen.getByTestId('message')
    expect(message).toBeInTheDocument()
    expect(screen.getByText(testText)).toBeInTheDocument()
    expect(screen.getByText(testTime)).toBeInTheDocument()
    expect(message).toHaveClass('me')
    expect(container.querySelector('.isCheck')).toBeInTheDocument()
    expect(screen.getByText(testUserName[0].toUpperCase())).toBeInTheDocument()
  })

  it('Should render avatar', () => {
    const testAvatarUrl = '/avatar/url'

    render(
      <Message
        avatarUrl={testAvatarUrl}
      />
    )

    const avatar = screen.getByTestId('avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar.src.includes(testAvatarUrl)).toBeTruthy()
  })
})
