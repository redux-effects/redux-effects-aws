/**
 * Imports
 */

import AWS from 'aws-sdk'
import toPromise from '@f/thunk-to-promise'
import readRegion from '@yaws/read-region'
import isObject from '@f/is-object'

/**
 * Action
 */

const AWS_ACTION = 'AWS'

/**
 * redux-effects-aws
 */

function awsMiddleware (config) {
  config && AWS.config.update(config)

  if (!AWS.config.region) {
    AWS.config.update(readRegion())
  }

  return ctx => next => action => {
    if (action.type !== AWS_ACTION) return next(action)

    let {service, options, method, params} = action.payload

    let serviceI = new (AWS[service])(options)
    return toPromise(serviceI[method].bind(serviceI, params))
  }
}

/**
 * Action creator
 */

function aws (serviceAndOpts, method, params) {
  let {service, options} = isObject(serviceAndOpts)
    ? serviceAndOpts 
    : {service: serviceAndOpts}

  return {type: AWS_ACTION, payload: {service, options, method, params}}
}

/**
 * Exports
 */

export default awsMiddleware
export {aws}
