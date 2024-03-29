import { useState } from 'react'

import './Form.css'

const Form = ({ title, handleClick, errorMessage }) => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <div className="authForm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="адрес электронной почты"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="пароль"
      ></input>
      {errorMessage !== '' ? (
        <p className="errorMessage">{errorMessage}</p>
      ) : (
        <></>
      )}
      <button onClick={() => handleClick(email, pass)}>{title}</button>
    </div>
  )
}

export { Form }
