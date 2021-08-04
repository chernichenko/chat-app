import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { InputForm } from './InputForm'
import { Form, Formik } from 'formik'

describe('InputForm', () => {
  it('Should InputForm render correctly', () => {
    const testName = 'test'
    const testPlaceholder = 'test placeholder'
    const testExtraClass = 'extraclass'
    const testType = 'password'

    const { container } = render(
      <Formik>
        <Form>
          <InputForm
            name={testName}
            placeholder={testPlaceholder}
            extraClass={testExtraClass}
            type={testType}
          />
        </Form>
      </Formik>
    )

    expect(screen.getByTestId('form-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(testPlaceholder)).toBeInTheDocument()
    expect(container.querySelector(`.${testExtraClass}`)).toBeInTheDocument()
    expect(container.querySelector(`input[type="${testType}"]`)).toBeInTheDocument()
  })

  it('Should file input has correct functionality', () => {
    const testName = 'file'
    const testType = 'file'

    const { container } = render(
      <Formik>
        <Form>
          <InputForm
            name={testName}
            type={testType}
          />
        </Form>
      </Formik>
    )

    expect(container.querySelector('#file')).toBeInTheDocument()
    expect(container.querySelector('.file')).toBeInTheDocument()
    expect(screen.getByText(/Add photo +/))
  })
})
