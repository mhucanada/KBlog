import React, { useState, useEffect } from 'react'
import Task from './components/Task'/* 
import ProgressBar from './components/ProgressBar' */
import Dropdown from './components/Dropdown'
import Notification from './components/Notification'
import taskService from './services/tasks'
import categoryService from './services/category'
import loginService from './services/login'

const App = () => {
	const [tasks, setTasks] = useState([]) /*[varName, funcName] <- list of tasks*/
	const [newTask, setNewTask] = useState('')
	const [newCategory, setNewCategory] = useState('')
	const [currentCategories, setCurrentCategories] = useState([])
	const [errorMessage, setErrorMessage] = useState(null)

	const [username, setUsername] = useState('')

	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		console.log('effect')
		taskService.getAll().then((initialTasks) => {
			setTasks(initialTasks)
		})
	}, [])

	useEffect(() => {
		console.log('categories')
		categoryService.getAll().then((categories) => {
			setCurrentCategories(categories)
			console.log(categories)
		})
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedTaskappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			taskService.setToken(user.token)
		}
	}, [])

	const addTask = (event) => {

		event.preventDefault()
		const oneCategory = !newCategory.replace(/\s/g, '').length === true ? 'uncategorized' : newCategory

		const taskObject = {
			content: newTask,
			id: Math.random(10000000),
			status: false,
			category: oneCategory,
			date: Date(),
		}

		const existingCategories = currentCategories.find((result) => result.category === newCategory)
		console.log(existingCategories)

		if (existingCategories === undefined && oneCategory !== 'uncategorized') {
			categoryService.create({ category: oneCategory }).then((returnedCategory) => {
				console.log(returnedCategory)
				setCurrentCategories(currentCategories.concat(returnedCategory))
			})
		}

		if (!newTask.replace(/\s/g, '').length) {
			alert('Please enter valid text.')
			setNewTask('')
		} else {
			taskService.create(taskObject).then((returnedTask) => {
				setTasks(tasks.concat(returnedTask))
				setNewTask('')
				setNewCategory('')

			})
		}
	}

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password
			})

			window.localStorage.setItem(
				'loggedTaskappUser', JSON.stringify(user)
			)
			taskService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}

		console.log('logging in with', username, password)
	}

	const handleLogOut = (event) => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedTaskappUser')
			window.location.reload()
		} catch {
			setErrorMessage('Already logged out')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}

	const handleTaskChange = (event) => {
		console.log(event.target.value)
		setNewTask(event.target.value)
	}

	const handleCategoryChange = (event) => {
		setNewCategory(event.target.value)
	}

	const toggleFinished = (id) => {
		const task = tasks.find((n) => n.id === id)

		const changedTask = { ...task, status: !task.status }

		taskService.update(id, changedTask).then((returnedTask) => {
			setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)))
		})
	}

	const deleteTask = (id) => {
		if (window.confirm('Are you sure you want to delete this?')) {
			taskService.deleteTask(id)
			setTasks(tasks.filter((task) => task.id !== id))
		}
	}

	var date = new Date();
	var displayDate = date.toDateString();

    var tasksDone = 0;
    tasks.forEach((item) => { /*map = do same thing to each item in list*/

        if (item.status)
        {
            tasksDone += 1;
        }
		console.log(tasksDone);
    })

		const loginForm = () => (
			<form onSubmit={handleLogin}>
			<div>
				username
					<input 
					type="text" 
					value={username}
					name="Username"
					onChange={({target}) => setUsername(target.value)}/>
			</div>
			<div>
				password
					<input 
					type="password" 
					value={password}
					name="Password"
					onChange={({target}) => setPassword(target.value)}/>
			</div>
			<button type="submit">login</button>
			</form>
		)

		const logOutButton = () => (
			<form onSubmit={handleLogOut}> 
				<button type="submit">logout</button>
			</form>
		)

		const taskForm = () => (
			<>
			<div>
				{tasks.map((task, i) => (
					<Task
						key={i}
						task={task}
						toggleFinished={() => toggleFinished(task.id)}
						deleteTask={() => deleteTask(task.id)}
					/>
				))}
			</div>
			<form onSubmit={addTask}>
				<input value={newTask} onChange={handleTaskChange} placeholder=' Task' />
				<input
					type='text'
					value={newCategory}
					onChange={handleCategoryChange}
					placeholder=' Category'
					list='cats'
				/>
				<datalist id='cats'>
					{currentCategories.map((category, i) => (
						<Dropdown key={i} category={category.category} />
					))}
				</datalist>

				<input type="submit" value="Add" />
				{/* <button type='submit'>save</button> */}
			</form>
			</>
		)

	return (
		<div>
			<h2>Task List for {displayDate}</h2>
			<Notification message={errorMessage} />
			{user === null && loginForm()}
			{user !== null && taskForm()}

			{user !== null && logOutButton()}
			{/* <div className="right-side">
                
                <p>Overall</p>
                <div/>
                
                <ProgressBar numberOfTasks={tasks.length} tasksDone={tasksDone} />
            </div> */}

		</div>
			
	)

}

export default App
