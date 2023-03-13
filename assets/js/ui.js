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
        }else{
            //alert("PC");
            snapscroll();
        }
    }

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

    /* gsap.registerPlugin(ScrambleTextPlugin);

    var $textElement01 = $("#textElement01");
    var $textElement02 = $("#textElement02");
    var $textElement03 = $("#textElement03");
    var $textElement04 = $("#textElement04");

    let textTimeL = gsap.timeline({ 
        defaults: {duration: 2, ease: "power1.inOut", yoyo: false,}
    })

    textTimeL.to($textElement01, {scrambleText:{text:"들어간다, 적을 본다, 쏜다, 끝! 참 쉽죠?", chars:"들어간다, 적을 본다, 쏜다, 끝! 참 쉽죠?"}});
    textTimeL.to($textElement02, {scrambleText:{text:"된모만 믿고 따라오면 당신도 충분히 가능합니다.", chars:"된모만 믿고 따라오면 당신도 충분히 가능합니다."}});
    textTimeL.to($textElement03, {scrambleText:{text:"침착하게, 하나씩, 차근차근 따라오면 끝!", chars:"침착하게, 하나씩, 차근차근 따라오면 끝!"}});
    textTimeL.to($textElement04, {scrambleText:{text:"헤매고만 있던 나의 VAL생, 이제 버니와 다시 일어설 시간입니다.", chars:"헤매고만 있던 나의 VAL생, 이제 버니와 다시 일어설 시간입니다."}}); */

    // floating 스크롤후 나타나기
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".floating").fadeIn("slow");
        }else {
            $(".floating").fadeOut("slow");
        }
    });     

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
            $(this).addClass("ta_l");
        }
    });

    // VAL포인트 특강
    let videoBoard = new Masonry(".videoBoard", {
        itemSelector: ".videoItem",
        percentPosition: true,
      });
    imagesLoaded(".videoBoard").on("progress", function() {
        videoBoard.layout();
        
    });
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
    
});