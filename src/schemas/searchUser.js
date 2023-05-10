const joi = require('joi')

const schema = joi.object().keys({
    email: joi.string().email().required().options({ convert: false })
})

module.exports = schema