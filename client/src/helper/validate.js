import toast from 'react-hot-toast'
import { authenticate } from './helper'

/** validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify({}, values);

    if(values.username){
        // check user exist or not
        const { status } = await authenticate(values.username);
        
        if(status !== 200){
            errors.exist = toast.error('User does not exist...!')
        }
    }

    return errors;
}

/** validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors;
}

/** validate reset password */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!");
    }

    return errors;
}

// /** validate register form */
// export async function registerValidation(values){
//     const errors = usernameVerify({}, values);
//     passwordVerify(errors, values);
//     emailVerify(errors, values);

//     return errors;
// }

/** validate register form */
export async function registerValidation(values){
    const errors = {};
    usernameVerify(errors, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    meterVerify(errors, values); // Ensure meter validation is called
    return errors;
}


/** validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}


/** ************************************************* */

/** validate password */
function passwordVerify(errors = {}, values){
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password){
        errors.password = toast.error("Password Required...!");
    } else if(values.password.includes(" ")){
        errors.password = toast.error("Wrong Password...!");
    }else if(values.password.length < 4){
        errors.password = toast.error("Password must be more than 4 characters long");
    }else if(!specialChars.test(values.password)){
        errors.password = toast.error("Password must have special character");
    }

    return errors;
}


/** validate username */
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }

    return error;
}


/** validate meter */
function meterVerify(errors = {}, values) {
    if (!values.meter) {
        errors.meter = toast.error('Meter Required...!');
    } else if (values.meter.includes(" ")) {
        errors.meter = toast.error('Invalid Meter...!');
    }
    return errors;
}


/** validate email */
function emailVerify(errors = {}, values){
    if(!values.email){
        errors.email = toast.error("Email Required...!");
    } else if(values.email.includes(" ")){
        errors.email = toast.error("Wrong Email...!");
    } else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)){
        errors.email = toast.error("Invalid email address...!");
    }

    return errors;
}


