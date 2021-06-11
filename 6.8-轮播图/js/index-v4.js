let leftArrow = document.querySelector(".leftArrow");
let rightArrow = document.querySelector(".rightArrow");
let pointList = document.querySelectorAll(".pointBox li");
let ul = document.querySelector(".carouseBox ul");
let carouselBox = document.querySelector(".carouseBox");
let nowIndex = 1;			// 当前显示图片的下标
let timer;
let isRun = true;			// 控制可否点击，点击节流

ul.insertBefore(ul.lastElementChild.cloneNode(true),ul.firstElementChild);
ul.style.transition = 'none';
ul.style.transform = `translateX(-100%)`;
getComputedStyle(ul).transition;
ul.style.transition = '';
ul.appendChild(ul.children[1].cloneNode(true));


/**
 * 左箭头事件
 */
leftArrow.addEventListener("click", function() {
	if (isRun) {
		isRun = false;
		nowIndex--;
		Run();
		isRun = true;
		
	}
})

// 右箭头事件
rightArrow.addEventListener("click" , function() {
	if (isRun) {
		isRun = false;
		nowIndex++;
		Run();
		isRun = true;
		// console.log(nowIndex);
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
	pointActive()
}) 

/**
 * 主函数
 */

function pointActive() {
	pointList.forEach(function(item) {
		item.classList.remove('active');
	})
	pointList[nowIndex-1].classList.add("active")
}

pointList.forEach(function(item,index) {
	item.addEventListener("click",function () {
		nowIndex = index + 1;
		Run();
	})
})

// 自动轮播
let autoPlay = setInterval(function(){
    rightArrow.click();
}, 2000);

// 鼠标移入，取消轮播
carouselBox.addEventListener("mouseenter", function() {
    clearInterval(autoPlay);
})

// 鼠标移出，继续轮播
carouselBox.addEventListener("mouseleave", function() {
    autoPlay = setInterval(function() {
        rightArrow.click();
    }, 2000) 
})
