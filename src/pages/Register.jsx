import React from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {  
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const formRef = useRef();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    function validate() {
        if (usernameRef.current.value.length < 3) {
            alert("Username is not valid!");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = 'red';
            return false;
        }

        if (!validateEmail(emailRef.current.value)) {
            alert("Email is not valid!");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = 'red';
            return false;
        }

        return true;
    }

    function handleRegister(e) {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) {
            return;
        }

        const user = {
            "username": usernameRef.current.value,
            "email": emailRef.current.value,
            "password": passwordRef.current.value
        };

        axios.post("https://auth-rg69.onrender.com/api/auth/signup", user)
            .then(({ data }) => {
                if(data.message === "User registered successfully!") {
                    navigate('/login');
                } else if(data.message === "Failed! Username is already in use!" || data.message === "Failed! Email is already in use!") {
                    alert(data.message);
                    formRef.current.reset();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form ref={formRef} className="w-full max-w-lg bg-white p-8 rounded-xl shadow-xl flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registratsiya qilish</h2>
                <input ref={usernameRef} className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400" type="text" placeholder="Ismingizni kiriting" autoComplete="current-username" />
                <input ref={emailRef}  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400"type="email" placeholder="Emailingizni kiriting" autoComplete="current-email" />
                <input ref={passwordRef}  className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-indigo-500 transition-all duration-200 placeholder-gray-400" type="password" placeholder="Parolingizni kiriting" autoComplete="current-password"/>
                <button onClick={handleRegister} className="bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition-all duration-200 w-full font-semibold">REGISTER</button>

                <Link to="/login" className="text-indigo-600 text-center mt-4 hover:underline transition-all duration-200">Loginga o'tish</Link>
            </form>
        </div>
    );
}