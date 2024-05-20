

const addProject = async function(event){
    event.preventDefault()
    const projectName = document.querySelector("#projectName").value.trim() /// eventually grab values from form input
    const description = document.querySelector("#description").value.trim() 
    const categoryName = document.querySelector("#projectName").value
   

    const response = await fetch('/api/projects', {
        method: 'POST', 
        body: JSON.stringify({
            projectName: projectName,
            description: description,
            categoryName: categoryName
            
        }),
        headers: {"Content-Type": 'application/json'}
        
    });
    console.log(response)
    if(response.ok){
        document.location.replace("/dashboard")
        alert("successfully added project")
        }
        else {
            alert("problems")
        }
}



    document.querySelector("#project-form").addEventListener("submit", addProject)
