function loginAsUser(req, res, next) {
    // Assuming you have some logic to authenticate the user
    const isAuthenticated = checkUserAuthentication(req); // Function to check user authentication

    if (isAuthenticated) {
        // If user is authenticated, you can redirect to a specific route or send a success response
        res.redirect('/dashboard'); // Redirect to the dashboard page for regular users
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
    // Placeholder function for regular user authentication logic
    // For example, check if the user is logged in using session or token authentication
    // Return true if authenticated, false otherwise
    return true; // Placeholder logic, replace with actual authentication logic
}

function checkProAuthentication(req) {
    // Placeholder function for professional user authentication logic
    // For example, check if the professional user is logged in using session or token authentication
    // Return true if authenticated, false otherwise
    return true; // Placeholder logic, replace with actual authentication logic
}

const signup = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const contractor = document.querySelector('#contractor-signup').value.trim();
    console.log("HEEEEYYY",contractor)
    if (name && email && password) {
        const response = await fetch('/api/users/', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, contractor }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // condition for redirecting depending on if contractor === true
            document.location.replace('/'); /// set up redirect once dashboard or profile page is created
        } else {
            alert('Failed to sign up');
        }
    }
};
document.querySelector('.signup-form').addEventListener('submit', signup);

module.exports = {
    loginAsUser,
    loginAsPro
};
