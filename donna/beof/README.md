# beof

Simply library for type checking with ES2015+.

Provides methods for all the primitives, as well as an `instance` and `interface` 
method. Uses the new object literal shorthand to declare target and name to use 
for error messages. If any of the type checks fail, an error will be thrown.

## Installation

```sh
npm install --save beof
```

##Usage

```javascript

import beof from 'beof';

class CallableInterface {

  call(x, y) {

  }

}

class AbstractCallable {

  doSomething() {

  }

  call(x, y) {

   this.doSomething();

  }
  
}

class Main {

  static run(str, callable1, callable2) {

   beof({str}).string();
   beof({callable1}).interface(Callable);
   beof({callable2}).instance(AbstractCallable);

  }

}

Main.run(1, new AbstractCallable(), new AbstractCallable()); //throws TypeError, first argument is wrong.
Main.run('string', {}, new AbstractCallable()); // throws TypeError, second args does not satisfy interface.
Main.run('string', new CallableInterface(), []); // throws TypeError, third argument is not an AbstractCallable

```

## Why go through all this trouble?

Applying some object oriented techniques 
can be a pain to keep track of without type signatures.

This library gives you a chance to avoid annoying "'x' is not a function"
errors before they get buried deep within your code path (especially when
building libraries!).

## License

Apache-2.0 © Quenk Technologies

