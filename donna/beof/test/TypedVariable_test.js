import must from 'must';
import TypedVariable from '../src/TypedVariable';

var pass;
var fail;

class Cons {
    action() {

    }
}

const tests = {

    boolean: [{
        bool: true
    }, {
        bool: 'string'
    }],
    number: [{
        num: 1
    }, {
        number: false
    }],
    string: [{
        str: 'value'
    }, {
        str: 23
    }],
    primitive: [{ primitive: true }, { primitive: new Date() }],
    array: [{
        'ray': [1.3]
    }, {}],
    function: [{
        'func': function() {}
    }, {
        func: []
    }],
    object: [{
        'o': {
            x: 1,
            y: 2
        }
    }, {
        o: []
    }],
    date: [{
        'date': new Date()
    }, {
        date: /^\w/
    }],
    regexp: [{
        'regex': new RegExp('\w')
    }, {
        regex: String(24)
    }],
    instance: [{
        'klass': new Cons()
    }, {
        klass: new Date()
    }, Cons],
    interface: [{
        'iface': new Cons()
    }, {
        iface: function X() {}
    }, Cons],
    required: [{ val: 32 }, { val: null }]

};

describe('TypedVariable', function() {

    beforeEach(function() {

        pass = null;
        fail = null;

    });

    Object.keys(tests).forEach(k => {

        var test = tests[k];

        if (test.length === 3) {

            it(`#${k}`, function() {

                pass = new TypedVariable(test[0]);
                fail = new TypedVariable(test[1]);

                must(pass[k](test[2])).be(pass);

                must(function() {
                    fail[k](test[2]);
                }).throw(TypeError);

            });

        } else {

            it(`#${k}`, function() {

                pass = new TypedVariable(test[0]);
                fail = new TypedVariable(test[1]);

                must(pass[k]()).be(pass);
                must(function() {
                    fail[k]();
                }).throw(TypeError);
            });
        }

    });

});
