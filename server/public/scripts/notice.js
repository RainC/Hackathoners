function notice(noticeData, time) {
    doBlind();

    // 화면 어두워진 후에 공지 화면 출력
    setTimeout(function() {
        showNoticeScreen(notice);
    }, 1000);

    // gif 로고 반짝임 실행
    setTimeout(playGif, 2000);

    // gif 실행 후 content show

    setTimeout(function() {
        showNoticeContent(noticeData);
    }, 2450);

    // 시간 지난 뒤 어두워지고 화면 다시 돌림
    setTimeout(doBlind, (time + 1) * 1000);
    setTimeout(hideNoticeContent, (time + 2) * 1000);

    // 시간 지난 후에 공지 화면 숨김
    setTimeout(function() {
        hideNoticeScreen(notice);
    }, (time + 2) * 1000);
}

function doBlind() {
    getDark();
    setTimeout(getBright, 1000);
}

function getDark() {
    var div_blind = document.getElementById('div-blind').style.opacity = 1;
}

function getBright() {
    document.getElementById('div-blind').style.opacity = 0;
}


function showNoticeScreen(noticeData, time) {
    document.getElementById('div-notice').style.opacity = 1;
    document.getElementById('img-notice-back').src = "./resources/back_notice_default.png";
}

function showNoticeContent(noticeData) {
    setNoticeText(['a', 'b', 'c']);
    document.getElementById('txt-notice-back').style.opacity = 1;
}

function hideNoticeContent() {
    document.getElementById('txt-notice-back').style.opacity = 0;
}

function hideNoticeScreen() {
    document.getElementById('div-notice').style.opacity = 0;
}

function playGif() {
    document.getElementById('img-notice-back').src = "./resources/back_notice_active.gif";
}

function setNoticeText(noticeData) {
    
    var bodyWidth = $('#div-notice').width();
    var bodyHeight = $('#div-notice').height();
  
    var wrapHeight = $('#div-notice-back').height();
    var wrapWidth = 1.505882352941176 * wrapHeight;

    var div_box_ltwh = [
        [0, 0.3984, 1, 0.16, 'ver-align-hor'],
        [0, 0.6840, 1, 0.06, 'ver-align-hor'],
        [0, 0.7852, 1, 0.06, 'ver-align-hor']
    ];

    $( '.box-notice' ).each(function ( i, box ) {
        $( box ).css("left", (bodyWidth - wrapWidth)/2 + wrapWidth * div_box_ltwh[i][0]);
        $( box ).css("top", wrapHeight * div_box_ltwh[i][1]);


        var html = '<span style="white-space:nowrap"></span>',
            line = $( box ).wrapInner( html ).children()[ 0 ],
            n = 200;

        $( box ).css("height", wrapHeight * div_box_ltwh[i][3]);
        var height = $( box ).height();

        $( box ).css( 'font-size', n );

        while ( $( line ).height() > height ) {
            $( box ).css( 'font-size', --n );
        }

        $( box ).css("width", wrapWidth * div_box_ltwh[i][2]);
        $( box ).css('text-align', 'center');
        $( box ).text( $( line ).text() );
    });
}