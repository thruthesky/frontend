# frontend

Web App Frontend Framework

# TODO



- route 옵션으로 target 을 정 할 수 있도록 할 것.
- route 옵션으로 ls-cache=초단위, 0 이면, 저장 한 것을 보여주고 바로 다시 캐시 함.
- route 옵션으로 next-route, next-target 을 정할 수 있도록 한다.

# 코딩 원칙

    - 많은 것을 backend 에서 처리를 하도록 한다.

        특히, HTML 의 동적로드 데이터의 template 처리 등은 backend 에서 해서 frontend 소스 코드 변경 없이

        backend 의 변경으로 frontend 의 변화를 줄 수 있도록 한다.

## backend 에 template 및 css/js 을 둔다.

    - backend 서버에 template 을 둠으로서 frontend 를 실시간으로 변경 시킬 수 있다.

    - 다만, backend 의 template 을 ls-cache 하는 경우, 두번 중복 로드를 할 수 있는데

            자바스크립트 코드를 추가하는 경우 만약, event-listening 을 한다면 새로운 캐시를 하는 경우,

        캐시 내에 있는 자바스크립트와 새로 로드한 자바스크립트에 두번 event 를 listening 하여 중복으로 이벤트가 발생 할 수 있다.

        따라서 한번만 로드되어야 하는 코드의 경우 backend/model/js/backend.js 에 집어 넣는다.

    - CSS 마찬가지로 backend/model/css/backend.css 에 둔다.


## backend/model/template/header.html 의 역활

    - 단순히 header 부분의 HTML 만 출력하는 것이 아니라

    - 자바스크립트나 기본 CSS 를 같이 포함하도록 한다. 따라서 앱에 전반적인 영향을 미친다.


# 폴더구조

app 폴더는 각 웹/앱 마다 하나의 서브 폴더로 모아놓은 곳이다.

core 폴더는 시스템의 핵심 코드로서 왠만해서는 수정을 하지 않아야 하며, 수정하면 전체에 변화가 생길 수 있다.



- 'app folder' 라고 표현을 하면, 'app' 폴더 자체를 말하는 것이 아니라 각 웹/앱의 폴더를 말한다. 예) app/myapp

- 'app script' 라고 표현을 하면 각 앱 마다 앱 폴더 이름과 동이한 js 를 말한다. 예) app/myapp/js/myapp.js




# 외부 자원

- jQuery
- jQueryForm - for web browser upload
- Underscore.js
- TaffyDB - http://www.taffydb.com/beginner
- velocity.js - For animation : http://julian.com/research/velocity/





# 앱/사이트 개발 시작하는 방법

- app 폴더에 서브 폴더를 하나 만들고 그 안에 필요한 파일을 저장하고 코딩을 하므로서 시작된다.


# 앱/사이트 개발 작업 방법

HTML 과 CSS 는 backend 에 두고 동적으로 ajax_load() 또는 route 를 통해서 backend 로 부터 불러들인다.






# BODY 태그의 기본 내용


    <body>
    <div class="page">
        <header>.header</header>
        <section class="content">.content</section>
        <footer>.footer</footer>
    </div>
    <script type="text/javascript" src="../../core/js/layout.js"></script>
    <script type="text/javascript" src="../../core/js/app.js"></script>
    <script src="../../core/js/jquery-2.2.0.min.js"></script>
    <script src="../../core/js/underscore-min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="company-book.js"></script>
    </body>

# Underscore 템플릿의 사용

참고: company-book 앱을 참고한다.


- 각 app 폴더 아래에template 이라는 폴더를 두며 그 안에 html 로 저장을 해 놓는다.

- 각 앱 스크립트의 initApp() 에서
 
- app.loadTemplate('company-list'); 와 같이 호출하면 자동으로 app.template['company-list'] 와 같이 저장이 되는데,

- 필요할 때 적절히 사용하면 된다.



# 헤더/푸터에 사용하는 테이블 메뉴 사용하기

최대한 간편하게한다. 복잡하게하지 않는다. Bootstrap 조차도 사용하지 않는다.

아래와 같이 메뉴(아이콘) 별로 하나의 td 에 넣어야 한다. 

    <table class="table-menu" cellspacing="0" cellpadding="0" width="100%">
        <tr>
            <td width="25%"><i class="nav-link fa fa-folder-o"></i>File</td>
            <td width="25%"><i class="nav-link fa fa-pie-chart"></i>Chart</td>
            <td width="25%"><i class="nav-link fa fa-save"></i>Save</td>
            <td width="25%"><i class="nav-link fa fa-gear"></i>Setting</td>
        </tr>
    </table>

퍼센티지를 따로 지정할 수 있다.

    <table class="table-menu" cellspacing="0" cellpadding="0" width="100%">
        <tr>
            <td width="15%" class="left"><i class="nav-link fa fa-home icon-home"></i></td>
            <td width="55%">SITE</td>
            <td width="15%"><i class="nav-link fa fa-user icon-user"></i></td>
            <td width="15%"><i class="nav-link fa fa-th-list icon-more"></i></td>
        </tr>
    </table>

위 예제는 특히 헤더를 적용 할 때 사용 할 수 있다.


# 패널 사용하기

패널은 index.html 에서 template 으로 지정한다.


# route - 서버와 통신 및 데이터 송/수신

서버로 데이터를 요청 할 때에는 항상 route 를 사용해야 한다.





# route 를 통해서 backend 와 통신하며 view 하기


    <td width="25%" route="company.Controller.admin"><i class="nav-link fa fa-folder-o"></i>Admin</td>

위 예제를 보면 route='company.Controller.admin' 을 볼 수 있다.

클릭을 하면, route.js 에서 click 이벤트를 받으며 backend 서버의 해당 model/class/method 를 호출하고 결과를

    el.content().html(...)

와 같이 하여 바로 컨텐츠 페이지에 넣는다.


# route 의 결과 처리

route 는

## route 를 호출 할 때, callback 으로 처리하기

하지만 바로 컨텐츠 페이지에 넣지 않고 한번 요리를 하고 싶다면,

    <li route="company.Controller.searchInformation&category=Church" callback="display_company_list"><div><img src="img/category-icons/church.png"><span class="text">Church</span></div></li>

와 같이 callback attribute 를 추가한다. 그러면 해당 콜백을 수행한다.

## route 를 호출 할 때, callback_route 를 사용하기.

    route=model.class.method 와 같다면,

    callback_model_class_method() 가 호출된다.

## route 를 호출 할 때 추가 파라메타 전달하기

    <li route="company.Controller.searchInformation&category=Church" callback="display_company_list">

위와 같이 route="....&param=value&param=value" 와 같이 하면 된다.



## route 수행 시 hook 사용하기

route 는 기본적으로 section.content 에 결과 값(HTML) 을 추가하는데,

callback attribute 를 사용하므로서 통째로 결과 처리 루틴을 수정 할 수 있다.

하지만, callback attribute 를 사용하지 않고,


route 의 결과를 section.content 에 추가를 하되,

그 전/후로 hook 방식으로 적절한 처리 할 수 있다.


예를 들면 아래와 같다.

    route=company.Controller.admin

과 같이 route 를 잡은 경우, 아래와 같이 hook 이 발생한다.


    function before_company_Controller_admin($this) {
        console.log("before:");
        console.log($this);
    }
    function after_company_Controller_admin($this, res) {
        console.log("after:");
        console.log($this);
        console.log(res);
    }



# on_click, off_click, on_submit, off_submit

on_click 은 동적으로 HTML 이 로드될 때, element 에 click 이벤트를 건다.

하지만 동적으로 로드되는 HTML 내에 Javascript 로 on_click 이벤트를 걸면, 동적으로 HTML 이 로드 될 때 마다 on_click 이 중복 정의되므로

함수가 여러번 실행될 수 있다.

이 때, off_click() 을 실행하면 기존의 on_click() 을 무효화 한다. 따라서 동적으로 로드되는 HTML 에서 on_click() 을 할 때에는 항상 아래와 같이 먼저 off_click() 을 해 주어야 한다.

주의 : off_submit() 이 제대로 동작하지 않고 계속 여러번 event 가 발생한다.



<script>
    function deleteCategory(e) {
        var $this = $(this);
        var $p = $this.parents('.row');
        var rid = $p.attr('rid');
        ajax_load( url_backend + '?route=company.Controller.categoryDelete&id='+rid, function(re) {
            if ( re['code'] ) return alert( re['message'] );
            after_company_Controller_admin();
        });
    }
    off_click('.list .delete-button',deleteCategory);
    on_click('.list .delete-button',deleteCategory, 'json');
</script>


이것은 on_submit 이나 off_submit 도 마찬가지이며,

frontend 뿐만아니라 backend 의 template 폴더에 있는 HTML 에서도 사용 될 수 있다.


# localStorage - ls.js 사용법

ls.js 는 localStorage 를 set(), get(), delete() 로 간단히 사용 할 수 있도록 해 놓았다.

ls.setCache(), ls.getCache(), ls.deleteCache(), ls.deleteAllCache() 는 'cache.' 를 앞에 추가하여 localStorage 키를 관리한다.




# template

template 은 각 웹/앱 폴더의 template 폴더에 저장된다.

주로 underscore.js 의 template() 를 활용하기 위한 것으로 아래와 같이 app.loadTemplate(), _.template(), ajax 콜을 혼용해서 사용 할 수 있다.


    app.loadTemplate( 'front', function(html) {
        var t = _.template(html);
        var m = t();
        $('.content').html(m);

        $.get(url_backend + '?route=company.Controller.countInformation', function(res) {
            var re = JSON.parse(res);
            $('.front-page .count').text( re['data']['count'] );
        });
    } );
    