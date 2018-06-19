document.addEventListener('DOMContentLoaded', function () {
    /*
    Array.from Polyfill
    참조 - MDN (https: //developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
    */
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
                return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
                var number = Number(value);
                if (isNaN(number)) { return 0; }
                if (number === 0 || !isFinite(number)) { return number; }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
                var len = toInteger(value);
                return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike/*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else      
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                        throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                        T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                        A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                        A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }


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