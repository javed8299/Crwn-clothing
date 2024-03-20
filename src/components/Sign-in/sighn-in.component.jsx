import React, { useState } from "react";

import "./sign-in.style.scss";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
    signWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase.utils";

const defaultFormFields = {
    email: "",
    password: "",
};
const SignInForm = () => {
    const [formsFields, setFormsFields] = useState(defaultFormFields);
    const { email, password } = formsFields;


    const resetFormFields = () => {
        setFormsFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        await signWithGooglePopup();

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields();
        } catch (error) {
            if(error.code === "auth/invalid-credential") {
                alert('incorrect email or password')
            }
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormsFields({ ...formsFields, [name]: value });
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form action="" onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button buttonType="google" onClick={signInWithGoogle} type="button">
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
