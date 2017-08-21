import NullVariable from './NullVariable';

const PRIMITIVES = ['boolean', 'number', 'string'];
const NULL = [undefined, null];


/**
 * TypedVariable
 * @param {object} map
 * @implements {Variable}
 */
class TypedVariable {

    constructor(map) {

        var keys = Object.keys(map);

        this.name = keys[0];
        this.value = map[keys[0]];

    }

    _typeOf(type) {

        if (typeof this.value !== type)
            throw new TypeError(`'${this.name}' must be typeof '${type}'! Got '${typeof this.value}'!`);

        return this;

    }

    _proto(proto) {

        if (Object.prototype.toString.call(this.value) !== proto)
            throw new TypeError(`${this.name} must be typeof ${proto}! Got ${typeof this.value}!`);
        return this;

    }

    boolean() {

        return this._typeOf('boolean');

    }

    number() {

        return this._typeOf('number');

    }

    string() {

        return this._typeOf('string');

    }

    primitive() {

        if (PRIMITIVES.indexOf(typeof this.value) === -1)
            throw new TypeError(`'${this.name}' must be typeof boolean, number or string!` +
                `Got '${typeof this.value}'!`);

        return this;

    }

    array() {

        if (!Array.isArray(this.value))
            throw new TypeError(`'${this.name}' must be an array! Got '${typeof this.value}'!`);

        return this;

    }

    date() {

        return this._proto('[object Date]');

    }

    regexp() {

        return this._proto('[object RegExp]');

    }

    function() {

        return this._typeOf('function');

    }

    object(value, name) {

        //Arrays and null are not objects I don't care what yo mama say.
        if ((Array.isArray(this.value) || this.value === null))
            throw new TypeError(`${this.value} must be type of object!`);

        return this._typeOf('object');

    }

    instance(cons) {

        if (typeof cons !== 'function')
            throw new TypeError(`Invalid type '${typeof cons}' for instance of check` +
                ` on parameter '${this.name}'!`);

        if (this.value instanceof cons)
            return this;

        throw new TypeError(`Argument '${this.name}' must be instance of` +
            ` '${cons.name}' got type '${typeof this.value}'!`);

    }

    interface(Iface) {

        if (typeof Iface !== 'function')
            throw new TypeError(`Cannot use type '${typeof Iface}' as an interface!`);

        var o = new Iface();
        var proto = Object.getPrototypeOf(o);

        this.instance(Object);

        var missing = Object.getOwnPropertyNames(proto).
        filter(k => (k === 'constructor') ? false :
            (typeof this.value[k] === typeof proto[k]) ?
            false :
            true);

        if (missing.length !== 0) {

            var meths = missing.join(',');

            throw new TypeError(`Value passed for argument '${this.name}'` +
                ` (type : '${typeof this.value}') does not satisfy ` +
                `interface '${o.constructor.name}'! Missing methods: ${meths}!`);

        }

        return this;

    }

    default (value) {
        if ([undefined, null].indexOf(this.value) > -1)
            this.value = value
        return this;
    }

    optional() {

        if (NULL.indexOf(this.value) > -1)
            return new NullVariable();

        return this;

    }

    required() {

        if (NULL.indexOf(this.value) !== -1)
            throw new TypeError(`'${this.name}' is required!`);

        return this;

    }

}

export default TypedVariable
