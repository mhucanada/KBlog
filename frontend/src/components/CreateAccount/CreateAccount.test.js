import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react' //eslint-disable-line no-unused-vars
import MockTheme from '../../test/MockTheme'
import { BrowserRouter } from 'react-router-dom'
import CreateAccount from './CreateAccount'

describe('<CreateAccount />', () => {
  let component

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <MockTheme>
          <CreateAccount />
        </MockTheme>
      </BrowserRouter>
    )


  })

  test('check if Go button is rendered', () => {
    const button = component.getByText('Go')

    expect(button).toBeDefined()
    // expect(createPost.mock.calls[0][0].content).toBe('testing form')
  })

  test('check if cancel button is rendered', () => {
    const button = component.getByText('Cancel')

    expect(button).toBeDefined()
    // expect(createPost.mock.calls[0][0].content).toBe('testing form')
  })

  test('check name field change', () => {
    const name = component.getByLabelText(/^Name/i)

    fireEvent.change(name, { target: { value: 'hi' } })
    expect(name.value).toBe('hi')
  })

  test('check username field change', () => {
    const name = component.getByLabelText(/^Username/i)

    fireEvent.change(name, { target: { value: 'hi' } })
    expect(name.value).toBe('hi')
  })

})
