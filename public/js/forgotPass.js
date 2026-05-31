const handleLogin = async (event) => {
    event.preventDefault();

    const { email } = event.target;

    const EmailId = {
        email: email.value
    }


    try {
        const response = await axios.post('http://localhost:3000/called/password/forgotpassword', EmailId);
        console.log(response.data.message);
        event.target.reset();
    } catch (error) {
        console.log("form can not be send to backedn: " + error.message);
    }

}