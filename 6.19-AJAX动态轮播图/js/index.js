let carouselBox = document.querySelector(".carouseBox");
let leftArrow = document.querySelector(".leftArrow");
let rightArrow = document.querySelector(".rightArrow");
let ol = document.querySelector('.pointBox ol');
let pointList = ol.getElementsByTagName("li");    

let selectBtn = document.querySelector("#select");  


let ul = document.querySelector(".carouseBox>ul");
let nodeStr = '';



let nowIndex;			// 当前显示图片的下标
let timer;
let isRun;			// 控制可否点击，点击节流
let xhr = new XMLHttpRequest(); // 初始化请求体
function getNewData (listId) {
    // console.log(listId);
    let url = `http://student.0melon0.cn/index/index/get_carousel?position_id=${listId}`;
    xhr.open("GET",url); // 定义请求参数
    xhr.send(); // 发送请求
}

/*
    界面初始化的时候获取select的value值 
    根据value值定义请求参数 然后发送请求
    
    当select状态改变时 也获取它的value值
    根据value值再次发送请求

    数据返回后 将要渲染的内容字符串先清空 再渲染新数据
*/

getNewData(selectBtn.value); // 界面初始化根据select的value值 更新一次数据

selectBtn.addEventListener("change",function () { // 当select状态改变时  更新一次数据
    getNewData(this.value);
})

// 监听请求状态
xhr.addEventListener("readystatechange", function() { 
    if (xhr.readyState === 4) { // 请求阶段值改变 ===4时 请求完成
        if (xhr.status === 200) {   // 请求状态码 ===200说明成功
            let carouseList = JSON.parse(xhr.responseText).data;
            console.log(carouseList);
            nodeStr = ''; // 轮播图渲染内容重置为空
            ol.innerHTML = ''; // 小圆点列表置空
            carouseList.forEach((item) => {
                nodeStr += `
                    <li>
                        <img src="${item}" alt="">
                    </li>
                `;
                ol.appendChild(document.createElement("li"));
            }) 
           
            ul.innerHTML = nodeStr;
            ol.firstElementChild.classList.add("active");

            ul.insertBefore(ul.lastElementChild.cloneNode(true),ul.firstElementChild);
            ul.style.transition = 'none';
            nowIndex = 1;
            isRun = true;
            ul.style.transform = `translateX(-${nowIndex * 100}%)`;
            getComputedStyle(ul).transition;
            ul.style.transition = '';
            ul.appendChild(ul.children[1].cloneNode(true));

            

            // 小圆点的点击事件
            for( let i = 0; i < pointList.length; i++) {
                pointList[i].addEventListener("click",function () {
                    if (isRun){
                        isRun = false;
                        nowIndex = i + 1;
                        Run();
                    } 
                })
            }

        }
    }
})




/**
 * 左箭头事件
 */
leftArrow.addEventListener("click", function() {
    if (isRun) {
        isRun = false;
        nowIndex--;
        Run();
    }
})

// 右箭头事件
rightArrow.addEventListener("click" , function() {
    if (isRun) {
        isRun = false;
        nowIndex++;
        Run(); 
    }
})

// 图片滚动
function Run() {
    ul.style.transform = `translateX(-${nowIndex}00%)`;
}


// 过渡动画结束后
ul.addEventListener("transitionend", function() {	
    ul.style.transition = "none";					// 清除动画属性
    // console.log(nowIndex);
    if (nowIndex == ul.childElementCount - 1) {		// 当前显示图片的下标如果等于倒数第一个，说明走到最后一张了（克隆的图片1）
        nowIndex = 1;								// 将当前显示图片的下标重置回第一张（图片1）
    }
    if (!nowIndex) {								// 如果下标==0，说明走到了最前面克隆的那张（克隆的图片4）
        nowIndex = ul.childElementCount - 2  		// 那么当前显示图片的下标就要变到倒数第二张（图片4）
    }
    // console.log(nowIndex);
    ul.style.transform = `translateX(-${nowIndex}00%)`; 
    getComputedStyle(ul).transition;
    ul.style.transition = "";
    pointActive();
    isRun = true;
}) 



/**
 * 主函数
 */

function pointActive() {
    for( let i = 0; i < pointList.length; i++) {
        pointList[i].classList.remove('active')
    }
    pointList[nowIndex-1].classList.add("active")
}
 
// console.log(pointList);


// 自动轮播
let autoPlay = setInterval(function(){
    rightArrow.click();
}, 4000);

// 鼠标移入，取消轮播
carouselBox.addEventListener("mouseenter", function() {
    clearInterval(autoPlay);
})

// 鼠标移出，继续轮播
carouselBox.addEventListener("mouseleave", function() {
    autoPlay = setInterval(function() {
        rightArrow.click();
    }, 4000) 
})

// 当浏览器窗口切换到别的界面时，暂停轮播
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState == "visible") {
        autoPlay = setInterval(function() {
            rightArrow.click();
        }, 4000) 
    }else {
       
        clearInterval(autoPlay);
    }
})