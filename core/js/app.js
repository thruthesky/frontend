/**
 * @example core/example/app-js.html
 * @type {{init: app.init, template: Array, loadTemplate: app.loadTemplate, getTemplate: app.getTemplate}}
 */
var app = {
    init: function () {
        document.addEventListener('deviceready', function() {

        });
    },
    template : [],
    loadTemplate : function (name, callback) {
        if ( typeof this.template[name] != 'undefined' ) {
            console.log("cached:");
            if ( typeof callback == 'function' ) callback(this.template[name]);
            return;
        }
        $.get('template/' + name + '.html', function(re){
            app.template[name] = re;
            if ( typeof callback == 'function' ) callback(re);
        })
            .fail(function(xhr) {
                alert('Error: failed on loading template');
            });
    },
    getTemplate : function ( name ) {
        if (typeof this.template[name] != 'undefined') return this.template[name];
        else return '';
    }
};
app.init();
