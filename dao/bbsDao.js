'use strict'
const {Bbs} = require('../schema')
const {BBS_TYPE_GSI,BBS_REGUSER_GSI,BBS_CREATEDAT_GSI} = process.env

const save = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const bbs = new Bbs(params)
            bbs.save()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const scan = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const {type}=params
            const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI).descending()
            query.all().exec()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const find = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const query = Bbs.get(params)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const findName = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const {regUser}=params
            const query = Bbs.query('regUser').eq(regUser).using(BBS_CREATEDAT_GSI).descending()
            query.all().exec()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const update = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const query =Bbs.update(params)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

const del = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const query = Bbs.delete(params)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    save,
    scan,
    del,
    update,
    find,
    findName
}