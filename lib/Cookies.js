'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Cookies
 * Originally from:
 * https://github.com/voltace/browser-cookies/blob/master/src/browser-cookies.js
 * License: Public Domain
 */
var Cookies = function () {
    function Cookies() {
        _classCallCheck(this, Cookies);
    }

    _createClass(Cookies, [{
        key: 'set',
        value: function set(name, value, options) {
            // Retrieve options and defaults
            var opts = options || {};
            var defaults = exports.defaults;

            // Apply default value for unspecified options
            var expires = opts.expires || defaults.expires;
            var domain = opts.domain || defaults.domain;
            var path = opts.path !== undefined ? opts.path : defaults.path !== undefined ? defaults.path : '/';
            var secure = opts.secure !== undefined ? opts.secure : defaults.secure;
            var httponly = opts.httponly !== undefined ? opts.httponly : defaults.httponly;

            // Determine cookie expiration date
            // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
            var expDate = expires ? new Date(
            // in case expires is an integer, it should specify the number of days till the cookie expires
            typeof expires === 'number' ? new Date().getTime() + expires * 864e5 :
            // else expires should be either a Date object or in a format recognized by Date.parse()
            expires) : '';

            // Set cookie
            document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent) // Encode cookie name
            .replace('(', '%28').replace(')', '%29') + '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) + ( // Encode cookie value (RFC6265)
            expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + ( // Add expiration date
            domain ? ';domain=' + domain : '') + ( // Add domain
            path ? ';path=' + path : '') + ( // Add path
            secure ? ';secure' : '') + ( // Add secure option
            httponly ? ';httponly' : ''); // Add httponly option
        }
    }, {
        key: 'get',
        value: function get(name) {
            var cookies = document.cookie.split(';');

            // Iterate all cookies
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                var cookieLength = cookie.length;

                // Determine separator index ("name=value")
                var separatorIndex = cookie.indexOf('=');

                // IE<11 emits the equal sign when the cookie value is empty
                separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

                // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
                if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) === name) {
                    return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
                }
            }

            return null;
        }
    }, {
        key: 'erase',
        value: function erase(name, options) {
            exports.set(name, '', {
                expires: -1,
                domain: options && options.domain,
                path: options && options.path,
                secure: 0,
                httponly: 0
            });
        }
    }]);

    return Cookies;
}();

exports.default = new Cookies();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9Db29raWVzLmpzIl0sIm5hbWVzIjpbIkNvb2tpZXMiLCJuYW1lIiwidmFsdWUiLCJvcHRpb25zIiwib3B0cyIsImRlZmF1bHRzIiwiZXhwb3J0cyIsImV4cGlyZXMiLCJkb21haW4iLCJwYXRoIiwidW5kZWZpbmVkIiwic2VjdXJlIiwiaHR0cG9ubHkiLCJleHBEYXRlIiwiRGF0ZSIsImdldFRpbWUiLCJkb2N1bWVudCIsImNvb2tpZSIsInJlcGxhY2UiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJjb29raWVMZW5ndGgiLCJzZXBhcmF0b3JJbmRleCIsImluZGV4T2YiLCJkZWNvZGVVUklDb21wb25lbnQiLCJzdWJzdHJpbmciLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBTU1BLE87Ozs7Ozs7NEJBRUVDLEksRUFBTUMsSyxFQUFPQyxPLEVBQVM7QUFDdEI7QUFDQSxnQkFBSUMsT0FBT0QsV0FBVyxFQUF0QjtBQUNBLGdCQUFJRSxXQUFXQyxRQUFRRCxRQUF2Qjs7QUFFQTtBQUNBLGdCQUFJRSxVQUFVSCxLQUFLRyxPQUFMLElBQWdCRixTQUFTRSxPQUF2QztBQUNBLGdCQUFJQyxTQUFTSixLQUFLSSxNQUFMLElBQWVILFNBQVNHLE1BQXJDO0FBQ0EsZ0JBQUlDLE9BQU9MLEtBQUtLLElBQUwsS0FBY0MsU0FBZCxHQUEwQk4sS0FBS0ssSUFBL0IsR0FBdUNKLFNBQVNJLElBQVQsS0FBa0JDLFNBQWxCLEdBQThCTCxTQUFTSSxJQUF2QyxHQUE4QyxHQUFoRztBQUNBLGdCQUFJRSxTQUFTUCxLQUFLTyxNQUFMLEtBQWdCRCxTQUFoQixHQUE0Qk4sS0FBS08sTUFBakMsR0FBMENOLFNBQVNNLE1BQWhFO0FBQ0EsZ0JBQUlDLFdBQVdSLEtBQUtRLFFBQUwsS0FBa0JGLFNBQWxCLEdBQThCTixLQUFLUSxRQUFuQyxHQUE4Q1AsU0FBU08sUUFBdEU7O0FBRUE7QUFDQTtBQUNBLGdCQUFJQyxVQUFVTixVQUFVLElBQUlPLElBQUo7QUFDcEI7QUFDQSxtQkFBT1AsT0FBUCxLQUFtQixRQUFuQixHQUE4QixJQUFJTyxJQUFKLEdBQVdDLE9BQVgsS0FBd0JSLFVBQVUsS0FBaEU7QUFDQTtBQUNBQSxtQkFKb0IsQ0FBVixHQUtWLEVBTEo7O0FBT0E7QUFDQVMscUJBQVNDLE1BQVQsR0FBa0JoQixLQUFLaUIsT0FBTCxDQUFhLGFBQWIsRUFBNEJDLGtCQUE1QixFQUFnRDtBQUFoRCxhQUNiRCxPQURhLENBQ0wsR0FESyxFQUNBLEtBREEsRUFFYkEsT0FGYSxDQUVMLEdBRkssRUFFQSxLQUZBLElBR2QsR0FIYyxHQUdSaEIsTUFBTWdCLE9BQU4sQ0FBYyxvQkFBZCxFQUFvQ0Msa0JBQXBDLENBSFEsS0FHa0Q7QUFDL0ROLHVCQUFXQSxRQUFRRSxPQUFSLE1BQXFCLENBQWhDLEdBQW9DLGNBQWNGLFFBQVFPLFdBQVIsRUFBbEQsR0FBMEUsRUFKN0QsTUFJbUU7QUFDaEZaLHFCQUFTLGFBQWFBLE1BQXRCLEdBQStCLEVBTGxCLE1BS3dCO0FBQ3JDQyxtQkFBTyxXQUFXQSxJQUFsQixHQUF5QixFQU5aLE1BTWtCO0FBQy9CRSxxQkFBUyxTQUFULEdBQXFCLEVBUFIsTUFPYztBQUMzQkMsdUJBQVcsV0FBWCxHQUF5QixFQVJaLENBQWxCLENBdEJzQixDQThCYTtBQUN0Qzs7OzRCQUVHWCxJLEVBQU07QUFDTixnQkFBSW9CLFVBQVVMLFNBQVNDLE1BQVQsQ0FBZ0JLLEtBQWhCLENBQXNCLEdBQXRCLENBQWQ7O0FBRUE7QUFDQSxpQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFFBQVFHLE1BQTVCLEVBQW9DRCxHQUFwQyxFQUF5QztBQUNyQyxvQkFBSU4sU0FBU0ksUUFBUUUsQ0FBUixDQUFiO0FBQ0Esb0JBQUlFLGVBQWVSLE9BQU9PLE1BQTFCOztBQUVBO0FBQ0Esb0JBQUlFLGlCQUFpQlQsT0FBT1UsT0FBUCxDQUFlLEdBQWYsQ0FBckI7O0FBRUE7QUFDQUQsaUNBQWlCQSxpQkFBaUIsQ0FBakIsR0FBcUJELFlBQXJCLEdBQW9DQyxjQUFyRDs7QUFFQTtBQUNBLG9CQUFJRSxtQkFBbUJYLE9BQU9ZLFNBQVAsQ0FBaUIsQ0FBakIsRUFBb0JILGNBQXBCLEVBQW9DUixPQUFwQyxDQUE0QyxZQUE1QyxFQUEwRCxFQUExRCxDQUFuQixNQUFzRmpCLElBQTFGLEVBQWdHO0FBQzVGLDJCQUFPMkIsbUJBQW1CWCxPQUFPWSxTQUFQLENBQWlCSCxpQkFBaUIsQ0FBbEMsRUFBcUNELFlBQXJDLENBQW5CLENBQVA7QUFDSDtBQUNKOztBQUVELG1CQUFPLElBQVA7QUFDSDs7OzhCQUVLeEIsSSxFQUFNRSxPLEVBQVM7QUFDakJHLG9CQUFRd0IsR0FBUixDQUFZN0IsSUFBWixFQUFrQixFQUFsQixFQUFzQjtBQUNsQk0seUJBQVMsQ0FBQyxDQURRO0FBRWxCQyx3QkFBUUwsV0FBV0EsUUFBUUssTUFGVDtBQUdsQkMsc0JBQU1OLFdBQVdBLFFBQVFNLElBSFA7QUFJbEJFLHdCQUFRLENBSlU7QUFLbEJDLDBCQUFVO0FBTFEsYUFBdEI7QUFPSDs7Ozs7O2tCQUlVLElBQUlaLE9BQUosRSIsImZpbGUiOiJDb29raWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb29raWVzXG4gKiBPcmlnaW5hbGx5IGZyb206XG4gKiBodHRwczovL2dpdGh1Yi5jb20vdm9sdGFjZS9icm93c2VyLWNvb2tpZXMvYmxvYi9tYXN0ZXIvc3JjL2Jyb3dzZXItY29va2llcy5qc1xuICogTGljZW5zZTogUHVibGljIERvbWFpblxuICovXG5jbGFzcyBDb29raWVzIHtcblxuICAgIHNldChuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICAvLyBSZXRyaWV2ZSBvcHRpb25zIGFuZCBkZWZhdWx0c1xuICAgICAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHZhciBkZWZhdWx0cyA9IGV4cG9ydHMuZGVmYXVsdHM7XG5cbiAgICAgICAgLy8gQXBwbHkgZGVmYXVsdCB2YWx1ZSBmb3IgdW5zcGVjaWZpZWQgb3B0aW9uc1xuICAgICAgICB2YXIgZXhwaXJlcyA9IG9wdHMuZXhwaXJlcyB8fCBkZWZhdWx0cy5leHBpcmVzO1xuICAgICAgICB2YXIgZG9tYWluID0gb3B0cy5kb21haW4gfHwgZGVmYXVsdHMuZG9tYWluO1xuICAgICAgICB2YXIgcGF0aCA9IG9wdHMucGF0aCAhPT0gdW5kZWZpbmVkID8gb3B0cy5wYXRoIDogKGRlZmF1bHRzLnBhdGggIT09IHVuZGVmaW5lZCA/IGRlZmF1bHRzLnBhdGggOiAnLycpO1xuICAgICAgICB2YXIgc2VjdXJlID0gb3B0cy5zZWN1cmUgIT09IHVuZGVmaW5lZCA/IG9wdHMuc2VjdXJlIDogZGVmYXVsdHMuc2VjdXJlO1xuICAgICAgICB2YXIgaHR0cG9ubHkgPSBvcHRzLmh0dHBvbmx5ICE9PSB1bmRlZmluZWQgPyBvcHRzLmh0dHBvbmx5IDogZGVmYXVsdHMuaHR0cG9ubHk7XG5cbiAgICAgICAgLy8gRGV0ZXJtaW5lIGNvb2tpZSBleHBpcmF0aW9uIGRhdGVcbiAgICAgICAgLy8gSWYgc3VjY2VzZnVsIHRoZSByZXN1bHQgd2lsbCBiZSBhIHZhbGlkIERhdGUsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGFuIGludmFsaWQgRGF0ZSBvciBmYWxzZShpc2gpXG4gICAgICAgIHZhciBleHBEYXRlID0gZXhwaXJlcyA/IG5ldyBEYXRlKFxuICAgICAgICAgICAgLy8gaW4gY2FzZSBleHBpcmVzIGlzIGFuIGludGVnZXIsIGl0IHNob3VsZCBzcGVjaWZ5IHRoZSBudW1iZXIgb2YgZGF5cyB0aWxsIHRoZSBjb29raWUgZXhwaXJlc1xuICAgICAgICAgICAgdHlwZW9mIGV4cGlyZXMgPT09ICdudW1iZXInID8gbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoZXhwaXJlcyAqIDg2NGU1KSA6XG4gICAgICAgICAgICAvLyBlbHNlIGV4cGlyZXMgc2hvdWxkIGJlIGVpdGhlciBhIERhdGUgb2JqZWN0IG9yIGluIGEgZm9ybWF0IHJlY29nbml6ZWQgYnkgRGF0ZS5wYXJzZSgpXG4gICAgICAgICAgICBleHBpcmVzXG4gICAgICAgICkgOiAnJztcblxuICAgICAgICAvLyBTZXQgY29va2llXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUucmVwbGFjZSgvW14rIyQmXmB8XS9nLCBlbmNvZGVVUklDb21wb25lbnQpIC8vIEVuY29kZSBjb29raWUgbmFtZVxuICAgICAgICAgICAgLnJlcGxhY2UoJygnLCAnJTI4JylcbiAgICAgICAgICAgIC5yZXBsYWNlKCcpJywgJyUyOScpICtcbiAgICAgICAgICAgICc9JyArIHZhbHVlLnJlcGxhY2UoL1teKyMkJi86PC1cXFtcXF0tfV0vZywgZW5jb2RlVVJJQ29tcG9uZW50KSArIC8vIEVuY29kZSBjb29raWUgdmFsdWUgKFJGQzYyNjUpXG4gICAgICAgICAgICAoZXhwRGF0ZSAmJiBleHBEYXRlLmdldFRpbWUoKSA+PSAwID8gJztleHBpcmVzPScgKyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJykgKyAvLyBBZGQgZXhwaXJhdGlvbiBkYXRlXG4gICAgICAgICAgICAoZG9tYWluID8gJztkb21haW49JyArIGRvbWFpbiA6ICcnKSArIC8vIEFkZCBkb21haW5cbiAgICAgICAgICAgIChwYXRoID8gJztwYXRoPScgKyBwYXRoIDogJycpICsgLy8gQWRkIHBhdGhcbiAgICAgICAgICAgIChzZWN1cmUgPyAnO3NlY3VyZScgOiAnJykgKyAvLyBBZGQgc2VjdXJlIG9wdGlvblxuICAgICAgICAgICAgKGh0dHBvbmx5ID8gJztodHRwb25seScgOiAnJyk7IC8vIEFkZCBodHRwb25seSBvcHRpb25cbiAgICB9XG5cbiAgICBnZXQobmFtZSkge1xuICAgICAgICB2YXIgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuXG4gICAgICAgIC8vIEl0ZXJhdGUgYWxsIGNvb2tpZXNcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY29va2llID0gY29va2llc1tpXTtcbiAgICAgICAgICAgIHZhciBjb29raWVMZW5ndGggPSBjb29raWUubGVuZ3RoO1xuXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgc2VwYXJhdG9yIGluZGV4IChcIm5hbWU9dmFsdWVcIilcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3JJbmRleCA9IGNvb2tpZS5pbmRleE9mKCc9Jyk7XG5cbiAgICAgICAgICAgIC8vIElFPDExIGVtaXRzIHRoZSBlcXVhbCBzaWduIHdoZW4gdGhlIGNvb2tpZSB2YWx1ZSBpcyBlbXB0eVxuICAgICAgICAgICAgc2VwYXJhdG9ySW5kZXggPSBzZXBhcmF0b3JJbmRleCA8IDAgPyBjb29raWVMZW5ndGggOiBzZXBhcmF0b3JJbmRleDtcblxuICAgICAgICAgICAgLy8gRGVjb2RlIHRoZSBjb29raWUgbmFtZSBhbmQgcmVtb3ZlIGFueSBsZWFkaW5nL3RyYWlsaW5nIHNwYWNlcywgdGhlbiBjb21wYXJlIHRvIHRoZSByZXF1ZXN0ZWQgY29va2llIG5hbWVcbiAgICAgICAgICAgIGlmIChkZWNvZGVVUklDb21wb25lbnQoY29va2llLnN1YnN0cmluZygwLCBzZXBhcmF0b3JJbmRleCkucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoY29va2llLnN1YnN0cmluZyhzZXBhcmF0b3JJbmRleCArIDEsIGNvb2tpZUxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZXJhc2UobmFtZSwgb3B0aW9ucykge1xuICAgICAgICBleHBvcnRzLnNldChuYW1lLCAnJywge1xuICAgICAgICAgICAgZXhwaXJlczogLTEsXG4gICAgICAgICAgICBkb21haW46IG9wdGlvbnMgJiYgb3B0aW9ucy5kb21haW4sXG4gICAgICAgICAgICBwYXRoOiBvcHRpb25zICYmIG9wdGlvbnMucGF0aCxcbiAgICAgICAgICAgIHNlY3VyZTogMCxcbiAgICAgICAgICAgIGh0dHBvbmx5OiAwXG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29va2llcygpXG4iXX0=