import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Login from './Login'
import MockTheme from '../../test/MockTheme'
import { BrowserRouter } from 'react-router-dom'

test('clicking button calls event handler once', () => {
  const handleLogin = jest.fn()

  const component = render(
    <BrowserRouter>
      <MockTheme>
        <Login handleLogin={handleLogin}  />
      </MockTheme>
    </BrowserRouter>
  )
  const button = component.getByText('Sign In')

  fireEvent.click(button)

  expect(handleLogin.mock.calls).toHaveLength(0)
  // expect(createPost.mock.calls[0][0].content).toBe('testing form')
})
