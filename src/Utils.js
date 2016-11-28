/**
 * Utils
 */
class Utils {

    isObject(obj) {
        return typeof obj === 'object';
    }

    isFile(obj) {
        return toString.call(obj) === '[object File]';
    }

    isFormData(obj) {
        return toString.call(obj) === '[object FormData]';
    }

    isBlob(obj) {
        return toString.call(obj) === '[object Blob]';
    }

}

export default new Utils();
