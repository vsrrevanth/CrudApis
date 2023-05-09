const joi = require('joi')

const schema = joi.object().keys({
    email: joi.string().required().min(3).options({ convert: false })
})

module.exports = schema