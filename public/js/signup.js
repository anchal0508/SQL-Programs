const handleFormSubmit = async (event) => {
    event.preventDefault();
console.log('Form Submitted...');
    const { name, email, pass } = event.target;

    const newUser = {
        name: name.value,
        email: email.value,
        pass: pass.value
    };

    try {
        const addUser = await axios.post('http://localhost:3000/users/signup', newUser);
        console.log(addUser.data);
        alert('Successfull')
        event.target.reset();
    } catch (error) {
        console.log(error.message);
    }
}