let leftArrow = document.querySelector(".leftArrow");
let rightArrow = document.querySelector(".rightArrow");
let pointList = document.querySelectorAll(".pointBox li");
let ul = document.querySelector(".carouselBox ul");
let carouselBox = document.querySelector(".carouselBox");
let nowIndex = 0;
let timer;

/**
 * 左箭头事件
 */
leftArrow.addEventListener("click", function() {

	if (++nowIndex == ul.childElementCount) {
		leftEndRun();
	} else {
		run();
	}

})

/**
 * 左边尽头函数 -> 最后一张去到第一张
 */
function leftEndRun() {

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
	}, {
		once: true
	})
}

/**
 * 主函数
 */
function run() {
	ul.style.transform = `translateX(-${nowIndex}00%)`;
}
