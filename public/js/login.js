function loginAsUser(req, res, next) {
    // Assuming you have some logic to authenticate the user
    const isAuthenticated = checkUserAuthentication(req); // Function to check user authentication

    if (isAuthenticated) {
        // If user is authenticated, you can redirect to a specific route or send a success response
        res.redirect('dashboard'); // Redirect to the dashboard page for regular users
    } else {
        // If user is not authenticated, you can render a login page or send an error response
        res.status(401).send('Unauthorized'); // Send 401 Unauthorized status
        console.log("Logging in as user");
    }
}

function loginAsPro(req, res, next) {
    // Assuming you have some logic to authenticate the professional user
    const isAuthenticated = checkProAuthentication(req); // Function to check professional user authentication

    if (isAuthenticated) {
        // If professional user is authenticated, you can redirect to a specific route or send a success response
        res.redirect('/pro-dashboard'); // Redirect to the dashboard page for professional users
    } else {
        // If professional user is not authenticated, you can render a login page or send an error response
        res.status(401).send('Unauthorized'); // Send 401 Unauthorized status
        console.log("Logging in as pro");
    }
}

function checkUserAuthentication(req) {
    return req.session.logged_in && req.session.userRoleId == 1; // Placeholder logic, replace with actual authentication logic
}

function checkProAuthentication(req) {
    return req.session.logged_in && req.session.userRoleId == 2; // Placeholder logic, replace with actual authentication logic
}

const signup = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const type = document.querySelector('#user-type').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, userRoleId: type }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            // condition for redirecting depending on if contractor === true
            document.location.replace('/dashboard'); /// set up redirect once dashboard or profile page is created
        } else {
            alert('Failed to sign up');
        }
    }
};

if (document.querySelector('.login-form')) {
    document.querySelector('.login-form').addEventListener('submit', loginAsUser);
}

if (document.querySelector('.signup-form')) {
    document.querySelector('.signup-form').addEventListener('submit', signup);
}

async function logout(event) {
    event.preventDefault()
    await fetch('api/users/logout', {
        method: "POST"
    })
    document.location.replace('/')
}

if (document.querySelector('#log_out')) {
    console.log("yo dude whats up with your guinea pig")
    document.querySelector('#log_out').addEventListener('click', logout);
}