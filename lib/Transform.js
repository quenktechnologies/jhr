"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Transform
 * @interface
 */
var Transform = function () {
    function Transform() {
        _classCallCheck(this, Transform);
    }

    _createClass(Transform, [{
        key: "accepts",
        value: function accepts() {}
    }, {
        key: "contentType",
        value: function contentType() {}
    }, {
        key: "parseRequestBody",
        value: function parseRequestBody() {}
    }, {
        key: "parseResponseBody",
        value: function parseResponseBody() {}
    }]);

    return Transform;
}();

exports.default = Transform;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UcmFuc2Zvcm0uanMiXSwibmFtZXMiOlsiVHJhbnNmb3JtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7SUFJTUEsUzs7Ozs7OztrQ0FFUSxDQUFFOzs7c0NBQ0UsQ0FBRTs7OzJDQUNHLENBQUU7Ozs0Q0FDRCxDQUFFOzs7Ozs7a0JBSVhBLFMiLCJmaWxlIjoiVHJhbnNmb3JtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUcmFuc2Zvcm1cbiAqIEBpbnRlcmZhY2VcbiAqL1xuY2xhc3MgVHJhbnNmb3JtIHtcblxuICAgIGFjY2VwdHMoKSB7fVxuICAgIGNvbnRlbnRUeXBlKCkge31cbiAgICBwYXJzZVJlcXVlc3RCb2R5KCkge31cbiAgICBwYXJzZVJlc3BvbnNlQm9keSgpIHt9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJhbnNmb3JtXG4iXX0=