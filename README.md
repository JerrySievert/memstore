# A Naive in Memory Key/Value Storage

## In a nutshell

- Key/Value storage
- Useable in Node.js
- Useable in the browser
- Includes map() method

## Synopsis

When using from Node:

    var memstore = require('memstore').Store;
    
    var store = new memstore();
    store.set('abc', 123);
    
    store.get('abc'); // 123

    var keys = store.keys(); // [ 'abc' ]
    
    store.delete('abc');
    
    store.get('abc'); // undefined
    
    store.flush();
    
    store.map(function (value, key, obj) { } /* , thisp */);
