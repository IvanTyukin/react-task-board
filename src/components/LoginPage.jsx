import { Login } from './Login'
import { Link } from 'react-router-dom'

import './Form.css'

function LoginPage() {
  return (
    <div className="helloPage-wrapper">
      <div className="helloPage">
        <h1>Войти</h1>
        <Login />
        <p>
          Или <Link to="/register">Создайте аккаунт</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
