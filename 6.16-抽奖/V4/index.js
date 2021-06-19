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
let targetIndex;
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

let allLi =  drawBox.querySelectorAll("li"); 
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

// 获取动画路径 
let indexPath = getPathArr(row); 
// console.log(indexPath);


// 点击开始按钮
let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", () => {
    index = 0;
    times = 300;
    targetIndex = (5* (row*row - 1)) + getTargetIndex(5);
    // console.log(targetIndex);
    li.forEach((item) => {
        item.classList.remove("active")
    })
    startDraw();
})

// 传入奖品Id 获取要中奖商品在页面中的布局位置 
function getTargetIndex(id) {

    let targetID = prizeList.filter((item) => {
        return item.id == id
    })
    console.log(targetID);
    let targetI;
    indexPath.forEach( (item, i) => {
        if (item == targetID[0].placeIndex) {
            targetI = i;
        }
    })
    return targetI;
  
}


function toggleClass(currentIndex) {
    allLi.forEach((item) => {
        item.classList.remove("active")
    })
    allLi[ indexPath[ currentIndex  % indexPath.length] ].classList.add("active");
    selectPrize.innerText = allLi[ indexPath[ currentIndex  % indexPath.length] ].innerText;
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
        if (times > 30 && index < targetIndex * 0.2) {
            // 总的动画时间大于30ms, 并且index抽奖进度小于20的时候让它加速 
            times -= 20;
        }else if (index > targetIndex * 0.9) {
            // 抽奖进度> 60了 动画减速 
            times += 20;
        }
    },times)
}


