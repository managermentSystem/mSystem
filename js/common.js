document.addEventListener("touchstart", function (e) {
    // console.log(e.touches);
    startX = e.touches[0].screenX;
    startY = e.touches[0].screenY;
    // console.log("x:" + startX + " y: " + startY);
}, false);

document.addEventListener("touchend", function (e) {
    // console.log(e);
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
}, false);

// 隐藏菜单栏
function hideMenuNav() {
    var menu = $(".nav-menu");
    var search = $(".nav-search");
    if (!menu.hasClass("nav-hide") && !search.hasClass("nav-hide")) {
        menu.addClass("nav-hide");
        search.addClass("nav-hide");
    }
}
// 显示菜单栏
function showMenuNav() {
    var menu = $(".nav-menu");
    var search = $(".nav-search");
    if (menu.hasClass("nav-hide") && search.hasClass("nav-hide")) {
        menu.removeClass("nav-hide");
        search.removeClass("nav-hide");
    }
}

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
};

// 返回角度
function getAngle(x, y) {
    return Math.atan2(y, x) * (180 / Math.PI);
}