const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('Registration...');

    const { name, email, pass } = event.target;
    const newUser = {
        name: name.value,
        email: email.value,
        pass: pass.value
    };
    try {
        const response = await axios.post('http://localhost:3000/users/add', newUser);
        console.log(response.data.message);
        event.target.reset();
    } catch (error) {
        console.log("form can not be send to backedn: " + error.message);
    }
}


const handleLogin = async (event) => {
    event.preventDefault();
    console.log('Login for submit...');
    const { email, pass } = event.target;
    const user = {
        email: email.value,
        pass: pass.value
    }
    try {
        const response = await axios.post('http://localhost:3000/users/login', user);
        console.log(response.data.message);
        if (response.status === 200 && response.data.success) {
            alert('Login Successful!');
            event.target.reset();
            localStorage.setItem('token', response.data.token);
            window.location.href = '/expenses';
        }
    } catch (error) {
        console.log("Login can not be send to backedn: " + error.message);
    }

}