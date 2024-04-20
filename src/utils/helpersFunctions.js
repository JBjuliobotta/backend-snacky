const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function ValidateEmail(prospectEmail){
    return regexEmail.test(prospectEmail);
};

function ValidatePassword(prospectPassword){
    return regexPassword.test(prospectPassword);
};

function validateTitle(title){
    if(title.length>=4 && title.length<=200){
        return true
    } else {
        return false
    }
}

function validateDescription(str){
    if(str.length>=10 && str.length<=200){
        return true
    } else {
        return false
    }
}

function validateCategory(str){
    if(str!==undefined){
        return true
    } else {
        return false
    }
}

function validateStock(str){
    if(str!==undefined){
        return true
    } else {
        return false
    }
}

function validatePrice(str){
    if(str!==undefined){
        return true
    } else {
        return false
    }
}

function validateIMG(str){
    if(str!==undefined){
        return true
    } else {
        return false
    }
}

function validateName(str){
    if(str!==undefined){
        return true
    } else {
        return false
    }
}

module.exports={ValidateEmail, ValidatePassword, validateTitle, validateDescription, validateCategory, validateName, validateIMG, validateStock, validatePrice};