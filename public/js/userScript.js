
const API_LINK = 'http://localhost:3000/api/users';

const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { name, phone, email, location } = event.target;

    const newUser = {

        name: name.value,
        phone: phone.value,
        email: email.value,
        location: location.value

    }
    try {

        const result = await axios.post('http://localhost:3000/api/users/add', newUser);
        event.target.reset();
        const savedUser = result.data.newUser || result.data;
        displayUser(savedUser);

    } catch (error) {

        console.log('error While Registring User...');
    }

    console.log('User Form Triggered...!');
};

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const list = await axios.get(API_LINK);
        list.data.forEach(element => {
            displayUser(element);
            console.log(element);
        });
    } catch (error) {
        console.log(error)
    }
})

const displayUser = (newUser) => {
    const ul = document.getElementById('userList');
    const content = `   <span>${newUser.name}</span>
                        <span>${newUser.phone}</span>
                        <span>${newUser.email}</span>
                        <span>${newUser.location}</span>`;

    const li = newElement('li', 'list-item', null, content);

    const deletButton = newElement('button', 'list-btn', null, "Delete", () => {
        deleteList(newUser, li);
    });

    li.appendChild(deletButton);

    const editButton = newElement('button', 'list-btn', null, "Edit", () => {
        editList(newUser, li);
    });
    li.appendChild(editButton);

    ul.appendChild(li);
};


const newElement = (tagName, className, id = null, content, onclick) => {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    if (id) el.id = id;
    if (content !== undefined && content !== null) el.innerHTML = content;
    if (onclick && typeof onclick === 'function') el.addEventListener('click', onclick);
    return el;
}


async function deleteList(user, li) {
    try {
        await axios.delete(API_LINK + `/${user.id}`);
        li.remove();
    } catch (error) {
        console.log(error);
    }
}

async function editList(user, li) {
    document.getElementById('name').value = user.name;
    document.getElementById('phone').value = user.phone;
    document.getElementById('email').value = user.email;
    document.getElementById('location').value = user.location;

    await deleteList(user, li);
}

