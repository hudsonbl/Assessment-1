const Task = require('../modal/Task')
const Project = require('../modal/Project')
const _ = require('lodash')
const moment = require('moment-timezone')

const tasks = new Task()
const projects = new Project()

projects.addProject('personal')
projects.addProject('work')
projects.addProject('errands')

test("Adds 4 valid tasks and one invalid task - result should be 4 tasks", () => {
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
        },
        {
            text: 'description4 of task',
            project: 'bad project',
            schedule: moment().day(10).tz('America/Los_Angeles').format('ha z MM/DD/YYYY'),
            label: 'Task-4',
            priority: 1
        }
    ]

    for(let i = 0; i < taskData.length; i++){
        tasks.addNewTask(taskData[i], projects.getProjects(), "above")
    }
    
    expect(Object.keys(tasks.getTaskList()).length).toBe(4)
})

test("There should be a difference of 2 in labels for the edited task", async () => {
    var oldData = []
    var newData = []
    const editTaskData = [
        {
            id: 0,
            text: '',
            project: '',
            schedule: '',
            label: 'Task-1 edited',
            priority: 1
        },
        {
            id: 1,
            text: '',
            project: '',
            schedule: '',
            label: 'Task-11 edited',
            priority: 1
        }
    ]
    oldData = _.clone(tasks.getTaskList())
    let promise = await new Promise(res => setTimeout(() => {
        for(let i = 0; i < editTaskData.length; i++){
            tasks.editTask(editTaskData[i])
        }
        
        res()
    }, 10000))

    newData = tasks.getTaskList()
    console.log("old: ", oldData)
    console.log("new: ", newData)
    console.log("out: ", _.differenceWith(oldData, newData, _.isEqual))
    
    expect(Object.keys(_.differenceWith(oldData, newData, _.isEqual)).length).toBe(2)
})

test("Should only return tasks with project name personal", () => {
    expect(Object.keys(tasks.viewTask('personal')).length).toBe(3)
})

test("Should return all tasks with task name beginning with Task-1", () => {
    expect(Object.keys(tasks.searchTask("Task-1")).length).toBe(2)
})