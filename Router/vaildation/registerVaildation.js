const validator = require('validator')

const validateRegisterInput = (data) => {
    let errors = {}

    if (!validator.isLength(data.userName, {
            min: 2,
            max: 30
        })) {
        errors.userName = 'Username should be between 2 and 30 characters'
    }
    if (validator.isEmpty(data.userName)) {
        errors.userName = 'Username is required'
    }
    if (validator.isEmpty(data.Password)) {
        errors.Password = 'Password is required'
    }
    if (!validator.isLength(data.Password, {
            min: 6,
            max: 30
        })) {
        errors.Password = 'Password should be at least 6 characters'
    }
    if(errors === {}){
        return true;
    }
    else{
        return errors
    }
}

module.exports = validateRegisterInput