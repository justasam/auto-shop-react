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
            <div class="register is-active">
                <form action="/autoshop/api/customers" method="post">
                    <div class="form-element">
                        <span><i class="fa fa-user"></i></span><input type="text" name="name" placeholder="Name" />
                    </div>
                    <div class="form-element">
                        <span><i class="fa fa-lock"></i></span><input type="password" name="password" placeholder="Password" />
                    </div>
                    <div class="form-element">
                        <span><i class="fa fa-envelope"></i></span><input type="email" name="surname" placeholder="Surname" />
                    </div>
                    <div class="form-element">
                        <span><i class="fa fa-lock"></i></span><input type="password" name="username" placeholder="Username" />
                    </div>
                    <div class="form-element">
                        <span><i class="fas fa-envelope"></i></span><input type="text" name="email" placeholder="Email" />
                    </div>
                    <div class="form-element">
                        <span><i class="fas fa-map-marked-alt"></i></span><input type="text" name="address" placeholder="address" />
                    </div>
                    <div class="form-element">
                        <span><i class="fa fa-lock"></i></span><input type="date" name="date_of_birth" placeholder="Date of birth" />
                    </div>
                    <div class="form-element">
                        <span><i class="fas fa-mobile-alt"></i></span><input type="number" name="phone_number" placeholder="Phone number" />
                    </div>
                    <button type="submit" class="btn-register">register</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;
