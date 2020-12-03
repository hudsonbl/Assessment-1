// moment.js is used for date formatting
// lodash
const moment = require('moment-timezone')
const Task = require('../modal/Task')
const Project = require('../modal/Project')
const _ = require('lodash')

const tasks = new Task()
const projects = new Project()

// ==========================================
// Add new projects
// ==========================================
/** 
 * @class: Project
 * @function: addProject()
 * @param: name of project
 */
projects.addProject('personal')
projects.addProject('work')
projects.addProject('errands')

console.log('Loading new projects... \n', projects)

// ==========================================
// Add new Tasks
// ==========================================
/** 
 * @class: Task
 * @function: addNewTask()
 * @param: task data
 * @param: project data
 * @param: optional data insertion("above", default "below")
 */
const taskData = [
    {
        text: 'description1 of task',
        project: 'personal',
        schedule: moment().day(0).tz('America/Los_Angeles').format('ha z MM/DD/YYYY'),
        label: 'Task-1',
        priority: 1
    },
    {
        text: 'description2 of task',
        project: 'personal',
        schedule: moment().day(3).tz('America/Los_Angeles').format('ha z MM/DD/YYYY'),
        label: 'Task-2',
        priority: 1
    },
    {
        text: 'description3 of task',
        project: 'personal',
        schedule: moment().day(-5).tz('America/Los_Angeles').format('ha z MM/DD/YYYY'),
        label: 'Task-3',
        priority: 1
    },
    {
        text: 'description4 of task',
        project: 'work',
        schedule: moment().day(10).tz('America/Los_Angeles').format('ha z MM/DD/YYYY'),
        label: 'Task-4',
        priority: 1
    }
]

for(let i = 0; i < taskData.length; i++){
    tasks.addNewTask(taskData[i], projects.getProjects(), "above")
}
console.log("=================== Add New Tasks ===================")
console.log("Adding new tasks... \n", tasks)

// ==========================================
// Edit new Tasks
// ==========================================
/** 
 * @class: Task
 * @function: editTask()
 * @param: task data
 */
const editTaskData = [
    {
        id: 0,
        text: 'description1 of task 100',
        project: '',
        schedule: '',
        label: 'Task-100',
        priority: 1
    },
    {
        id: 1,
        text: 'description2 of task 200',
        project: '',
        schedule: '',
        label: 'Task-110',
        priority: 1
    },
    {
        id: 2,
        text: 'description3 of task 300',
        project: '',
        schedule: '',
        label: 'Task-300',
        priority: 1
    }
]

for(let i = 0; i < editTaskData.length; i++){
    tasks.editTask(editTaskData[i])
}
console.log("=================== Edit Tasks ===================")
console.log("Editing new tasks... \n", tasks)

// ==========================================
// View Tasks
// ==========================================
/** 
 * @class: Task
 * @function: viewTask()
 * @param: filterable option(default all, otherwise searches by project)
 */
console.log("=================== View Tasks ===================")
console.log("Viewing tasks under personal...\n", tasks.viewTask('personal'))
console.log("Viewing tasks under work...\n", tasks.viewTask('work'))
console.log("Viewing all tasks...\n", tasks.viewTask())

// ==========================================
// Search Tasks
// ==========================================
/** 
 * @class: Task
 * @function: searchTask()
 * @param: task name that can begin with beginning chars as key words
 */
console.log("=================== Search Tasks ===================")
var searchWord = "Task-11"
searchWord = searchWord.split('')
var count = 3
let interval = setInterval(() => {
    if(count !== 0){
        var word = _.slice(searchWord, 0, searchWord.length - count + 1).join('')
        console.log("Searching tasks with ", word, "...\n", tasks.searchTask(word))
    }else {
        clearInterval(interval)
    }
    count--
}, 2000)