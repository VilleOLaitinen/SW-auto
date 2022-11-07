import React, { useState } from "react";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = () => {
        email.preventDefault();
        console.log(email);

    }
    return (
    <div classname="auth-form-container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">email</label>
            <input value={email} type="email" placeholder="youremail@gmail.com" />
            <label htmlFor="password">password</label>
            <input value={pass}type="password" placeholder="**********" id="password" name="password" />
            <button type="submit">Log In</button>
    
        </form>
        <button onClick={() => props.onFormSwitch('register')}>Don't have and account? Register here.</button>
    </div>    
    )
        
    
};

export default Login