var url_backend = 'http://work.org/backend/';

$(function() {

    show_header();
    show_footer();
    show_front_page();

    app.loadTemplate('company-list');

    setTimeout(function(){
        el.footer().find('[route="company.Controller.admin"]').click();
    },200);

    initEventCompanyBook();

});


function initEventCompanyBook() {

    //
    on_click('.home-button', show_front_page);



}

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

function before_company_Controller_admin($this) {
}
function after_company_Controller_admin($this, res) {
    reloadCategoryList();
}

function reloadCategoryList() {
    $.get( url_backend + '?route=company.Controller.categoryList', function(res) {
        var re = JSON.parse(res);
        if ( re['code'] ) return alert( re['message'] );
        app.loadTemplate( 'company-category-list', function(html) {
            var t = _.template(html);
            //console.log(re);
            var m = t( { re : re } );
            $(".company-category-list").html(m);
        });
    });
}
