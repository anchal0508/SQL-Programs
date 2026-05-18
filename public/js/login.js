const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Submitted...');
    const { email, pass } = event.target;

    const newUser = {

        email: email.value,
        pass: pass.value
    };

    try {
        const addUser = await axios.post('http://localhost:3000/users/login', newUser);
        console.log(addUser.data);
        document.getElementById('disp').textContent = addUser.data.message;
        // alert('Login Successfull')
        event.target.reset();
    } catch (error) {
        console.log("---------"+error.message);
        document.getElementById('disp').textContent = error.message
    }
}