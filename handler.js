'use strict';
const {service} = require('./service')
let headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true
}
module.exports.bbs = async (event) => {
  try {
    const { resource, httpMethod } = event
    let result
    switch (httpMethod) {
      case 'POST':
        result = await service.create(event)
        break
      case 'PUT':
        result = await service.update(event)
        break
      case 'DELETE':
        result = await service.remove(event)
        break
      default:
        result = await service.find(event)
        break
    }
    const res = {
      statusCode : 200,
      headers,
      body: JSON.stringify(result)
    }
    return res
  } catch (error) {
    const err = {
      statusCode: 400,
      body: JSON.stringify(error)
    }
    return err
  } 
};
