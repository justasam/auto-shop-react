import React from 'react';
import './index.css';

const LoginForm = props => {
    function openRegForm() {
        // target.classList.remove('is-active');
        document.querySelector('.login').classList.remove('is-active');
        document.querySelector('.register').classList.add('is-active');
        document.querySelector('.login-toggle').classList.add('is-active');
        document.querySelector('.sign-up-toggle').classList.remove('is-active');
    }

    function openLoginForm() {
        // target.classList.remove('is-active');
        document.querySelector('.login').classList.add('is-active');
        document.querySelector('.register').classList.remove('is-active');
        document.querySelector('.login-toggle').classList.remove('is-active');
        document.querySelector('.sign-up-toggle').classList.add('is-active');
    }

    return (
        <div class="wrapper">
            <div class="login is-active">
                <div class="form-element">
                    <span><i class="fa fa-envelope"></i></span><input type="email" placeholder="Your Email Address" />
                </div>
                <div class="form-element">
                    <span><i class="fa fa-lock"></i></span><input type="password" placeholder=" Password" />
                </div>
                <button class="btn-login">login</button>
            </div>

            <div class="register">
                <div class="form-element">
                    <span><i class="fa fa-user"></i></span><input type="text" placeholder="Full Name" />
                </div>
                <div class="form-element">
                    <span><i class="fa fa-envelope"></i></span><input type="email" placeholder="Your Email Address" />
                </div>
                <div class="form-element">
                    <span><i class="fa fa-lock"></i></span><input type="password" placeholder="Password" />
                </div>
                <div class="form-element">
                    <span><i class="fa fa-lock"></i></span><input type="password" placeholder="Re-Enter Password" />
                </div>
                <button class="btn-register">register</button>
            </div>

            <div class="login-view-toggle">
                <div class="sign-up-toggle is-active" onClick={openRegForm}>Don't have an account? <a href="#">Sign Up</a></div>
                <div class="login-toggle" onClick={openLoginForm}>Already have an account? <a href="#">Login</a></div>
            </div>
        </div>
    )
}

export default LoginForm;
