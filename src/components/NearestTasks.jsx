import { useSelector } from 'react-redux'

import './NearestTasks.css'

function NearestTasks() {
  const tasks = useSelector((state) => state.todos.todos)

  console.log(new Date().toLocaleDateString())
  // const date =
  const nearestTasks = tasks.filter((task) => {
    return (
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
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
          new Date().getDate() + 7
        )
    )
  })

  /**
   *
   *
   */

  return (
    <ul>
      <h2>Расписание на ближайшую неделю</h2>
      {nearestTasks.map((task) => (
        <li key={task.id}>
          {task.todoText} {task.todoDate}
        </li>
      ))}
    </ul>
  )
}

export default NearestTasks
