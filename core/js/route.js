$(function(){

    on_click( '[route]', function() {
        var $this = $(this);
        var route = $this.attr('route');
        var callback = $this.attr('callback');

        console.log('route:' + route);


        var url = url_backend + "?route=" + route;

        console.log(url);
        $.get(url, function(res){
                //console.log(res);
                var re = JSON.parse(res);
                if  ( typeof callback != 'undefined' ) return window[callback](re);
                if ( re['code'] ) return alert(re['message']);
                el.content().html(re.data.html);
            })
            .fail(function(xhr) {
                console.log("Failed on loading: " + url);
            });
    });
});