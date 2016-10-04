document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].screenX;
    startY = e.touches[0].screenY;
}, false)

document.addEventListener("touchend", function (e) {
    var endX = e.changedTouches[0].screenX;
    var endY = e.changedTouches[0].screenY;

    var direction = getDirection(startX, startY, endX, endY);
    switch (direction) {
        case 1:
            console.log("向上滑");
            hideMenuNav();
            break;
        case 2:
            console.log("向右滑");
            break;
        case 3:
            console.log("向下滑");
            showMenuNav();
            break;
        case 4:
            console.log("向左滑");
    }
}, false)



// 返回方向, 1为上，2为右， 3为下， 4为左
function getDirection(startX, startY, endX, endY) {
    var dx = endX - startX;
    var dy = startY - endY;
    var angle;
    if (Math.abs(dx) <= 50 && Math.abs(dy) <= 50) {
        return 0;
    }

    angle = getAngle(dx, dy);
    switch (true) {
        case (angle >= -45 && angle < 45):
            return 2;
        case (angle >= 45 && angle < 135):
            return 1;
        case (angle >= -135 && angle < -45):
            return 3;
        case ((angle >= 135 && angle < 180) || (angle >= -180 && angle < -135)):
            return 4;
    }
}

// 返回角度
function getAngle(x, y) {
    return Math.atan2(y, x) * (180 / Math.PI);
}


//绑定菜单点击事件
$("#navMenu").click(function() {
    showSideBox();
})

$("#menuBack").click(function() {
    hideSideBox();
})

$(".nav-bg").click(function() {
    hideSideBox();
})

// 隐藏菜单栏
function hideMenuNav() {
    var menu = $(".nav-menu");
    var search = $(".nav-search");
    if($(".nav-side-box").css("left") == "0px") {
        return;
    }
    if (!menu.hasClass("nav-hide") && !search.hasClass("nav-hide")) {
        menu.addClass("nav-hide");
        search.addClass("nav-hide");
    }
}
// 显示菜单栏
function showMenuNav() {
    var menu = $(".nav-menu");
    var search = $(".nav-search");
    if($(".nav-side-box").css("left") == "0px") {
        return;
    }
    if (menu.hasClass("nav-hide") && search.hasClass("nav-hide")) {
        menu.removeClass("nav-hide");
        search.removeClass("nav-hide");
    }
}
//显示侧边栏
function showSideBox() {
    $(".nav-side-box").animate({
        left: '0'
    });
    $(".nav-bg").css("z-index", "2");

    $("body").children().not("nav, script").css({
        "-webkit-backdrop-filter": "blur(3px)",
        "-webkit-filter": "blur(3px)",
        "-moz-filter": "blur(3px)",
        "-ms-filter": "blur(3px)",
        "-o-filter": "blur(3px)",
        "filter": "blur(3px)"
    });
    $(".nav-btn").css({
        "-webkit-backdrop-filter": "blur(3px)",
        "-webkit-filter": "blur(3px)",
        "-moz-filter": "blur(3px)",
        "-ms-filter": "blur(3px)",
        "-o-filter": "blur(3px)",
        "filter": "blur(3px)"
    });
    scroll.disableScroll();
}
//隐藏侧边栏
function hideSideBox() {
    $(".nav-side-box").animate({
        left: '-65%'
    });
    $(".nav-bg").css("z-index", "-1");
    $("body").children().not("nav, script").css({
        "-webkit-backdrop-filter": "blur(0)",
        "-webkit-filter": "blur(0)",
        "-moz-filter": "blur(0)",
        "-ms-filter": "blur(0)",
        "-o-filter": "blur(0)",
        "filter": "blur(0)"
    });
    $(".nav-btn").css({
        "-webkit-backdrop-filter": "blur(0)",
        "-webkit-filter": "blur(0)",
        "-moz-filter": "blur(0)",
        "-ms-filter": "blur(0)",
        "-o-filter": "blur(0)",
        "filter": "blur(0)"
    });

    scroll.enableScroll();
}


