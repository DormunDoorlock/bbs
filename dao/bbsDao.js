'use strict'
const {Bbs} = require('../schema')
const {BBS_TYPE_GSI,BBS_CREATEDAT_GSI} = process.env

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
            const {type,id,
                subject,regUser,content
            } = params
            const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI)
            if(id){
                query.filter('id').eq(id)
            }
            if(subject){
                query.filter('subject').contains(subject)
            }
            if(content){
                query.filter('content').contains(content)
            }
            if(regUser){
                query.filter('regUser').contains(regUser)
            }
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

const findCreatedAt = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            const {type,createdAt}=params
            const query = Bbs.query('type').eq(type).filter('createdAt').contains(createdAt)
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
            const {type,id,
                subject,regUser,content
            } = params
            let put ={}
            if(subject){
                put.subject=subject
            }
            if(regUser){
                put.regUser=regUser
            }
            if(content){
                put.content=content
            }
            if(Object.keys(put).length >0){
                Bbs.update({type,id},{ $PUT:put })
                .then((result) => {
                    resolve(result)
                }).catch((err) => {
                    reject(err)
                })
            } else{
            resolve()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const del = async params => {
    return new Promise(async (resolve,reject)=>{
        try {
            Bbs.delete(params)
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
/*
const pagination = async params => {
    return new Promise(async (resolve, reject)=> {
        try {
            const {type,page} = params
            const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI).descending()
            const response = query.limit((page-1)*5).exec()
            console.log(response)
            query.startAt(response.lastKey).limit(5).exec()
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
*/
const pagination = async params => {
    return new Promise(async (resolve, reject)=> {
        try {
            const {type, limit = 10, createdAt, id} = params
            // startskey 설정
            //let startsKey = lastKey? JSON.parse(lastKey):undefined
            let startsKey={
                "id": {
                    "S": id
                },
                "createdAt": {
                    "N": createdAt
                },
                "type": {
                    "S": "Notice"
                }
            }
            const exec = () => {
                const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI).descending()
                if (startsKey) {
                    query.startAt(startsKey)
                }
                query.limit(limit).exec()
                .then((result)=>{
                    const results= result
                    if(result.lastKey){
                        resolve({result: results, lastKey: results.lastKey})
                    }
                    else{
                        resolve({result: results})
                    }
                }).catch((err) => {
                    reject(err)
                })
            }
            exec()
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
    findCreatedAt,
    pagination
}