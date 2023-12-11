import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { Form } from './Form'
import { setUser } from 'store/userSlice'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [errorMessage, setError] = useState('')

  const handleRegister = (email, password) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
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
        setError('Неправильный формат данных')
        console.error()
      })
  }

  return (
    <Form
      title="Регистрация"
      handleClick={handleRegister}
      errorMessage={errorMessage}
    />
  )
}

export { SignUp }
