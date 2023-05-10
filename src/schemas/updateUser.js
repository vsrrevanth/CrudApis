const joi = require("joi")

const schema = joi.object().keys({
    firstname: joi.string().min(3).max(30),
    lastname: joi.string().min(3).max(30),
    email: joi.string().email(),
    address: joi.string().min(3).max(30),
    phonenumber: joi.number().integer().min(10).options({ convert: false })
})

module.exports = schema