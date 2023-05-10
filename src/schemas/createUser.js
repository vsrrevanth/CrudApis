const joi = require("joi")

const schema = joi.object().keys({
    firstname: joi.string().min(3).max(30).required(),
    lastname: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    address: joi.string().min(3).max(30).required(),
    phonenumber: joi.number().integer().required().min(10).options({ convert: false })
})

module.exports = schema