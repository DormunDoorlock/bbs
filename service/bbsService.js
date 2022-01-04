'use strict';
const {dao} = require('../dao')
const { v4: uuidv4 } = require('uuid')
const create = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = JSON.parse(event.body)
            const {regUser,subject,content} = body
            const result = await dao.save({
                type: 'Notice',
                id: uuidv4(),
                regUser,
                createdAt: new Date(),
                subject,
                content
            })
            resolve(result) 
        } catch (error) {
            reject(error)
        }
    })
}

const update = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = JSON.parse(event.body)
            const {id,regUser,subject,content} = body
            let result 
            result = await dao.update({
                type: 'Notice',
                id,
                regUser,
                subject,
                content
            })
            resolve(result)    
        } catch (error) {
            reject(error)   
        }
    })
}

const remove = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            const body = JSON.parse(event.body)
            const {id} = body
            let result 
            result = await dao.del({
                type: 'Notice',
                id
            })
            resolve(result)
        } catch (error) {
            reject(error)   
        }
    })
}

const find = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            const query = event.queryStringParameters || {}
            const {id,regUser,subject,createdAt,content} = query
            console.log(id)
            let result 
            if(regUser){
                result = await dao.find({
                    type: 'Notice',
                    regUser
                }) 
            }else if(subject){
                result = await dao.find({
                    type: 'Notice',
                    subject
                }) 
            }else if(createdAt){
                result = await dao.findCreatedAt({
                    type: 'Notice',
                    createdAt
                }) 
            }else if(id){
                result = await dao.find({
                    type: 'Notice',
                    id
                })
            }else if(content){
                result = await dao.find({
                    type: 'Notice',
                    content
                })
            }else{
                result = await dao.scan({
                    type: 'Notice'
                }) 
            }
            resolve(result)  
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    create, 
    update,
    remove,
    find
}