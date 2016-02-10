/**
 * ============================= DATABASE FUNCTIONS =========================
 */
/**
 *
 * @file ls.js
 * @desc localStorage wrapper.
 *
 * @type {ls}
 *
 *
 * @code
 *
 ls.set("a", "b");
 ls.set("c", "d");
 ls.set("name", "jaeho");
 console.log("name:" + ls.get('name') );


 ls.set('title', 'This is test');
 trace( ls.get('title') );


 ls.set('title', 'Test 2');
 trace( ls.get('No Key') == null );

 ls.delete('title');
 ls.deleteAll();
 * @endcode
 *
 */
var ls = {
    set : function ( key, value ) {
        localStorage.setItem(key, value);
    },

    get : function ( key ) {
        return localStorage.getItem(key);
    },
    delete : function ( key ) {
        localStorage.removeItem(key);
    },
    /**
     * Deletes all keys in localStorage
     */
    deleteAll : function () {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
                ls.delete(k);
            }
        }
    },
    /**
     * 캐시를 저장 할 때, stamp 를 같이 저장한다.
     */
    setCache : function ( key, value ) {
        ls.set(key, value);
        ls.set(key + '.stamp', new Date().getTime());
    },
    /**
     * 캐시를 로드 할 때, stamp 를 같이 로드한다.
     * @param key
     * @returns {*}
     */
    getCache : function ( key ) {
        var value = ls.get(key);
        if ( value ) {
            var stamp = localStorage.getItem(key + '.stamp');
            return {
                'key' : key,
                'value' : value,
                'stamp' : stamp
            }
        }
        else return null;
    }
};
