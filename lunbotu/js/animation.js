/*
    这个动画的原理是每次点击左右箭头先找到要展示出来的页面，将其放到主页面旁边
    然后与当前页面一起走
    例如，点击左箭头，找到下一页，将下一页的left设置成图片宽度大小
    然后通过同时减少当前页面和下一页的left值来实现滚动播放效果
 */

var main_div = document.getElementById("main-div");
var img = document.getElementsByClassName("main-img");
var button_ul = document.getElementById("button");
var circle_button = button_ul.getElementsByClassName("circle_button");  //滚动界面下方的圆点
var pageNum = 4;//第一个页面从4开始计算,因为HTML中的结构决定第一页要放在最后
var temp = 0;
var distantToEnter;  //进入页的起始位置值
var distantToLeave = 0;    //离开页的起始位置值
var isMoving = false;   //检测页面是否在滚动，在滚动结束时置false，在点击箭头时置为true

(function initMainImg() {
    //后四张图片先移到一边，否则会因为先来后到的层叠原因，导致页面加载好后第一次点击右箭头会出BUG，显示的不是第五张而是第二张图片
    for (var i = 0; i < 4; i++) {   
        img[i].style.left = '876px';
    }
})();

main_div.onclick = function (e) {     //轮播图两边箭头点击事件，由main_div代理
    if (isMoving) { return; }          //如果页面正在移动
    temp = pageNum;               //暂存将要离开的页面页数
    if (e.target.id === "left_arrow") {
        isMoving = true;
        pageNum <= 0 ? pageNum = 4 : pageNum -= 1;
        img[pageNum].style.left = '876px';       //将下一页先准备好，也就是移到轮播图框右边
        distantToEnter = 876;
        //带动小圆点移动
        circleButtonAnimation();
        leaveId = setInterval(function () { animationToLeave("left") }, 1);//当前页离开
        enterId = setInterval(function () { animationToEnter("left") }, 1);//新页进入 
    } else if (e.target.id === "right_arrow") {
        isMoving = true;
        pageNum >= 4 ? pageNum = 0 : pageNum += 1;
        img[pageNum].style.left = '-876px';         //下一页移到左边
        distantToEnter = -876;
        //带动小圆点移动
        circleButtonAnimation();
        leaveId = setInterval(function () { animationToLeave("right") }, 1);//当前页离开
        enterId = setInterval(function () { animationToEnter("right") }, 1);//新页进入 
    }
}

function circleButtonAnimation(){   //轮播页面下方小圆点动画
    circle_button[4-temp].children[0].style.backgroundColor = 'grey';   //因为本身页面的排序是倒序的，所以在真正计算是第几张的时候要这样计算
    circle_button[4-pageNum].children[0].style.backgroundColor = 'red';
}

function animationToLeave(way) {    //页面离开动画
    if (way === "left") {
        distantToLeave -= 12;   //每次离开12PX
        if (distantToLeave < -876) {
            distantToLeave = 0;
            isMoving = false;
            clearInterval(leaveId);
        } else {
            img[temp].style.left = distantToLeave + 'px';
        }
    } else if (way === "right") {
        distantToLeave += 12;
        if (distantToLeave > 876) {
            distantToLeave = 0;
            isMoving = false;
            clearInterval(leaveId);
        } else {
            img[temp].style.left = distantToLeave + 'px';
        }
    }
}

function animationToEnter(way) {    //页面进入动画
    if (way === "left") {
        distantToEnter -= 12;       //每次进入12px
        if (distantToEnter < 0) {
            isMoving = false;
            clearInterval(enterId);
        } else {
            img[pageNum].style.left = distantToEnter + 'px';
        }
    } else if (way === "right") {
        distantToEnter += 12;
        if (distantToEnter > 0) {
            isMoving = false;
            clearInterval(enterId);
        } else {
            img[pageNum].style.left = distantToEnter + 'px';
        }
    }
}

(function initCircleButtonIndex(){  //给每个小圆点按顺序标号
    for(var i = 0; i<5; i++){
        circle_button[i].children[0].index = i;
    }
})();
//将所有li的点击事件代理到ul上
button_ul.onclick = function (e) {
    var index = e.target.index;
    var currentPage = 4-pageNum;
    temp = pageNum;
    if(index != null){
        pageNum = 4-index;
        //参考左箭头
        if(index > currentPage){
            isMoving = true;
            img[pageNum].style.left = '876px';       //将下一页先准备好，也就是移到轮播图框右边
            distantToEnter = 876;
            //带动小圆点移动
            circleButtonAnimation();
            leaveId = setInterval(function () { animationToLeave("left") }, 1);//当前页离开
            enterId = setInterval(function () { animationToEnter("left") }, 1);//新页进入 
        }else if(index < currentPage){
            isMoving = true;
            img[pageNum].style.left = '-876px';         //下一页移到左边
            distantToEnter = -876;
            //带动小圆点移动
            circleButtonAnimation();
            leaveId = setInterval(function () { animationToLeave("right") }, 1);//当前页离开
            enterId = setInterval(function () { animationToEnter("right") }, 1);//新页进入
        }
    }
}

