# frontend

Web App Frontend Framework

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


//
oo



# route 를 통해서 backend 와 통신하며 view 하기


    <td width="25%" route="company.Controller.admin"><i class="nav-link fa fa-folder-o"></i>Admin</td>

위 예제를 보면 route='company.Controller.admin' 을 볼 수 있다.

클릭을 하면, route.js 에서 click 이벤트를 받으며 backend 서버의 해당 model/class/method 를 호출하고 결과를

    el.content().html(...)

와 같이 하여 바로 컨텐츠 페이지에 넣는다.

## route 를 호출 할 때, callback 으로 처리하기

하지만 바로 컨텐츠 페이지에 넣지 않고 한번 요리를 하고 싶다면,

    <li route="company.Controller.searchInformation&category=Church" callback="display_company_list"><div><img src="img/category-icons/church.png"><span class="text">Church</span></div></li>

와 같이 callback attribute 를 추가한다. 그러면 해당 콜백을 수행한다.


## route 를 호출 할 때 추가 파라메타 전달하기

    <li route="company.Controller.searchInformation&category=Church" callback="display_company_list">

위와 같이 route="....&param=value&param=value" 와 같이 하면 된다.

