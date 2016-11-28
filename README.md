#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Promise based XHR client with JSON as default.

## Installation

```sh
npm install --save-dev jhr
```

## Usage

```javascript

import * as Agent from 'jhr';

var agent = new Agent();

agent.get('http://example.com').
then(res=>{


}).
catch(Agent.HTTPError.InternalServerError, e=>{


});

```

## License

Apache-2.0 © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/jhr
[npm-image]: https://badge.fury.io/js/jhr.svg
[daviddm-url]: https://david-dm.org/metasansana/jhr.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/jhr
