import { useDispatch } from 'react-redux'
import { useAuth } from 'hooks/use-auth'

// import { useEffect } from 'react'
import { removeUser } from 'store/userSlice'
import './Home.css'

function Home() {
  const { isAuth, email } = useAuth()
  // const navigate = useNavigate()
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if (!isAuth) {
  //     return navigate('/login')
  //   }
  // }, [isAuth, navigate])

  return (
    // <div className="home">
    //   <p className="homePar">
    //     Добро пожаловать на сайт. Это главная страница веб-приложения.
    //   </p>
    //   <p className="homePar">
    //     <b>Чтобы составить расписание, перейдите на вкладку календарь.</b>
    //   </p>
    // </div>
    isAuth ? (
      <div className="home">
        <p className="homePar">
          Добро пожаловать на сайт. Это главная страница веб-приложения.
        </p>
        <p className="homePar">
          <b>Чтобы составить расписание, перейдите на вкладку календарь.</b>
        </p>
        <button onClick={() => dispatch(removeUser())}>
          Logout from {email}
        </button>
      </div>
    ) : (
      <div className="helloIntro-wrapper">
        <div className="helloIntro">
          <h1>Здравствуйте, уважаемые посетители!</h1>

          <p>
            Вы попали на страницу интернет приложения. Здесь Вы сможете
            составить свое расписание и управлять своими задачами эффективно.
            Для того, чтобы начать работу, Вы можете авторизироваться,
            <br /> либо, если у Вас еще нет аккаунта - зарегистрироваться
          </p>
        </div>
      </div>
    )
  )
}

export default Home
