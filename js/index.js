document.addEventListener('DOMContentLoaded', function () {
    /* 
    플로팅 버튼 + 헴버거 애니메이션 이벤트
    */
    // 플로팅 버튼
    var floatBtn = document.querySelector('[name=floating-btn]');
    // 플로팅 자식들의 wrap
    var floatChildWrap = document.querySelector('[name=floating-child-wrap]');
    // 플로팅 자식들
    var floatChildArr = Array.from(document.querySelectorAll('[name=floating-child]'));
    // 플로팅 여백
    var floatBlank = document.querySelector('.floating-blank');
    // 느낌표 라인들
    var line = Array.from(document.querySelectorAll('.line'));
    var lineTop = document.getElementById('line-top');
    var lineDot = document.getElementById('line-dot');
    /* 
    Header 의 Search 영역
    */
    // 검색 아이콘
    var searchIcon = document.querySelector('[name=search-icon]');
    // 검색 닫기 아이콘
    var closeIcon = document.querySelector('[name=close-icon]');
    var searchWrapDesk = document.querySelector('.search-wrap-desk');
    /*
    Main page Twitter variables
    */
    // Twitter Project menu wrapper
    var tProjectMenu = document.querySelector('.t-project-menu-wrap');
    // Twitter Koinvestor link and intro wrapper
    var tKoinvestorLink = document.querySelector('.t-koinvestor-link');





    // 플로팅버튼 클릭 이벤트
    floatBtn.addEventListener('click', function () {
        line.forEach(function (mnb) {
            mnb.classList.remove('init');
        })

        lineTop.classList.toggle('line-top-reverse');
        lineTop.classList.toggle('line-top-ani');
        lineDot.classList.toggle('line-dot-reverse');
        lineDot.classList.toggle('line-dot-ani');

        floatBtn.classList.toggle('shadow-box');
        floatBtn.classList.toggle('shadow-box-inset');

        if (lineTop.classList.contains('line-top-reverse')) {
            floatChildArr.forEach(function (item) {
                item.classList.remove('fadeInRight');
                item.classList.add('fadeOutRight');
            })
            floatBlank.classList.toggle('floating-blank-ani');
        } else {
            floatChildWrap.classList.remove('display-toggle');
            floatChildArr.forEach(function (item) {
                item.classList.remove('fadeOutRight');
                item.classList.add('fadeInRight');
            })
            floatBlank.classList.toggle('floating-blank-ani');
        }
    })
    // 플로팅 버튼 이벤트 활성 상태 시 여백 클릭 이벤트
    floatBlank.addEventListener('click', function () {
        floatChildArr.forEach(function (item) {
            item.classList.remove('fadeInRight');
            item.classList.add('fadeOutRight');
        })
        floatBlank.classList.toggle('floating-blank-ani');

        lineTop.classList.toggle('line-top-reverse');
        lineTop.classList.toggle('line-top-ani');
        lineDot.classList.toggle('line-dot-reverse');
        lineDot.classList.toggle('line-dot-ani');
    })

    // Search Icon 클릭 이벤트
    searchIcon.addEventListener('click', function () {
        searchWrapDesk.classList.remove('d-none');
        searchWrapDesk.classList.remove('fadeOutRight');
        searchWrapDesk.classList.add('fadeInRight');
    })
    // Close Icon 클릭 이벤트
    closeIcon.addEventListener('click', function () {
        searchWrapDesk.classList.add('fadeOutRight');
        searchWrapDesk.classList.remove('fadeInRight');
    })


    /*
    Sticky
    */
    // Twitter left, right의 content들 화면 상단에 걸리게하기
    var sticky = new Sticky('[data-sticky]');

    /*
    Waypoints
    */
    // Twitter right wrpper의 project-menu-wrap
    var waypoint = new Waypoint({
        element: document.querySelector('.t-project-menu-wrap'),
        handler: function(item) {
            this.element.classList.add('fadeInUp');
        },
        offset: '50%'
    })
    // Twitter right wrpper의 project-menu-wrap
    var waypoint = new Waypoint({
        element: document.querySelector('.t-koinvestor-link'),
        handler: function (item) {
            this.element.classList.add('fadeInUp');
        },
        offset: 'bottom-in-view'
    })
    /*
    ScrollReveal
    */
   window.sr = ScrollReveal();
   sr.reveal('.main-footer', {
       reset: true,
       distance: '400px',
       scale: 1,
       duration: 1000
   });

})