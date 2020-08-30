/*
 * Original Source: https://github.com/ljharb/qs/blob/master/test/stringify.js
 *
 * See LICENSE file for copyright information.
 */
import { assert } from '@quenk/test/lib/assert';

import { formats, stringify } from '../../../lib/util/qs';

var iconv = require('iconv-lite');

describe('stringify()', () => {

    it('stringifies a querystring object', () => {
        assert(stringify({ a: 'b' })).equal('a=b');
        assert(stringify({ a: 1 })).equal('a=1');
        assert(stringify({ a: 1, b: 2 })).equal('a=1&b=2');
        assert(stringify({ a: 'A_Z' })).equal('a=A_Z');
        assert(stringify({ a: '€' })).equal('a=%E2%82%AC');
        assert(stringify({ a: '' })).equal('a=%EE%80%80');
        assert(stringify({ a: 'א' })).equal('a=%D7%90');
        assert(stringify({ a: '𐐷' })).equal('a=%F0%90%90%B7');
    });

    it('stringifies falsy values', () => {
        assert(stringify(undefined)).equal('');
        assert(stringify(null)).equal('');
        assert(stringify(null, { strictNullHandling: true })).equal('');
        assert(stringify(false)).equal('');
        assert(stringify(0)).equal('');

    });

    it('stringifies symbols', () => {
        assert(stringify(Symbol.iterator)).equal('');
        assert(stringify([Symbol.iterator])).equal('0=Symbol%28Symbol.iterator%29');

        assert(stringify({ a: Symbol.iterator }))
            .equal('a=Symbol%28Symbol.iterator%29');

        assert(stringify({ a: [Symbol.iterator] },
            { encodeValuesOnly: true, arrayFormat: 'brackets' }))
            .equal('a[]=Symbol%28Symbol.iterator%29');

    });

    it('stringifies bigints', () => {
        var three = BigInt(3);
        var encodeWithN = function(value, defaultEncoder, charset) {
            var result = defaultEncoder(value, defaultEncoder, charset);
            return typeof value === 'bigint' ? result + 'n' : result;
        };
        assert(stringify(three)).equal('');
        assert(stringify([three])).equal('0=3');
        assert(stringify([three], { encoder: encodeWithN })).equal('0=3n');
        assert(stringify({ a: three })).equal('a=3');
        assert(stringify({ a: three }, { encoder: encodeWithN })).equal('a=3n');

        assert(stringify({ a: [three] },
            { encodeValuesOnly: true, arrayFormat: 'brackets' }))
            .equal('a[]=3');

        assert(stringify({ a: [three] }, {
            encodeValuesOnly: true, encoder: encodeWithN, arrayFormat: 'brackets'
        })).equal('a[]=3n');

    });

    it('adds query prefix', () => {
        assert(stringify({ a: 'b' }, { addQueryPrefix: true })).equal('?a=b');

    });

    it('with query prefix, outputs blank string given an empty object',
        () => {
            assert(stringify({}, { addQueryPrefix: true })).equal('');
        });

    it('stringifies nested falsy values', () => {
        assert(stringify({ a: { b: { c: null } } })).equal('a%5Bb%5D%5Bc%5D=');
        assert(stringify({ a: { b: { c: null } } },
            { strictNullHandling: true })).equal('a%5Bb%5D%5Bc%5D');
        assert(stringify({ a: { b: { c: false } } }))
            .equal('a%5Bb%5D%5Bc%5D=false');

    });

    it('stringifies a nested object', () => {
        assert(stringify({ a: { b: 'c' } })).equal('a%5Bb%5D=c');
        assert(stringify({ a: { b: { c: { d: 'e' } } } })).
            equal('a%5Bb%5D%5Bc%5D%5Bd%5D=e');

    });

    it('stringifies a nested object with dots notation', () => {
        assert(stringify({ a: { b: 'c' } }, { allowDots: true }))
            .equal('a.b=c');
        assert(stringify({ a: { b: { c: { d: 'e' } } } }, { allowDots: true }))
            .equal('a.b.c.d=e');

    });

    it('stringifies an array value', () => {
        assert(stringify({ a: ['b', 'c', 'd'] }, { arrayFormat: 'indices' }))
            .equal('a%5B0%5D=b&a%5B1%5D=c&a%5B2%5D=d');

        assert(stringify({ a: ['b', 'c', 'd'] }, { arrayFormat: 'brackets' }))
            .equal('a%5B%5D=b&a%5B%5D=c&a%5B%5D=d');

        assert(stringify({ a: ['b', 'c', 'd'] }, { arrayFormat: 'comma' }))
            .equal('a=b%2Cc%2Cd');

        assert(stringify({ a: ['b', 'c', 'd'] }))
            .equate('a%5B0%5D=b&a%5B1%5D=c&a%5B2%5D=d');

    });

    it('omits nulls when asked', () => {
        assert(stringify({ a: 'b', c: null }, { skipNulls: true })).equal('a=b');

    });

    it('omits nested nulls when asked', () => {
        assert(stringify({ a: { b: 'c', d: null } }, { skipNulls: true }))
            .equal('a%5Bb%5D=c');

    });

    it('omits array indices when asked', () => {
        assert(stringify({ a: ['b', 'c', 'd'] }, { indices: false }))
            .equal('a=b&a=c&a=d');

    });

    it('stringifies a nested array value', () => {
        assert(stringify({ a: { b: ['c', 'd'] } }, { arrayFormat: 'indices' }))
            .equal('a%5Bb%5D%5B0%5D=c&a%5Bb%5D%5B1%5D=d');

        assert(stringify({ a: { b: ['c', 'd'] } }, { arrayFormat: 'brackets' }))
            .equal('a%5Bb%5D%5B%5D=c&a%5Bb%5D%5B%5D=d');

        assert(stringify({ a: { b: ['c', 'd'] } }, { arrayFormat: 'comma' }))
            .equal('a%5Bb%5D=c%2Cd'); // a[b]=c,d

        assert(stringify({ a: { b: ['c', 'd'] } }))
            .equal('a%5Bb%5D%5B0%5D=c&a%5Bb%5D%5B1%5D=d');

    });

    it('stringifies a nested array value with dots notation', () => {
        assert(stringify(
            { a: { b: ['c', 'd'] } },
            { allowDots: true, encode: false, arrayFormat: 'indices' }
        )).equal('a.b[0]=c&a.b[1]=d');

        assert(stringify(
            { a: { b: ['c', 'd'] } },
            { allowDots: true, encode: false, arrayFormat: 'brackets' }
        )).equal('a.b[]=c&a.b[]=d');

        assert(stringify(
            { a: { b: ['c', 'd'] } },
            { allowDots: true, encode: false, arrayFormat: 'comma' }
        )).equal('a.b=c,d');

        assert(stringify(
            { a: { b: ['c', 'd'] } },
            { allowDots: true, encode: false }
        )).equal('a.b[0]=c&a.b[1]=d');

    });

    it('stringifies an object inside an array', () => {
        assert(stringify({ a: [{ b: 'c' }] }, { arrayFormat: 'indices' }))
            .equal('a%5B0%5D%5Bb%5D=c');

        assert(stringify({ a: [{ b: 'c' }] }, { arrayFormat: 'brackets' }))
            .equal('a%5B%5D%5Bb%5D=c');

        assert(stringify({ a: [{ b: 'c' }] }))
            .equal('a%5B0%5D%5Bb%5D=c');

        assert(stringify({ a: [{ b: { c: [1] } }] }, { arrayFormat: 'indices' }))
            .equate('a%5B0%5D%5Bb%5D%5Bc%5D%5B0%5D=1');

        assert(stringify({ a: [{ b: { c: [1] } }] }, { arrayFormat: 'brackets' }))
            .equal('a%5B%5D%5Bb%5D%5Bc%5D%5B%5D=1');

        assert(stringify({ a: [{ b: { c: [1] } }] }))
            .equal('a%5B0%5D%5Bb%5D%5Bc%5D%5B0%5D=1');

    });

    it('stringifies an array with mixed objects and primitives', () => {
        assert(stringify({ a: [{ b: 1 }, 2, 3] },
            { encode: false, arrayFormat: 'indices' }))
            .equal('a[0][b]=1&a[1]=2&a[2]=3');

        assert(stringify({ a: [{ b: 1 }, 2, 3] },
            { encode: false, arrayFormat: 'brackets' }))
            .equal('a[][b]=1&a[]=2&a[]=3');

        assert(stringify({ a: [{ b: 1 }, 2, 3] }, { encode: false }))
            .equal('a[0][b]=1&a[1]=2&a[2]=3');

    });

    it('stringifies an object inside an array with dots notation', () => {
        assert(stringify(
            { a: [{ b: 'c' }] },
            { allowDots: true, encode: false, arrayFormat: 'indices' }))
            .equal('a[0].b=c');

        assert(stringify(
            { a: [{ b: 'c' }] },
            { allowDots: true, encode: false, arrayFormat: 'brackets' }
        ))
            .equal('a[].b=c');

        assert(stringify(
            { a: [{ b: 'c' }] },
            { allowDots: true, encode: false }
        )).equal('a[0].b=c');

        assert(stringify(
            { a: [{ b: { c: [1] } }] },
            { allowDots: true, encode: false, arrayFormat: 'indices' }
        ))
            .equal('a[0].b.c[0]=1');

        assert(stringify(
            { a: [{ b: { c: [1] } }] },
            { allowDots: true, encode: false, arrayFormat: 'brackets' }
        ))
            .equal('a[].b.c[]=1');

        assert(stringify(
            { a: [{ b: { c: [1] } }] },
            { allowDots: true, encode: false }
        )).equal('a[0].b.c[0]=1');

    });

    it('does not omit object keys when indices = false', () => {
        assert(stringify({ a: [{ b: 'c' }] }, { indices: false }))
            .equal('a%5Bb%5D=c');

    });

    it('uses indices notation for arrays when indices=true', () => {
        assert(stringify({ a: ['b', 'c'] }, { indices: true }))
            .equal('a%5B0%5D=b&a%5B1%5D=c');

    });

    it('uses indices notation for arrays when no arrayFormat is specified', () => {
        assert(stringify({ a: ['b', 'c'] }))
            .equal('a%5B0%5D=b&a%5B1%5D=c');

    });

    it('uses indices notation for arrays when no arrayFormat=indices', () => {
        assert(stringify({ a: ['b', 'c'] }, { arrayFormat: 'indices' }))
            .equal('a%5B0%5D=b&a%5B1%5D=c');

    });

    it('uses repeat notation for arrays when no arrayFormat=repeat', () => {
        assert(stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }))
            .equal('a=b&a=c');

    });

    it('uses brackets notation for arrays when no arrayFormat=brackets', () => {
        assert(stringify({ a: ['b', 'c'] }, { arrayFormat: 'brackets' }))
            .equal('a%5B%5D=b&a%5B%5D=c');

    });

    it('stringifies a complicated object', () => {
        assert(stringify({ a: { b: 'c', d: 'e' } })).equal('a%5Bb%5D=c&a%5Bd%5D=e');

    });

    it('stringifies an empty value', () => {
        assert(stringify({ a: '' })).equal('a=');
        assert(stringify({ a: null }, { strictNullHandling: true })).equal('a');

        assert(stringify({ a: '', b: '' })).equal('a=&b=');
        assert(stringify({ a: null, b: '' }, { strictNullHandling: true })).equal('a&b=');

        assert(stringify({ a: { b: '' } })).equal('a%5Bb%5D=');
        assert(stringify({ a: { b: null } }, { strictNullHandling: true })).equal('a%5Bb%5D');
        assert(stringify({ a: { b: null } }, { strictNullHandling: false })).equal('a%5Bb%5D=');


    });

    it('stringifies an empty array in different arrayFormat', () => {
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false })).equal('b[0]=&c=c');
        // arrayFormat default
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'indices' })).equal('b[0]=&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'brackets' })).equal('b[]=&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'repeat' })).equal('b=&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'comma' })).equal('b=&c=c');
        // with strictNullHandling
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'indices', strictNullHandling: true })).equal('b[0]&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'brackets', strictNullHandling: true })).equal('b[]&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'repeat', strictNullHandling: true })).equal('b&c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'comma', strictNullHandling: true })).equal('b&c=c');
        // with skipNulls
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'indices', skipNulls: true })).equal('c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'brackets', skipNulls: true })).equal('c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'repeat', skipNulls: true })).equal('c=c');
        assert(stringify({ a: [], b: [null], c: 'c' }, { encode: false, arrayFormat: 'comma', skipNulls: true })).equal('c=c');


    });

    it('stringifies a null object', () => {
        var obj = Object.create(null);
        obj.a = 'b';
        assert(stringify(obj)).equal('a=b');

    });

    it('returns an empty string for invalid input', () => {
        assert(stringify(undefined)).equal('');
        assert(stringify(false)).equal('');
        assert(stringify(null)).equal('');
        assert(stringify('')).equal('');

    });

    it('stringifies an object with a null object as a child', () => {
        var obj = { a: Object.create(null) };

        obj.a.b = 'c';
        assert(stringify(obj)).equate('a%5Bb%5D=c');

    });

    it('drops keys with a value of undefined', () => {
        assert(stringify({ a: undefined })).equal('');

        assert(stringify({ a: { b: undefined, c: null } }, { strictNullHandling: true })).equal('a%5Bc%5D');
        assert(stringify({ a: { b: undefined, c: null } }, { strictNullHandling: false })).equal('a%5Bc%5D=');
        assert(stringify({ a: { b: undefined, c: '' } })).equal('a%5Bc%5D=');

    });

    it('url encodes values', () => {
        assert(stringify({ a: 'b c' })).equal('a=b%20c');

    });

    it('stringifies a date', () => {
        var now = new Date();
        var str = 'a=' + encodeURIComponent(now.toISOString());
        assert(stringify({ a: now })).equal(str);

    });

    it('stringifies the weird object from qs', () => {
        assert(stringify({ 'my weird field': '~q1!2"\'w$5&7/z8)?' })).equal('my%20weird%20field=~q1%212%22%27w%245%267%2Fz8%29%3F');

    });

    it('skips properties that are part of the object prototype', () => {
        let o = <any>Object.prototype;
        o.crash = 'test';
        assert(stringify({ a: 'b' })).equal('a=b');
        assert(stringify({ a: { b: 'c' } })).equal('a%5Bb%5D=c');
        delete o.crash;

    });

    it('stringifies boolean values', () => {
        assert(stringify({ a: true })).equal('a=true');
        assert(stringify({ a: { b: true } })).equal('a%5Bb%5D=true');
        assert(stringify({ b: false })).equal('b=false');
        assert(stringify({ b: { c: false } })).equal('b%5Bc%5D=false');

    });

    it('stringifies buffer values', () => {
        assert(stringify({ a: Buffer.from('test') })).equal('a=test');
        assert(stringify({ a: { b: Buffer.from('test') } })).equal('a%5Bb%5D=test');

    });

    it('stringifies an object using an alternative delimiter', () => {
        assert(stringify({ a: 'b', c: 'd' }, { delimiter: ';' })).equal('a=b;c=d');

    });

    it('doesn\'t blow up when Buffer global is missing', () => {
        var tempBuffer = global.Buffer;
        delete global.Buffer;
        var result = stringify({ a: 'b', c: 'd' });
        global.Buffer = tempBuffer;
        assert(result).equal('a=b&c=d');

    });

    it('selects properties when filter=array', () => {
        assert(stringify({ a: 'b' }, { filter: ['a'] })).equal('a=b');
        assert(stringify({ a: 1 }, { filter: [] })).equal('');

        assert(
            stringify(
                { a: { b: [1, 2, 3, 4], c: 'd' }, c: 'f' },
                { filter: ['a', 'b', 0, 2], arrayFormat: 'indices' }
            )).equal(
                'a%5Bb%5D%5B0%5D=1&a%5Bb%5D%5B2%5D=3');

        assert(
            stringify(
                { a: { b: [1, 2, 3, 4], c: 'd' }, c: 'f' },
                { filter: ['a', 'b', 0, 2], arrayFormat: 'brackets' }
            )).equal('a%5Bb%5D%5B%5D=1&a%5Bb%5D%5B%5D=3');

        assert(
            stringify(
                { a: { b: [1, 2, 3, 4], c: 'd' }, c: 'f' },
                { filter: ['a', 'b', 0, 2] }
            )).equal('a%5Bb%5D%5B0%5D=1&a%5Bb%5D%5B2%5D=3');

    });

    it('supports custom representations when filter=function', () => {
        var calls = 0;
        var obj = { a: 'b', c: 'd', e: { f: new Date(1257894000000) } };
        var filterFunc = function(prefix, value) {
            calls += 1;
            if (calls === 1) {
                assert(prefix).equal('');
                assert(value).equal(obj);
            } else if (prefix === 'c') {
                return void 0;
            } else if (value instanceof Date) {
                assert(prefix).equal('e[f]');
                return value.getTime();
            }
            return value;
        };

        assert(stringify(obj, { filter: filterFunc }))
            .equal('a=b&e%5Bf%5D=1257894000000');
        assert(calls).equal(5);

    });

    it('can disable uri encoding', () => {
        assert(stringify({ a: 'b' }, { encode: false })).equal('a=b');
        assert(stringify({ a: { b: 'c' } }, { encode: false })).equal('a[b]=c');
        assert(stringify({ a: 'b', c: null }, { strictNullHandling: true, encode: false })).equal('a=b&c');

    });

    it('can sort the keys', () => {
        var sort = function(a, b) {
            return a.localeCompare(b);
        };
        assert(stringify({ a: 'c', z: 'y', b: 'f' }, { sort: sort })).equal('a=c&b=f&z=y');
        assert(stringify({ a: 'c', z: { j: 'a', i: 'b' }, b: 'f' }, { sort: sort })).equal('a=c&b=f&z%5Bi%5D=b&z%5Bj%5D=a');

    });

    it('can sort the keys at depth 3 or more too', () => {
        var sort = function(a, b) {
            return a.localeCompare(b);
        };
        assert(
            stringify(
                { a: 'a', z: { zj: { zjb: 'zjb', zja: 'zja' }, zi: { zib: 'zib', zia: 'zia' } }, b: 'b' },
                { sort: sort, encode: false }
            )).equal(
                'a=a&b=b&z[zi][zia]=zia&z[zi][zib]=zib&z[zj][zja]=zja&z[zj][zjb]=zjb');

        assert(
            stringify(
                { a: 'a', z: { zj: { zjb: 'zjb', zja: 'zja' }, zi: { zib: 'zib', zia: 'zia' } }, b: 'b' },
                { sort: null, encode: false }
            )).equal(
                'a=a&z[zj][zjb]=zjb&z[zj][zja]=zja&z[zi][zib]=zib&z[zi][zia]=zia&b=b'
            );
    });

    it('can stringify with custom encoding', () => {
        assert(stringify({ 県: '大阪府', '': '' }, {
            encoder: function(str) {
                if (str.length === 0) {
                    return '';
                }
                var buf = iconv.encode(str, 'shiftjis');
                var result = [];
                for (var i = 0; i < buf.length; ++i) {
                    result.push(buf.readUInt8(i).toString(16));
                }
                return '%' + result.join('%');
            }
        })).equal('%8c%a7=%91%e5%8d%e3%95%7b&=');

    });

    it('can use custom encoder for a buffer object', () => {
        assert(stringify({ a: Buffer.from([1]) }, {
            encoder: function(buffer: any) {
                if (typeof buffer === 'string') {
                    return buffer;
                }
                return String.fromCharCode(buffer.readUInt8(0) + 97);
            }
        })).equal('a=b');

        assert(stringify({ a: Buffer.from('a b') }, {
            encoder: function(buffer) {
                return buffer;
            }
        })).equal('a=a b');

    });

    /*
  it('serializeDate option', ()=> {
      var date = new Date();
      assert(stringify({ a: date })).equal(
          'a=' + date.toISOString().replace(/:/g, '%3A'));

      var mutatedDate = new Date();
      mutatedDate.toISOString = function() {
          throw new SyntaxError();
      };
      st['throws'](function() {
          mutatedDate.toISOString();
      }, SyntaxError);
      assert(
          stringify({ a: mutatedDate })).equal(
          'a=' + Date.prototype.toISOString.call(mutatedDate).replace(/:/g, '%3A'));

      var specificDate = new Date(6);
      assert(
          stringify(
              { a: specificDate },
              { serializeDate: function(d) { return d.getTime() * 7; } }
          ),
          'a=42',
          'custom serializeDate function called'
      );

      assert(
          stringify(
              { a: [date] },
              {
                  serializeDate: function(d) { return d.getTime(); },
                  arrayFormat: 'comma'
              }
          ),
          'a=' + date.getTime(),
          'works with arrayFormat comma'
      );


  });*/

    it('RFC 1738 spaces serialization', () => {
        assert(stringify({ a: 'b c' }, { format: formats.RFC1738 })).equal('a=b+c');
        assert(stringify({ 'a b': 'c d' }, { format: formats.RFC1738 })).equal('a+b=c+d');
        assert(stringify({ 'a b': Buffer.from('a b') }, { format: formats.RFC1738 })).equal('a+b=a+b');

    });

    it('RFC 3986 spaces serialization', () => {
        assert(stringify({ a: 'b c' }, { format: formats.RFC3986 })).equal('a=b%20c');
        assert(stringify({ 'a b': 'c d' }, { format: formats.RFC3986 })).equal('a%20b=c%20d');
        assert(stringify({ 'a b': Buffer.from('a b') }, { format: formats.RFC3986 })).equal('a%20b=a%20b');

    });

    it('Backward compatibility to RFC 3986', () => {
        assert(stringify({ a: 'b c' })).equal('a=b%20c');
        assert(stringify({ 'a b': Buffer.from('a b') })).equal('a%20b=a%20b');

    });

    it('encodeValuesOnly', () => {
        assert(
            stringify(
                { a: 'b', c: ['d', 'e=f'], f: [['g'], ['h']] },
                { encodeValuesOnly: true }
            )).equal('a=b&c[0]=d&c[1]=e%3Df&f[0][0]=g&f[1][0]=h');

        assert(
            stringify(
                { a: 'b', c: ['d', 'e'], f: [['g'], ['h']] }
            )).equal(
                'a=b&c%5B0%5D=d&c%5B1%5D=e&f%5B0%5D%5B0%5D=g&f%5B1%5D%5B0%5D=h'
            );

    });

    it('encodeValuesOnly - strictNullHandling', () => {
        assert(
            stringify(
                { a: { b: null } },
                { encodeValuesOnly: true, strictNullHandling: true }
            )).equal('a[b]');

    });

    it('respects a charset of iso-8859-1', () => {
        assert(stringify({ æ: 'æ' }, { charset: 'iso-8859-1' })).equal('%E6=%E6');

    });

    it('encodes unrepresentable chars as numeric entities in iso-8859-1 mode', () => {
        assert(stringify({ a: '☺' }, { charset: 'iso-8859-1' })).equal('a=%26%239786%3B');

    });

    it('respects an explicit charset of utf-8 (the default)', () => {
        assert(stringify({ a: 'æ' }, { charset: 'utf-8' })).equal('a=%C3%A6');

    });

    it('adds the right sentinel when instructed to and the charset is utf-8', () => {
        assert(stringify({ a: 'æ' }, { charsetSentinel: true, charset: 'utf-8' })).equal('utf8=%E2%9C%93&a=%C3%A6');

    });

    it('adds the right sentinel when instructed to and the charset is iso-8859-1', () => {
        assert(stringify({ a: 'æ' }, { charsetSentinel: true, charset: 'iso-8859-1' })).equal('utf8=%26%2310003%3B&a=%E6');

    });

    it('does not mutate the options argument', () => {
        var options = {};
        stringify({}, options);
        assert(options).equate({});

    });

    it('strictNullHandling works with custom filter', () => {
        var filter = function(prefix, value) {
            return value;
        };

        var options = { strictNullHandling: true, filter: filter };
        assert(stringify({ key: null }, options)).equal('key');

    });

    it('strictNullHandling works with null serializeDate', () => {
        var serializeDate = function() {
            return null;
        };
        var options = { strictNullHandling: true, serializeDate: serializeDate };
        var date = new Date();
        assert(stringify({ key: date }, options)).equal('key');

    });

});
