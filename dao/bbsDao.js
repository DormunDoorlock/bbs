'use strict'
const {Bbs} = require('../schema')


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
            const query = Bbs.scan().exec()
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
    scan
}