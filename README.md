#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Promise based XHR api that reminds you of Angular's $http service.


## Install

```sh
$ npm install --save-dev jhr
```


## Usage

```js
import jhr from 'jhr';

var agent = jhr.createAgent();

agent.get('/happy-place').
then(res) {

  console.log(res.data);

});

```

## License

Apache 2 © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/jhr
[npm-image]: https://badge.fury.io/js/jhr.svg
[travis-url]: https://travis-ci.org/metasansana/jhr
[travis-image]: https://travis-ci.org/metasansana/jhr.svg?branch=master
[daviddm-url]: https://david-dm.org/metasansana/jhr.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/jhr
