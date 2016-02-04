# frontend
Web App Frontend Framework


# 헤더/푸터에 사용하는 테이블 메뉴 사용하기

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

@todo 여기서 부터...

//
oo
