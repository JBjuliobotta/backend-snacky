const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function ValidateEmail(prospectEmail){
    return regexEmail.test(prospectEmail);
};

function ValidatePassword(prospectPassword){
    return regexPassword.test(prospectPassword);
};

module.exports={ValidateEmail, ValidatePassword}