let drawBox = document.querySelector(".drawBox");
let prize = document.querySelectorAll(".drawBox li:not(.startBtn)");    // 奖品
let startBtn = document.querySelector(".startBtn"); // 开始按钮
let selectPrize = document.querySelector(".select-prize"); // 抽中的奖品名
let selectUl = document.querySelector(".select-pic ul");    // 左侧滚动图的奖品列表
selectUl.appendChild( selectUl.firstElementChild.cloneNode(true) );


let index;          // 控制选中的奖品下标,抽奖进度 用于抽奖动画中添加激活类 
let targetIndex = 84;    // 随机的奖品号，控制抽奖圈数和选中的奖品
let picIndex;       // 左边中奖轮播奖品的下标

let timer;  
let times;          // 控制动画时间
let isRun = true;   // 控制可否点击开始




function run(index , targetIndex, picIndex) {
    timer = setTimeout(() => {
        if (index) {    // index不为0时 选中的奖品要删除激活类
            prize[(index - 1) % 8].classList.remove("active");
        }
        if (picIndex == selectUl.childElementCount - 1) {   // 当中间轮播下标到达克隆的那个时让下标重置
            picIndex = 0;
            selectUl.style.transition = "none";
            selectUl.style.transform = `translateY(-${picIndex}00%)`; 
            getComputedStyle(selectUl).transition;
            selectUl.style.transition = "";
        }
        prize[ index % 8 ].classList.add("active");  // 选中的奖品添加激活类
        selectPrize.innerText = prize[index % 8].innerText; // 更改中奖提示中的文字
        
        animat(picIndex); // 左侧轮播图开启
        // console.log(picIndex);
        if (index < targetIndex) {
            run();
        }else {
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

function animat(picIndex) {
    selectUl.style.transform = `translateY(-${picIndex}00%)`;
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
