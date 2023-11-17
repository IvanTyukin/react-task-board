import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeTodo, decorateTodo, reductTodo } from '../store/todoSlice'

import TaskField from './TaskField'

import './TaskList.css'

function TaskList({
  taskDate,
  // taskList,
}) {
  const dispatch = useDispatch()
  const taskList = useSelector((state) => state.todos.todos)
  // console.log(taskList)

  const result = taskList.map((elem, index, taskList) => {
    let div

    if (elem.isDone) {
      div = <div className="text decorated">{elem.todoText}</div>
    } else {
      div = <div className="text">{elem.todoText}</div>
    }
    let text
    if (!elem.isReduct) {
      text = div
    } else {
      text = <TaskField value={elem.todoText} id={elem.id} />
    }

    // <ul> and <ol> must only directly contain <li>, <script> or <template> elements -- ошибка
    return (
      <React.Fragment key={elem.id}>
        {taskList[index].todoDate === taskDate ? (
          <li>
            <div className="input">
              <label>
                <input
                  name="decorateTask"
                  title="Завершить задание"
                  type="checkbox"
                  checked={elem.isDone}
                  onChange={() => dispatch(decorateTodo(elem.id))}
                />
              </label>
              {text}
            </div>
            <span className="buttons">
              <button
                type="button"
                className="removeButton"
                onClick={() => dispatch(removeTodo(elem.id))}
              >
                Удалить
              </button>
              <button
                type="button"
                onClick={() => dispatch(reductTodo(elem.id))}
              >
                Редактировать
              </button>
            </span>
          </li>
        ) : (
          <></>
        )}
      </React.Fragment>
    )
  })

  // console.log(result)

  let tasksInDate = taskList.filter((elem) => elem.todoDate === taskDate)

  // console.log(tasksInDate)
  // Если количество записей на текущую дату равно 0 -- не выводить ничего
  // Добавить это условие
  return (
    <>
      {taskList.length && tasksInDate.length ? (
        <>
          <hr />
          <h2>Расписание на {taskDate}</h2>
          <ul>{result}</ul>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default TaskList
