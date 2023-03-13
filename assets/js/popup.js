// modarPopup
$(function () {
	$(".modarPopup.show").each(function () {
		modarOpen($(this));
	});
});

var modarOpener = null;
$(document).on("click", ".jsModarClose , .btnCloseModar", function(e) {
    var target = $(this).closest(".modarPopup").attr("id");
    modarClose("#" + target, modarOpener);
});

function modarOpen(_target) {
    let modarBody = $(_target).children().children().children(".modarBody");
    let firstPopupBoxIs = $(modarBody).next().is(".firstPopupBox");
    //console.log(firstPopupBoxIs);

    if (firstPopupBoxIs) {
        $(_target).addClass("firstPopupBoxOpen");
        $(".modarBody").addClass("on");
        $(".modarBody").removeClass("heightauto");
        $(".firstPopupBox").fadeIn("fast");
        setTimeout(function() { 
            $(_target).fadeIn("fast").addClass("show");
            $(_target).attr("tabindex", "0").focus();
            bodyScroll(true, $("body").width());
        }, 100);
        setTimeout(function() { 
            $(".modarBody").addClass("heightauto");
        }, 3400);
        setTimeout(function() { 
            $(_target).removeClass("firstPopupBoxOpen");
        }, 3600);
        setTimeout(function() { 
            $(".modarBody").removeClass("on");
        }, 3600);
    } else {
        $(".modarBody").addClass("heightauto");
        $(_target).fadeIn("fast").addClass("show");
        $(_target).attr("tabindex", "0").focus();
        bodyScroll(true, $("body").width());
    }
}

function modarClose(_target, _opener) {
    bodyScroll(false);
    var tg = null;

    if (_opener) {
        tg = $(_target);
        modarOpener = $(_opener);
    } else {
        //tg = $(".modarPopup.show");
        tg = $(_target);
        modarOpener = null;
    }

    $(tg).removeClass("show");
    if (modarOpener !== null) {
        modarOpener.focus();
        modarOpener = null;
    }
}

function bodyScroll(_status, _orgWidth) {
    var $fixedObj = $("body");
    if (_status) {
        $("body").addClass("modarOpened");
        if ($("html").get(0).scrollWidth > $("html").width() === false) {
            $fixedObj.css("margin-right", $("body").width() - _orgWidth);
        }
    } else {
        $fixedObj.css("margin-right", "");
        $("body").removeClass("modarOpened");
    }
}

$(function () {

    // popup tab
    $(".tabBtnGroup .on a").each(function () {
        let opt = $(this).attr("href");
        if (opt !== "#" && opt !== "#;" && opt.charAt(0) === "#") {
            $(opt + ".tabDetail").css("display", "block");
        }
    });
    $(".tabBtnGroup a").on("click", function (e) {
        let opt = $(this).attr("href");
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");

        if (opt === "#" || opt === "" || opt === "#;") {
            e.preventDefault();
        } else if (opt.charAt(0) === "#") {
            if ($(opt).hasClass("tabDetail")) {
                $(opt).show().siblings(".tabDetail").hide();
                e.preventDefault();
            }
        }
    });

    // 마일리지 쿠폰 선택 on 
    $(".mileageCouponBtn li").click(function(e){
        e.preventDefault();
        $(this).addClass("on").siblings("li").removeClass("on");
        $(this).parent().next().next(".jsModarClose").removeClass("disabled");
    });
});

// 실물경품 slide
let options = {};
if ($(".realitemSlide .slideItem").length == 1) {
    options = {
        loop: false,
        autoplay: false
    }
    $(".realitemSlide .navigation").hide();
} else {
    options = {
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        loop: false,
        speed: 800,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        }, 
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next"
        },
        pagination: {
            el: ".pagination",
            clickable: true
        }
    }
}
var realitemSlide = new Swiper(".realitemSlide", options);