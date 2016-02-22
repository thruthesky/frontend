# frontend

Web App Frontend Framework

# TODO

- (검토: 사실 jQuery UI 도 별거 없다.) jQueryUI 를 집어 넣을 것.
- (검토) jQueryMobile 을 집어 넣을 것.
- (검토 할 것: jQueryMobile 자체가 별거 있는거 아닌데, 어려운 코딩을 해야한다.) 인터넷에 연결되면 서버의 index.php 로 이동하게하고, 곧 바로 100% jQueryMobile 을 사용하게 한다.

    - 즉, jQueryMobile 코드를 앱에 저장하고 데이터를 서버에서 받아오는 것이 아니라,
    - jQueryMobile 데이터 자체를 서버에 놔 두고,
        - 앱에서 jQueryMobile 관련 코드를 서버에서 바로 다운로드하게 한다.
        - 앱이 온라인 상태이면, 자동으로 http://server.com/index.php 로 이동하게하여 100% jQueryMobile 이 실행되게 한다.


- app.js 를 forntend.js 로 통일하고 클래스 명칭을 f 로 통일한다.

그리고 모든 함수와 메소드를 집어넣는다.

f.route() 와 같이
f.db.set()
f.el.content()


백엔드는 backend.js 로 통일하고 클래스 명칭ㅇ르 b 로 한다>

# 코딩 원칙

    - 많은 것을 backend 에서 처리를 하도록 한다.

        특히, HTML 의 동적로드 데이터의 template 처리 등은 backend 에서 해서 frontend 소스 코드 변경 없이

        backend 의 변경으로 frontend 의 변화를 줄 수 있도록 한다.

    - 인터넷이 연결되지 않았다면,
    
        기본 header, footer 와 content 를 보여주고, 인터넷 접속을 하라고 한다.
        
        즉, app 의 index.html 에서 로컬 앱 디스크 영역에 header, footer, content 를 가지고 있어야 하며
        
        적절한 이미지와 CSS 디자인이 되어야 한다.
        
        



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

- Font Awesome 4.5 가 core/etc/font-awesome 에 포함되어져 있다. 작은 아이콘을 만들 때 유용하다.
- Github 의 Octicons 가 포함되어져 있다. 큰 버튼(헤더/푸터 등)을 만들 때 유용하다. https://octicons.github.com/



- jQuery
- jQueryForm - for web browser upload
- Underscore.js
- TaffyDB - http://www.taffydb.com/beginner
- velocity.js - For animation : http://julian.com/research/velocity/





# 앱/사이트 개발 시작하는 방법

- app 폴더에 서브 폴더를 하나 만들고 그 안에 필요한 파일을 저장하고 코딩을 하므로서 시작된다.


# 앱/사이트 개발 작업 방법

HTML 과 CSS 는 backend 에 두고 동적으로 ajax_load() 또는 route 를 통해서 backend 로 부터 불러들인다.



# CSS 구조 ( CSS Framework )

기본적으로 SMACSS 를 따른다. 주로 카테고리화 하는 것을 따른다.

layout.css 에 header, content, footer 를 관리하고 있다.

header 는 상단에 fixed 되었고, footer 는 하단에 fixed 되어있다.

header 와 footer 의 높이는 각각 50px 이며, 이에 따라 content 는 top-margin, bottom-margin 이 50px 로 되어져 있다.






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


## route 를 통해서 backend 와 통신하며 view 출력 하기

    <td width="25%" route="company.Controller.admin"><i class="nav-link fa fa-folder-o"></i>Admin</td>

위 예제를 보면 route='company.Controller.admin' 을 볼 수 있다.

어떤 태그이든 [route] attribute 를 가지고 있다면, 해당 route 를 백엔드에서 실행한다.

    - 이 때, 결과는 [callback] attribute 를 추가하거나 route 이름에 해당하는 hook 을 통해서 처리를 하면 된다.

    - 만약, [callback] 이나 hook 이 없다면 router 에서 출력하는 결과는 자동으로 content 에 표시된다.

상세히 설명하자면, 위 예제에서

    * TD 태그를 클릭 하면,
    
    * route.js 에서 click 이벤트를 받으며
     
    * ajax 호출을 통해서 backend 서버의 해당 model/class/method 를 호출하고
    
    * 결과를 [callback] 이나 hook 에 의해서 처리하거나 el.content().html(...) 에 표시한다.


와 같이 하여 바로 컨텐츠 페이지에 넣는다.


# route 의 결과 처리

route 는 backend 와 통신 할 때 사용한다.

[route] 속성 클릭, 프로그램적 호출인 $.ajax(), $.get(), $.post(), ajax_load(), ajax_load_route() 등과 같은 함수를 통해서

backend 의 route 를 호출 할 수 있는데, 각각의 처리 결과가 틀리다.


## [route] 속성만 지정하면,

backend 의 php method 의 결과를 받아서,

json 파싱을 하는데,
 
    - 에러가 있으면 리턴된 내용을 그대로 content 에 추가하고,

    - 에러가 없으면, data.html 을 content 에 추가한다.




## [route] 속성을 통해서 backend route 를 호출 할 때, callback 으로 처리하기

하지만 바로 컨텐츠 페이지에 넣지 않고 한번 요리를 하고 싶다면,

    <li route="company.Controller.searchInformation&category=Church" callback="display_company_list"><div><img src="img/category-icons/church.png"><span class="text">Church</span></div></li>

와 같이 callback attribute 를 추가한다. 그러면 해당 콜백을 수행한다.

## [route] 속성을 통해서 route 를 호출 할 때, callback_route hook 를 사용하기.

직접 ajax 호출하는 것과 달리 [route] 속성을 통해서 클릭을 하여 backend route 를 호출하면, hook 함수가 정의되어져 있다면 호출된다.

- 예를 들어 [route] 속성이
    
    route=model.class.method 와 같다면,

- callback_model_class_method() 가 호출된다.

## [route] 속성을 통해서 route 를 호출 할 때 추가 파라메타 전달하기

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


# ajax_load_route() 을 사용법


ajax_load_route() 는 backend 의 route 로 연결을 했는데,

- 비교적 에러가 날 확률이 적거나
- route 호출 후, 별도의 처리 과정이 없이 내용을 본문에 추가하려는 경우에


사용 할 수 있다.

예제) HTML FORM 문장에 class 등으로 아래와 같이 이벤트를 리스닝해서, 라우트를 추가하고, FORM 값을 serialize 해서 ajax_load_route() 로 전달하면 된다.
    
    function on_form_search_submit(e) {
        e.preventDefault();
        var route = 'company.Controller.search&' + $(this).serialize();
        ajax_load_route( route );
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

# app.alert

앱에서 사용가능한 alert 박스 메세지로서 aync 로 동작을 한다.

확인 버튼을 클릭하여 alert 박스 창이 닫기면 callback 이 실행된다.

시간이 경과하여 자동으로 창이 닫기면 실행되지 않는다.




예제)
    app.alert("안녕하세요.", function() {
        console.log('app.alert closed');
    },
    10);


# 패널

패널은 index.html 에 기본 구조만 CSS 만 등록하고 실제 내용 추가나 디자인은 backend.js 자바스크립트에서 한다.

예제) frontend 의 HTML 예제

    <div class="page">
        <header>.header</header>
        <nav class="panel-menu"><div class="menus"><ul></ul></div></nav>
        <section class="content">.content</section>
        ....
    </div>

위와 같이 .panel-menu 는 nav 태그에 작성되어야하며 내부에 ul.menus 를 가져야한다.

그리고 page 에 속해 있어야 하며 header 바로 밑에 지정되어야 한다.

app.panel 에 panel menu 관련 루틴이 있다.

.open-panel-menu-button 이벤트를 리스닝하고 클릭하면 열기를 한다.

닫기는 특별한 class 를 이벤트를 리스닝하지 않고,
- .page .content
- .page footer
- nav.panel-menu ul li
- .open-panel-menu-button

를 리스닝하고 클릭하면 panel menu 를 닫는다. .open-panel-menu-button 은 panel 열려져 있는 경우 닫는다. 

app.panel.init() 를 참고한다.

예제) panel menu 열기/닫기 예제

    setTimeout(app.panel.close, 500);
    setTimeout(app.panel.open, 1300);


다음은 backend 의 자바스크립트에서 메뉴를 추가하는 예이다.

예제) backend.js 가 로드 될 때, panel 메뉴에 항목을 구하는 예 

    var m = '<li class="item no1">인터넷을 연결하세요.</li>' +
        '<li class="item no2">인터넷을 연결하세요.</li>' +
        '<li class="item close close-panel-menu-button">메뉴닫기</li>' +
        '';
    app.panel.el().find('ul').append(m);

위 예에서 보면, .close-panel-menu-button 을 추가하는 것을 알 수 있다.


헤더에는 아래와 같이 .open-panel-menu-button 을 추가하면 된다.

예제) panel menu 를 열기 위한 버튼 추가

    <td width="25%" class="open-panel-menu-button">...</td>



예제)


# 회원 별 정보 보여주기

username="xxxx" 속성을 가지고 있는 Element 는 해당 사용자 인 경우에만 나타난다.

예를 들면 관리자 인 경우에만 보여주고자 한다면,

    <p username="admin">...</p>

와 같이 하면, 위 항목은 username 이 admin 인 경우에만 나타난다.

주로,

- 관리자인지 아닌지
- 특정 회원 로그이인지 아닌지
- 비 회원 로그인인지 아닌지를 판별할 수 있다.


를 판별 할 때, 사용된다.

이를 잘 활용하면, .user-in 과 .user-out 의 용도로도 활용이 가능하다.

예제) username 속성의 활용 예제
    
    '<li class="item" username="admin" route="company.Controller.admin">관리자 페이지</li>' +
    '<li class="item" username="user3" route="company.Controller.admin">user3</li>' +
    '<li class="item" username="" route="company.Controller.admin">비 로그인</li>' +




# 이벤트

## url 속성

url 속성이 있는 태그를 클릭하면 해당 url 로 이동한다.

    <td width="25%" class="home-button left" url="index.html">
        <i class="nav-link fa fa-home icon-home"></i>
    </td>

위 예제에서는 현재 페이지를 indexhtml 로 이동 시킨다.




# .rows .row .caption .text CSS 적용

주로 테이블 형식 또는 리스트 형식을 표현 할 때 사용한다.

값이 없으면 .row 전체를 표현하지 않는 것이 좋다.

caption 이 필요 없으면 그냥 .row 안에 바로 내용을 집어 넣으면 된다.

이 때, 별도의 추가 css 디자인을 적절히 해 주면 된다.

예제)
   

    <div class="rows">
        <div class="row"><?php echo $company->title?></div>
        <div class="row">
            <span class="caption">회사명</span>
            <span class="text"><?php echo $company->company_name?></span>
        </div>
        <div class="row">
            <span class="caption">대표자</span>
            <span class="text"><?php echo $company->ceo_name?></span>
        </div>
        <div class="row">
            <span class="caption">홈페이지</span>
            <span class="text"><?php echo $company->homepage?></span>
        </div>
        <div class="row"><?php echo $company->content?></div>
    </div>


