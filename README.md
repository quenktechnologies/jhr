
> Promise based HTTP agent designed with message passing in mind.

## Installation

```sh
npm install --save-dev @quenk/jhr
```

## Usage

```typescript

import * as response from '@quenk/jhr/lib/response';
import {createAgent} from '@quenk/jhr/lib/browser';

let agent = createAgent();

agent
.get('http://example.com').
then(r => {

  if(r instanceof response.Ok)
     //it's ok
  else if(r instanceof response.Conflict)
    //it's a conflict
  else if(r instanceof response.InternalServerError)
    //it's serious
  else
    //it's a regular response.UntypedResponse

}).
catch(e=>{

 //Transport error occured.

});

```

## License

Apache-2.0 © Quenk Technologies Limited
