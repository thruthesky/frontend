/**
 * @example core/example/app-js.html
 * @type {{init: app.init, template: Array, loadTemplate: app.loadTemplate, getTemplate: app.getTemplate}}
 */
var app = {
    init: function () {
        document.addEventListener('deviceready', function() {

        });




        /**
         * url 속성이 있는 태그를 클릭하면 해당 url 로 이동한다.
         */
        on_click('[url]', function(e) {
            location.href= $(this).attr('url');
        });



        $(window).resize(app.resize);
        app.resize();
    },
    urlServer : function () {
        return url_backend;
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
            //console.log("cached:");
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
     *      app.alert("알림 메세지입니다.", null, 3);
     * @endcode
     * @param msg
     * @param hide
     */
    alert : function(msg, callback, hide) {
        app.removeAlert();
        var m = '<div class="alert-background">' +
            '<div class="alert-foreground">' +
            '<div class="alert-message">' + msg + '</div>' +
            '<div class="alert-ok-button"><i class="fa fa-times"></i> 확인</div>' +
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
        $('.alert-ok-button').click( function() {
            app.removeAlert(callback);
        } );
        if ( hide ) {
            setTimeout( app.removeAlert, hide * 1000 );
            //setTimeout( function() { app.removeAlert(callback); }, hide * 1000 );
        }
    },
    removeAlert : function(callback) {
        $('.alert-background').remove();
        if ( typeof callback == 'function' ) {
            //console.log("remove alert callback caled");
            callback();
        }
    },
    resize : function() {
        // console.log('resize');
        var wh = $(window).height();
        var hh = el.header().height();
        var fh = el.footer().height();
        el.content().css('min-height', wh - hh - fh);
        /*
         console.log(wh);
         console.log(hh);
         console.log(fh);
         */
    },
    getLoginSignature : function () {
        var re = '';
        var username = ls.get('username');
        if (username) {
            re += '&username=' + username;
            re += '&signature=' + ls.get('signature');
        }
        return re;

    }
};
app.init();

/**
 *
 * @note README.md 를 참고
 *
 */
app.panel = {
    init : function() {
        on_click('.open-panel-menu-button', app.panel.open);
        //on_click('.close-panel-menu-button', app.panel.close);
        on_click('footer', app.panel.close);
        on_click('.page .content', app.panel.close);
        on_click('nav.panel-menu ul li', app.panel.close);

    },
    el : function() {
        return $('.page nav.panel-menu');
    },
    open : function () {
        var $el = app.panel.el();

        // Just return if panel is already open...
        if ( app.panel.isOpen() ) return app.panel.close();

        var w = $el.width();
        $el.css('right', -w);
        $el.velocity({right: 0}, 'fast');
    },
    close : function () {
        // Just return if panel is already closed...
        if ( app.panel.isClose() ) return;
        var $el = app.panel.el();
        var w = $el.width();
        $el.velocity({right: -w}, 'fast');
    },
    isOpen : function() {
        return right = app.panel.el().css('right').replace('px', '') == 0;
    },
    isClose : function() {
        return ! app.panel.isOpen();
    }
};
app.panel.init();
