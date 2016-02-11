var url_backend = 'http://work.org/backend/';

$(function() {

    app.alert("안녕하세요.");


    add_css( url_backend + 'model/company/css/backend.css');
    add_javascript( url_backend + 'model/company/js/backend.js');

    checkVersion();

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

function checkVersion() {
    ajax_load( url_backend + '?route=company.Controller.version', function(res) {
        var version = ls.get('version');
        if ( version != res ) {
            ls.deleteAll();
            ls.set('version', res);
            app.alert("업데이트되었습니다.");
            app.refresh();
        }
    });
}


function show_header() {
    //ajax_load_route('company.Controller.header', 'header');
    ajax_load({
        url : url_backend + '?route=company.Controller.header',
        'ls-cache' : 60 * 60 * 2
    }, function(res) {
        el.header().html(res);
    });
}

function show_footer() {
    ajax_load_route('company.Controller.footer', 'footer', 60 * 60 * 2);

}

function show_front_page() {

    ajax_load_route( 'company.Controller.frontPage', el.content() );
    /*
    ajax_load( url_backend + '?route=company.Controller.frontPage', function( res ) {
        el.content().html(res);
    });
    */

}

function display_company_list(re) {
    var t = _.template( app.getTemplate('company-list') );
    var m = t( { re : re } );
    el.content().html(m);
}

function before_company_Controller_admin($this) {
}

function after_company_Controller_admin($this, res) {
    ajax_load_route('company.Controller.categoryList', '.company-category-list');
    //reloadCategoryList();
}

/*
function reloadCategoryList() {
    ajax_load( url_backend + '?route=company.Controller.categoryList', function(res) {
        $(".company-category-list").html(res);
    });
}
*/

