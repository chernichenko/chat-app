import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { Textarea } from './Textarea'
import { expect } from '@jest/globals'
import axios from 'axios'

jest.mock('axios')

describe('Textarea', () => {
  it('Should Textarea render correctly', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Textarea />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.getByTestId('textarea')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter message text')).toBeInTheDocument()
    expect(screen.getByTestId('send-message')).toBeInTheDocument()
  })

  it('Should Emoji correctly works', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Textarea />
        </Provider>
      </BrowserRouter>
    )

    const emojiButton = container.querySelector('.emojiButton')

    expect(emojiButton).toBeInTheDocument()

    fireEvent.click(emojiButton)

    expect(container.querySelector('.emoji')).toBeInTheDocument()

    const textarea = screen.getByPlaceholderText('Enter message text')
    fireEvent.change(textarea, {
      target: { value: 'some message' },
    })

    fireEvent.click(screen.getByTestId('send-message'))

    await waitFor(async () => {
      await expect(textarea.value).toEqual('')
      await expect(emojiButton).toBeInTheDocument()
    })
  })

  it('Should message sending work', async () => {
    const testMessage = 'test'

    axios.post.mockReturnValueOnce({
      data: {},
    });

    render(
      <BrowserRouter>
        <Provider store={store}>
          <Textarea />
        </Provider>
      </BrowserRouter>
    )

    const textarea = screen.getByPlaceholderText('Enter message text')

    fireEvent.change(textarea, {
      target: { value: testMessage },
    })

    expect(textarea.value).toEqual(testMessage)

    const buttonSend = screen.getByTestId('send-message')
    fireEvent.click(buttonSend)

    await waitFor(async () => {
      await expect(textarea.value).toEqual('')
    })

    fireEvent.change(textarea, {
      target: { value: testMessage },
    })

    fireEvent.keyDown(textarea, {key: 'Enter', code: 13, keyCode: 13})

    await waitFor(async () => {
      await expect(textarea.value).toEqual('')
    })
  })
})
