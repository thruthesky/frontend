var count_trace = 0;
function trace(v) {
    var caller = arguments.callee.caller;
    var name = null;
    if ( caller ) {
        try {
            name = caller.toString().match(/function ([^\(]+)/)[1];
        }
        catch (e) {
            name = 'Anonymous';
        }
    }
    else {
        name = 'global';
    }
    count_trace ++;
    console.log('[' + count_trace + '] ' + name + '() ' + v);
}

alert = function ( str ) {
    app.alert(str);
};
confirm = function ( str ) {
    app.alert("confirm 대신 app.confirm 을 사용하십시오.");
};


/**
 *
 * @param url
 * @code
 *      add_css('css/server.css?version=' + version);
 * @endcode
 */
function add_css(url){
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    document.getElementsByTagName('head')[0].appendChild(link);
}
/**
 *
 * @param url
 * @code
 *      'js/server.js?version=' + version
 * @endcode
 *
 */
function add_javascript(url) {
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
}


function on_click(selector, callback) {
    el.body().on('click', selector, callback);
}
function off_click(selector, callback) {
    el.body().off('click', selector, callback);
}
function on_submit(selector, callback) {
    el.body().on('submit', selector, callback);
}
function off_submit(selector, callback) {
    el.body().off('submit', selector, callback);
}

/**
 *
 * ajax_load() 는 $.ajax() 를 사용하기 쉽게 wrapping 해 놓은 것이다.
 *
 *  특히, 캐시를 하고자 하는 경우에 활용 할 수 있다.
 *
 * @note 기본적으로 cache: false 를 사용한다.
 *
 * @param option - ajax 에 사용가능한 모든 값을 사용 할 수 있다.
 *
 *      option[ls-cache]
 *          추가적으로 "ls-cache: 초단위 숫자" 를 입력하면, 해당 초 만큼 localSorage 캐시를 한다.
 *          이 값이 생략되면, 캐시를 하지 않는다. 이 값이 0 이면, 먼저 보여주고 나중에 캐시를 한다.
 *
 *          캐시 키는 url 을 바탕으로 자동이다.
 *
 * @note ls-cache 옵션을 사용하는 경우, 처음 호출하는 경우외에, 두번째 부터 ajax_load() 를 호출 하면 callback 함수가 두번 실행 될 수 있다. ( 안될 수도 있다. )
 *
 *          첫번째는 캐시데이터를 전달.
 *          두번째는 실제 데이터를 전달. 만약, 캐시 시간이 길어서, 캐시 유효기간이 경과하지 않았으면 호출되지 않는다.
 *
 * @param callback
 *
 * @code
 *
 ajax_load('http://work.org/backend/?route=company.Controller.admin', function(res) {
        console.log(res);
    });

 * @endcode
 *
 * @code JSON 으로 미리 파싱하기. 맨 끝 파라메타를 'json' 으로 하면 'json' 으로 파싱된 값을 콜백으로 전달한다.
 *
 * ajax_load( url_backend + '?route=company.Controller.categoryDelete&id='+rid, function(res) {
            console.log(res);
        }, 'json');

 * @endcode
 *
 * @code 캐시 예제
 *
 ajax_load( {
        url: url_backend + '?route=company.Controller.index',
        'ls-cache' : 5
    },
 function(re) {
        console.log(re);
    },
 'json');

 * @endcode
 *
 * @param return_type - 'json' 으로 입력되면 리턴 값이 json 이다.
 */
function ajax_load(option, callback, return_type) {
    /**
     * option 이 문자열이면, URL 값을 가지고 있다고 가정하고, 객체화 한다.
     */
    if ( typeof option == 'string' ) {
        var url = option;
        option = {};
        option.url = url;
    }

    option.cache = false;

    var url_key;
    if ( ! _.isUndefined(option['ls-cache']) &&  option['ls-cache'] ) {
        url_key = btoa( option.url );
        console.log("url_key: " + url_key);
        var res = ls.getCache( url_key );
        if ( res ) {
            console.log("CACHE exists: calls 'callback'");
            call_ajax_load_callback(option, callback, return_type, res.value);
            var old_date = new Date(parseInt(res.stamp));
            var exp_date = (new Date()).getTime() - option['ls-cache'] * 1000;
            if ( old_date > exp_date ) {
                console.log("CACHE is not expired, yet. Do nothing. Just return");
                return;
            }
            else {
                console.log("CACHE expired. going to call ajx and re-CACHE.")
            }
        }
        else {
            console.log("No CACHE saved. no cache callback. going to call ajax_load()");
        }
    }


    console.log(option.url);

    var promise = $.ajax(option);
    promise.done(function(res) {
        //console.log('done');
        if ( ! _.isUndefined(option['ls-cache']) ) {
            ls.setCache(url_key, res);
        }
        call_ajax_load_callback(option, callback, return_type, res);
    });
    promise.fail(function(res) {
        alert('failed on ajax_load() ... check internet !');
    });
}

function call_ajax_load_callback(option, callback, return_type, res) {
    console.log("call_ajax_load_callback()");
    if ( return_type == 'json' ) {
        console.log("json parse");
        res = JSON.parse(res);
    }
    if ( typeof callback == 'function' ) {
        console.log("call callback");
        callback(res);
    }
}

/**
 * ajax_load('...?route=...', function(){...}); 와 같은 문장을 더 짧게 하면서 필요한 코드를 추가한다.
 *
 * @Attention 회원 로그인을 한 경우, username 와 signature 를 자동으로 서버로 전송한다.
 * @param route
 * @param selector
 *      - undefined 이면, el.content() 에 데이터를 넣는다.
 *      - 문자열이면 jQuery 의 selector 로 인식하여 해당 $(selector) 에 내용을 입력한다.
 *      - function 이면, 해당 function 을 호출한다.
 *      - 위 조건이 모두 아니면 jQuery 객체로 인식하여 .html(res) 로 내용을 입력한다.
 *  @note 참고로 ajax_load() 에서 리턴되는 값은 HTML 일 수도 있으며 json 데이터 일 수도 있다.
 *          하지만, 여기서는 무조건 HTML 값으로 인식하여 그냥 해당 selector 에 데이터를 부어버린다.
 * @param ls_cache - 초 단위. 해당 초 만큼 경과 했으면 다시 캐시를 저장한다. 이 값이 생략되면 캐시를 하지 않는다.
 *
 *
 * @code
 *
 * ajax_load_route('company.Controller.footer', 'footer', 1);
 *
 *
    ajax_load_route( 'data.Controller.fileDelete&id=' + fid, function(res) {
        console.log(res);
    });
 *
 * @endcode
 */
function ajax_load_route(route, selector, ls_cache ) {
    route += app.getLoginSignature();
    var o = {
        'url' : url_backend + '?route=' + route
    };
    if ( ls_cache ) {
        o['ls-cache'] = ls_cache;
    }
    else o['ls-cache'] = false;
    ajax_load( o, function(res) {
        if ( typeof selector == 'undefined' ) el.content().html(res);
        else if ( typeof selector == 'string' ) $(selector).html(res);
        else if ( typeof selector == 'function' ) selector( res );
        else selector.html(res);
    });
}


/**
 *
 * 회원 로그인이 변경 될 때마다 이 함수를 호출 하면된다.
 *
 * @note 이 함수는 로그인을 했을 때, .user-in 을 보여주고, .user-out 을 감춘다.
 *          반대로, 로그 아웃을 했을 때, .user-in 을 감추고, .user-out 을 보여준다.
 *
 *          이 함수는 클래스를 바탕으로 적용하므로 사용자 로그인/로그아웃, 회원가입/정보수정 두개를 같이 동시에 적용 할 수 있다.
 *
 *
 */
function updateUserLogin() {
    var username = ls.get('username');
    if ( username ) {
        $('.user-in').show();
        $('.user-out').hide();
    }
    else {
        $('.user-in').hide();
        $('.user-out').show();
    }
}
