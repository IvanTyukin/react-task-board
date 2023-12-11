import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Form } from './Form'
import { setUser } from 'store/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setError] = useState('')

  const handleLogin = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        )
        navigate('/')
      })
      .catch(() => {
        setError('Неправильный логин или пароль')
        console.error()
      })
  }
  return (
    <Form title="Войти" handleClick={handleLogin} errorMessage={errorMessage} />
  )
}

export { Login }
