import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './components/Home'
import Calendar from './components/Calendar'
import SingleDay from './components/SingleDay'
import NearestTasks from './components/NearestTasks'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'

import './App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="calendar/:daySlug" element={<SingleDay />} />
            <Route path="nearestTasks" element={<NearestTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
