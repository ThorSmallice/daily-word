let selectPrize = document.querySelector(".select-prize"); // 抽中的奖品名
let drawBox = document.querySelector(".drawBox");   // 奖品列表
let selectUl = document.querySelector(".select-pic ul");    // 左侧滚动图的奖品列表

let prizeList = [{
        id: 1,
        name: "小龙虾"
    },{
        id: 2,
        name: "披萨"
    },{
        id: 3,
        name: "烧烤"
    },{
        id: 4,
        name: "奶茶"
    },{
        id: 5,
        name: "面包"
    },{
        id: 6,
        name: "火锅"
    },{
        id: 7,
        name: "冰淇淋"
    },{
        id: 8,
        name: "汉堡包"
    },{
        id: 9,
        name: "可乐"
    }];
let index;
let targetIndex = 84;
let timer;
let times;;

/*
,{
    id: 8,
    name: "汉堡包"
},{
    id: 9,
    name: "可乐"
}
*/



/*
    根据奖品列表推断需要多少个格子放的下
    用奖品列表的长度prizeList.length 加上开始按钮的总数 开平方 可以得到至少需要几行几列
    设变量row存储这个开平方的数
    有两种情况
    row为偶数 那么row需要+1 比如加上按钮一共10个占位 就需要 4*4 但是按钮无法居中 就做成 5*5

    row为奇数 那么row不需要变化
    [0, 1, 2, 3, 4, 9, 13, 18, 23, 22, 21, 20, 19, 14, 10, 5, 6, 7, 8, 12, 17, 16, 15, 11]
    0 1 2 3 4 row-1 2row-1 3row-1 4row-1 5row-1 

 <li class ="startBtn" style="width:${liWidth}px;height:${liWidth}px;line-height:${liWidth}px"">开始抽奖</li> 
<li style="width:${liWidth}px;height:${liWidth}px;line-height:${liWidth}px"></li> 
*/

let row = Math.ceil( Math.pow( prizeList.length + 1 , 1/2 ) );
row = row % 2 ? row : row + 1;

let liWidth = (Math.ceil( (drawBox.clientWidth - ((row + 1) * 10)) / row ));  // 每个li的宽度

// 先渲染25个空格子
for (let i = 0; i < row * row; i++) {
    let newLi = document.createElement('li'); 
    if (i == Math.floor(row * row / 2)) {
        newLi.innerHTML = `开始抽奖`;
        newLi.classList.add("startBtn");
    } else {
        newLi.innerHTML = ``
    }
    newLi.style.width =  `${liWidth}px`;
    newLi.style.height =  `${liWidth}px`;
    newLi.style.lineHeight =  `${liWidth}px`;
    drawBox.appendChild(newLi);
}   

// 获取到列表里所有可填充奖品的格子 然后根据prizeList将内容填充进去
let li = drawBox.querySelectorAll("li:not(.startBtn)"); 
let allIndex = []; // 所有参与抽奖的项目的序号
for (let i = 0; i < li.length; i++) {
    allIndex[i] = i;
} 
// 根据奖品数量生成随机排列序号 然后将布局序号添加进奖品数据中 根据奖品数据中的布局序号进行渲染
let ranIndex = []; // 存储奖品的随机布局序号
for (let i = 0; i < prizeList.length; i++) {
    let newRanIndex = Math.floor(Math.random() * li.length);
    if (ranIndex.includes(newRanIndex)) {
        i--;
    } else {
        ranIndex.push(newRanIndex);
    }
}

let uselessIndex = []; //谢谢参与的序号 就是 所有项目序号和奖品序号的差集
uselessIndex = allIndex.filter((item) => {
    return ranIndex.indexOf(item) == -1;  // 也就是在allIndex中把 在ranIndex中不存在的值过滤出来
})
// 将布局序号添加进奖品数据中
prizeList.forEach( (item, i) => {
    item.placeIndex = ranIndex[i];
    // 渲染奖品
    li[item.placeIndex].innerHTML = item.name;
})
// 渲染谢谢参与
uselessIndex.forEach((item) => {
    li[item].innerHTML = '谢谢参与';
})

// 动画路径
let indexPath = {
	"3": [0, 1, 2, 4, 7, 6, 5, 3],
	"5": [0, 1, 2, 3, 4, 9, 13, 18, 23, 22, 21, 20, 19, 14, 10, 5, 6, 7, 8, 12, 17, 16, 15, 11],
	"7": [0, 1, 2, 3, 4, 5, 6, 13, 20, 27, 34, 41, 48, 47, 46, 45, 44, 43, 42, 35, 28, 21, 14, 7, 8, 9, 10, 11, 12,
		19, 26, 33, 40, 39, 38, 37, 36, 29, 22, 15, 16, 17, 18, 25, 32, 31, 30, 23
	],
}
// switch (row) {
//     case 3 :
//         indexPath =  [0, 1, 2, 4, 7, 6, 5, 3];
//         break;
//     case 5 :
//         indexPath = [0, 1, 2, 3, 4, 9, 13, 18, 23, 22, 21, 20, 19, 14, 10, 5, 6, 7, 8, 12, 17, 16, 15, 11];
//         break;
// }
// let indexPath = [];
// for (let i = 0; i < row * row - 1; i++) {
//     if(i < row) {
//         indexPath[i] = i;
//     }
//     if ()
// } 
// console.log(indexPath);



// 点击开始按钮
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", () => {
    index = 0;
    times = 300;
    // targetIndex = Math.floor( Math.random() * 10 + 90);
    li.forEach((item) => {
        item.classList.remove("active")
    })
    startDraw();
})

function toggleClass(currentIndex) {
    li.forEach((item) => {
        item.classList.remove("active")
    })
    li[ indexPath[row][ currentIndex  % (li.length)] ].classList.add("active");
    selectPrize.innerText = li[ indexPath[ currentIndex  % (li.length)] ].innerText;
}

function startDraw() {

    timer = setTimeout(function() {
        toggleClass(index);
        if (index < targetIndex) {
            startDraw();
        }else {
            isRun = true;
        }
        index++;
        if (times > 30 && index < 20) {
            // 总的动画时间大于30ms, 并且index抽奖进度小于20的时候让它加速 
            times -= 20;
        }else if (index > 60) {
            // 抽奖进度> 60了 动画减速 
            times += 20;
        }
    },times)
}


