let drawBox = document.querySelector(".drawBox");

let prizeArr = [{
	id: 1,
	name: "小龙虾"
}, {
	id: 2,
	name: "披萨"
}, {
	id: 3,
	name: "烧烤"
}, {
	id: 4,
	name: "冒菜"
}, {
	id: 5,
	name: "饺子"
}, {
	id: 6,
	name: "炸鸡"
}, {
	id: 7,
	name: "西餐"
}, {
	id: 8,
	name: "肉夹馍"
}];

prizeArr.push({
	id: 9,
	name: "川菜"
})


// 根据奖品推断需要多少个格子才能放得下
let row = Math.ceil(Math.pow(prizeArr.length + 1, 1 / 2));
row = row % 2 ? row : row + 1;

// 求得每一行的格子宽度 要求每一行有间距 间距又不足以放多一个格子进去
let cellWidth = Math.floor(Math.ceil(drawBox.clientWidth / (row + 1)) * 1.1);

let index = 0;
let targetId = 5;
let timer;

// 获取动画路径
let pathArr = getPathArr(row);

// 奖品的渲染
let itemStr = "";

for (let i = 0; i < row * row - 1; i++) {
	// 渲染开始按钮
	if (i == Math.floor(row * row / 2)) {
		itemStr +=
			`<div class="startBtn" style="width: ${cellWidth}px;height: ${cellWidth}px;line-height: ${cellWidth}px;">开始抽奖</div>`;
	}

	// 渲染奖品格子或者占位格子
	if (prizeArr[i]) {
		itemStr +=
			`<div style="width: ${cellWidth}px;height: ${cellWidth}px;line-height: ${cellWidth}px;" data-id="${prizeArr[i]['id']}">${prizeArr[i]['name']}</div>`;
	} else {
		itemStr +=
			`<div style="width: ${cellWidth}px;height: ${cellWidth}px;line-height: ${cellWidth}px;" data-id="0"></div>`;
	}
}

drawBox.innerHTML = itemStr;

/**
 * 开始抽奖 事件委托
 * @param {Object} e
 */
drawBox.addEventListener("click", function(e) {
	let cellArr = document.querySelectorAll(".drawBox div");
	if (e.target.classList.contains("startBtn")) {
		timer = setInterval(function() {
			if (index) {
				cellArr[pathArr[(index - 1) % pathArr.length]].classList.remove("active");
			}
			cellArr[pathArr[index % pathArr.length]].classList.add("active");

			if (Math.floor(index / (row * row - 1)) == 5 && cellArr[pathArr[index % pathArr.length]].dataset.id == targetId) {
				clearInterval(timer);
			}

			index++;
		}, 50)
	}
})
