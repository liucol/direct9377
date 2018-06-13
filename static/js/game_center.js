/**
 * Created by User on 2018/6/12.
 */
/*元素节点*/
var $slideimgli = $(".slideimg-wrap li"),  //轮播li
    $descriptionli = $(".description-wrap li");  //轮播图描述li

/*全局变量*/
var slidelength = $slideimgli.length,
    slideindex = 0;

var slidetime;

slide();

function slide(){
    slidetime = setInterval(function(){
        if(slideindex == slidelength+1){
            slideindex = 0;
        }
        show(slideindex);
        slideindex++;
    },4000);
}

$descriptionli.on("mouseover ",function(){
    var index = $(this).index();

    /*清除时间*/
    clearInterval(slidetime);
    slideindex = index;

    show(slideindex);
    slide();
})

$slideimgli.on("mouseover",function(){
    clearInterval(slidetime);
})
$slideimgli.on("mouseout",function(){
    slide();
})

function show(slideindex){
    $descriptionli.eq(slideindex).siblings().removeClass("active");
    $descriptionli.eq(slideindex).addClass("active");

    $slideimgli.eq(slideindex).siblings().removeClass("show");
    $slideimgli.eq(slideindex).addClass("show");
}