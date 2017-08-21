"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Variable represents a variable we are interested checking whether fit for use.
 * @interface
 */
var Variable = function () {
  function Variable() {
    _classCallCheck(this, Variable);
  }

  _createClass(Variable, [{
    key: "boolean",


    /**
     * boolean checks if the value is a boolean.
     * @returns {Variable}
     * @throws {TypeError}
     */
    value: function boolean() {}

    /**
     * number check if the value is a number
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "number",
    value: function number() {}

    /**
     * string checks if the value is a string.
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "string",
    value: function string() {}

    /**
     * primitive checks if the value is a string, number or boolean
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "primitive",
    value: function primitive() {}

    /**
     * array checks if the value is an array via Array#isArray
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "array",
    value: function array() {}

    /**
     * date checks if the value is of type Date
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "date",
    value: function date() {}

    /**
     * regexp will check if the value is of type RegExp
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "regexp",
    value: function regexp() {}

    /**
     * function checks if the value is a function
     */

  }, {
    key: "function",
    value: function _function() {}

    /**
     * object checks if the value is an object.
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "object",
    value: function object(value, name) {}

    /**
     * instance performs the instanceof test
     * @param {function} cons 
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "instance",
    value: function instance(cons) {}

    /**
     * interface checks if the value satisfies a particular interface.
     * It does that by accepting a constructor representing the interface
     * and comparing its methods to that of the value.
     * @param {function} Iface 
     * @returns {Variable}
     * @throws {TypeError}
     */

  }, {
    key: "interface",
    value: function _interface(Iface) {}

    /**
     * default changes the Variable value if it is null or undefined to value.
     * @param {*} value 
     * @returns {Variable}
     */

  }, {
    key: "default",
    value: function _default(value) {}

    /**
     * optional will ignore the checks if the value is null or undefined
     * @param {*} value 
     * @returns {Variable}
     */

  }, {
    key: "optional",
    value: function optional(value) {}

    /**
     * required rejects undefined or null.
     * @returns {*}
     * @throws {TypeError}
     */

  }, {
    key: "required",
    value: function required() {}
  }]);

  return Variable;
}();

exports.default = Variable;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9WYXJpYWJsZS5qcyJdLCJuYW1lcyI6WyJWYXJpYWJsZSIsInZhbHVlIiwibmFtZSIsImNvbnMiLCJJZmFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0lBSU1BLFE7Ozs7Ozs7OztBQUVGOzs7Ozs4QkFLVSxDQUFFOztBQUVaOzs7Ozs7Ozs2QkFLUyxDQUFFOztBQUVYOzs7Ozs7Ozs2QkFLUyxDQUFFOztBQUVYOzs7Ozs7OztnQ0FLWSxDQUVYOztBQUlEOzs7Ozs7Ozs0QkFLUSxDQUFFOztBQUVWOzs7Ozs7OzsyQkFLTyxDQUFFOztBQUVUOzs7Ozs7Ozs2QkFLUyxDQUFFOztBQUVYOzs7Ozs7Z0NBR1csQ0FBRTs7QUFFYjs7Ozs7Ozs7MkJBS09DLEssRUFBT0MsSSxFQUFNLENBQUU7O0FBRXRCOzs7Ozs7Ozs7NkJBTVNDLEksRUFBTSxDQUFFOztBQUVqQjs7Ozs7Ozs7Ozs7K0JBUVVDLEssRUFBTyxDQUFFOztBQUVuQjs7Ozs7Ozs7NkJBS1NILEssRUFBTyxDQUFFOztBQUVsQjs7Ozs7Ozs7NkJBS1NBLEssRUFBTyxDQUFFOztBQUVsQjs7Ozs7Ozs7K0JBS1csQ0FFVjs7Ozs7O2tCQUlVRCxRIiwiZmlsZSI6IlZhcmlhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWYXJpYWJsZSByZXByZXNlbnRzIGEgdmFyaWFibGUgd2UgYXJlIGludGVyZXN0ZWQgY2hlY2tpbmcgd2hldGhlciBmaXQgZm9yIHVzZS5cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgVmFyaWFibGUge1xuXG4gICAgLyoqXG4gICAgICogYm9vbGVhbiBjaGVja3MgaWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbi5cbiAgICAgKiBAcmV0dXJucyB7VmFyaWFibGV9XG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfVxuICAgICAqL1xuICAgIGJvb2xlYW4oKSB7fVxuXG4gICAgLyoqXG4gICAgICogbnVtYmVyIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBhIG51bWJlclxuICAgICAqIEByZXR1cm5zIHtWYXJpYWJsZX1cbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gICAgICovXG4gICAgbnVtYmVyKCkge31cblxuICAgIC8qKlxuICAgICAqIHN0cmluZyBjaGVja3MgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLlxuICAgICAqIEByZXR1cm5zIHtWYXJpYWJsZX1cbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gICAgICovXG4gICAgc3RyaW5nKCkge31cblxuICAgIC8qKlxuICAgICAqIHByaW1pdGl2ZSBjaGVja3MgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBudW1iZXIgb3IgYm9vbGVhblxuICAgICAqIEByZXR1cm5zIHtWYXJpYWJsZX1cbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gICAgICovXG4gICAgcHJpbWl0aXZlKCkge1xuXG4gICAgfVxuXG5cblxuICAgIC8qKlxuICAgICAqIGFycmF5IGNoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYW4gYXJyYXkgdmlhIEFycmF5I2lzQXJyYXlcbiAgICAgKiBAcmV0dXJucyB7VmFyaWFibGV9XG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfVxuICAgICAqL1xuICAgIGFycmF5KCkge31cblxuICAgIC8qKlxuICAgICAqIGRhdGUgY2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBvZiB0eXBlIERhdGVcbiAgICAgKiBAcmV0dXJucyB7VmFyaWFibGV9XG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfVxuICAgICAqL1xuICAgIGRhdGUoKSB7fVxuXG4gICAgLyoqXG4gICAgICogcmVnZXhwIHdpbGwgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIG9mIHR5cGUgUmVnRXhwXG4gICAgICogQHJldHVybnMge1ZhcmlhYmxlfVxuICAgICAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAgICAgKi9cbiAgICByZWdleHAoKSB7fVxuXG4gICAgLyoqXG4gICAgICogZnVuY3Rpb24gY2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24oKSB7fVxuXG4gICAgLyoqXG4gICAgICogb2JqZWN0IGNoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtWYXJpYWJsZX1cbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gICAgICovXG4gICAgb2JqZWN0KHZhbHVlLCBuYW1lKSB7fVxuXG4gICAgLyoqXG4gICAgICogaW5zdGFuY2UgcGVyZm9ybXMgdGhlIGluc3RhbmNlb2YgdGVzdFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNvbnMgXG4gICAgICogQHJldHVybnMge1ZhcmlhYmxlfVxuICAgICAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAgICAgKi9cbiAgICBpbnN0YW5jZShjb25zKSB7fVxuXG4gICAgLyoqXG4gICAgICogaW50ZXJmYWNlIGNoZWNrcyBpZiB0aGUgdmFsdWUgc2F0aXNmaWVzIGEgcGFydGljdWxhciBpbnRlcmZhY2UuXG4gICAgICogSXQgZG9lcyB0aGF0IGJ5IGFjY2VwdGluZyBhIGNvbnN0cnVjdG9yIHJlcHJlc2VudGluZyB0aGUgaW50ZXJmYWNlXG4gICAgICogYW5kIGNvbXBhcmluZyBpdHMgbWV0aG9kcyB0byB0aGF0IG9mIHRoZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBJZmFjZSBcbiAgICAgKiBAcmV0dXJucyB7VmFyaWFibGV9XG4gICAgICogQHRocm93cyB7VHlwZUVycm9yfVxuICAgICAqL1xuICAgIGludGVyZmFjZShJZmFjZSkge31cblxuICAgIC8qKlxuICAgICAqIGRlZmF1bHQgY2hhbmdlcyB0aGUgVmFyaWFibGUgdmFsdWUgaWYgaXQgaXMgbnVsbCBvciB1bmRlZmluZWQgdG8gdmFsdWUuXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBcbiAgICAgKiBAcmV0dXJucyB7VmFyaWFibGV9XG4gICAgICovXG4gICAgZGVmYXVsdCAodmFsdWUpIHt9XG5cbiAgICAvKipcbiAgICAgKiBvcHRpb25hbCB3aWxsIGlnbm9yZSB0aGUgY2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgXG4gICAgICogQHJldHVybnMge1ZhcmlhYmxlfVxuICAgICAqL1xuICAgIG9wdGlvbmFsKHZhbHVlKSB7fVxuXG4gICAgLyoqXG4gICAgICogcmVxdWlyZWQgcmVqZWN0cyB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAdGhyb3dzIHtUeXBlRXJyb3J9XG4gICAgICovXG4gICAgcmVxdWlyZWQoKSB7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmFyaWFibGVcbiJdfQ==