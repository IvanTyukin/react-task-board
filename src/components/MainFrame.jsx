import './MainFrame.css'
import { useState } from 'react'

function MainFrame({ taskList, addTask }) {
  const [newText, setNewText] = useState('')

  function changeText(event) {
    setNewText(event.target.value)
  }

  return (
    <div className="mainFrame">
      <div className="mainPanel">
        <input
          id="addNewTask"
          className="inputSpace"
          placeholder="Enter new task"
          value={newText}
          onChange={(event) => changeText(event)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              addTask(newText, taskList, setNewText)
            }
          }}
        />
        <button
          className="addTask"
          onClick={() => addTask(newText, taskList, setNewText)}
        >
          Добавить новую задачу
        </button>
      </div>
    </div>
  )
}

export default MainFrame
