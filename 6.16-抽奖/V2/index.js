let drawBox = document.querySelector(".drawBox");
let prize = document.querySelectorAll(".drawBox li:not(.startBtn)");    // 奖品
let startBtn = document.querySelector(".startBtn"); // 开始按钮
let selectPrize = document.querySelector(".select-prize"); // 抽中的奖品名
let selectUl = document.querySelector(".select-pic ul");    // 左侧滚动图的奖品列表
selectUl.appendChild( selectUl.firstElementChild.cloneNode(true) );


let index;          // 控制选中的奖品下标,抽奖进度 用于抽奖动画中添加激活类 
let targetIndex = 84;    // 随机的奖品号，控制抽奖圈数和选中的奖品
let picIndex;       // 左边中奖轮播奖品的下标
let indexRandom; 

let timer;  
let times;          // 控制动画时间
let isRun = true;   // 控制可否点击开始

function animate(currentIndex) {
    prize.forEach((item) => {   // 重置样式
        item.classList.remove("active");
    });
    selectUl.style.transform = `translateY(-${currentIndex % 8}00%)`; 
    prize[ currentIndex % 8].classList.add("active");  // 选中的奖品添加激活类
    selectPrize.innerText = prize[currentIndex % 8].innerText; // 更改中奖提示中的文字
}


function run() {
    timer = setTimeout(() => {
        indexRandom = Math.floor(Math.random() * 9);  // 生成一个随机下标
        
        animate(indexRandom);
        
        if (index < targetIndex) {
            run();
        }else {
            animate(index);
            isRun = true;
        }
        index++;
        picIndex++;
        
        if (times > 30 && index < 20) {
            // 总的动画时间大于30ms, 并且index抽奖进度小于20的时候让它加速 
            times -= 20;
        }else if (index > 60) {
            // 抽奖进度> 60了 动画减速 
            times += 20;
        }
    },times)
}



startBtn.addEventListener("click",() => {
    if (isRun) {
        isRun = false;  // 禁止点击
        prize.forEach((item) => {   // 重置样式
            item.classList.remove("active");
        });
        index = 0;      // 每次点击重置抽奖进度为0
        times = 300;    // 每次点击重置动画时间为200
        picIndex = 0;
        run();          // 开启抽奖动画

    }
})
