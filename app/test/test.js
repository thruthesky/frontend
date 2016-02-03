
var url_server_endpoint = 'http://work.org/backend/index.php';

$(function(){



    $("form").submit( function(e) {
        e.preventDefault();
        var $this = $(this);
        var url = url_server_endpoint;
        url += '?route=user.Controller.register';
        url += '&username=' + $this.find("[name='name']").val();
        url += '&password=' + $this.find("[name='password']").val();
        url += '&email=' + $this.find("[name='email']").val();
        console.log(url);
        $.ajax( {
            url: url,
            //data: $this.serialize(),
            success : function (re) {
                //console.log("success: " + re);
            },
            error : function (re) {
                console.log("error: " + re);
            }
        } );
    });

    $(".show").click(function(){
        var url = url_server_endpoint;
        url += '?route=user.Controller.collect&limit=50';
        console.log(url);
        $.ajax( {
            url: url,
            //data: $this.serialize(),
            success : function (re) {
                console.log("response from server:");
                console.log(re);
                var p = JSON.parse(re);
                if ( p['code'] ) {
                    return;
                }
                var data = p['data'];

                var $t = $('#user-list-template');
                var m = _.template($t.html())({ data: data });
                $t.remove();
                $('.content').append(m);
            },
            error : function (re) {
                console.log("error: " + re);
            }
        } );

    });

    $(".show").click();

});