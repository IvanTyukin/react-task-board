import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { useAuth } from 'hooks/use-auth'
import { useNavigate } from 'react-router-dom'

import { changeDate, decorateTodo } from '../store/todoSlice'

import getMonday from 'utils/getMonday'

import './NearestTasks.css'

function NearestTasks() {
  const { isAuth, email } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      return navigate('/login')
    }
  }, [isAuth, navigate])

  const tasks = useSelector((state) => state.todos.todos)
  const dispatch = useDispatch()
  // console.log(new Date().toLocaleDateString())
  // const date =

  // Возвращаем для текущей недели все незавершенные задачи
  const nearestTasks = tasks.filter((task) => {
    return (
      getMonday(new Date()) <=
        new Date(
          parseInt(task.todoDate.split('.')[2]),
          parseInt(task.todoDate.split('.')[1] - 1),
          parseInt(task.todoDate.split('.')[0])
        ) &&
      new Date(
        parseInt(task.todoDate.split('.')[2]),
        parseInt(task.todoDate.split('.')[1] - 1),
        parseInt(task.todoDate.split('.')[0])
      ) <
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          getMonday(new Date()).getDate() + 7
        ) &&
      !task.isDone
    )
  })

  // Возвращаем для следующей недели все незавершенные задачи
  const nextWeekTasks = tasks.filter((task) => {
    return (
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        getMonday(new Date()).getDate() + 7
      ) <=
        new Date(
          parseInt(task.todoDate.split('.')[2]),
          parseInt(task.todoDate.split('.')[1] - 1),
          parseInt(task.todoDate.split('.')[0])
        ) &&
      new Date(
        parseInt(task.todoDate.split('.')[2]),
        parseInt(task.todoDate.split('.')[1] - 1),
        parseInt(task.todoDate.split('.')[0])
      ) <
        new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          getMonday(new Date()).getDate() + 14
        ) &&
      !task.isDone
    )
  })

  /**
   *
   *
   */

  const [columns, setColumns] = useState([
    {
      id: 1,
      title: 'Задания текущей недели',
      items: nearestTasks,
      style: { backgroundColor: '#008000', color: '#fff' },
    },
    {
      id: 2,
      title: 'Перенести на следующую неделю/Задания следующей недели',
      items: nextWeekTasks,
      style: { backgroundColor: '#ffff00', color: '#000' },
    },
    {
      id: 3,
      title: 'Завершить',
      items: [],
      style: { backgroundColor: '#0000ff', color: '#fff' },
    },
  ])

  const [currentColumn, setCurrentColumn] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  useEffect(() => {
    columns.forEach((column) => {
      if (column.title === 'Завершить' && column.items.length) {
        column.items.forEach((item) => {
          const findTask = tasks.filter((task) => task.id === item.id) //  Находим элемент task в store
          if (!findTask[0].isDone) {
            dispatch(decorateTodo(findTask[0].id)) // Если элемент еще не менялся на true мы его вычеркиваем
          }
        })
      }
      if (
        column.title ===
          'Перенести на следующую неделю/Задания следующей недели' &&
        column.items.length
      ) {
        column.items.forEach((item) => {
          const findTask = tasks.filter((task) => task.id === item.id)
          const dayNum = parseInt(findTask[0].todoDate.split('.')[0]),
            monthNum = parseInt(findTask[0].todoDate.split('.')[1] - 1),
            yearNum = parseInt(findTask[0].todoDate.split('.')[2])

          if (
            getMonday(
              new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() + 7
              )
            ) > new Date(yearNum, monthNum, dayNum)
          ) {
            dispatch(changeDate(findTask[0].id)) // Кривая функция !!!!!!!!!!
          }
        })
      }
    })
  }, [columns, tasks, dispatch])

  function onStartHandler(e, column, item) {
    setCurrentColumn(column)
    setCurrentItem(item)
  }

  function onEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function onOverHandler(e) {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 6px 3px gray'
    }
  }

  function onLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function onDropHandler(e, column, item) {
    e.preventDefault()
    const currentIndex = currentColumn.items.indexOf(currentItem)
    currentColumn.items.splice(currentIndex, 1)
    const dropIndex = column.items.indexOf(item)
    column.items.splice(dropIndex + 1, 0, currentItem)
    setColumns(
      columns.map((c) => {
        if (c.id === column.id) {
          return column
        }
        if (c.id === currentColumn.id) {
          return currentColumn
        }
        return c
      })
    )
    e.target.style.boxShadow = 'none'
  }

  function dropTaskHandler(e, column) {
    const currenId = column.items.map((item) => item.id)
    if (!currenId.includes(currentItem.id)) {
      column.items.push(currentItem)
      const currentIndex = currentColumn.items.indexOf(currentItem)
      currentColumn.items.splice(currentIndex, 1)
      setColumns(
        columns.map((c) => {
          if (c.id === column.id) {
            return column
          }
          if (c.id === currentColumn.id) {
            return currentColumn
          }
          return c
        })
      )
    }
  }

  return (
    <div className="taskColumns">
      {columns.map((column) => (
        <div
          className="column"
          key={column.id}
          onDragOver={(e) => onOverHandler(e)}
          onDrop={(e) => dropTaskHandler(e, column)}
        >
          <h3>{column.title}</h3>
          {column.items.map((item) => (
            <div
              className="item"
              key={item.id}
              draggable={true}
              onDragStart={(e) => onStartHandler(e, column, item)}
              onDragEnd={(e) => onEndHandler(e)}
              onDragLeave={(e) => onLeaveHandler(e)}
              onDragOver={(e) => onOverHandler(e)}
              onDrop={(e) => onDropHandler(e, column, item)}
              style={column.style}
            >
              <div className="grabIcon">
                <div className="icon"></div>
                <div>{item.todoText}</div>
              </div>
              <div>{item.todoDate}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default NearestTasks
