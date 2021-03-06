
# redux-effects-aws

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

AWS SDK effect driver.

## Installation

    $ npm install redux-effects-aws

## Why

Makes it easy to write testable server side code that interacts with AWS services
without mocking or running development services.

## Usage

```js
import awsMiddleware, {aws} from 'redux-effects-aws'
import flow, {flo} from 'redux-flo'
import bind from '@f/bind-middleware'

const io = bind([
  flow()
  awsMiddleware()
])

// run update
io(flo(testableUpdate))

// Action creator that updates an s3 object.
function * testableUpdate () {
  // get object
  let data = yield aws('S3', 'getObject', {
    Bucket: 'test-bucket.weo.io',
    Key: 'test.json'
  })
  let obj = JSON.parse(data.BODY.toString())

  // update
  obj.foo = 'qux'

  // put object
  yield aws('S3', 'putObject', {
    Bucket: 'test-bucket.we.io',
    Key: 'test.json',
    Body: JSON.stringify(obj)
  })
}
```

## API

### awsMiddleware (config)
Effect driver.

- `config` - global aws config (e.g. region, output...)

**Returns:** redux effects middleware

### aws (service, method, params)
Action creator.

  - `service` - The service to use. Optionally can be an object with the signature,
                {service, options}, if you need to specify service options.
  - `method` - Method to call on service.
  - `params` - Params to use for call.


## License

MIT

[travis-image]: https://img.shields.io/travis/redux-effects/redux-effects-aws.svg?style=flat-square
[travis-url]: https://travis-ci.org/redux-effects/redux-effects-aws
[git-image]: https://img.shields.io/github/tag/redux-effects/redux-effects-aws.svg
[git-url]: https://github.com/redux-effects/redux-effects-aws
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/redux-effects-aws.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-effects-aws
