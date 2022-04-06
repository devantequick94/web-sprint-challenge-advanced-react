import React from 'react'
import axios from 'axios'

const initialState = {
  x: 2,
  y: 2,
  steps : 0,
  email: '',
  grid: [
    [1, 1, false, null],
    [2, 1, false, null],
    [3, 1, false, null],
    [1, 2, false, null],
    [2, 2, true, 'B'],
    [3, 2, false, null],
    [1, 3, false, null],
    [2, 3, false, null],
    [3, 3, false, null]
  ]
}
export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state = initialState
  }
  render() {
    const { className } = this.props
    const {x, y, steps, email, message, grid} = this.state
    const moveLeft = () => {
      if(x > 1){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x - 1,
        })
      } else {
        this.setState({
          message: "You can't go left"
        })
      }
    }
    const moveRight = () => {
      if(x >= 1 && x < 3) {
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          x: this.state.x + 1,
        })
      } else {
        this.setState({
          message: "You can't go right"
        })
      }
    }
    const moveUp = () => {
      if(y > 1){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y - 1,

        })
      } else {
        this.setState({
          message: "You can't go up"
        })
      }
    }
    const moveDown = () => {
      if(y >= 1 && y < 3){
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          y: this.state.y + 1,

        })
      } else {
        this.setState({
          message: "You can't go down"
        })
      }
    }
    const reset = () => {
      this.setState(initialState)
      this.setState({
        message: ''
      })
    }
    const setLocation = () => {
      grid.map(group=> {
        if(group[0] === x && group[1] === y){
          group[2] = true
          group[3] = 'B'
        } else {
          group[2] = false
          group[3] = null
        }
      })
    }
    setLocation()
    const onSubmit = event => {
      event.preventDefault()
      const newOne = {
        'x': x,
        'y': y,
        'steps': steps,
        'email': email
      }
      axios.post('http://localhost:9000/api/result', newOne)
      .then(res=> {
        this.setState({...this.state, message: res.data.message})
        this.setState({...this.state, email: ''})
      })
      .catch(err=> {
        this.setState({...this.state, message: err.response.data.message})
      })
      this.setState({
        email: ''
      })
    }
    const onChange = event => {
      const {value} = event.target
      this.setState({...this.state, email: value})
    }
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">You moved {steps} {steps===1?'time': 'times'}</h3>
        </div>
        <div id="grid">
          {
            grid.map((group, idx)=> {
              if(group[2] === true){
                return ( <div className='square active' key={idx}>{group[3]}</div>)
              } else {
                return (
                  <div className='square' key={idx}>{group[3]}</div>
                )
              }
            })
          }
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={moveLeft}>LEFT</button>
          <button id="up" onClick={moveUp}>UP</button>
          <button id="right" onClick={moveRight}>RIGHT</button>
          <button id="down" onClick={moveDown}>DOWN</button>
          <button id="reset" onClick={reset}>reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}