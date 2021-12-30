'use strict'
const dynamoose = require('../config/dynamoose')
const Schema = dynamoose.Schema
const {BBS_TABLE,BBS_TYPE_GSI,BBS_REGUSER_GSI,BBS_CREATEDAT_GSI} = process.env
const schema = new Schema({
    type: {
        type: String,
        hashKey: true,
        index:{
            global: true,
            rangeKey: 'createdAt',
            name: BBS_TYPE_GSI,
            project: true
        }
    },
    id: {
        type: String,
        rangeKey: true
    },
    regUser: {
        type: String,
        index:[
            {
                global: true,
                rangeKey: 'id',
                name: BBS_REGUSER_GSI,
                project: true
            },
            {
                global: true,
                rangeKey: 'createdAt',
                name: BBS_CREATEDAT_GSI,
                project: true
            }
        ]
    },
    createdAt: {
        type: Date,
    },
    subject: {
        type: String,
    },
    content: {
        type: String,
    }
},
{
    saveUnknown: true
})

const Bbs = dynamoose.model(BBS_TABLE, schema, { create: false, update: true })

module.exports = Bbs