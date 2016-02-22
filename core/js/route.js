/**
 *
 *
 *
 *
 *
 *
 */
$(function(){
    on_click( '[route]', function() {
        var $this = $(this);
        var route = $this.attr('route');
        var callback = $this.attr('callback');
        var lc = $this.attr('ls-cache');

        //console.log("username: " + ls.get('username'));
        console.log('route:' + route);


        var option = {};

        option.url = url_backend + "?route=" + route + app.getLoginSignature();

        console.log(option.url);

        // 캐시 옵션 전달.
        if ( !_.isUndefined(lc) ) option['ls-cache'] = lc;


        // before route call
        var route_name = s.replaceAll(route, "\\.", '_');
        var route_func_name = 'before_' + route_name;

        if ( typeof window[route_func_name] == 'function' ) window[route_func_name]($this);

        console.log("func_name:"+route_func_name);

        ajax_load( option, function( res ) {

            // CALLBACK : 콜백이 있으면 에러 처리를 하기도 전에 서버로 부터 받은 정보를 그대로 (파싱도 하지 않고) 콜백으로 넘긴다.
            // 이 것은 backend 의 route 에서 리턴한 데이터에 에러가 있을 경우, 별도로 처리를 하고자 하는 경우 유용하다.
            if  ( typeof callback != 'undefined' ) return window[callback](res);

            // CALLBACK_ROUTE
            // callback_route 형식의 콜백이 있으면 호출하고 리턴한다.
            // 주의: 데이터 파싱하기 전에 리턴한다.
            route_func_name = 'callback_' + route_name;
            if ( typeof window[route_func_name] == 'function' ) return window[route_func_name]($this, res);


            // 데이터 파싱
            try {
                var re = JSON.parse(res);
            }
            catch ( e ) {
                el.content().html( res );
                return;
            }


            // 에러 처리 : 이후 부터는 에러가 없어야지만 아래의 루틴이 처리 가능하다.
            if ( re['code'] ) return alert(re['message']);

            // HTML 을 .content 에 저장 : data['html'] 에 내용이 없으면 el.content() 에 내용을 추가하지 않는다.
            if ( typeof re['data'] != 'undefined' && typeof re['data']['html'] != 'undefined') {
                el.content().html(re['data']['html']);
            }

            // HOOK for : after route call ( 파싱하기 전의 원본 데이터를 넘긴다. )
            route_func_name = 'after_' + route_name;
            if ( typeof window[route_func_name] == 'function' ) window[route_func_name]($this, res);

        });
    });
});