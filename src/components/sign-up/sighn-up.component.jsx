import React, { useState } from 'react';

import './sign-up.style.scss';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () => {

    const [formsFields, setFormsFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formsFields;


    const resetFormFields = () => {
        setFormsFields(defaultFormFields)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(user, { displayName, password });
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation error.', error);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormsFields({...formsFields, [name]: value })
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text"
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                />
                <FormInput
                    label='Email'
                    type="email"
                    required
                    onChange={handleChange}
                    name='email'
                    value={email}
                />
                <FormInput
                    label='Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name='password'
                    value={password}
                />
                <FormInput
                    label='Confirm Password'
                    type="password"
                    required
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
