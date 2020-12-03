/**
 * This file contains the Project module
 */

class Project {
    constructor(){
        // data structure:
        //      {id: , name: }
        this.projectId = 0;
        this.projectList = []
    }
    addProject(name){
        this.projectList.push({id: this.projectId, name})
        this.projectId++
    }
    deleteProject(name){
        let idx = this.projectList.findIndex(project => project.name === name)
        this.projectList.splice(idx, 1)
    }
    getProjects(){
        return this.projectList
    }
}

module.exports = Project
