# JHR

## Introduction

This is library for making XHR/HTTP requests from web applications and Node.js
It's APIs are designed around the [Quenk Noni][2] library.

## Installation

```sh
npm install --save @quenk/jhr

```

## Usage

```ts
import {doFuture} from '@quenk/noni/lib/control/monad/future';
import {createAgent} from '@quenk/jhr/lib/browser';

let agent = createAgent();

doFuture(function *() {

  let res1 = yield agent.get('/');
  let res2 = yield agent.post('/', {name:'User', token: res1.body.token});

  if(res2.status === 200)
    return pure(undefined);
  else
    return raise(new Error('Request failed!'));

}).fork(console.error, ()=>{});

```
See the [API documentation][2] for more information.

## License

This module contains parts licensed under the BSD 3 clause license as well as
the Apache-2.0 license. Please see the LICENSE file for more details.

© Quenk Technologies Limited and respective authors.

[1]: https://github.com/quenktechnologies
[2]: https://quenktechnologies.github.io/jhr
