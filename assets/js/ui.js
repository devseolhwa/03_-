$(document).ready(function(){

    skrollr.init();
    setTimeout(function(){
        svgEffect();
        textEffect();
    }, 1000);
    $(window).scroll(function(){
        svgEffect();
    });

    let filter = "win16|win32|win64|mac";
    if(navigator.platform){
        if(0 > filter.indexOf(navigator.platform.toLowerCase())){
            //alert("Mobile");
            $(body).addClass("mobileFilter");
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
    var slideBox = new Swiper(".slideBox",{
        slidesPerView: "auto",
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".pagination",
            clickable: true,
        }
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
        var opt = $(this).attr("href");
        if (opt !== "#" && opt !== "#;" && opt.charAt(0) === "#") {
            $(opt + ".teacherDetail").css("display", "block");
        }
    });

    $(".teacherTab li a").on("click", function (e) {
        var opt = $(this).attr("href");
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");

        if ($(this).parent("li").hasClass("doenmonav")) {
            $(".valtaTeacher").addClass("doenmoTeacher");
            $(".valtaTeacher").removeClass("bunnyTeacher");
        } else if ($(this).parent("li").hasClass("bunnynav")) {
            $(".valtaTeacher").addClass("bunnyTeacher");
            $(".valtaTeacher").removeClass("doenmoTeacher");
        }

        if (opt === "#" || opt === "" || opt === "#;") {
            e.preventDefault();
        } else if (opt.charAt(0) === "#") {
            if ($(opt).hasClass("teacherDetail")) {
                $(opt).show().siblings(".teacherDetail").hide();
                e.preventDefault();
            }
        }
    });

});