import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addTodo } from '../store/todoSlice'

import MainFrame from './MainFrame'
import TaskList from './TaskList'

function SingleDay() {
  const params = useParams()
  const navigate = useNavigate()

  /*
   *  Перенаправление на страницу календаря если daySlug некорректен:
   * Если daySlug не соответствует строке Даты
   * Либо, если строка не соответствует корректной дате
   */

  // Сделать дату приведенной к формату ISO  !!!!!!!!!!!

  useEffect(() => {
    const date = params.daySlug.split('.')
    if (
      !(
        date.length === 3 &&
        new Date(
          parseInt(date[2]),
          parseInt(date[1]) - 1,
          parseInt(date[0])
        ).toLocaleDateString() === params.daySlug
      )
    ) {
      navigate('..', { relative: 'path' })
    }
  }, [params.daySlug, navigate])

  const taskList = useSelector((state) => state.todos.todos)

  // console.log(taskList)
  const dispatch = useDispatch()

  function addTask(newTaskText, tasks, setNewText) {
    const todoDate = params.daySlug
    if (newTaskText.trim()) {
      dispatch(addTodo({ newTaskText, todoDate }))
    }
    setNewText('')
  }

  return (
    <>
      <h2>Составьте план на сегодня</h2>
      <MainFrame taskList={taskList} addTask={addTask}></MainFrame>
      <TaskList taskDate={params.daySlug}></TaskList>
    </>
  )
}

export default SingleDay
