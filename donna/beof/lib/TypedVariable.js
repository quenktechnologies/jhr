'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _NullVariable = require('./NullVariable');

var _NullVariable2 = _interopRequireDefault(_NullVariable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PRIMITIVES = ['boolean', 'number', 'string'];
var NULL = [undefined, null];

/**
 * TypedVariable
 * @param {object} map
 * @implements {Variable}
 */

var TypedVariable = function () {
    function TypedVariable(map) {
        _classCallCheck(this, TypedVariable);

        var keys = Object.keys(map);

        this.name = keys[0];
        this.value = map[keys[0]];
    }

    _createClass(TypedVariable, [{
        key: '_typeOf',
        value: function _typeOf(type) {

            if (_typeof(this.value) !== type) throw new TypeError('\'' + this.name + '\' must be typeof \'' + type + '\'! Got \'' + _typeof(this.value) + '\'!');

            return this;
        }
    }, {
        key: '_proto',
        value: function _proto(proto) {

            if (Object.prototype.toString.call(this.value) !== proto) throw new TypeError(this.name + ' must be typeof ' + proto + '! Got ' + _typeof(this.value) + '!');
            return this;
        }
    }, {
        key: 'boolean',
        value: function boolean() {

            return this._typeOf('boolean');
        }
    }, {
        key: 'number',
        value: function number() {

            return this._typeOf('number');
        }
    }, {
        key: 'string',
        value: function string() {

            return this._typeOf('string');
        }
    }, {
        key: 'primitive',
        value: function primitive() {

            if (PRIMITIVES.indexOf(_typeof(this.value)) === -1) throw new TypeError('\'' + this.name + '\' must be typeof boolean, number or string!' + ('Got \'' + _typeof(this.value) + '\'!'));

            return this;
        }
    }, {
        key: 'array',
        value: function array() {

            if (!Array.isArray(this.value)) throw new TypeError('\'' + this.name + '\' must be an array! Got \'' + _typeof(this.value) + '\'!');

            return this;
        }
    }, {
        key: 'date',
        value: function date() {

            return this._proto('[object Date]');
        }
    }, {
        key: 'regexp',
        value: function regexp() {

            return this._proto('[object RegExp]');
        }
    }, {
        key: 'function',
        value: function _function() {

            return this._typeOf('function');
        }
    }, {
        key: 'object',
        value: function object(value, name) {

            //Arrays and null are not objects I don't care what yo mama say.
            if (Array.isArray(this.value) || this.value === null) throw new TypeError(this.value + ' must be type of object!');

            return this._typeOf('object');
        }
    }, {
        key: 'instance',
        value: function instance(cons) {

            if (typeof cons !== 'function') throw new TypeError('Invalid type \'' + (typeof cons === 'undefined' ? 'undefined' : _typeof(cons)) + '\' for instance of check' + (' on parameter \'' + this.name + '\'!'));

            if (this.value instanceof cons) return this;

            throw new TypeError('Argument \'' + this.name + '\' must be instance of' + (' \'' + cons.name + '\' got type \'' + _typeof(this.value) + '\'!'));
        }
    }, {
        key: 'interface',
        value: function _interface(Iface) {
            var _this = this;

            if (typeof Iface !== 'function') throw new TypeError('Cannot use type \'' + (typeof Iface === 'undefined' ? 'undefined' : _typeof(Iface)) + '\' as an interface!');

            var o = new Iface();
            var proto = Object.getPrototypeOf(o);

            this.instance(Object);

            var missing = Object.getOwnPropertyNames(proto).filter(function (k) {
                return k === 'constructor' ? false : _typeof(_this.value[k]) === _typeof(proto[k]) ? false : true;
            });

            if (missing.length !== 0) {

                var meths = missing.join(',');

                throw new TypeError('Value passed for argument \'' + this.name + '\'' + (' (type : \'' + _typeof(this.value) + '\') does not satisfy ') + ('interface \'' + o.constructor.name + '\'! Missing methods: ' + meths + '!'));
            }

            return this;
        }
    }, {
        key: 'default',
        value: function _default(value) {
            if ([undefined, null].indexOf(this.value) > -1) this.value = value;
            return this;
        }
    }, {
        key: 'optional',
        value: function optional() {

            if (NULL.indexOf(this.value) > -1) return new _NullVariable2.default();

            return this;
        }
    }, {
        key: 'required',
        value: function required() {

            if (NULL.indexOf(this.value) !== -1) throw new TypeError('\'' + this.name + '\' is required!');

            return this;
        }
    }]);

    return TypedVariable;
}();

exports.default = TypedVariable;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UeXBlZFZhcmlhYmxlLmpzIl0sIm5hbWVzIjpbIlBSSU1JVElWRVMiLCJOVUxMIiwidW5kZWZpbmVkIiwiVHlwZWRWYXJpYWJsZSIsIm1hcCIsImtleXMiLCJPYmplY3QiLCJuYW1lIiwidmFsdWUiLCJ0eXBlIiwiVHlwZUVycm9yIiwicHJvdG8iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJfdHlwZU9mIiwiaW5kZXhPZiIsIkFycmF5IiwiaXNBcnJheSIsIl9wcm90byIsImNvbnMiLCJJZmFjZSIsIm8iLCJnZXRQcm90b3R5cGVPZiIsImluc3RhbmNlIiwibWlzc2luZyIsImdldE93blByb3BlcnR5TmFtZXMiLCJmaWx0ZXIiLCJrIiwibGVuZ3RoIiwibWV0aHMiLCJqb2luIiwiY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7QUFFQSxJQUFNQSxhQUFhLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsUUFBdEIsQ0FBbkI7QUFDQSxJQUFNQyxPQUFPLENBQUNDLFNBQUQsRUFBWSxJQUFaLENBQWI7O0FBR0E7Ozs7OztJQUtNQyxhO0FBRUYsMkJBQVlDLEdBQVosRUFBaUI7QUFBQTs7QUFFYixZQUFJQyxPQUFPQyxPQUFPRCxJQUFQLENBQVlELEdBQVosQ0FBWDs7QUFFQSxhQUFLRyxJQUFMLEdBQVlGLEtBQUssQ0FBTCxDQUFaO0FBQ0EsYUFBS0csS0FBTCxHQUFhSixJQUFJQyxLQUFLLENBQUwsQ0FBSixDQUFiO0FBRUg7Ozs7Z0NBRU9JLEksRUFBTTs7QUFFVixnQkFBSSxRQUFPLEtBQUtELEtBQVosTUFBc0JDLElBQTFCLEVBQ0ksTUFBTSxJQUFJQyxTQUFKLFFBQWtCLEtBQUtILElBQXZCLDRCQUFnREUsSUFBaEQsMEJBQXNFLEtBQUtELEtBQTNFLFVBQU47O0FBRUosbUJBQU8sSUFBUDtBQUVIOzs7K0JBRU1HLEssRUFBTzs7QUFFVixnQkFBSUwsT0FBT00sU0FBUCxDQUFpQkMsUUFB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VCxpREFFRmMsRUFBRVUsV0FBRixDQUFjekIsSUFGWiw2QkFFdUN1QixLQUZ2QyxPQUFkLENBQU47QUFJSDs7QUFFRCxtQkFBTyxJQUFQO0FBRUg7OztpQ0FFUXRCLEssRUFBTztBQUNaLGdCQUFJLENBQUNOLFNBQUQsRUFBWSxJQUFaLEVBQWtCYyxPQUFsQixDQUEwQixLQUFLUixLQUEvQixJQUF3QyxDQUFDLENBQTdDLEVBQ0ksS0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0osbUJBQU8sSUFBUDtBQUNIOzs7bUNBRVU7O0FBRVAsZ0JBQUlQLEtBQUtlLE9BQUwsQ0FBYSxLQUFLUixLQUFsQixJQUEyQixDQUFDLENBQWhDLEVBQ0ksT0FBTyw0QkFBUDs7QUFFSixtQkFBTyxJQUFQO0FBRUg7OzttQ0FFVTs7QUFFUCxnQkFBSVAsS0FBS2UsT0FBTCxDQUFhLEtBQUtSLEtBQWxCLE1BQTZCLENBQUMsQ0FBbEMsRUFDSSxNQUFNLElBQUlFLFNBQUosUUFBa0IsS0FBS0gsSUFBdkIscUJBQU47O0FBRUosbUJBQU8sSUFBUDtBQUVIOzs7Ozs7a0JBSVVKLGEiLCJmaWxlIjoiVHlwZWRWYXJpYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOdWxsVmFyaWFibGUgZnJvbSAnLi9OdWxsVmFyaWFibGUnO1xuXG5jb25zdCBQUklNSVRJVkVTID0gWydib29sZWFuJywgJ251bWJlcicsICdzdHJpbmcnXTtcbmNvbnN0IE5VTEwgPSBbdW5kZWZpbmVkLCBudWxsXTtcblxuXG4vKipcbiAqIFR5cGVkVmFyaWFibGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBtYXBcbiAqIEBpbXBsZW1lbnRzIHtWYXJpYWJsZX1cbiAqL1xuY2xhc3MgVHlwZWRWYXJpYWJsZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihtYXApIHtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0ga2V5c1swXTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG1hcFtrZXlzWzBdXTtcblxuICAgIH1cblxuICAgIF90eXBlT2YodHlwZSkge1xuXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy52YWx1ZSAhPT0gdHlwZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke3RoaXMubmFtZX0nIG11c3QgYmUgdHlwZW9mICcke3R5cGV9JyEgR290ICcke3R5cGVvZiB0aGlzLnZhbHVlfSchYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBfcHJvdG8ocHJvdG8pIHtcblxuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMudmFsdWUpICE9PSBwcm90bylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCR7dGhpcy5uYW1lfSBtdXN0IGJlIHR5cGVvZiAke3Byb3RvfSEgR290ICR7dHlwZW9mIHRoaXMudmFsdWV9IWApO1xuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxuICAgIGJvb2xlYW4oKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignYm9vbGVhbicpO1xuXG4gICAgfVxuXG4gICAgbnVtYmVyKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlT2YoJ251bWJlcicpO1xuXG4gICAgfVxuXG4gICAgc3RyaW5nKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlT2YoJ3N0cmluZycpO1xuXG4gICAgfVxuXG4gICAgcHJpbWl0aXZlKCkge1xuXG4gICAgICAgIGlmIChQUklNSVRJVkVTLmluZGV4T2YodHlwZW9mIHRoaXMudmFsdWUpID09PSAtMSlcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke3RoaXMubmFtZX0nIG11c3QgYmUgdHlwZW9mIGJvb2xlYW4sIG51bWJlciBvciBzdHJpbmchYCArXG4gICAgICAgICAgICAgICAgYEdvdCAnJHt0eXBlb2YgdGhpcy52YWx1ZX0nIWApO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgYXJyYXkoKSB7XG5cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMudmFsdWUpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgJyR7dGhpcy5uYW1lfScgbXVzdCBiZSBhbiBhcnJheSEgR290ICcke3R5cGVvZiB0aGlzLnZhbHVlfSchYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9XG5cbiAgICBkYXRlKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm90bygnW29iamVjdCBEYXRlXScpO1xuXG4gICAgfVxuXG4gICAgcmVnZXhwKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm90bygnW29iamVjdCBSZWdFeHBdJyk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZU9mKCdmdW5jdGlvbicpO1xuXG4gICAgfVxuXG4gICAgb2JqZWN0KHZhbHVlLCBuYW1lKSB7XG5cbiAgICAgICAgLy9BcnJheXMgYW5kIG51bGwgYXJlIG5vdCBvYmplY3RzIEkgZG9uJ3QgY2FyZSB3aGF0IHlvIG1hbWEgc2F5LlxuICAgICAgICBpZiAoKEFycmF5LmlzQXJyYXkodGhpcy52YWx1ZSkgfHwgdGhpcy52YWx1ZSA9PT0gbnVsbCkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke3RoaXMudmFsdWV9IG11c3QgYmUgdHlwZSBvZiBvYmplY3QhYCk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGVPZignb2JqZWN0Jyk7XG5cbiAgICB9XG5cbiAgICBpbnN0YW5jZShjb25zKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25zICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCB0eXBlICcke3R5cGVvZiBjb25zfScgZm9yIGluc3RhbmNlIG9mIGNoZWNrYCArXG4gICAgICAgICAgICAgICAgYCBvbiBwYXJhbWV0ZXIgJyR7dGhpcy5uYW1lfSchYCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgaW5zdGFuY2VvZiBjb25zKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQXJndW1lbnQgJyR7dGhpcy5uYW1lfScgbXVzdCBiZSBpbnN0YW5jZSBvZmAgK1xuICAgICAgICAgICAgYCAnJHtjb25zLm5hbWV9JyBnb3QgdHlwZSAnJHt0eXBlb2YgdGhpcy52YWx1ZX0nIWApO1xuXG4gICAgfVxuXG4gICAgaW50ZXJmYWNlKElmYWNlKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBJZmFjZSAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYENhbm5vdCB1c2UgdHlwZSAnJHt0eXBlb2YgSWZhY2V9JyBhcyBhbiBpbnRlcmZhY2UhYCk7XG5cbiAgICAgICAgdmFyIG8gPSBuZXcgSWZhY2UoKTtcbiAgICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2UoT2JqZWN0KTtcblxuICAgICAgICB2YXIgbWlzc2luZyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5cbiAgICAgICAgZmlsdGVyKGsgPT4gKGsgPT09ICdjb25zdHJ1Y3RvcicpID8gZmFsc2UgOlxuICAgICAgICAgICAgKHR5cGVvZiB0aGlzLnZhbHVlW2tdID09PSB0eXBlb2YgcHJvdG9ba10pID9cbiAgICAgICAgICAgIGZhbHNlIDpcbiAgICAgICAgICAgIHRydWUpO1xuXG4gICAgICAgIGlmIChtaXNzaW5nLmxlbmd0aCAhPT0gMCkge1xuXG4gICAgICAgICAgICB2YXIgbWV0aHMgPSBtaXNzaW5nLmpvaW4oJywnKTtcblxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVmFsdWUgcGFzc2VkIGZvciBhcmd1bWVudCAnJHt0aGlzLm5hbWV9J2AgK1xuICAgICAgICAgICAgICAgIGAgKHR5cGUgOiAnJHt0eXBlb2YgdGhpcy52YWx1ZX0nKSBkb2VzIG5vdCBzYXRpc2Z5IGAgK1xuICAgICAgICAgICAgICAgIGBpbnRlcmZhY2UgJyR7by5jb25zdHJ1Y3Rvci5uYW1lfSchIE1pc3NpbmcgbWV0aG9kczogJHttZXRoc30hYCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgZGVmYXVsdCAodmFsdWUpIHtcbiAgICAgICAgaWYgKFt1bmRlZmluZWQsIG51bGxdLmluZGV4T2YodGhpcy52YWx1ZSkgPiAtMSlcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvcHRpb25hbCgpIHtcblxuICAgICAgICBpZiAoTlVMTC5pbmRleE9mKHRoaXMudmFsdWUpID4gLTEpXG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bGxWYXJpYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgfVxuXG4gICAgcmVxdWlyZWQoKSB7XG5cbiAgICAgICAgaWYgKE5VTEwuaW5kZXhPZih0aGlzLnZhbHVlKSAhPT0gLTEpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAnJHt0aGlzLm5hbWV9JyBpcyByZXF1aXJlZCFgKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUeXBlZFZhcmlhYmxlXG4iXX0=