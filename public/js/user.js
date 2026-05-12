async function handleFormSubmit(event) {
    event.preventDefault();
    
    const userDetails = {
        name: event.target.username.value,
        email: event.target.email.value,
        phone: event.target.phone.value
    };

    try {
        const response = await axios.post('http://localhost:3000/users/add', userDetails);
        // Naye user ko screen par dikhayein (response.data.newUserDetail aapke controller se aa raha hai)
        showUserOnScreen(response.data.newUserDetail);
        
        // Form clear karein
        event.target.reset();
    } catch (err) {
        console.log("Error saving user:", err);
    }
}

// Page load hote hi saare users database se lana
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await axios.get("http://localhost:3000/users/");
        // Check karein ki response array hai ya object
        const users = response.data.allUsers || response.data; 
        
        users.forEach((user) => {
            showUserOnScreen(user);
        });
    } catch (err) {
        console.log("Error fetching users:", err);
    }
});

// User ko screen par display karne ka function
function showUserOnScreen(user) {
    const parentNode = document.getElementById('listOfUsers'); // HTML mein <ul id="listOfUsers"> hona chahiye
    const childHTML = `<li id="${user.id}"> ${user.name} - ${user.email} - ${user.phone}
                        <button onclick="deleteUser('${user.id}')">Delete</button>
                        <button onclick="editUser('${user.id}', '${user.name}', '${user.email}', '${user.phone}')">Edit</button>
                     </li>`;

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

// Delete functionality
async function deleteUser(userId) {
    try {
        await axios.delete(`http://localhost:3000/users/delete/${userId}`);
        removeUserFromScreen(userId);
    } catch (err) {
        console.log("Error deleting user:", err);
    }
}

// UI se remove karne ke liye
function removeUserFromScreen(userId) {
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if (childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted);
    }
}

// Edit functionality (Simple logic: Populate form and delete from DB)
function editUser(userId, name, email, phone) {
    document.querySelector('input[name="username"]').value = name;
    document.querySelector('input[name="email"]').value = email;
    document.querySelector('input[name="phone"]').value = phone;

    deleteUser(userId); // Purana record delete kar rahe hain taki naya updated record add ho sake
}