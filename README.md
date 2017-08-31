#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-url]][daviddm-image]

> Promise based XHR client with JSON as default.

## Installation

```sh
npm install --save-dev jhr
```

## Usage

This module attempts to treat AJAX/XHR requests as a function of http.
Responses are typed for common http statuses (see the Response submodule) 
un-supported ones have the type Response.Untyped.


```typescript

import * as Agent from 'jhr';

let agent = new jhr.Agent();

agent.get('http://example.com').
then((r:jhr.Response)=> {

  if(r instanceof jhr.Response.Ok)
     //it's ok
  else if(r instanceof jhr.Response.Conflict)
    //it's a conflict
  else if(r instanceof jhr.Response.InternalServerError)
    //it's serious
  else
    //it's a regular jhr.Response.Untyped

}).
catch(e=>{

  //TransportError

});

```

## License

Apache-2.0 © [Lasana Murray](http://trinistorm.org)


[npm-url]: https://npmjs.org/package/jhr
[npm-image]: https://badge.fury.io/js/jhr.svg
[daviddm-url]: https://david-dm.org/metasansana/jhr.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/metasansana/jhr
