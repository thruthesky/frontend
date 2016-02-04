/**
 * ============================= DATABASE FUNCTIONS =========================
 */
/**
 *
 *
 *
 * @type {db}
 *
 *
 * @code
 *
        db.set("a", "b");
        db.set("c", "d");
        db.set("name", "jaeho");
        console.log("name:" + db.get('name') );


 db.set('title', 'This is test');
    trace( db.get('title') );


    db.set('title', 'Test 2');
    trace( db.get('No Key') == null );

    db.delete('title');
    db.deleteAll();
 * @endcode
 *
 */
var db = new function() {
    this.set = function ( key, value ) {
        localStorage.setItem(key, value);
    };

    this.get = function ( key ) {
        return localStorage.getItem(key);
    };

    this.delete = function ( key ) {
        localStorage.removeItem(key);
    };

    /**
     * Deletes all keys in localStorage
     */
    this.deleteAll = function () {
        for (var k in localStorage) {
            if (localStorage.hasOwnProperty(k)) {
                db.delete(k);
            }
        }
    };

    /**
     * @short Check if the web storage is availble.
     */

    if ( typeof(Storage) === "undefined") {
        alert("Fatal Error : Web Storage is not supported in this web/app/platform");
    }

};
