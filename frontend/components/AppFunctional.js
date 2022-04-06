import axios from 'axios'
import React, {useState} from 'react'


const initialValues = {
  x: 2,
  y: 2,
  steps: 0,
  message: '',
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
export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialValues.message)
  const [email, setEmail] = useState(initialValues.email)
  const [x, setX] = useState(initialValues.x)
  const [y, setY] = useState(initialValues.y)
  const [steps, setSteps] = useState(initialValues.steps)
  const [grid] = useState(initialValues.grid)

  const moveLeft = () => {
    if(x > 1){
      setX(x-1)
      setSteps(steps + 1)
    } else {
      setMessage("You can't go left")
    }
  }
  const moveRight = () => {
    if(x >= 1 && x < 3){
      setX(x+1)
      setSteps(steps + 1)
    } else {
      setMessage("You can't go right")
    }
  }
  const moveUp = () => {
    if(y > 1 ) {
      setY(y-1)
      setSteps(steps + 1)
    } else {
      setMessage("You can't go up")
    }
  }
  const moveDown = () => {
    if(y >= 1 && y < 3){
      setY(y+1)
      setSteps(steps + 1)
    } else {
      setMessage("You can't go down")
    }
  }
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
      setMessage(res.data.message)
      setEmail(email)
    })
    .catch(err=> {
      setMessage(err.response.data.message)
    })
    .finally(() => {
      setEmail('')
    })
  }
  const onChange = event => {
    const {value} = event.target
    setEmail(value)
  }
  const reset = () => {
    setSteps(initialValues.steps)
    setX(initialValues.x)
    setY(initialValues.y)
    setMessage(initialValues.message)
    setEmail(initialValues.email)
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
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} {steps === 1? 'time': 'times'}</h3>
      </div>
      <div id="grid">
        {
          grid.map((group, idx)=> {
            if(group[2] === true) {
              return(<div className='square active' key={idx}>{group[3]}</div>)
            } else {
              return(<div className='square' key={idx}>{group[3]}</div>)
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
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}