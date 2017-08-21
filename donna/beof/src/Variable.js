/**
 * Variable represents a variable we are interested checking whether fit for use.
 * @interface
 */
class Variable {

    /**
     * boolean checks if the value is a boolean.
     * @returns {Variable}
     * @throws {TypeError}
     */
    boolean() {}

    /**
     * number check if the value is a number
     * @returns {Variable}
     * @throws {TypeError}
     */
    number() {}

    /**
     * string checks if the value is a string.
     * @returns {Variable}
     * @throws {TypeError}
     */
    string() {}

    /**
     * primitive checks if the value is a string, number or boolean
     * @returns {Variable}
     * @throws {TypeError}
     */
    primitive() {

    }



    /**
     * array checks if the value is an array via Array#isArray
     * @returns {Variable}
     * @throws {TypeError}
     */
    array() {}

    /**
     * date checks if the value is of type Date
     * @returns {Variable}
     * @throws {TypeError}
     */
    date() {}

    /**
     * regexp will check if the value is of type RegExp
     * @returns {Variable}
     * @throws {TypeError}
     */
    regexp() {}

    /**
     * function checks if the value is a function
     */
    function() {}

    /**
     * object checks if the value is an object.
     * @returns {Variable}
     * @throws {TypeError}
     */
    object(value, name) {}

    /**
     * instance performs the instanceof test
     * @param {function} cons 
     * @returns {Variable}
     * @throws {TypeError}
     */
    instance(cons) {}

    /**
     * interface checks if the value satisfies a particular interface.
     * It does that by accepting a constructor representing the interface
     * and comparing its methods to that of the value.
     * @param {function} Iface 
     * @returns {Variable}
     * @throws {TypeError}
     */
    interface(Iface) {}

    /**
     * default changes the Variable value if it is null or undefined to value.
     * @param {*} value 
     * @returns {Variable}
     */
    default (value) {}

    /**
     * optional will ignore the checks if the value is null or undefined
     * @param {*} value 
     * @returns {Variable}
     */
    optional(value) {}

    /**
     * required rejects undefined or null.
     * @returns {*}
     * @throws {TypeError}
     */
    required() {

    }

}

export default Variable
