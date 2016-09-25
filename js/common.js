document.addEventListener("touchstart", function (e) {
    // console.log(e.touches);
    startX = e.touches[0].screenX;
    startY = e.touches[0].screenY;
    // console.log("x:" + startX + " y: " + startY);
}, false)

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
}, false)

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

function showSideBox() {
    $(".nav-side-box").animate({
        left: '0'
    });
    if (!$(".nav-bg").hasClass("nav-show")) {
        $(".nav-bg").addClass("nav-show");
    }
    // document.body.addEventListener('touchmove', function (event) {
    //     event.preventDefault();
    // }, false);
}

function hideSideBox() {
    $(".nav-side-box").animate({
        left: '-65%'
    });
    if ($(".nav-bg").hasClass("nav-show")) {
        $(".nav-bg").removeClass("nav-show");
    }
}


Zepto(function($){
    var keys = { 32: 1, 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e){
        e = e || window.event;
        e.preventDefault && e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e){
        if(keys[e.keyCode]){
            preventDefault(e);
            return false;
        }
    }

    // 记录原来的事件函数，以便恢复
    var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown;
    var isDisabled;

    var disableScroll = function(){
        if(window.addEventListener){ // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        }

        oldonwheel = window.onwheel;
        window.onwheel = preventDefault; // modern standard

        oldonmousewheel1 = window.onmousewheel;
        window.onmousewheel = preventDefault; // older browsers, IE
        oldonmousewheel2 = document.onmousewheel;
        document.onmousewheel = preventDefault; // older browsers, IE

        oldontouchmove = window.ontouchmove;
        window.ontouchmove = preventDefault; // mobile

        oldonkeydown = document.onkeydown;
        document.onkeydown = preventDefaultForScrollKeys;
        isDisabled = true;
    };

    var enableScroll = function(){
        if(!isDisabled){
            return;
        }
        if(window.removeEventListener){
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        }

        window.onwheel = oldonwheel; // modern standard

        window.onmousewheel = oldonmousewheel1; // older browsers, IE
        document.onmousewheel = oldonmousewheel2; // older browsers, IE

        window.ontouchmove = oldontouchmove; // mobile

        document.onkeydown = oldonkeydown;
        isDisabled = false;
    };

    // bind
    $('#closePopup').on('click', function(e){
        $('#popupLayer').hide();
        $('#bgMask').hide();
        enableScroll();
    });

    disableScroll();

});
