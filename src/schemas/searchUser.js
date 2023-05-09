const joi = require('joi')

const schema = joi.object().keys({
    firstname: joi.string().required().min(3).options({ convert: false })
})

module.exports = schema