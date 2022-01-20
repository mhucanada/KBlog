import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import MockTheme from '../../test/MockTheme'
import { BrowserRouter } from 'react-router-dom'
import HomeTopBar from './HomeTopBar'

test('logged in user renders log out button', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BrowserRouter>
      <MockTheme>
        <HomeTopBar username = {true} handleLogOut={mockHandler} />
      </MockTheme>
    </BrowserRouter>
  )

  const button = component.getByText('Log Out')

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  // expect(createPost.mock.calls[0][0].content).toBe('testing form')
})
