const addProject = async function(event){
    event.preventDefault()
    const projectName = "new project" /// eventually grab values from form input
    const description = "Build a house"
    //const projectName = document.querySelector("#projectName").value
    // add project type
    // add userId

    await fetch('/api/projects', {
        method: 'POST', 
        body: JSON.stringify({
            projectName: projectName,
            description: description
            //projectType
            //userId
        }),
        headers: {"Content-Type": 'application/json'}
    })
    //document.location.replace("/")
    alert("successfully added project")
}

document.querySelector("#projectBtn")
.addEventListener("click", addProject)