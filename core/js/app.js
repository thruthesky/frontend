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
    /**
     *
     *
     * @code
     app.loadTemplate( 'header', function(html) {
        $('header').html(html);
    } );
     * @endcode
     * @param name
     * @param callback
     */
    loadTemplate : function (name, callback) {
        if ( typeof this.template[name] != 'undefined' ) {
            console.log("cached:");
            if ( typeof callback == 'function' ) callback(this.template[name]);
            return;
        }
        var url = 'template/' + name + '.html?dummy=' + (new Date()).getTime();
        $.get(url, function(re){
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
    },
    refresh : function () {
        location.href='index.html?dummy=' + (new Date()).getTime();
    },
    /**
     *
     * @code 예제
            app.alert("알림 메세지입니다.");
     * @endcode
     * @code 3 초 후 사라지는 예제
     *      app.alert("알림 메세지입니다.", 3);
     * @endcode
     * @param msg
     * @param hide
     */
    alert : function(msg, hide) {
        app.removeAlert();
        var m = '<div class="alert-background">' +
                '<div class="alert-foreground">' +
                    '<div class="alert-message">' + msg + '</div>' +
                    '<div class="alert-ok-button">확인</div>' +
                '</div>' +
            '</div>';
        el.page().append(m);
        $('.alert-background').css({
            'position': 'absolute',
            'z-index' : 12345,
            'top' : 0,
            'left' : 0,
            'right' : 0,
            'bottom' : 0,
            'background-color': 'rgba(188, 188, 188, 0.5)'
        });
        $('.alert-foreground').css({
            'border': '1px solid #125272',
            'margin' : '1em',
            'background-color': '#135373',
            'color' : 'white',
            'padding' : '1em'
        });
        $('.alert-ok-button').css({
            'text-align': 'right'
        });
        $('.alert-ok-button').click( app.removeAlert );
        if ( hide ) {
            setTimeout( app.removeAlert, hide * 1000 );
        }
    },
    removeAlert : function() {
        $('.alert-background').remove();
    }
};
app.init();
