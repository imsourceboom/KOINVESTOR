document.addEventListener('DOMContentLoaded', function() {
	/*
      Array.from Polyfill
      참조 - MDN (https: //developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
      */
	if (!Array.from) {
		Array.from = (function() {
			var toStr = Object.prototype.toString;
			var isCallable = function(fn) {
				return (
					typeof fn === 'function' ||
					toStr.call(fn) === '[object Function]'
				);
			};
			var toInteger = function(value) {
				var number = Number(value);
				if (isNaN(number)) {
					return 0;
				}
				if (number === 0 || !isFinite(number)) {
					return number;
				}
				return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
			};
			var maxSafeInteger = Math.pow(2, 53) - 1;
			var toLength = function(value) {
				var len = toInteger(value);
				return Math.min(Math.max(len, 0), maxSafeInteger);
			};

			// The length property of the from method is 1.
			return function from(arrayLike /*, mapFn, thisArg */) {
				// 1. Let C be the this value.
				var C = this;

				// 2. Let items be ToObject(arrayLike).
				var items = Object(arrayLike);

				// 3. ReturnIfAbrupt(items).
				if (arrayLike == null) {
					throw new TypeError(
						'Array.from requires an array-like object - not null or undefined'
					);
				}

				// 4. If mapfn is undefined, then let mapping be false.
				var mapFn =
					arguments.length > 1 ? arguments[1] : void undefined;
				var T;
				if (typeof mapFn !== 'undefined') {
					// 5. else
					// 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
					if (!isCallable(mapFn)) {
						throw new TypeError(
							'Array.from: when provided, the second argument must be a function'
						);
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
						A[k] =
							typeof T === 'undefined'
								? mapFn(kValue, k)
								: mapFn.call(T, kValue, k);
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
		})();
	}

	var doc = document;

	/*
      Main Vue.js
      */

	new Vue({
		el: '#main',
		data: {
			main: false,
			section: false,
			login: false
		}
	});

	// Main Tag
	var main = doc.querySelector('#main');

	if (main != null) {
		var mainClass = main.getAttribute('class');
		if (mainClass.indexOf('main') != -1) {
			// Main Tag의 자식들(Section tag)을 담는 변수
			var mainChildren = Array.from(main.children);
			// index Section 이외 나머지 섹션 배경색 화이트 적용
			mainChildren.forEach(function(el) {
				if (el.classList.contains('index')) {
					main.style.backgroundColor = 'none';
				} else if (el.classList.contains('twitter')) {
					main.style.backgroundColor = 'none';
				} else {
					el.style.backgroundColor = 'white';
				}
			});

			var indexSection = doc.querySelector('.index');

			if (indexSection != null) {
				if (indexSection.classList.contains('index')) {
					/* twitter article */
					// twitter Logo의 mouseover Event
					var twitterLogo = document.querySelector('.twitter-logo');
					twitterLogo.addEventListener('mouseover', twitTyped);

					function twitTyped() {
						var typed = new Typed('#typed', {
							strings: [
								'트위터 <strong>페이지</strong>',
								'트위터 <strong>바로가기</strong>'
							],
							typeSpeed: 30,
							backSpeed: 50
						});
						twitterLogo.removeEventListener('mouseover', twitTyped);
					}
					// Twitter right wrpper의 project-menu-wrap waypoint
					var waypoint = new Waypoint({
						element: document.querySelector('.t-project-menu-wrap'),
						handler: function(item) {
							this.element.classList.add('fadeInUp');
						},
						offset: '50%'
					});
					// Twitter left wrpper의 koinvestor twit waypoint
					var waypoint = new Waypoint({
						element: document.querySelector('.t-koinvestor-link'),
						handler: function(item) {
							this.element.classList.add('fadeInUp');
						},
						offset: '50%'
					});
				}
			}

			/* 
              Twitter Section
              */

			var twitterSection = doc.querySelector('.twitter');

			if (twitterSection != null) {
				if (twitterSection.classList.contains('twitter')) {
					// Twitter right wrpper의 project-menu-wrap waypoint
					// var waypoint = new Waypoint({
					//     element: document.querySelector(".twi-section-right"),
					//     handler: function (item) {
					//         this.element.classList.add("fadeInUp")
					//     },
					//     offset: 0
					// })
					// Twitter left wrpper의 koinvestor twit waypoint
					// var waypoint = new Waypoint({
					//     element: document.querySelector(".twi-section-left"),
					//     handler: function (item) {
					//         this.element.classList.add("fadeInUp")
					//     },
					//     offset: "1%"
					// })

					// twitter Element object
					var twitterEl = {
						mobile: {
							twitterSymbol: doc.querySelector('.twitter-symbol'),
							menuWrap: doc.querySelector('.twitter-menu-wrap')
						}
					};
					// twitter Method object
					var twitterMethod = {
						// click 시 메뉴들 아코디언 IN OUT 애니메이션 class toggle 함수
						menuIn: function() {
							this.classList.toggle('pulse');
							this.children[0].classList.toggle('text-info');
							var el = twitterEl.mobile.menuWrap;
							if (!el.classList.contains('twit-menu-in')) {
								el.classList.toggle('twit-menu-in');
							} else if (el.classList.contains('twit-menu-in')) {
								el.classList.toggle('twit-menu-out');
							}
						}
					};

					twitterEl.mobile.twitterSymbol.addEventListener(
						'click',
						twitterMethod.menuIn
					);
				}
			}

			/*
                  Project Section
                  */
			var projectSection = doc.querySelector('.project');

			if (projectSection != null) {
				if (projectSection.classList.contains('project')) {
					// Element object
					var projectEl = {
						// PC ver
						deskTop: {
							// 전체보기
							allView: doc.querySelector('.pc-project-all'),
							// 메뉴 아이템들
							listItem: Array.from(
								doc.querySelector('.pc-project-list').children
							)
						},
						// Mobile ver
						mobile: {
							// 프로젝트 선택
							select: doc.querySelector('.project-select'),
							// 메뉴 Wrap
							listWrap: doc.querySelector('.project-list'),
							// 메뉴 아이템들
							listItem: Array.from(
								doc.querySelector('.project-list').children
							)
						}
					};
					// Method object
					var projectMethod = {
						deskTop: {
							// project menu 전체보기 Method
							allView: function() {
								// projectEl.deskTop.allView.addEventListener('click', function () {
								projectEl.deskTop.listItem.forEach(function(
									item
								) {
									var itemChild = Array.from(item.children);
									item.style.backgroundColor = '#ffffff';
									itemChild[0].style.transform = 'none';
									itemChild[0].style.backgroundColor =
										'#ffffff';
								});
								// })
							},
							menuActiveToggle: function() {
								projectEl.deskTop.listItem.forEach(function(
									item
								) {
									// console.log(item)
									item.addEventListener('click', function() {
										console.log(this);
										var thisChild = Array.from(
											this.children
										);
										if (
											this.style.backgroundColor ==
											'rgb(214, 240, 228)'
										) {
											thisChild[0].style.transform =
												'none';
											this.style.backgroundColor =
												'#ffffff';
										} else {
											thisChild[0].style.transform =
												'translate( 20%, 0)';
											thisChild[0].style.backgroundColor =
												'#ffffff';
											this.style.backgroundColor =
												'rgb(214, 240, 228)';
										}
									});
								});
							}
						},
						mobile: {
							selectAccordion: function() {
								var el = projectEl.mobile.listWrap;
								if (el.classList.contains('d-none')) {
									if (el.classList.contains('accordionOut')) {
										el.classList.toggle('accordionOut');
									}
									el.classList.toggle('d-none');
									el.classList.toggle('accordionIn');
									setTimeout(function() {
										el.classList.remove('accordionIn');
									}, 700);
								} else {
									projectMethod.mobile.projectListOut();
								}
							},
							itemAccordionOut: function() {
								projectEl.mobile.listItem.map(function(el) {
									el.addEventListener(
										'click',
										projectMethod.mobile.projectListOut
									);
								});
							},
							projectListOut: function() {
								var el = projectEl.mobile.listWrap;
								el.classList.toggle('accordionOut');
								setTimeout(function() {
									el.classList.remove('accordionOut');
									el.classList.toggle('d-none');
								}, 700);
							}
						}
					};

					projectEl.deskTop.allView.addEventListener(
						'click',
						projectMethod.deskTop.allView
					);
					// projectEvent.deskTop.allView();
					projectMethod.deskTop.menuActiveToggle();

					projectEl.mobile.select.addEventListener(
						'click',
						projectMethod.mobile.selectAccordion
					);
					projectMethod.mobile.itemAccordionOut();
				}
			}

			var projectNativeCode = {
				// Mobile ver. Project select and Project Menu click Event
				// 프로젝트 선택
				// var projectSelect_M = document.querySelector('.project-select');
				// 프로젝트 메뉴들 감싸고 있는 Wrapper
				// var projectList_M = document.querySelector('.project-list');
				// 프로젝트 메뉴들
				// var projectMenu_M = Array.from(document.querySelectorAll('.project-menu'));
				// accordion animation class toggle
				// projectSelect_M.addEventListener('click', function () {
				//     if (projectList_M.classList.contains('d-none')) {
				//         if (projectList_M.classList.contains('accordionOut')) {
				//             projectList_M.classList.toggle('accordionOut');
				//         }
				//         projectList_M.classList.toggle('d-none');
				//         projectList_M.classList.toggle('accordionIn');
				//         setTimeout(function () {
				//             projectList_M.classList.remove('accordionIn');
				//         }, 700);
				//     } else {
				//         projectListOut();
				//     }
				// })
				// projectMenu_M.forEach(function (menu) {
				//     menu.addEventListener('click', projectListOut);
				// })
				// function projectListOut(event) {
				//     projectList_M.classList.toggle('accordionOut');
				//     setTimeout(function () {
				//         projectList_M.classList.remove('accordionOut');
				//         projectList_M.classList.toggle('d-none');
				//     }, 700);
				// }
				// DeskTop ver. Project Menu Click Event
				// 전체보기
				// var projectAll_Pc = document.querySelector('.pc-project-all');
				// Menu들을 감싸고 있는 부모 Element
				// var projectList_Pc = document.querySelector('.pc-project-list');
				// Menu iTems
				// var projectListChildren_Pc = Array.from(projectList_Pc.children);
				// menu item을 click 했을 때 target의 단독 Event
				// projectListChildren_Pc.forEach(function (item) {
				//     item.addEventListener('click', function () {
				//         console.log(this)
				//         var thisChild = Array.from(this.children);
				//         if (this.style.backgroundColor == 'rgb(214, 240, 228)') {
				//             thisChild[0].style.transform = 'none';
				//             this.style.backgroundColor = '#ffffff';
				//         } else {
				//             thisChild[0].style.transform = 'translate( 20%, 0)';
				//             thisChild[0].style.backgroundColor = '#ffffff';
				//             this.style.backgroundColor = 'rgb(214, 240, 228)';
				//         }
				//     })
				// })
				// project menu 전체보기 click Event
				// projectAll_Pc.addEventListener('click', function () {
				//     projectListChildren_Pc.forEach(function (item) {
				//         var itemChild = Array.from(item.children);
				//         item.style.backgroundColor = '#ffffff';
				//         itemChild[0].style.transform = 'none';
				//         itemChild[0].style.backgroundColor = '#ffffff';
				//     })
				// })
			};

			/*
                  Detail Page Section
                  */

			var detailSection = document.querySelector('.detail');

			if (detailSection != null) {
				if (detailSection.classList.contains('detail')) {
					// Element object
					var detailEl = {
						// 공유하기 버튼관련 엘리멘트들
						share: {
							btn: doc.querySelector('.share-btn'),
							copy: doc.querySelector('.address-copy-alert')
						},
						// 좋아요 관련 엘리멘트들
						like: {
							wrap: doc.querySelector('.like-wrap'),
							icon: doc.querySelector('.like-icon')
						}
					};
					// Method object
					var detailMethod = {
						// 공유하기 버튼 클릭시 '주소가 복사되었습니다'라는 엘리먼트 나타났다 사라지는 애니메이션 클릭 이벤트
						copyAlert: function() {
							detailEl.share.copy.classList.add(
								'copy-alert-toggle'
							);
							setTimeout(function() {
								detailEl.share.copy.classList.remove(
									'copy-alert-toggle'
								);
							}, 3000);
						},
						// 하트 아이콘 클릭시 하트 애니메이션 트리거 토글 이벤트
						likeActive: function() {
							var el = detailEl.like.icon;
							detailEl.like.wrap.classList.toggle('bg-white');
							if (!el.classList.contains('active')) {
								el.classList.toggle('active');
							} else if (el.classList.contains('active')) {
								el.classList.toggle('destroy');
							}
						}
					};

					detailEl.share.btn.addEventListener(
						'click',
						detailMethod.copyAlert
					);
					detailEl.like.wrap.addEventListener(
						'click',
						detailMethod.likeActive
					);
				}
			}

			/*
                  My Page Section
                  */
			var myPageSection = doc.querySelector('.my-page');

			if (myPageSection != null) {
				if (myPageSection.classList.contains('my-page')) {
					var myPageEl = {
						teleCancel: doc.querySelector('.tele-cancel'),
						modal: doc.querySelector('.tele-modal'),
						modalCancel: doc.querySelector('.modal-cancel')
					};

					var myPageMethod = {
						cancelEvent: function() {
							console.log('hi');
							myPageEl.modal.classList.toggle('d-none');
						}
					};

					myPageEl.teleCancel.addEventListener(
						'click',
						myPageMethod.cancelEvent
					);
					myPageEl.modalCancel.addEventListener(
						'click',
						myPageMethod.cancelEvent
					);
				}
			}
		}
	}

	// Header Mobile
	var headerMobile = document.querySelector('.m-header');
	/* 
      플로팅 버튼 + 헴버거 애니메이션 이벤트
      */
	// 플로팅 버튼
	var floatBtn = document.querySelector('#floating-btn');
	// 플로팅 자식들의 wrap
	var floatChildWrap = document.querySelector('[name=floating-child-wrap]');
	// 플로팅 자식들
	var floatChildArr = Array.from(
		document.querySelectorAll('[name=floating-child]')
	);
	// 플로팅 여백
	var floatBlank = document.querySelector('.floating-blank');
	// 느낌표 라인들
	var line = Array.from(document.querySelectorAll('.line'));
	var lineTop = document.getElementById('line-top');
	var lineDot = document.getElementById('line-dot');
	/* 
      Header 영역
      */
	// 검색 아이콘
	var searchIcon = document.querySelector('[name=search-icon]');
	// 검색 아이콘 Mobile
	var searchIconMobile = document.querySelector('[name=m-search-icon]');
	// 검색 닫기 아이콘
	var closeIcon = document.querySelector('[name=close-icon]');
	/* 
      Search 영역
      */
	// 검색 영역
	var searchWrapDesk = document.querySelector('.search-wrap-desk');

	// DeskTop Navigation
	var navList_Pc = document.querySelector('.pc-nav-list');
	var navChildren_Pc = Array.from(navList_Pc.children);

	// var logo = document.querySelector(".logo")

	// PC ver. Nav의 Menu Click시 선택된 menu에 .active class 추가
	navList_Pc.addEventListener('click', pcNavActive);

	function pcNavActive() {
		navChildren_Pc.map(function(li) {
			if (li === event.target) {
				li.classList.add('active');
			} else {
				li.classList.remove('active');
			}
		});
	}

	// 클릭시 화면전환 코드 (Router)
	{
		// function fadeInSetTime(sec) {
		//     sec.classList.toggle("animated")
		//     sec.classList.toggle("fadeIn")
		//     setTimeout(function () {
		//         sec.classList.toggle("animated")
		//         sec.classList.toggle("fadeIn")
		//     }, 1000)
		// }
		// function menuLogo_Pc() {
		//     mainChildren.forEach(function (sec) {
		//         if (
		//             sec.classList.contains("index") &&
		//             sec.classList.contains("d-none") &&
		//             !sec.classList.contains("d-lg-block")
		//         ) {
		//             sec.classList.toggle("d-lg-block")
		//             fadeInSetTime(sec)
		//         } else {
		//             if (sec.classList.contains("blockchain") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("project") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("twitter") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("notice") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             }
		//         }
		//     })
		// }
		// function menuBlockChain_Pc() {
		//     mainChildren.forEach(function (sec) {
		//         if (sec.classList.contains("blockchain") && sec.classList.contains("d-none")) {
		//             sec.classList.toggle("d-none")
		//             fadeInSetTime(sec)
		//             console.log("blockchain")
		//         } else {
		//             if (sec.classList.contains("index") && sec.classList.contains("d-lg-block")) {
		//                 sec.classList.toggle("d-lg-block")
		//             } else if (sec.classList.contains("project") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("twitter") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("notice") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             }
		//         }
		//     })
		// }
		// function menuProject_Pc() {
		//     mainChildren.forEach(function (sec) {
		//         if (sec.classList.contains("project") && sec.classList.contains("d-none")) {
		//             sec.classList.toggle("d-none")
		//             fadeInSetTime(sec)
		//         } else {
		//             if (sec.classList.contains("index") && sec.classList.contains("d-lg-block")) {
		//                 sec.classList.toggle("d-lg-block")
		//             } else if (sec.classList.contains("blockchain") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("twitter") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("notice") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             }
		//         }
		//     })
		// }
		// function menuTwitter_Pc() {
		//     mainChildren.forEach(function (sec) {
		//         if (sec.classList.contains("twitter") && sec.classList.contains("d-none")) {
		//             sec.classList.toggle("d-none")
		//             fadeInSetTime(sec)
		//         } else {
		//             if (sec.classList.contains("index") && sec.classList.contains("d-lg-block")) {
		//                 sec.classList.toggle("d-lg-block")
		//             } else if (sec.classList.contains("blockchain") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("project") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("notice") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             }
		//         }
		//     })
		// }
		// function menuNotice_Pc() {
		//     mainChildren.forEach(function (sec) {
		//         if (sec.classList.contains("notice") && sec.classList.contains("d-none")) {
		//             sec.classList.toggle("d-none")
		//             fadeInSetTime(sec)
		//         } else {
		//             if (sec.classList.contains("index") && sec.classList.contains("d-lg-block")) {
		//                 sec.classList.toggle("d-lg-block")
		//             } else if (sec.classList.contains("blockchain") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("project") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             } else if (sec.classList.contains("twitter") && !sec.classList.contains("d-none")) {
		//                 sec.classList.toggle("d-none")
		//             }
		//         }
		//     })
		// }
		// // index 화면으로 이동하는 Logo click Event
		// logo.addEventListener("click", menuLogo_Pc)
		// // Nav의 menu를 click시 각 해당 section display none, block 조작하는 Click event
		// navChildren_Pc.forEach(function (nav) {
		//     nav.addEventListener("click", function () {
		//         if (nav.innerText == "블록체인 뉴스") {
		//             menuBlockChain_Pc()
		//         } else if (nav.innerText == "프로젝트 소식") {
		//             menuProject_Pc()
		//         } else if (nav.innerText == "실시간 트위터") {
		//             menuTwitter_Pc()
		//         } else if (nav.innerText == "공지사항") {
		//             menuNotice_Pc()
		//         }
		//     })
		// })
	}

	// 플로팅버튼 클릭 이벤트
	floatBtn.addEventListener('click', function() {
		line.forEach(function(mnb) {
			mnb.classList.remove('init');
		});

		lineTop.classList.toggle('line-top-reverse');
		lineTop.classList.toggle('line-top-ani');
		lineDot.classList.toggle('line-dot-reverse');
		lineDot.classList.toggle('line-dot-ani');

		floatBtn.classList.toggle('shadow-box');
		floatBtn.classList.toggle('shadow-box-inset');

		if (lineTop.classList.contains('line-top-reverse')) {
			floatChildArr.forEach(function(item) {
				item.classList.remove('fadeInRight');
				item.classList.add('fadeOutRight');
			});
			floatBlank.classList.toggle('floating-blank-ani');
		} else {
			floatChildWrap.classList.remove('display-toggle');
			floatChildArr.forEach(function(item) {
				item.classList.remove('fadeOutRight');
				item.classList.add('fadeInRight');
			});
			floatBlank.classList.toggle('floating-blank-ani');
		}
	});
	// 플로팅 버튼 이벤트 활성 상태 시 여백 클릭 이벤트
	floatBlank.addEventListener('click', function() {
		floatChildArr.forEach(function(item) {
			item.classList.remove('fadeInRight');
			item.classList.add('fadeOutRight');
		});
		floatBlank.classList.toggle('floating-blank-ani');

		lineTop.classList.toggle('line-top-reverse');
		lineTop.classList.toggle('line-top-ani');
		lineDot.classList.toggle('line-dot-reverse');
		lineDot.classList.toggle('line-dot-ani');
	});

	// Search Icon Click Event ( DeskTop Ver. )
	/*
      Search 영역이 화면에 나타난다.
      */
	searchIcon.addEventListener('click', function() {
		searchWrapDesk.classList.toggle('d-none');
		searchWrapDesk.classList.remove('fadeOutRight');
		searchWrapDesk.classList.add('fadeInRight');
	});

	// Close Icon 클릭 이벤트
	closeIcon.addEventListener('click', function() {
		searchWrapDesk.classList.add('fadeOutRight');
		searchWrapDesk.classList.remove('fadeInRight');
		setTimeout(function() {
			searchWrapDesk.classList.toggle('d-none');
		}, 600);
	});

	// ( Mobile Ver. ) Search Icon Click Event
	/*
      - Search 영역이 위 아래 애니메이션으로 화면에 추가 및 삭제 됨
      - Header 영역이 Search 영역과 같이 위 아래로 움직임
      - Icon이 Search 와 Close 로 Toggl
      */
	searchIconMobile.addEventListener('click', function() {
		if (searchWrapDesk.classList.contains('d-none')) {
			if (searchWrapDesk.classList.contains('fadeOutUp')) {
				searchWrapDesk.classList.toggle('fadeOutUp');
			}
			searchWrapDesk.classList.toggle('d-none');
			searchWrapDesk.classList.toggle('fadeInDown');
		} else {
			searchWrapDesk.classList.toggle('fadeInDown');
			searchWrapDesk.classList.toggle('fadeOutUp');
			setTimeout(function() {
				searchWrapDesk.classList.toggle('d-none');
			}, 600);
		}

		headerMobile.classList.toggle('m-header-movedown');

		if (this.innerText == 'search') {
			this.innerText = 'close';
		} else {
			this.innerText = 'search';
		}
	});

	/*
      Sticky
      */
	// Twitter left, right의 content들 화면 상단에 걸리게하기
	var sticky = new Sticky('[data-sticky]');

	/* 
      Index Section
      */

	/*
      ScrollReveal
      */
	// window.sr = ScrollReveal();
	// sr.reveal(".main-footer", {
	//     reset: true,
	//     distance: "400px",
	//     scale: 1,
	//     duration: 1000
	// })

	// ( Mobile ver. ) Hamburger Menu
	// m-header에 있는 햄버거
	var hamburger = document.querySelector('.hbg-box');
	// nav에 있는 햄버거
	var navHamburger = document.querySelector('[name=nav-hbg]');
	// nav Tag 페이지
	var navPage = document.querySelector('.nav');

	// Mobile Header Hamburger Click Event
	// Header의 Hamburger와 Nav의 Hamburger class 동기화
	hamburger.addEventListener('click', function() {
		hamburger.children[0].classList.toggle('top-deg');
		hamburger.children[1].classList.toggle('opacity-0');
		hamburger.children[2].classList.toggle('bot-deg');
		// navigation page 화면 In
		if (navPage.classList.contains('d-none')) {
			if (navPage.classList.contains('fadeOutRight')) {
				navPage.classList.toggle('fadeOutRight');
			}
			navPage.classList.toggle('d-none');
			navPage.classList.toggle('fadeInRight');
		}

		setTimeout(function() {
			navHamburger.children[0].classList.toggle('top-deg');
			navHamburger.children[1].classList.toggle('opacity-0');
			navHamburger.children[2].classList.toggle('bot-deg');
		}, 150);

		setTimeout(function() {
			headerMobile.classList.toggle('d-none');
			main.classList.toggle('d-none');
		}, 500);
	});
	// Nav Page의 Hamburger Click Event
	navHamburger.addEventListener('click', function() {
		navHamburger.children[0].classList.toggle('top-deg');
		navHamburger.children[1].classList.toggle('opacity-0');
		navHamburger.children[2].classList.toggle('bot-deg');
		// navigation page 화면 Out
		navPage.classList.toggle('fadeInRight');
		navPage.classList.toggle('fadeOutRight');
		setTimeout(function() {
			navPage.classList.toggle('d-none');
		}, 500);

		setTimeout(function() {
			hamburger.children[0].classList.toggle('top-deg');
			hamburger.children[1].classList.toggle('opacity-0');
			hamburger.children[2].classList.toggle('bot-deg');
		}, 100);

		main.classList.toggle('d-none');
		headerMobile.classList.toggle('d-none');
	});

	/*
      Swiper
      */
	// Mobile HeadLine Swiper
	var mySwiper = new Swiper('.swiper-container', {
		effect: 'fade',
		speed: 1000,
		loop: true,
		// scrollbar: {
		//     el: '.swiper-scrollbar',
		//     hide: true
		// },
		autoplay: {
			delay: 3000
		}
	});

	/*
      Admin Vue.js
      */

	new Vue({
		el: '#admin',
		data: {
			admin: false,
			isBorder: true,
			textGray: true,
			trans: {
				transition: '.3s'
			},
			navActiveClass: true,
			state: {
				// today: moment().format('YYYY.MM.D'),
				date: new Date()
			},
			navs: [
				{
					name: {
						ko: '공지사항',
						en: 'notice'
					},
					active: true
				},
				{
					name: {
						ko: '블록체인',
						en: 'blockchain'
					},
					active: false
				},
				{
					name: {
						ko: '프로젝트',
						en: 'project'
					},
					active: false
				},
				{
					name: {
						ko: '트위터',
						en: 'twitter'
					},
					active: false
				},
				{
					name: {
						ko: '통계',
						en: 'chart'
					},
					active: false
				}
			],
			projects: {
				ambrosus: {
					symbol: 'AMB',
					name: {
						ko: '앰브로서스',
						en: 'Ambrosus'
					},
					src: './img/logo/ambrosus_m.svg'
				},
				paypie: {
					symbol: 'PPP',
					name: {
						ko: '페이파이',
						en: 'Paypie'
					},
					src: './img/logo/paypie_m.svg'
				},
				playkey: {
					symbol: 'PKT',
					name: {
						ko: '플레이키',
						en: 'PlayKey'
					},
					src: './img/logo/playkey_m.svg'
				},
				qash: {
					symbol: 'QASH',
					name: {
						ko: '캐시',
						en: 'Qash'
					},
					src: './img/logo/qash_m.svg'
				},
				rsk: {
					symbol: 'RSK',
					name: {
						ko: '루트스톡',
						en: 'RSK'
					},
					src: './img/logo/rsk.svg'
				},
				telegram: {
					symbol: 'TON',
					name: {
						ko: '텔레그램',
						en: 'Telegram'
					},
					src: './img/logo/telegram.svg'
				},
				Windingtree: {
					symbol: 'LIF',
					name: {
						ko: '와인딩트리',
						en: 'Windingtree'
					},
					src: './img/logo/windingtree.svg'
				}
			},
			selected: ''
		},
		methods: {
			upAndtempo: function() {
				this.isBorder = !this.isBorder;
				this.textGray = !this.textGray;
			},
			navActive: function(selectedIndex) {
				this.navs.map(function(item, index) {
					if (selectedIndex === index) {
						item.active = true;
					} else {
						item.active = false;
					}
				});
			}
		},
		components: {
			vuejsDatepicker: vuejsDatepicker
		}
	});

	/*
      Admin Section
      */

	var admin = document.querySelector('#admin');
	if (admin != null) {
		var adminClass = admin.getAttribute('class');
		if (adminClass.indexOf('admin') != -1) {
			// 관리자 메뉴
			var adminNavWrap = document.querySelector('.admin-nav-wrap');
			var adminNav = Array.from(document.querySelectorAll('.admin-nav'));
			// 관리자 메뉴의 통계의 자식들
			var chartChildrenWrap = document.querySelector(
				'.chart-children-nav-wrap'
			);
			var chartChildren = Array.from(chartChildrenWrap.children);

			adminNavWrap.addEventListener('click', adminNavActive);
			chartChildrenWrap.addEventListener('click', chartChildrenActive);
			// Admin Navigation Active script
			function adminNavActive() {
				adminNav.map(function(el, index) {
					if (el === event.target) {
						el.classList.add('active');
						if (el.innerText === '통계') {
							chartChildrenWrap.classList.remove('d-none');
							chartChildrenWrap.classList.remove('fadeOutDown');
							chartChildrenWrap.classList.add('fadeInUp');
						} else {
							if (
								chartChildrenWrap.classList.contains('fadeInUp')
							) {
								chartChildrenWrap.classList.add('fadeOutDown');
								setTimeout(function() {
									chartChildrenWrap.classList.add('d-none');
								}, 500);
							}
							chartChildrenWrap.classList.remove('fadeInUp');
						}
					} else {
						el.classList.remove('active');
					}
				});
			}
			// 통계의 자식들 클릭 이벤트 함수
			function chartChildrenActive() {
				chartChildren.map(function(el) {
					if (el === event.target) {
						el.classList.add('active');
					} else {
						el.classList.remove('active');
					}
				});
			}

			// input File upload 시 fileName 적용하는 code
			var fileTarget = doc.querySelector('.upload-hidden');
			var fileNameBox = doc.querySelector('.upload-name');

			fileTarget.addEventListener('change', function() {
				console.log(this.files);
				if (window.FileReader) {
					var filename = this.files[0].name;
					console.log(filename);
				} else {
					var filename = this.val()
						.split('/')
						.pop()
						.split('\\')
						.pop();
				}
				fileNameBox.value = filename;
			});

			// Moment.js
			var momentNow = document.querySelector('.moment');

			var nowTime = moment().format('YYYY.MM.D');
			momentNow.innerText = nowTime;

			flatpickr('.flatdate', {
				dateFormat: 'Y.m.d'
				//   defaultDate: "today"
			});

			// CountUP.js
			var noticeHits = document.querySelector('.notice-hits');
			var blockchainHits = document.querySelector('.blockchain-hits');
			var projectHits = document.querySelector('.project-hits');
			var twitterHits = document.querySelector('.twitter-hits');

			var options = {
				useEasing: true,
				useGrouping: true,
				separator: ',',
				decimal: '.'
			};

			new CountUp(
				noticeHits,
				0,
				noticeHits.innerText,
				0,
				2,
				options
			).start();
			new CountUp(
				blockchainHits,
				0,
				blockchainHits.innerText,
				0,
				2,
				options
			).start();
			new CountUp(
				projectHits,
				0,
				projectHits.innerText,
				0,
				2,
				options
			).start();
			new CountUp(
				twitterHits,
				0,
				twitterHits.innerText,
				0,
				2,
				options
			).start();

			// if (!demo.error) {
			//     demo.start();
			// } else {
			//     console.error(demo.error);
			// }

			// Chart JS
			// notice Graph
			var noticeGraph = document
				.querySelector('#notice-graph')
				.getContext('2d');
			new Chart(noticeGraph, {
				type: 'line',
				data: {
					labels: [
						'2009',
						'2010',
						'2011',
						'2012',
						'2013',
						'2014',
						'2015',
						'2016',
						'2017',
						'2018'
					],
					datasets: [
						{
							label: 'Hits',
							data: [
								100,
								300,
								200,
								500,
								2500,
								2000,
								3500,
								3000,
								1000,
								5400
							],
							lineTension: 0,
							// fill: false,
							borderColor: '#9B3838',
							pointHoverBackgroundColor: '#fbfcfc',
							pointHoverBorderColor: '#eb0e0e',
							pointHoverBorderWidth: 2,
							pointHoverRadius: 7
						}
					]
				},
				options: {
					legend: {
						display: false
					}
				}
			});
			// blockchain Graph
			var blockchainGraph = document
				.querySelector('#blockchain-graph')
				.getContext('2d');
			new Chart(blockchainGraph, {
				type: 'bar',
				data: {
					labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
					datasets: [
						{
							label: 'Hits',
							data: [
								1101,
								990,
								870,
								750,
								610,
								534,
								489,
								390,
								210,
								100
							],
							// backgroundColor: 'green',
							backgroundColor: [
								'#AF5FA5',
								'#DAE0D0',
								'#64767C',
								'#8389B4',
								'#95B7D8',
								'#A6DCE8',
								'#F0D3D0',
								'#6B5E86',
								'#D6DAAC',
								'#C3A8EE'
							]
						}
					]
				},
				options: {
					legend: {
						display: false
					}
				}
			});
			// project Graph
			var projectGraph = document
				.querySelector('#project-graph')
				.getContext('2d');
			new Chart(projectGraph, {
				type: 'bar',
				data: {
					labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
					datasets: [
						{
							label: 'Hits',
							data: [
								1101,
								990,
								870,
								750,
								610,
								534,
								489,
								390,
								210,
								100
							],
							// backgroundColor: 'green',
							backgroundColor: [
								'#AF5FA5',
								'#DAE0D0',
								'#64767C',
								'#8389B4',
								'#95B7D8',
								'#A6DCE8',
								'#F0D3D0',
								'#6B5E86',
								'#D6DAAC',
								'#C3A8EE'
							]
						}
					]
				},
				options: {
					legend: {
						display: false
					}
				}
			});
			// notice Graph
			var twitterGraph = document
				.querySelector('#twitter-graph')
				.getContext('2d');
			new Chart(twitterGraph, {
				type: 'line',
				data: {
					labels: [
						'2009',
						'2010',
						'2011',
						'2012',
						'2013',
						'2014',
						'2015',
						'2016',
						'2017',
						'2018'
					],
					datasets: [
						{
							label: 'Hits',
							data: [
								100,
								300,
								200,
								500,
								2500,
								2000,
								3500,
								3000,
								1000,
								5400
							],
							lineTension: 0,
							// fill: false,
							borderColor: '#9B3838',
							pointHoverBackgroundColor: '#fbfcfc',
							pointHoverBorderColor: '#eb0e0e',
							pointHoverBorderWidth: 2,
							pointHoverRadius: 7
						}
					]
				},
				options: {
					legend: {
						display: false
					}
				}
			});

			// Hit AND Like Swich button to blockchain & project
			var hitLikeWrap = document.querySelector('.hit-like-wrap');
			var hitLike = Array.from(document.querySelectorAll('.hit-like'));

			hitLikeWrap.addEventListener('click', hitLikeSwich);

			function hitLikeSwich() {
				hitLike.map(function(el, index) {
					if (el === event.target) {
						el.classList.add('bg-dark');
						el.classList.add('text-white');
					} else {
						el.classList.remove('bg-dark');
						el.classList.remove('text-white');
					}
				});
			}
		}
	}
});
