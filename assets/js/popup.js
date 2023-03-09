// modar_popup
$(function () {
	$(".modarPopup.show").each(function () {
		modarOpen($(this));
	});
});

var modarOpener = null;
$(document).on("click", ".js_modar_close , .btn_close_modar", function(e) {
    var target = $(this).closest(".modarPopup").attr("id");
    modarClose("#" + target, modarOpener);
});

function modarOpen(_target) {
    let modar_body = $(_target).children().children().children(".modar_body");
    let firstPopupBoxIs = $(modar_body).next().is(".firstPopupBox");
    //console.log(firstPopupBoxIs);

    if (firstPopupBoxIs) {
        $(_target).addClass("firstPopupBoxOpen");
        setTimeout(function() { 
            $(_target).fadeIn("fast").addClass("show");
            $(_target).attr("tabindex", "0").focus();
            bodyScroll(true, $("body").width());
        }, 100);
        setTimeout(function() { 
            $(_target).removeClass("firstPopupBoxOpen");
        }, 3000);
    } else {
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
    $(".tab_btn_group .on a").each(function () {
        var opt = $(this).attr("href");
        if (opt !== "#" && opt !== "#;" && opt.charAt(0) === "#") {
            $(opt + ".tab_detail").css("display", "block");
        }
    });

    $(".tab_btn_group a").on("click", function (e) {
        var opt = $(this).attr("href");
        $(this).parent("li").addClass("on").siblings("li").removeClass("on");

        if (opt === "#" || opt === "" || opt === "#;") {
            e.preventDefault();
        } else if (opt.charAt(0) === "#") {
            if ($(opt).hasClass("tab_detail")) {
                $(opt).show().siblings(".tab_detail").hide();
                e.preventDefault();
            }
        }
    });

    // 마일리지 쿠폰 선택 on 
    $(".MileageCouponBtn li").click(function(e){
        e.preventDefault();
        $(this).addClass("on").siblings("li").removeClass("on");
        $(this).parent().next().next(".js_modar_close").removeClass("disabled");
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