var url_backend = 'http://work.org/backend/';
$(function() {

    show_header();
    show_footer();
    show_front_page();

    app.loadTemplate('company-list');




    setTimeout(function(){
        //el.footer().find('[route="company.Controller.admin"]').click();
    },200);


    //
    on_click('.home-button', show_front_page);

    on_submit('.company-edit', function(e){
        e.preventDefault();
        var $form = $(this);
        var params = $form.serialize();

        var url = url_backend + '?' + params;

        $.post(url, function(res){
            var re = JSON.parse(res);
            if ( re['code'] ) return alert(re['message']);
            console.log("success on editing company information.")
        })
            .fail(function(xhr) {
                console.log("ERROR on company-edit")
            });

    });


});


function show_header() {
    app.loadTemplate( 'header', function(html) {
        $('header').html(html);
    } );
}
function show_footer() {
    app.loadTemplate( 'footer', function(html) {
        $('footer').html(html);
    } );
}
function show_front_page() {
    app.loadTemplate( 'front', function(html) {
        var t = _.template(html);
        var m = t();
        $('.content').html(m);

        $.get(url_backend + '?route=company.Controller.countInformation', function(res) {
            var re = JSON.parse(res);
            $('.front-page .count').text( re['data']['count'] );

        });

    } );
}

function display_company_list(re) {
    var t = _.template( app.getTemplate('company-list') );
    var m = t( { re : re } );
    el.content().html(m);
}