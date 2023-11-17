import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { removeUser } from 'store/userSlice'
import { useAuth } from 'hooks/use-auth'

import './MainLayout.css'

function MainLayout() {
  const { isAuth, email } = useAuth()
  const navigate = useNavigate()
  const dispath = useDispatch()

  function goToPage(e) {
    if (e.target.className === 'enterBtn') {
      return navigate('/login')
    }
    if (e.target.className === 'register') {
      return navigate('/register')
    }
    if (e.target.className === 'exit') {
      return dispath(removeUser())
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="aside">
          <nav>
            <NavLink end to=".">
              Главная
            </NavLink>
            {isAuth ? <NavLink to="calendar">Календарь</NavLink> : <></>}
            {isAuth ? (
              <NavLink to="nearestTasks">Ближайшие задачи</NavLink>
            ) : (
              <></>
            )}
          </nav>
        </div>
        <div className="header">
          {!isAuth ? (
            <button className="enterBtn" onClick={(e) => goToPage(e)}>
              Войти
            </button>
          ) : (
            <></>
          )}
          {!isAuth ? (
            <button className="register" onClick={(e) => goToPage(e)}>
              Создать аккаунт
            </button>
          ) : (
            <></>
          )}
          {isAuth ? (
            <button className="exit" onClick={(e) => goToPage(e)}>
              Выйти
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout
