export const regex = {
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    phone: /\d{10}/
}

export const message = {
    password: 'Password should contain atleast 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and a minimum length of 8',
    email: 'Email is not valid',
    phone: 'Phone number should be 10-digit long'
}