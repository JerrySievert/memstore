var vows   = require('vows');
var assert = require('assert');

var memstore = require('../lib/memstore');

vows.describe('Memstore').addBatch({
    'can set and retrieve a value': {
        topic: function () { var store = new memstore.Store(); return store.set("foo", "bar"); },
        'correct value is returned from get': function (topic) {
            assert.equal(topic.get("foo"), "bar");
        },
        'other gets do not return the same value': function (topic) {
            assert.equal(topic.get("bar"), undefined);
        }
    },

    'keys works': {
        topic: function() {
            var store = new memstore.Store();
            return store.set("foo", "bar").set("bar", "baz").keys();
        },
        'two keys returned': function (topic) {
            assert.equal(topic.length, 2);
        },
        'both keys are correct': function (topic) {
            topic.sort();
            assert.equal(topic[0], 'bar');
            assert.equal(topic[1], 'foo');
        }
    },

    'flush works': {
        topic: function() {
            var store = new memstore.Store();
            return store.set("foo", "bar").set("bar", "baz");
        },
        'two keys returned': function (topic) {
            assert.equal(topic.keys().length, 2);
        },
        'no keys after flush': function (topic) {
            topic.flush();
            assert.equal(topic.keys().length, 0);
        }
    },

    'delete works': {
        topic: function() {
            var store = new memstore.Store();
            return store.set("foo", "bar").set("bar", "baz");
        },
        'delete successful': function (topic) {
            topic.delete('bar');
            assert.equal(topic.keys().length, 1);
            assert.equal(topic.get('bar'), undefined);
            assert.equal(topic.get('foo'), 'bar');
        }
    },

    'map works': {
        'simple map': function () {
            var store = new memstore.Store();
            store.set('abc', 123);
            store.set('xyz', 987);
            store.set('123', 'abc');
            store.set('456', '789');
            
            var mapped = store.map(function (value, key) {
                if (Number(value) === value) {
                    return Number(value);
                }
            });
            
            assert.equal(mapped.length, 2);
            assert.equal(mapped[0] + mapped[1], 1110);
        },
        'complicated map': function () {
            var store = new memstore.Store();
            store.set('foo', { 'data': 123 });
            store.set('bar', { 'data': 456 });
            
            var mapped = store.map(function (value, key) {
                return value.data;
            });
            assert.equal(mapped.length, 2);
            assert.equal(mapped[0] + mapped[1], 579);
        }
    }
}).run();