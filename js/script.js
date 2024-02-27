let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
const input = document.querySelector('.todo__text')
const btn = document.querySelector('.todo__add')
const todoItems = document.querySelector('.todo__items')
const select = document.querySelector('select')

const createTask = (event) => {
    event.preventDefault()
    if(input.value.trim() !== '' && tasks.every(task => task.value !== input.value)){
        const task = {
            value: input.value,
            isCompleted: false,
            time: new Date().toLocaleString()
        }
        tasks.push(task)
        renderTasks(tasks) 
    }
    input.value = ''
}

const renderTasks = (tasks) => {
    todoItems.innerHTML = ''
    localStorage.setItem('tasks', JSON.stringify(tasks))
    for(let task of tasks){
        const li = document.createElement('li')
        li.classList.add('todo__item')
        const todoTask = document.createElement('span')
        const todoValue = document.createElement('span')
        todoValue.innerText = task.value
        todoValue.classList.add('todo__value')
        todoTask.classList.add('todo__task', task.isCompleted ? 'completed' : '0')
        todoTask.append(todoValue)
        todoTask.innerHTML += `<span class='todo__date'>${task.time}</span>`
        li.append(todoTask)
        li.innerHTML += `<span class="todo__action todo__action_complete"></span>
        <span class="todo__action todo__action_delete"></span>`
        todoItems.append(li)
    
        
    }
}

const crossOutTask = (event) => {
    if(event.target.classList.contains('todo__action_complete')){
       tasks = tasks.map((task) =>
       task.value === event.target.parentElement.querySelector('.todo__value').innerText?{
        ...task,
        isCompleted: !task.isCompleted,
       } : task
       )
        localStorage.getItem('tasks', JSON.stringify(tasks))
        renderTasks(tasks)
    } 
}

const deleteTask = (event) => {
    if(event.target.classList.contains('todo__action_delete')){
        tasks = tasks.filter((task) => task.value !== event.target.parentElement.querySelector('.todo__value').innerText)
        localStorage.getItem('tasks', JSON.stringify(tasks))
        renderTasks(tasks)
    } 
}

const sortTasks = (event) =>{
    if(event.target.value === 'all'){
        renderTasks(tasks)
    }else if(event.target.value === 'active'){
        toPressActiveTasks()
    }else if(event.target.value === 'completed'){
        toPressCompletedTasks()
    }
}

const toPressActiveTasks = () => {
    const activeTasks = tasks.filter((task) => !task.isCompleted)
    renderTasks(activeTasks)
}

const toPressCompletedTasks = () => {
    const completedTasks = tasks.filter((task) => task.isCompleted)
    renderTasks(completedTasks) 
}

todoItems.addEventListener('click', deleteTask)
todoItems.addEventListener('click', crossOutTask)
btn.addEventListener('click', createTask)
select.addEventListener('click', sortTasks)
renderTasks(tasks)