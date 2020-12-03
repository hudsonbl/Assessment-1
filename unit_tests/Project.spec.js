const Project = require('../modal/Project')
var projects = new Project()
test("3 Project names should be added", () => {
    projects.addProject('personal')
    projects.addProject('work')
    projects.addProject('errands')
    expect(Object.keys(projects.getProjects()).length).toBe(3)
})