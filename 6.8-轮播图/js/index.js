let leftArrow = document.querySelector(".leftArrow");                           // 上一张
let rightArrow = document.querySelector(".rightArrow");                         // 下一张
let pointList = document.querySelectorAll(".pointBox li");                      // 小圆点
let ul = document.querySelector(".carouseBox ul");                              // 轮播图列表容器
let carouseBox = document.querySelector(".carouseBox");                         // 轮播图容器
let carouseWidth = ul.querySelector("li").offsetWidth;                          // 单个图片的宽度
let flag = true;                                                                // 开关 一点击就关闭 动画结束后开启


let firstCarouse = ul.children[0].cloneNode(true);           
ul.appendChild(firstCarouse)

let nowIndex = 0;                                                               // 当前显示的图片下标
let pointIndex = 0;

// 点击上一张
leftArrow.addEventListener("click", function() { 
    if (flag) {
        flag = false;
        if (nowIndex == 0) {
            nowIndex = ul.childElementCount - 1;
            ul.style.left = `-${nowIndex * carouseWidth}px`
        }
        nowIndex--; 
        carAnimate(ul, -nowIndex * carouseWidth, function() {
            flag = true; 
        }); 
        (--pointIndex < 0) && (pointIndex = pointList.length - 1); 
        togglePoint(pointIndex);
    }
   
     
   
})

// 点击下一张
rightArrow.addEventListener("click", function() {
    if (flag) {
        flag = false;
        if (nowIndex == ul.childElementCount - 1 ) {
            ul.style.left = 0;
            nowIndex = 0
        }
        nowIndex++;
        
        carAnimate(ul, -nowIndex * carouseWidth, function() {
            flag = true; 
        });
       
        (++pointIndex == pointList.length ) && (pointIndex = 0); 
        togglePoint(pointIndex);                        // 小圆点变换状态   
    }
})

// 小圆点点击时
pointList.forEach(function(item, i) {
    item.addEventListener("click", function() {
        nowIndex = i; 
        togglePoint(nowIndex);
    })
})


// 自动轮播
let aniTimer = setInterval(function() {
    rightArrow.click();
}, 2000) 

// 鼠标移入，取消轮播
carouseBox.addEventListener("mouseenter", function() {
    clearInterval(aniTimer);
})

// 鼠标移出，继续轮播
carouseBox.addEventListener("mouseleave", function() {
    aniTimer = setInterval(function() {
        rightArrow.click();
    }, 2000) 
})


// 小圆点激活状态更改
function togglePoint (index) {
    pointList.forEach(function(item) {
        item.classList.remove("active");
    })
    pointList[index].classList.add("active");
}

// 轮播图位置变更
function carAnimate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // 步长值写到定时器的里面
        // 把我们步长值改为整数 不要出现小数的问题
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;  // obj的offsetLeft会渐渐变大 所以 每一步走的长度越来越短形成先快后慢的曲线
        step = step > 0 ? Math.ceil(step) : Math.floor(step); // 将步长取整
        if (obj.offsetLeft == target) {
            // 当ul走过的长度 等于我们要的目标位置长度则停止继续走 ，达成一个动画的效果
            clearInterval(obj.timer);
            callback && callback();
        }
        // 把每次加1步 这个步长是慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
        obj.style.left = obj.offsetLeft + step + 'px';

    }, 15);
}
