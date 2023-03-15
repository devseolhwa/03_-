$(document).ready(function(){

    skrollr.init();
    setTimeout(function(){
        videoItem();
        svgEffect();
        textEffect();
    }, 1000);
    $(window).scroll(function(){
        svgEffect();
    });

    // pc mobile 환경체크
    let filter = "win16|win32|win64|mac";
    if(navigator.platform){
        if(0 > filter.indexOf(navigator.platform.toLowerCase())){
            //alert("Mobile");
            $("body").addClass("mobileFilter");
            $(".videoItem").addClass("active");
            $(".floating").show();
        }else{
            //alert("PC");
            snapscroll();
            // floating 스크롤후 나타나기
            $(window).scroll(function () {
                if ($(this).scrollTop() > 100) {
                    $(".floating").fadeIn("slow");
                }else {
                    $(".floating").fadeOut("slow");
                }
            });
        }
    }
    $(".itemBox").on("touchstart", function (e) {
        e.preventDefault();
        $(this).addClass("active");
    });
    $(".itemBox").on("touchend", function (e) {
        e.preventDefault();
        $(this).removeClass("active");
    });

    function svgEffect(){
        $(".svgEffect").each(function(){
            let $this = $(this);
            let start_pos = "top bottom";
            let end_pos =  "bottom top";

            ScrollTrigger.create({
                trigger: $this,
                start: start_pos, 
                end: end_pos,
                onEnter: function(){
                    $this.addClass("active");
                },onLeave: function(){
                    $this.removeClass("active");
                },onEnterBack: function(){
                    $this.addClass("active");
                },onLeaveBack: function(){
                    $this.removeClass("active");
                }
            });
        });
    }

    function textEffect(){
        $(".textEffect").each(function(){
            let $this = $(this);
            let start_pos = "top bottom";
            let end_pos =  "bottom top";

            ScrollTrigger.create({
                trigger: $this,
                start: start_pos, 
                end: end_pos,
                onEnter: function(){
                    $this.addClass("active");
                },onLeave: function(){
                    $this.removeClass("active");
                },onEnterBack: function(){
                    $this.addClass("active");
                },onLeaveBack: function(){
                    $this.removeClass("active");
                }
            });
        });
    }

    // 상품전체보기
    $("#btnTable").click(function(e){
        e.preventDefault();
        $(this).toggleClass("active");

        let openCheck = $(this).is(".active");
        if (openCheck) {
            $(this).parents().next(".tableData").addClass("active");
            $(this).parents().next(".tableData").slideDown(500);
        }else {
            $(this).parents().next(".tableData").removeClass("active");
            $(this).parents().next(".tableData").slideUp(500);
        }
    });

    // 무결점 출석상자 이동
    $(".btnQuestion").click(function(e){         
        e.preventDefault();
        $("html, body").animate({scrollTop:$(this.hash).offset().top}, 1000);
    });

    // 무결점 출석상자 slide
    $(".slideBox").slick({
        slidesToShow : 3,
        slidesToScroll: "auto",
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        centerMode: true,
        centerPadding : "200px", 
        variableWidth: true,
        infinite: true,
        swipeToSlide: true ,
        draggable: true,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        appendDots: $(".pagination")
    });

    // 스냅스크롤
    function snapscroll(){
        const sections = document.querySelectorAll(".section");
        const scrolling = {
            enabled: true,
            events: "scroll, wheel, touchmove, pointermove".split(","),
            prevent: e => e.preventDefault(),
            disable() {
            if (scrolling.enabled) {
                scrolling.enabled = false;
                window.addEventListener("scroll", gsap.ticker.tick, {passive: true});
                scrolling.events.forEach((e, i) => (i ? document : window).addEventListener(e, scrolling.prevent, {passive: false}));
            }
            },
            enable() {
            if (!scrolling.enabled) {
                scrolling.enabled = true;
                window.removeEventListener("scroll", gsap.ticker.tick);
                scrolling.events.forEach((e, i) => (i ? document : window).removeEventListener(e, scrolling.prevent));
            }
            }
        };
        function goToSection(section, anim, i) {
            if (scrolling.enabled) {
                scrolling.disable();
                gsap.to(window, {
                    scrollTo: {y: section, autoKill: false},
                    onComplete: scrolling.enable,
                    duration: 1
                });
                anim && anim.restart();
            }
        }
        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top bottom-=1",
                end: "bottom top+=1",
                //onEnter: () => goToSection(section, intoAnim),
                onEnter: () => goToSection(section),
                onEnterBack: () => goToSection(section)
            });
        });
    }

    // VAL타 강사
    $(".teacherTab li.on a").each(function () {
        let attrH = $(this).attr("href");
        if (attrH !== "#" && attrH !== "#;" && attrH.charAt(0) === "#") {
            $(attrH + ".teacherDetail").css("display", "block");
            $("#teacherDetail01").addClass("show");
            setTimeout(function() { 
                $(attrH).addClass("active");     
            }, 2000);  
        }
    });

    $(".teacherTab li a").on("click", function (e) {
        let attrH = $(this).attr("href");
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");

        if ($(this).parent("li").hasClass("doenmonav")) {
            $(".valtaTeacher").addClass("doenmoTeacher");
            $(".valtaTeacher").removeClass("bunnyTeacher");
        } else if ($(this).parent("li").hasClass("bunnynav")) {
            $(".valtaTeacher").addClass("bunnyTeacher");
            $(".valtaTeacher").removeClass("doenmoTeacher");
        }

        if (attrH === "#" || attrH === "" || attrH === "#;") {
            e.preventDefault();
        } else if (attrH.charAt(0) === "#") {
            if ($(attrH).hasClass("teacherDetail")) {

                $(attrH).show().addClass("show").siblings(".teacherDetail").hide().removeClass("show");
                setTimeout(function() { 
                    $(attrH).addClass("active").siblings(".teacherDetail").removeClass("active");     
                }, 1500);  
                e.preventDefault();
            }
        }
    });

    // 아이템 라스트 정렬
    $(".itemName").each(function () {
        let totalIs = $(this).children().is(".total");
        if (totalIs) {
            $(this).addClass("dayEight");
        }
    });

    // VAL포인트 특강
    let videoBoardCheck = $(".videoBoard");
    if (videoBoardCheck.length) {
        let $grid = $(".videoBoard").imagesLoaded(function() {
            $grid.masonry({
                itemSelector: ".videoItem",
                fitwidth: true
            });
        });
    }
    function videoItem(){
        $(".videoItem").each(function(){
            let $videoItem = $(this);

            ScrollTrigger.create({
                trigger: $videoItem,
                start: "top bottom",
                onEnter: function(){
                    $videoItem.addClass("active");
                }
            });
        });
    }

    // 자동완성 텍스트 설정은 searchData.js 파일에서 추가
    let searchPageCheck = $("#searchInputText");
    if(searchPageCheck.length) {
        $("#searchInputText").autocomplete({ //오토 컴플릿트 시작
            source : searchData, //source 는 자동 완성 대상
            appendTo: ".relatedList",
            select : function(event, ui) { //아이템 선택시
                //console.log(ui.item);
            },
            focus : function(event, ui) { //포커스 가면
                return false; //한글 에러 잡기용도로 사용됨
            },
            minLength: 1, //최소 글자수
            autoFocus: true, //첫번째 항목 자동 포커스 기본값 false
            classes: { //위젯 요소에 추가 할 클래스를 지정
                "ui-autocomplete": "highlight",
            },
            delay: 500, //검색창에 글자 써지고 나서 autocomplete 창 뜰 때 까지 딜레이 시간(ms)
            disabled: false, //자동완성 기능 끄기
            position: { my: "left top", at: "left bottom", of: ".searchGroupInner"},
            close : function(event){ //자동완성창 닫아질때 호출
                //console.log(event);
            }
        }).autocomplete("instance")._renderItem = function( ul, item ) { //UI 컨트롤
            let newText = String(item.value).replace(new RegExp(this.term, "gi"), "<span class='ui-state-highlight'>$&</span>");
            return $("<li></li>")
                .data("item.autocomplete", item)
                .append("<div>" + newText + "</div>")
                .appendTo(ul);
        };
    }
    // hashtag
    $(".hashtag button").on("click", function () {
        $(this).addClass("on").siblings("button").removeClass("on");
    });
});


    
