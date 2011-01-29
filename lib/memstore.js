/*

© 2011 by Jerry Sievert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

(function () {
    var Memory = function () {
      this.__memstore = { };
    };

    Memory.prototype.map = function(fun /*, thisp */) {
        if (typeof fun !== "function")
            throw new TypeError();

        var thisp = arguments[1];
        var store = this.__memstore;
        var ret   = new Array();

        for (var i in store) {
            if (store.hasOwnProperty(i) && store[i] !== undefined) {
                var res = fun.call(thisp, store[i], i, store);
                if (res !== undefined) {
                    ret.push(res);
                }
            }
        }

        return ret;
    };
  
    Memory.prototype.set = function (key, value) {
        this.__memstore[key] = value;
        return this;
    };


    Memory.prototype.get = function (key) {
        return this.__memstore[key];
    };

    Memory.prototype.delete = function (key) {
        delete this.__memstore[key];
        return this;
    };

    Memory.prototype.flush = function () {
        this.__memstore = { };
        return this;
    };

    Memory.prototype.keys = function() {
        var store = this.__memstore;
        var keys = [ ];
    
        for (var i in store) {
            keys.push(i);
        }
    
        return keys;
    };

    Memory.prototype.clone = function() {
        var clone = new Memory();
        
        for (var i in this.__memstore) {
            if (this.__memstore[i] !== undefined) {
                clone.set(i, this.__memstore[i]);
            }
        }

        return clone;
    };

    exports.Store = Memory;
})();