/*
原理：
图片列表为
a  b  c  d        四张图 
0  1  2  3        对应的下标是这样的
==>
a b c d a1(这是复制a的)    我们把a复制一份放到d后面 点击下一张的时候 让图片从a -> b -> c -> d -> a1 这个过程均有过渡效果 我们用transform位移进行图片位置的走动 transition定义过渡动画
0 1 2 3 4
当图片从d -> a1,也就是从3 -> 4时 ， 完成过渡的同时，删除掉过渡动画，然后回到a的位置，也就是下标为4的时候让下标回到0，再把过渡动画恢复。

反方向时，
a b c d a1      需要前判断起始位置，因为默认起始位置是下标为0，当下标为0时，再往前走 下标自减后会变成负数， 所以当下标--后<0时，需要取消过渡动画，迅速跳到a1的位置，从a1的位置开始往回走
0 1 2 3 4       如果起始位置不是0，那么下标自减 去做过渡动画就可以了

*/


// 下一张到最后时的跳转                                                         当下标++后 == 4（也就是最后一个下标）时执行
function nextRun(obj, currIndex, callback) {                               // obj：做轮播的对象     currIndex:当前要显示图片的下标   callback：回调函数
    obj.style.transform = `translateX(-${currIndex}00%)`;                  // 图片滚动到要显示图片的位置 通过下标计算
    obj.addEventListener("transitionend", function () {                    // 这里定义一个动画结束后触发的时间  
       prevRun(obj, 0, 0)                                                  // 动画结束后需要 1.取消过渡动画 2.图片跳转到起始位置 3.恢复过渡动画 4.初始化当前显示图片的下标
        callback && callback();                                             // 回调函数
    }, {once:true})                                                         // once:true 设定为一次性事件
    
}

// 上一张到第一张时候的跳转                                                     当下标--后 <0 时执行，原因写在第12行
function prevRun(obj, picStartIndex, initCurrentIndex) {                    // obj：做轮播的对象    picStartIndex:要跳转到的图片的下标  initCurrentIndex:初始下标值
    obj.style.transition = 'none';                                          // 1.取消过渡动画
    obj.style.transform = `translateX(-${picStartIndex}00%)`;               // 2.图片跳转到起始位置           
    getComputedStyle(obj).transition;                                       // 这里获取要操作的对象的最新css列表 是为了跟上面取消过渡动画隔离开 防止后面恢复动画时因css的覆盖性使得取消动画失效
    obj.style.transition = '';                                              // 3.恢复过渡动画 , 可通过赋值为原来的值或者留空 ，因为操作的是行内样式，所以外部css会生效
    nowIndex = initCurrentIndex;                                            // 4.初始化当前显示图片的下标
}

// 图片滚动
function animat(obj, currentIndex, callback) {                              // 这是用于正常情况下图片位置滚动 只需让图片滚到目标位置
    obj.style.transform = `translateX(-${currentIndex}00%)`;                // 图片滚动到目标位置
    callback && callback();                                                 // 回调函数
}

// 小圆点状态更改
function togglePoint(index) {
    pointList.forEach(function(item) {
        item.classList.remove('active');                                        // 所有的圆点取消激活状态
        pointList[index].classList.add('active');                               // 当前的圆点增加激活状态   
    })
}

let leftArrow = document.querySelector(".leftArrow");                           // 上一张按钮
let rightArrow = document.querySelector(".rightArrow");                         // 下一张按钮
let pointList = document.querySelectorAll(".pointBox li");                      // 小圆点按钮
let ul = document.querySelector(".carouseBox ul");                              // 轮播图图片列表容器
let carouseBox = document.querySelector(".carouseBox");                         // 轮播图容器
let flag = true;                                                                // 开关 一点击就关闭 动画结束后开启

let nowIndex = 0;                                                               // 当前显示图片的下标
let pointIndex = 0;                                                             // 当前小圆点的下标

let firstCarouse = ul.children[0].cloneNode(true);                              // 这里克隆第一张图片补充到最后 
ul.appendChild(firstCarouse)

/*   ---------点击下一张按钮 ----------  */
rightArrow.addEventListener("click", function() {
   if (flag) {                                                                  // 开关为开启状态才能点击
        flag = false;                                                           // 点击后关闭开关
        if (++nowIndex == ul.childElementCount - 1) {                           // 当前显示图片的下标自增，增后如等于列表中的最后一个图片的下标
            nextRun(ul,nowIndex, function() {                                   // 说明已经走到了最后一张图片(注意是我们克隆的那张)，也就是最后一个下标了，所以这时我们需要执行 nextRun
                flag = true;                                                    // ul是我们轮播的对象，nowIndex是当前显示的轮播图的下标  执行完后打开开关
            })
        }else {                                                                 // 如果不是到最后一张
            animat(ul, nowIndex, function () {                                  // 执行正常滚动animat即可
                flag = true; 
            });
        }

        (++pointIndex == pointList.length) && (pointIndex = 0);                 // 小圆点的下标增加 增加后当下标为最后一个值时归零即可
        togglePoint(pointIndex);                                                // 执行小圆点状态更改
   }
})


/* --------------点击上一张按钮----------------------*/
leftArrow.addEventListener("click", function() {
    if (flag) {                                                                      
        flag = false;                                                                       
        if (--nowIndex < 0) {                                                       // 当前显示图片的下标自减，自减后<0说明这个时候需要跳转到倒数第一张了，这时执行prevRun 进行跳转
            prevRun(ul, ul.childElementCount - 1, ul.childElementCount - 2);        // 此时跳转到的位置是ul.childElementCount - 1 ==>4  而当前显示下标要重置为ul.childElementCount - 2 ==>3 
            animat(ul, nowIndex, function () {                                      // 因为跳转后这里紧接着就要过渡到上一张了 ，也就是下标为3的位置 也就是a b c d a1 ，此时点击进来后判断到当前是a的位置 ，跳到a1后马上过渡到d
                flag = true;                                                        //                                                              0 1 2 3 4    
            });                                                                     // 
        }else {
            animat(ul, nowIndex, function () {
                flag = true; 
            });
        }       
        (--pointIndex < 0) && ( pointIndex = pointList.length - 1);
        togglePoint(pointIndex);
    }
    

})


/*
    小圆点点击
*/
pointList.forEach(function(item,index) {
    item.addEventListener("click", function() {
        if (flag) {
            flag = false;
            nowIndex = pointIndex = index; 
            togglePoint(pointIndex);
            animat(ul, nowIndex, function() {
                flag = true;
            })
        }
    })
})

// 自动轮播
let autoPlay = setInterval(function(){
    rightArrow.click();
}, 2000);

// 鼠标移入，取消轮播
carouseBox.addEventListener("mouseenter", function() {
    clearInterval(autoPlay);
})

// 鼠标移出，继续轮播
carouseBox.addEventListener("mouseleave", function() {
    autoPlay = setInterval(function() {
        rightArrow.click();
    }, 2000) 
})



