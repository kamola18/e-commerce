import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const resetformfields = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName })
            resetformfields();
        } catch (error) {
            if (error.code = 'auth/email-already-in-use') {
                alert('cannot create a user email already in use')
            }
            else {
                console.log('user creation encountered an error', error);
            }
        }
    };

    const handlechange = (event) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display name"
                    type="text"
                    required
                    onChange={handlechange}
                    name="displayName"
                    value={displayName} />
                <FormInput 
                    label="Email"
                    type="email" required
                    onChange={handlechange}
                    name="email"
                    value={email} />
                <FormInput
                    label= "Password"
                    type="password" required
                    onChange={handlechange}
                    name="password"
                    value={password} />

                <FormInput 
                    label = 'Confirm Password' type="password" required
                    onChange={handlechange}
                    name="confirmPassword"
                    value={confirmPassword} />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;