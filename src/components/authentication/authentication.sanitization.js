import validator from 'validator';

export const signupSanitization = (email, username, password, password2) => {

    const sanitizedEmail = email ? validator.normalizeEmail(email) : '';
    const sanitizedUsername = username ? username.toLowerCase() : '';
    const sanitizedPassword = password ? password : '';
    const sanitizedPassword2 = password2 ? password2 : '';

    return { 
        email: sanitizedEmail, 
        username: sanitizedUsername, 
        password: sanitizedPassword, 
        password2: sanitizedPassword2
    };
}

export const loginSanitization = (email, password) => {

    const sanitizedEmail = email ? validator.normalizeEmail(email) : '';
    const sanitizedPassword = password ? password : '';

    return { 
        email: sanitizedEmail, 
        password: sanitizedPassword, 
    };
}