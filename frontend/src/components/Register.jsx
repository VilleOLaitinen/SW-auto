import React, { useState } from "react";
const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = () => {
        email.preventDefault();
        console.log(email);

    }
    return (
        <div className="auth-form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full name</label>
            <intout value= {name} name='name' id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" />
            <label htmlFor="password">password</label>
            <input value={pass}type="password" placeholder="**********" id="password" name="password" />
            <button type="submit">Log In</button>
    
        </form>
        <button onClick={() => props.onFormSwitch('login')}>Already have and account? Login here.</button></div>
    )
        
    
};

export default Register