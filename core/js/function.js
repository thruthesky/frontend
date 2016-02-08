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
 *
 *
 * @param option - ajax 에 사용가능한 모든 값을 사용 할 수 있다.
 *
 *  추가적으로 db_cache: true/false, db_cache_key: 생략시 URL 값 사용, db_cache_expire 를 설정할 수 있다.
 *          db_cache_expire 를 생략하거나 0으로 주면, 항상 새로운 데이터를 가져온다.
 *
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
 */
function ajax_load(option, callback, return_type) {

    if ( typeof option == 'Object' ) {

    }
    else {
        var url = option;
        option = {};
        option.url = url;
    }

    console.log(option);

    var promise = $.ajax(option);
    promise.done(function(res) {

        console.log('done');

        if ( return_type == 'json' ) res = JSON.parse(res);

        if ( typeof callback == 'function' ) callback(res);


    });
    promise.fail(function(res) {
        console.log('fail');
    });
}