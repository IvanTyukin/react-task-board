import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAuth } from 'hooks/use-auth'
import './Calendar.css'

let DayInMonth
let Months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

let Years = []
for (let i = 2019; i < 2032; i++) {
  Years.push(i)
}

function Calendar() {
  const { isAuth, email } = useAuth()
  const navigate = useNavigate()
  const [today, setToday] = useState(new Date())
  const [month, setMonth] = useState(new Date().getMonth())
  const [year, setYear] = useState(new Date().getFullYear())
  const [hours, setHours] = useState(new Date().getHours())
  const [minutes, setMinutes] = useState(new Date().getMinutes())

  const arrI = [0, 1, 2, 3, 4, 5]
  const arrJ = [0, 1, 2, 3, 4, 5, 6]

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login')
    }
  }, [isAuth, navigate])

  let date = new Date(year, month, 1)
  let numOfMonth = date.getMonth()
  let numOfYear = date.getFullYear()

  if ((numOfYear % 4 === 0 && numOfYear % 100 !== 0) || numOfYear % 400 === 0) {
    DayInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  } else {
    DayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  }
  let d = 1 // Начало месяца обозначается 1ым числом месяца

  useEffect(() => {
    const id = setInterval(() => {
      setMinutes(new Date().getMinutes())
      setHours(new Date().getHours())

      if (minutes === 0 && hours === 0) {
        setToday(new Date())
        setMonth(new Date().getMonth())
        setYear(new Date().getFullYear())
      }
    }, 60000)

    return () => {
      clearInterval(id)
    }
  }, [month, year, hours, minutes])

  const tasks = useSelector((state) => state.todos.todos)

  const calendarBuilder = arrI.map((i) => {
    return (
      <tr key={`${i}`}>
        {arrJ.map((j) => {
          let day1 = new Date(numOfYear, numOfMonth, d) // key должен быть применим к самому внешнему тегу в map
          return (
            <React.Fragment key={`${j}`}>
              {j === 5 || j === 6 ? (
                <>
                  {today.getDate() === day1.getDate() &&
                  today.getFullYear() === day1.getFullYear() &&
                  today.getMonth() === day1.getMonth() ? (
                    <td className="today weekend">
                      {(j + 1 === day1.getDay() || j - 6 === day1.getDay()) &&
                      d <= DayInMonth[numOfMonth] ? (
                        <>
                          <NavLink to={`${day1.toLocaleDateString()}`}>
                            {d++}
                          </NavLink>
                          {tasks.find(
                            (task) =>
                              task.todoDate === day1.toLocaleDateString()
                          ) ? (
                            <div className="placeholder"></div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </td>
                  ) : (
                    <td className="weekend">
                      {(j + 1 === day1.getDay() || j - 6 === day1.getDay()) &&
                      d <= DayInMonth[numOfMonth] ? (
                        <>
                          <NavLink to={`${day1.toLocaleDateString()}`}>
                            {d++}
                          </NavLink>
                          {tasks.find(
                            (task) =>
                              task.todoDate === day1.toLocaleDateString()
                          ) ? (
                            <div className="placeholder"></div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </td>
                  )}
                </>
              ) : (
                <>
                  {today.getDate() === day1.getDate() &&
                  today.getFullYear() === day1.getFullYear() &&
                  today.getMonth() === day1.getMonth() ? (
                    <td className="today">
                      {(j + 1 === day1.getDay() || j - 6 === day1.getDay()) &&
                      d <= DayInMonth[numOfMonth] ? (
                        <>
                          <NavLink to={`${day1.toLocaleDateString()}`}>
                            {d++}
                          </NavLink>
                          {tasks.find(
                            (task) =>
                              task.todoDate === day1.toLocaleDateString()
                          ) ? (
                            <div className="placeholder"></div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </td>
                  ) : (
                    <td>
                      {(j + 1 === day1.getDay() || j - 6 === day1.getDay()) &&
                      d <= DayInMonth[numOfMonth] ? (
                        <>
                          <NavLink to={`${day1.toLocaleDateString()}`}>
                            {d++}
                          </NavLink>
                          {tasks.find(
                            (task) =>
                              task.todoDate === day1.toLocaleDateString()
                          ) ? (
                            <div className="placeholder"></div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        ''
                      )}
                    </td>
                  )}
                </>
              )}
            </React.Fragment>
          )
        })}
      </tr>
    )
  })

  function clickLeft() {
    setMonth(+month - 1)
    if (month < 1 && year > Years[0]) {
      setMonth(11)
      setYear(+year - 1)
    } else if (month < 1 && year === Years[0]) {
      setMonth(0)
    }
    // console.log(year, month)
    document.getElementsByTagName('select')[1].value = Years.indexOf(year)
    document.getElementsByTagName('select')[0].value = month
  }

  function clickRight() {
    setMonth(+month + 1)
    if (month > 10 && year < Years[Years.length - 1]) {
      setMonth(0)
      setYear(+year + 1)
    } else if (month > 10 && year === Years[Years.length - 1]) {
      setMonth(11)
    }
    // console.log(year, month)
    document.getElementsByTagName('select')[1].value = Years.indexOf(year)
    document.getElementsByTagName('select')[0].value = month
  }

  function switchToday() {
    setMonth(new Date().getMonth())
    setYear(new Date().getFullYear())
  }

  return (
    <>
      <div className="calendar-wrapper">
        <div className="leftArrow" onClick={() => clickLeft()}>
          &larr;
        </div>
        <div className="rightArrow" onClick={() => clickRight()}>
          &rarr;
        </div>
        <table className="calendar">
          <caption>
            <select
              id="monthSelector"
              title="Выберите месяц"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              {Months.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>

            <select
              id="yearSelector"
              title="Выберите год"
              value={Years.indexOf(year)}
              onChange={(e) => setYear(Years[e.target.value])}
            >
              {Years.map((item, index) => (
                <option key={index} value={index}>
                  {item}
                </option>
              ))}
            </select>

            <div>
              <button className="todayBtn" onClick={() => switchToday()}>
                Сегодня
              </button>
            </div>

            <h3>
              {year} {Months[month]}
            </h3>
          </caption>
          <thead>
            <tr>
              <th>пн</th>
              <th>вт</th>
              <th>ср</th>
              <th>чт</th>
              <th>пт</th>
              <th>сб</th>
              <th>вс</th>
            </tr>
          </thead>

          <tbody>{calendarBuilder}</tbody>
        </table>
      </div>
    </>
  )
}

export default Calendar
