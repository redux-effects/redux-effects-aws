/**
 * Imports
 */

import test from 'tape'
import awsMiddleware, {aws} from '../src'
import bind from '@f/bind-middleware'

let io = bind(awsMiddleware())

/**
 * Tests
 */

test('should excute s3 get object request', t => {
  io(aws('S3', 'getObject', {
    Bucket: 'test-bucket.weo.io',
    Key: 'test.json'
  })).then(function(data) {
    t.deepEqual(JSON.parse(data.Body.toString()), {
      foo: 'bar'
    })
    t.end()
  })
})
