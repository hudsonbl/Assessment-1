/**
 * Task Management: 
 *      Add task above 
 *      Add task bleow
 *      Edit Task
 * 
 * Filterable options:
 *      schedule:
 *          today
 *          tomorrow
 *          this weekend
 *          next week
 *          inbox (main)
 *          today (main)
 *          upcomin (main)
 * 
 *      priority:
 *          1-4
 * 
 * Reminders:
 *      
 */

 /**
 * This file contains the Task module
 */

const _ = require('lodash')
const moment = require('moment')

class Task {
    constructor() {
        // Data structure: 
        //      {id: , text: , project: , schedule: , label: , priority: }
        this.taskItemList = []
        this.taskItemId = 0
    }

    getTaskList(){
        return this.taskItemList
    }

    addNewTask(data, projectList, option) {
        // Check if project is available by project name
        if(_.some(projectList, {'name': data.project})){
            let task = {
                id: this.taskItemId,
                text: data.text,
                project: data.project,
                schedule: data.schedule,
                label: data.label,
                priority: data.priority
            }
            // option allows user to push data above(infront) or below(back) list
            if(option === "above"){
                const newData = [task, ...this.taskItemList]
                this.taskItemList = newData
            }else {
                this.taskItemList.push(task)
            }
            this.taskItemId++;
            
        }else{
            console.log("No project by project name")
        }
    }

    editTask(data){
        // Ensure the task exists in data obj
        if(_.some(this.taskItemList, {'id': data.id})){
            // Get index of task
            let idx = this.taskItemList.findIndex(item => item.id === data.id)
            // iterate through task keys
            for(const [key, value] of Object.entries(this.taskItemList[idx])){
                this.taskItemList[idx][key] = !!data[key] ? data[key] : this.taskItemList[idx][key]
            }
        }else {
            console.log("No task by ID")
        }
    }
    
    viewTask(projectName){
        if(!(!!projectName)){
            return this.taskItemList
        }

        return _.filter(this.taskItemList, ['project', projectName]) 
    }
    // Lets make the search a streamable object
    searchTask(taskName){
        let taskChars = taskName.split('')
        let len = taskChars.length
        let data = []
        // filters by characters
        for(const task of this.taskItemList){
            if(_.isEqual(_.slice(task.label.split(''), 0, len), _.slice(taskChars, 0, len))){
                data.push(task)
            }
        }

        return data
    }
}

module.exports = Task