
let contianBox = document.querySelector(".container");
// 获取数据
/*
    xhrObj -- 传入一个新的变量名称 用于初始化一个新的请求体
    method -- 请求方式
    url    -- 请求地址
*/
function getData(xhrObj, method, url, callback) {
    this.xhrObj = xhrObj;
    xhrObj = new XMLHttpRequest();
    xhrObj.open(method, url);
    xhrObj.send();
    xhrObj.addEventListener("readystatechange", function () {
        if (xhrObj.readyState === 4) {
            if (xhrObj.status === 200) {
                callback && callback(JSON.parse(xhrObj.responseText));
            } else {
                console.warn({
                    "res":"失败",
                    "状态码": xhrObj.status
                });
            }
        }
    })
}

let disc = document.querySelector(".disc");     // 圆盘奖品列表的盒子
let discListStr = '';                           // 圆盘奖品列表里要渲染的内容
let discList;                                   // 存储奖品列表数据;
// 获取圆盘奖品信息
getData("xhrDiscList", "GET", "http://student.0melon0.cn/index/wheel/get_prize_list", function(res) {
    discList = res.data.prize_list;  // 圆盘奖品数据列表
     
    
    // 根据数据列表渲染圆盘
    discList.forEach((item, i) => {
        // 分配奖品在dom节点的位置信息，并写入数据中
        item.domIndex = i;
        // 渲染奖品
        discListStr += `
            <li style="transform: rotate(${i * 360 / discList.length}deg) skewY(${90 - 360 /  discList.length}deg)">
                <div class="content">
                    <p>${item.name}</p>
                    <img src="${item.diagram}">
                </div>
            </li> 
        `;

        // console.log(discList);
    });
    disc.innerHTML = discListStr; 
});

let aleatBox = document.querySelector(".alert-box"); // 中奖弹窗
let startBtn = document.querySelector(".startBtn-wrap");  // 抽奖开始按钮
let startRotataDeg;                                       // 抽奖开始，圆盘的旋转角度
let endRotateDeg;          // 抽奖结束，圆盘停留的旋转角度，默认转5圈，那就应该是360*5
let isRun = true;   // 控制是否可以开始抽奖
let times = 200;          // 控制抽奖耗时
let timer;          // 控制计时器
let getPhoneNum;    // 存储用户手机号
/*
    点击开始按钮，isRun==true时
    验证用户手机号是否存在
    如果不存在，先提示用户输入手机号
    手机号存在了，获取用户抽奖结果的信息
*/
// 请求抽奖
startBtn.addEventListener("click",function() {
    if (isRun) {    // 允许点击抽奖
        isRun = false;  // 禁止抽奖
        startRotataDeg = 0; // 初始化开始时的角度
        disc.style.transform = "rotate(0deg)"; // 初始化圆盘显示角度
        
        if (!getPhoneNum) {
            //  手机号不存在 提示输入手机号
            getPhoneNum = prompt("请输入手机号");
        } 
        // 获取用户抽奖结果的信息
        getData("xhrBingGoInfo", "GET",`http://student.0melon0.cn/index/wheel/draw?phone=${getPhoneNum}`, (res) => {
             
            if (res.res == 0) {
                getPhoneNum = ''; // 用户手机号置空
                isRun = true;   // 允许点击
                alert(res.msg);  // 提示用户手机号错误
            } else {
                
                let binggoID = res.data.bingo_prize_id;  // 中奖奖品Id
                // 根据中奖id找到奖品列表中的奖品，记录奖品所在dom节点的序号
                let binggoIndex = discList.filter((item) => {
                    return item.id == binggoID
                })[0].domIndex;

                // 所在角度根据规律 计算公式为 360 - （i * 360/discList.length - 360/discList.length/2);
                // 所以当所在位置为0时 以6个奖品计算 只需转30度 那么将他的值改为6（即奖品数据列表的长度） 即可计算出来
                (binggoIndex == 0) && (binggoIndex = discList.length);
                // if (binggoIndex == 0) {
                //     binggoIndex = discList.length;
                // }
                let binggoDeg = 360 - (binggoIndex * 360/discList.length - 360/discList.length/2);  // 记录奖品所在dom位置被指中时 需要旋转的角度
                
                
                endRotateDeg = binggoDeg + 1800;
                
                let discAnimate = disc.animate([
                    {transform: `rotate(0deg)`},
                    {transform: `rotate(${endRotateDeg}deg)`}
                ],{
                    duration: 3000,
                    easing: "cubic-bezier(.57,-0.07,.22,1.02)",
                    fill: "forwards"
                })
                // console.log(discAnimate);
                discAnimate.addEventListener("finish",() => {
                    isRun = true;   // 开始按钮允许点击
                    let binggoItem = discList.filter((item) => {
                        return item.id == binggoID
                    })[0];
                    // console.log(binggoItem);
                     
                    if (binggoItem.grade_id == 4) {
                        aleatBox.innerHTML = `
                            <span class="del-alertBox">x</span>
                            <p>很遗憾抽中了${binggoItem.name},再接再厉哦~</p>
                            <img src="${binggoItem.diagram}" alt="">
                        `
                    } else {
                        aleatBox.innerHTML = `
                            <span class="del-alertBox">x</span>
                            <p>恭喜你抽中了${binggoItem.name}！</p>
                            <img src="${binggoItem.diagram}" alt="">
                        `
                    }
                    aleatBox.classList.remove("alert-box-none");
                    aleatBox.classList.add("alert-box-block");
                })
              
            }

        })
    }
   
   
    
    
})
// 关闭中奖弹窗
aleatBox.addEventListener("click",(e) => {
    console.log(e);
    if (e.target.classList.contains("del-alertBox")) {
        aleatBox.classList.remove("alert-box-block");
        aleatBox.classList.add("alert-box-none");
    }
})


let luckyUserWrap = document.querySelector(".user-wrap");  // 顶部中间用户提示的容器
let luckyUserIndex = 0; // 中奖用户序号
let luckyUserStr;   // 拼接中奖用户的渲染内容
// 获取头部中奖信息
getData("xhrLuckyUserList", "GET", "http://student.0melon0.cn/index/wheel/get_top_draw_record_list", (res) => {
    /* 
        获取到了中奖用户数据列表
        按顺序抽取一个数据
        将数据渲染到页面上 并且加上动画
        动画结束后再抽取下一个数据
        
    */
    luckyUserAniamte(res.data, luckyUserIndex);
})
// 头部滚动信息的动画
function luckyUserAniamte(dataList, userIndex) {
    luckyUserIndex = userIndex; // 让外面的中奖用户序号同步
    // 按顺序抽取一个数据 拼接渲染内容 
    luckyUserStr = `
        <span class="lucky-ico"></span>
        <p class="lucky-user-info">
            恭喜 ${dataList[userIndex].phone.substr(0,3).padEnd(9,"*").concat(dataList[userIndex].phone.substr(-2,2))}用户抽中 ${dataList[userIndex].prize_name}
        </p>
    `;
    luckyUserWrap.innerHTML = luckyUserStr; // 渲染内容
    // 给渲染结果加上动画
    let luckyWrapAnimat = luckyUserWrap.animate([
        {transform: "translateY(40px)"},
        {transform: "translateY(0px)"},
        {transform: "translateY(-40px)"}
    ],{
        duration: 4000,
        easing: "cubic-bezier(0,1,1,0)",
        fill: "forwards"
    })

    // 动画结束后
    luckyWrapAnimat.addEventListener("finish", () => {
        userIndex++;    // 要渲染的数据的序号自增
        if (userIndex == dataList.length) {
            userIndex = 0;  // 当序号自增后 == 数据列表的长度 说明走到最后一个数据了 让它重置为0
        }
        luckyUserAniamte(dataList, userIndex); // 再次调用该动画
    })
}


let drawTbody = document.querySelector(".draw-res-tbody");
let drawResStr = ''; // 记录右侧抽奖记录表格里要渲染的内容
// 获取右侧抽奖记录
getData("drawResList", "GET", "http://student.0melon0.cn/index/wheel/get_draw_record_list?page=1&page_num=20", (res) => {
    
    res.data.draw_record_list.forEach((item) => {
        drawResStr += `
            <tr>
                <td>${getTimeing(item.draw_time_stamp)}</td>
                <td>${item.prize_name}</td>
            </tr>
        `;
        // console.log(item)
    }); 
    drawTbody.innerHTML = drawResStr;
})


let tbodyWrap = document.querySelector(".tbody-wrap");  // 右侧抽奖记录列表容器
let page = 1;
let scrollLength = 0;
let canUpdata = true; // 控制可否请求新数据 控制器
tbodyWrap.addEventListener("scroll", (e) => { 
    // e.target.scrollTop + e.target.clientHeight > e.target.scrollHeight - 50
    if (canUpdata && Math.ceil(e.target.scrollTop) >= e.target.scrollHeight - e.target.clientHeight) {
        // 当控制器允许请求数据 并且 滚动条到最底部了
        canUpdata = false;  // 控制器关闭 禁止再次请求
        // console.log("数据开始请求");
        page++;
        // 延迟2s请求数据
        setTimeout(() => {
            // 请求新数据
            getData("drawResList", "GET", "http://student.0melon0.cn/index/wheel/get_draw_record_list?page=1&page_num=20", (res) => {
        
                res.data.draw_record_list.forEach((item) => {
                    drawResStr += `
                        <tr>
                            <td>${getTimeing(item.draw_time_stamp)}</td>
                            <td>${item.prize_name}</td>
                        </tr>
                    `;
                }); 
                drawTbody.innerHTML = drawResStr;
                // 数据渲染完成 延迟1s打开控制器
                setTimeout(() => {
                    canUpdata = true;
                }, 1000)
                
            })
        },2000)

    } else if(Math.ceil(e.target.scrollTop) >= e.target.scrollHeight - e.target.clientHeight){
        console.log("禁止重复请求");
    }
})

// 计算时间戳的日期
function getTimeing(timeing) {
    let year = String( parseInt(timeing / 86400 / 365) + 1970 );
    let month = String( parseInt(timeing % (86400 * 365) / (86400 * 30)) );
    let day = String( parseInt(timeing % (86400 * 365) % (86400 * 30) / 86400) );
    
    let hour = String( parseInt(timeing % (86400 * 365) % (86400 * 30) % 86400 / 3600) );
    let minute = String( parseInt(timeing % (86400 * 365) % (86400 * 30) % 86400 % 3600 / 60) );
    
    day = day < 10? day.padStart(2,"0") : day;
    hour = hour < 10? hour.padStart(2,"0") : hour;
    minute = minute < 10? minute.padStart(2,"0") : minute;

    return `${year}.${month}.${day} ${hour}:${minute}`
}