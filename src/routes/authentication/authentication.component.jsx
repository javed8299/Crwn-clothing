

import SignUpForm from '../../components/sign-up/sighn-up.component';
import SignInForm from '../../components/Sign-in/sighn-in.component';
import './authentication.style.scss';
const Authentication = () => {

    return (
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;
