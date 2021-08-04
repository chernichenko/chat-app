import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import userSlice from 'redux/reducers/userSlice'
import axios from 'axios'
import { Dialog } from './Dialog'

jest.mock('axios');

const configurateStore = ({ dialogId, messages = [], userTo = {} }) => configureStore({
  reducer: userSlice,
  preloadedState: {
    user: { token: 'test' },
    dialog: {
      dialogId,
      messages,
      userTo,
    }
  },
})

describe('Dialog', () => {
  it('Should not render anything', () => {
    const mockStore = configurateStore({
      dialogId: '',
      userTo: '',
    })

    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Dialog />
        </Provider>
      </BrowserRouter>
    )

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
    expect(screen.queryByTestId('top')).not.toBeInTheDocument()
    expect(screen.queryByTestId('messages')).not.toBeInTheDocument()
    expect(screen.queryByTestId('textarea')).not.toBeInTheDocument()
  })

  it('Should render components correctly', () => {
    const mockStore = configurateStore({
      dialogId: '123',
      userTo: {
        lastSeen: '2021-08-03T08:08:36.262+00:00'
      }
    })

    axios.get
      .mockReturnValueOnce({
        data: { data: {  } }
      })
      .mockReturnValueOnce({
        data: { data: { _id: '123' } }
      })
      .mockReturnValueOnce({
        data: { data: {  } }
      })

    render(
      <BrowserRouter>
        <Provider store={mockStore}>
          <Dialog />
        </Provider>
      </BrowserRouter>
    )

    expect(axios.get).toHaveBeenCalled()
  })
})
