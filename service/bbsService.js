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
            const {id, regUser, subject, createdAt, content, order} = query
            let result 
            if(regUser || subject || id || content){
                if(regUser){
                    result = await paginationByRegUser({...query})
                    resolve(result)
                } else{
                result = await dao.find({
                        type: 'Notice',
                        regUser,
                        subject,
                        id,
                        content,
                        order
                    }) 
                }
            } else{
                result = await pagination({...query})
            }
            resolve(result)  
        } catch (error) {
            reject(error)
        }
    })
}

const pagination = async params => {
    return new Promise(async (resolve, reject) => {
        try {
            let result
            const {lastKey,order} = params
            result = await dao.pagination({
                type: 'Notice',
                lastKey,
                order
            })
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

const paginationByRegUser = async params => {
    return new Promise(async (resolve, reject) => {
        try {
            let result
            const {regUser,order,lastKey} = params
            result = await dao.paginationByRegUser({
                type: 'Notice',
                lastKey,
                regUser,
                order
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
    find
}