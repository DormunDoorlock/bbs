'use strict';
const {service} = require('./service')

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
      body: JSON.stringify(result)
    }
    return res
  } catch (error) {
    console.log(error)
    const err = {
      statusCode: 400,
      body: JSON.stringify(error)
    }
    return err
  } 
};
