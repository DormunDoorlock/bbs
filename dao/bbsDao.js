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
                subject,regUser,content,order
            } = params
            const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI)
            if(order=="ascending"){
                query.ascending()
            }else{
                query.descending()
            }
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

const pagination = async params => {
    return new Promise(async (resolve, reject)=> {
        try {
            const {type, limit = 10, lastKey, order} = params
            let startsKey = lastKey? JSON.parse(base64decode(lastKey)):undefined
            const exec = () => {
                const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI)
                if (startsKey) {
                    query.startAt(startsKey)
                }
                if(order=="ascending"){
                    query.ascending()
                }else{
                    query.descending()
                }
                query.limit(limit).exec()
                .then((result)=>{
                    const results= result
                    if(result.lastKey){
                        resolve({result: results, lastKey: base64encode(JSON.stringify(results.lastKey))})
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

const paginationByRegUser = async params => {
    return new Promise(async (resolve, reject)=> {
        try {
            const {type, limit = 5, lastKey, regUser, order} = params
            console.log(params)
            let r =[]
            let startsKey = lastKey? JSON.parse(base64decode(lastKey)):undefined
            let queryLimit = limit*2
            const exec = () => {
                const query = Bbs.query('type').eq(type).using(BBS_TYPE_GSI)
                if (startsKey) {
                    query.startAt(startsKey)
                }
                query.filter('regUser').contains(regUser)
                if(order=="ascending"){
                    query.ascending()
                }else{
                    query.descending()
                }
                query.limit(queryLimit).exec()
                .then((result)=>{
                    startsKey=result.lastKey
                    r.push(...result)
                    console.log(result)
                    if(r.length<=limit){
                        if(startsKey){
                            exec()
                        }else{
                            resolve({result: r })
                        }
                    }else{
                        const lastItem = r[limit-1]
                        const lk = base64encode(JSON.stringify({
                            id: { S: lastItem.id},
                            type: { S: lastItem.type},
                            createdAt: { N: lastItem.createdAt.getTime().toString()}
                        }))
                        resolve({ result: r.slice(0,limit), lastKey: lk})
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

const base64encode = plaintext => {
    return Buffer.from(plaintext, 'utf8').toString('base64')
}

const base64decode = base64text => {
    return Buffer.from(base64text, 'base64').toString('utf8')
}

module.exports = {
    save,
    scan,
    del,
    update,
    find,
    pagination,
    paginationByRegUser
}