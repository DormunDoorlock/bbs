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
            resolve()    
        } catch (error) {
            reject(error)   
        }
    })
}

const remove = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve()
        } catch (error) {
            reject(error)   
        }
    })
}

const find = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve()  
        } catch (error) {
            reject(error)
        }
    })
}

const findAll = async event => {
    return new Promise(async (resolve, reject) => {
        try {
            let result 
            result = await dao.scan()
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
    findAll 
}