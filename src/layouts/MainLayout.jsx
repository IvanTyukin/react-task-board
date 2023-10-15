import { NavLink, Outlet } from 'react-router-dom'

import './MainLayout.css'

function MainLayout() {
  return (
    <>
      <div className="wrapper">
        <div className="aside">
          <nav>
            <NavLink to=".">Главная</NavLink>
            <NavLink to="calendar">Календарь</NavLink>
            <NavLink to="nearestTasks">Ближайшие задачи</NavLink>
          </nav>
        </div>
        <div className="header">
          <button className="enterBtn">Войти</button>
          <button className="register">Создать аккаунт</button>
        </div>
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default MainLayout
