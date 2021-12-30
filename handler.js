'use strict';
const {service} = require('./service/index')

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
        if(resource==='/all'){
          result = await service.findAll(event)
        }else{
          result = await service.find(event)
        }
        break
    }
    const res = {
      statusCode : 200,
      body: JSON.stringify(result)
    }
  } catch (error) {
    const err = {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  } 
};
