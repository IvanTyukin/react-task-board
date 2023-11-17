import { SignUp } from './SignUp'
import { Link } from 'react-router-dom'

import './Form.css'

function RegisterPage() {
  return (
    <div className="helloPage-wrapper">
      <div className="helloPage">
        <h1>Зарегистрироваться</h1>
        <SignUp />
        <p>
          У Вас уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
