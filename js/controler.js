$("#edit").on("click", showBox);
$("#ok").on("click", hideBox);
$(".collect-ul>li>a").on("click",showArt)
//显示编辑层
function showBox() {
    $("#edit").addClass("sr-hide");
    $(".collect-scan").find("span:first-child").addClass("sr-hide");
    $(".collect-scan").find("span:last-child").removeClass("sr-hide");
    hideMenuNav();
}
//隐藏编辑层
function hideBox() {
    $("#ok").addClass("sr-hide");
    $("#edit").removeClass("sr-hide");
    $(".icon-plus-circle-1,.icon-ok-circled2").addClass("sr-hide");
    $(".collect-scan").find("span:first-child").removeClass("sr-hide");
    $(".collect-scan").find("span:last-child").addClass("sr-hide");
    showMenuNav();
}
//删除分类
function showSort() {
    // clearInterval(a);
    if (!$(".nav-side-box").hasClass("nav-show")) {
        $(".nav-side-box").addClass("nav-show")
    }
    $(".nav-bg").css("z-index", "2");
    //添加毛玻璃效果
    $("body").children().not("nav, script").addClass("blur");
    scroll().disableScroll();
    // scroll1 = null;
}

//显示分类下的文章
function showArt(element) {
	if(!$(".icon-angle-right").hasClass("sr-hide"))
	{
		$(".icon-angle-right").addClass("sr-hide");
		$(".icon-angle-down").removeClass("sr-hide");
		$(".collect-article").removeClass("sr-hide");
	}
	else {
		$(".icon-angle-right").removeClass("sr-hide");
		$(".icon-angle-down").addClass("sr-hide");
		$(".collect-article").addClass("sr-hide");
	}
	
}