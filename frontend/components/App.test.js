import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from './AppClass'

const leftBtn = () => screen.getByText('LEFT')
const rightBtn = () => screen.getByText('RIGHT')
const upBtn = () => screen.getByText('UP')
const downBtn = () => screen.getByText('DOWN')
const resetBtn = () => screen.getByText('reset')
const emailInput = () => screen.getByPlaceholderText('type email')
const heading = () => screen.getByText('Coordinates', {exact: false})
beforeEach(()=> {
  render(<App />)
})

describe('Custom tests', ()=> {
  test('rendering fine', ()=> {
    screen.debug()
  })
  test('everything is visible', () => {
    expect(heading()).toBeInTheDocument()
    expect(leftBtn()).toBeInTheDocument()
    expect(rightBtn()).toBeInTheDocument()
    expect(upBtn()).toBeInTheDocument()
    expect(downBtn()).toBeInTheDocument()
    expect(resetBtn()).toBeInTheDocument()
    expect(emailInput()).toBeInTheDocument()
  })

  test('can input an email & see if its there', () => {
    fireEvent.change(emailInput(), {target: {value: 'test@email.com'}});
    expect(emailInput()).toHaveValue('test@email.com')
  })
})
