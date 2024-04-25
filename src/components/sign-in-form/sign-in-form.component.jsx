import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss'
import Button from "../button/button.component";

const defaultFormFields = {
    email: '',
    password: '',
    };

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    console.log(formFields);


    const resetformfields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email,password);
            resetformfields();
        } catch (error) {
            if(error.code = 'auth/invalid-credential') {
                alert('incorrect password or email');
            }
            else console.log(error);
                  

                

            }
         }
    

    

    const handlechange = (event) => {
        const { name, value } = event.target;


        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
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

             <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType='google' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;