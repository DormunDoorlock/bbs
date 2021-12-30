const dynamoose = require('dynamoose')
//const {REGION} = process.env
dynamoose.AWS.config.update({
    region: process.env.REGION,
})

module.exports = dynamoose