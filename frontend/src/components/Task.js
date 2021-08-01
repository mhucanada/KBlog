import React from 'react'

const Task = ({ task, toggleFinished, deleteTask }) => {
	/*     const label = task.status
    ? 'finished' : 'not finished'
 */

	const checked = task.status ? true : ''

	return (
		<div className='tasks'>
			{/*<button onClick={toggleFinished}>{label}</button>*/}

			<input type='checkbox' checked={checked} id='myCheck' onChange={toggleFinished}></input>
			{task.content}
			<button onChange={deleteTask} id='deleteButton'>
				x
			</button>
		</div>
	)
}

export default Task
