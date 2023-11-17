import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'

function id() {
  return nanoid()
}

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: id(),
        todoText: action.payload.newTaskText,
        isDone: false,
        isReduct: false,
        todoDate: action.payload.todoDate,
      })
    },
    decorateTodo(state, action) {
      const decoratedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      )
      decoratedTodo.isDone = !decoratedTodo.isDone
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    reductTodo(state, action) {
      const reductedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      )
      reductedTodo.isReduct = !reductedTodo.isReduct
    },
    save(state, action) {
      const saveTodo = state.todos.find((todo) => todo.id === action.payload.id)

      saveTodo.isReduct = false
      if (action.payload.curTaskValue.trim()) {
        saveTodo.todoText = action.payload.curTaskValue
      }
    },
    changeDate(state, action) {
      const carriedTask = state.todos.find(
          (todo) => todo.id === action.payload
        ),
        carriedTaskDayNum = parseInt(carriedTask.todoDate.split('.')[0]),
        carriedTaskMonthNum = parseInt(carriedTask.todoDate.split('.')[1] - 1),
        carriedTaskYearNum = parseInt(carriedTask.todoDate.split('.')[2])

      carriedTask.todoDate = new Date(
        carriedTaskYearNum,
        carriedTaskMonthNum,
        carriedTaskDayNum + 7
      ).toLocaleDateString()
    },
  },
})

export const {
  addTodo,
  decorateTodo,
  removeTodo,
  reductTodo,
  save,
  changeDate,
} = todoSlice.actions

export default todoSlice.reducer
