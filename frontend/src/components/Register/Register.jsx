import React, { useState } from "react";

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [num, setNum] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">First name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="first Name" />
            <label htmlFor="name">Last name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="Last Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            
            <label htmlFor="number">Phone number</label>
            <input value={num} onChange={(e) => setNum(e.target.value)} type="number" placeholder="********" id="number" name="number" />
            <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}
export default Register;