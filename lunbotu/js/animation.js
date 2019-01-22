/*
    这个动画的原理是每次点击左右箭头先找到要展示出来的页面，将其放到主页面旁边
    然后与当前页面一起走
    例如，点击左箭头，找到下一页，将下一页的left设置成图片宽度大小
    然后通过同时减少当前页面和下一页的left值来实现滚动播放效果
 */
var arrow_l = document.getElementById("arrow_l");
var arrow_r = document.getElementById("arrow_r");
var img = document.getElementsByClassName("main-img");
var pageNum = 4;//第一个页面从4开始计算,因为HTML中的结构决定第一页要放在最后
var temp = 0;
var leftToEnter = 876;  //进入页的起始left值
var leftToLeave = 0;    //离开页的起始left值
var isMoving = false;   //检测页面是否在滚动，在滚动结束时置false，在点击箭头时置为true
arrow_l.onclick = function arrowclick(e) {     //轮播图两边箭头点击事件
    if(isMoving  == true){
        return;
    }
    isMoving = true;
    temp = pageNum;               //暂存将要离开的页面页数
    pageNum-=1;
    if(pageNum < 0){              //如果当前是最后一页，再按下左箭头将回到第一页
        pageNum = 4;
    }                   
    img[pageNum].style.left = '876px'; //将下一页先准备好，也就是移到轮播图框右边
     leaveId = setInterval(animationToLeave,1);//当前页离开
     enterId = setInterval(animationToEnter,1);//新页进入
}
function animationToLeave(){
    leftToLeave -= 12;
    if(leftToLeave < -876){
        leftToLeave = 0;
        isMoving = false;
        clearInterval(leaveId);
    }else{
        img[temp].style.left = leftToLeave + 'px';       //5毫秒移动一像素 
    } 
}
function animationToEnter(){
    leftToEnter -= 12;
    if(leftToEnter < 0){
        leftToEnter = 876;
        isMoving = false;
        clearInterval(enterId);
    }else{
        img[pageNum].style.left = leftToEnter + 'px';        
    }
}