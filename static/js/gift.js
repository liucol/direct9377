/**
 * Created by User on 2018/6/13.
 */
var $slide_item = $("#content1 .slide-item"),  //热门礼包列表
    $btn_b  = $("#content1 .slide-fd .b"),  //滚动点
    $filter_scroll = $("#filter-scroll");  //滚动包裹层

$btn_b.on("mouseover",function(){
    var _this = $(this),
        index = _this.index();

    $slide_item.eq(index).siblings().removeClass("active");
    $slide_item.eq(index).addClass("active");

    _this.siblings().removeClass("active");
    _this.addClass("active");
})

$filter_scroll.niceScroll({cursorcolor: "#f2f2f2", cursoropacitymax: 1, cursorwidth: "5px", cursorborderradius: "5px", cursorborder:0, autohidemode: false, zindex:"2"});