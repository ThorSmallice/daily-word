let leftArrow = document.querySelector(".leftArrow");
let rightArrow = document.querySelector(".rightArrow");
let pointList = document.querySelectorAll(".pointBox li");
let ul = document.querySelector(".carouseBox ul");
let carouselBox = document.querySelector(".carouseBox");
let nowIndex = 0;			// 当前显示图片的下标
let timer;	
let isRun = true;			// 控制可否点击，点击节流
/**
 * 左箭头事件
 */
leftArrow.addEventListener("click", function() {
	if (isRun){
		isRun = false;
		if(--nowIndex < 0) {
			leftEndRun()
		}else {
			run()
		}
		isRun = true;
	}
	
})

// 右箭头事件
rightArrow.addEventListener("click" , function() {
	if (isRun) {
		isRun = false;
		if (++nowIndex == ul.childElementCount) {
			rightEndRun();
		} else {
			run();
		}
		isRun = true;
	}
})

/**
 * 左边尽头函数 -> 最后一张去到第一张
 */
function rightEndRun() {

	ul.appendChild(ul.firstElementChild.cloneNode(true));

	ul.style.transform = `translateX(-${nowIndex}00%)`;

	ul.addEventListener("transitionend", function() {
		ul.style.transition = "none";
		ul.style.transform = `translateX(0%)`;

		// 读取 ul 的 transition 属性 提醒代码运行时注意样式改变的能力
		getComputedStyle(ul).transition;
		ul.style.transition = "";

		ul.removeChild(ul.lastElementChild);
		nowIndex = 0;
		pointActive()
	}, {
		once: true
	})
}

function leftEndRun() {
	// console.log(ul);
	ul.insertBefore(ul.lastElementChild.cloneNode(true), ul.firstElementChild);
	ul.style.transition = "none";
	ul.style.transform = `translateX(-${1}00%)`;
	getComputedStyle(ul).transition;
	ul.style.transition = "";
	ul.style.transform = `translateX(-${0}00%)`;
	ul.addEventListener("transitionend", function() {
		ul.style.transition = "none";
		nowIndex = ul.childElementCount - 2;
		pointActive();
		ul.style.transform = `translateX(-${ul.childElementCount - 2}00%)`;
		getComputedStyle(ul).transition;
		ul.removeChild(ul.firstElementChild);
		ul.style.transition = "";
		// nowIndex = ul.childElementCount - 1;
		
	}, {
		once: true
	})
}


/**
 * 主函数
 */
function run() {
	ul.style.transform = `translateX(-${nowIndex}00%)`;
	pointActive()
}

function pointActive() {
	pointList.forEach(function(item) {
		item.classList.remove('active');
	})
	pointList[nowIndex].classList.add("active")
}

pointList.forEach(function(item,index) {
	item.addEventListener("click",function () {
		nowIndex = index;
		run();
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
