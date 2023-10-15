import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { save } from '../store/todoSlice'

function TaskField({ value, id }) {
  const [curTaskValue, setCurTaskVal] = useState(value)

  const dispatch = useDispatch()

  function changeTask(event) {
    setCurTaskVal(event.target.value)
  }

  return (
    <>
      <label>
        <input
          name="decoratedTask"
          title="Измените задание"
          value={curTaskValue}
          onChange={(event) => changeTask(event)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              dispatch(save({ curTaskValue, id }))
            }
          }}
        />
      </label>
      <button onClick={() => dispatch(save({ curTaskValue, id }))}>
        Сохранить
      </button>
    </>
  )
}

export default TaskField
