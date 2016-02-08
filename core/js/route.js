$(function(){

    on_click( '[route]', function() {
        var $this = $(this);
        var route = $this.attr('route');
        var callback = $this.attr('callback');

        console.log('route:' + route);


        var url = url_backend + "?route=" + route;

        console.log(url);


        // before route call
        var route_name = s.replaceAll(route, "\\.", '_');
        var func_name = 'before_' + route_name;

        if ( typeof window[func_name] == 'function' ) window[func_name]($this);

        console.log("func_name:"+func_name);

        ajax_load( url, function( res ) {


            // CALLBACK : 콜백이 있으면 에러 처리를 하기도 전에 서버로 부터 받은 정보를 그대로 (파싱도 하지 않고) 콜백으로 넘긴다.
            if  ( typeof callback != 'undefined' ) return window[callback](res);


            // 데이터 파싱
            var re = JSON.parse(res);

            // 에러 처리 : 이후 부터는 에러가 없어야지만 아래의 루틴이 처리 가능하다.
            if ( re['code'] ) return alert(re['message']);

            // HTML 을 .content 에 저장 : data['html'] 에 내용이 없으면 el.content() 에 내용을 추가하지 않는다.
            if ( typeof re['data'] != 'undefined' && typeof re['data']['html'] != 'undefined') {
                el.content().html(re['data']['html']);
            }

            // HOOK for : after route call ( 파싱하기 전의 원본 데이터를 넘긴다. )
            var func_name = 'after_' + route_name;
            if ( typeof window[func_name] == 'function' ) window[func_name]($this, res);

        });
    });
});