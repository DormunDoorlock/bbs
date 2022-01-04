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
            const {id} = event.pathParameters
            let result 
            result = await dao.find({
                type: 'Notice',
                id
            })
            resolve(result)  
        } catch (error) {
            reject(error)
        }
    })
}

const findAll = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            let result 
            result = await dao.scan({
                type: 'Notice'
            })
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

const findName = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            const {name} = event.pathParameters
            let result 
            result = await dao.findName({
                regUser: name,
            })
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
    find,
    findAll,
    findName 
}