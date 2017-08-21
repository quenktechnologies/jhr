/**
 * NullVariable does nothing ... really.
 * @implements {Variable}
 */
class NullVariable {

    boolean() {

        return this;

    }

    number() {

        return this;

    }

    string() {

        return this;

    }

  primitive() {

    return this;

  }

    array() {

        return this;

    }

    date() {

        return this;

    }

    regexp() {

        return this;

    }

    function() {

        return this;

    }

    object(value, name) {

        return this;

    }

    instance(cons) {

        return this;

    }

    interface(Iface) {

        return this;

    }

    default (value) {

        return this;

    }

    optional(value) {

        return this;

    }

  required() {

    return this;

  }


}

export default NullVariable
