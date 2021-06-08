var info = [{
    name: "胡杭",
    age: 16
},
{
    name: "胜明",
    age: 22
},
{
    name: "军毅",
    age: 21
},
{
    name: "晓华",
    age: 13
},
{
    name: "盛聪",
    age: 23
},
{
    name: "侦剑",
    age: 32
},
{
    name: "红翔",
    age: 25
},
{
    name: "超维",
    age: 18
},
{
    name: "士琪",
    age: 22
},
{
    name: "艳华",
    age: 20
}
];

let addBtn = document.querySelector('.add');  				// 添加新信息按钮
let delBtn = document.querySelector('.del');				// 删除选中按钮

let ageSortStatus = false;                                  // 年龄默认排序状态 升序，从小到大
let ageSort = document.querySelector('.sort');			    // 年龄排序按钮
let ageUpBtn = document.querySelector('.ageUp');			// 年龄升序按钮
let ageDownBtn = document.querySelector('.ageDown');	    // 年龄降序按钮

let numSortStatus = false;                                  // 序号默认排序状态 降序，从大到小
let numSortBtn = document.querySelector('.num');            // 序号排序按钮
let numUpBtn = document.querySelector('.numUp');	        // 序号升序按钮
let numDownBtn = document.querySelector('.numDown');	    // 序号降序按钮

let Arrow = document.querySelectorAll("span[class *= 'Arrow'");      // 升降序小三角形按钮
 


let allSelectBtn = document.querySelector('.allSelect');	// 全选按钮
let reverseBtn = document.querySelector('.reverse');		// 反选按钮
let tbody = document.querySelector('#tbody');	            // 表格主体

let sortStatus = 0;                                         // 控制添加数据时 数据排序的状态  默认0 按照序号升序排 1按序号降序排 2按年龄升序排 3按年龄降序排


let tableInfoList = [];                                     // 存储要添加进列表的数据 
let infoIndex = 0;                                          // 记录已提取Info数据的下标 

// 添加新信息
addBtn.addEventListener("click", function() {
    if (!tableInfoList.length)  infoIndex = 0;                          // 如果渲染列表数据是空 则从0开始
    let newInfo = info.slice(infoIndex % 10, (infoIndex % 10) + 1);     // 每次截取一个数据 info里的数据循环利用
    let newData = JSON.parse(JSON.stringify(newInfo[0]));               // 截取下来的数据进行深拷贝 后续添加属性不会互相影响
    newData.checked = false;                                            // 新数据中添加checked属性 根据这个属性进行复选框状态的渲染
    newData.index = infoIndex;                                          // 添加index属性，记录每个数据的序号
    tableInfoList.push( newData );                                      // 更改好后的数据添加进tableInfoList 
    switch (sortStatus) {
        case 0: // 0 按照序号升序排
            tableInfoList.sort((a,b) => { return a.index - b.index})
            break;
        case 1: // 1按序号降序排
            tableInfoList.sort((a,b) => { return b.index - a.index})
            break;
        case 2: // 2按年龄升序排
            tableInfoList.sort((a,b) => { return a.age - b.age})
            break;
        case 3: // 3按年龄降序排
            tableInfoList.sort((a,b) => { return b.age - a.age})
            break;
    };
    updateTable();                                                      // 更新列表
    infoIndex++; 
})

// 全部选中
allSelectBtn.addEventListener("change",() => {
    tableInfoList.forEach((item) => {
        item.checked = allSelectBtn.checked;                // 列表里所有的复选框跟随全选按钮的状态
    })
    updateTable();                                          // 更新列表
})

// 反选
reverseBtn.addEventListener("click",() => {
    tableInfoList.forEach((item) => {
        item.checked = ! item.checked;
    })
    updateTable();
})

// 删除选中
delBtn.addEventListener("click", function() {
    tableInfoList = tableInfoList.filter((item) => {
        return item.checked == false;                       // 返回没被选中的数据 覆盖渲染列表
    })
    allSelectBtn.checked = false;
    updateTable();                                          // 更新列表
})

// 动态添加进的tr  这里委派事件 处理复选框点击事件、每行的删除按钮点击事件
tbody.addEventListener("click",(e) => {
    // 复选框点击时
    if (e.target.className == 'check-td') {
        let targetDateIndex = e.target.dataset.index;        // 获取点击目标上的data-index 根据这个data-index去修改tableInfoList的数据
        tableInfoList[targetDateIndex].checked = ! tableInfoList[targetDateIndex].checked; // checked状态取反
        updateTable();                                       // 更新列表
    }

    // 删除当前行
    if (e.target.className == 'delThis') {
        let targetDateIndex = e.target.dataset.index;        // 获取点击目标上的data-index 根据这个data-index去修改tableInfoList的数据
        tableInfoList.splice(targetDateIndex, 1);            // 删除当前行在渲染列表里的数据
        updateTable();                                       // 更新列表
    }
})

// 年龄排序
ageSort.addEventListener("click",() => {
    
    if(!ageSortStatus) { // ageSortStatus 为flase 默认状态下 按年龄升序
        tableInfoList.sort((a, b) => {
            return a.age - b.age;
        })
        sortStatus = 2;  // 更改sortStatus值 新添加元素时也会根据当前选择的排序状态添加
        setSpanClass(ageDownBtn);
    } else {        // 按年龄升序
        tableInfoList.sort((a, b) => {
            return b.age - a.age;
        })
        sortStatus = 3; 
        setSpanClass(ageUpBtn);
    }
    ageSortStatus = ! ageSortStatus;
    updateTable();
})

// 序号排序
numSortBtn.addEventListener("click",() => {
    if(numSortStatus) { // numSortStatus为true状态下  按序号升序
        tableInfoList.sort((a, b) => {
            return a.index - b.index;
        })
        sortStatus = 0;
        setSpanClass(numDownBtn);
    } else {        // numSortStatus为false默认状态下 按序号降序
        tableInfoList.sort((a, b) => {
            return b.index - a.index;
        })
        sortStatus = 1;
        setSpanClass(numUpBtn);
    }
    numSortStatus = ! numSortStatus;
    updateTable();
})


// 列表渲染
function updateTable () {
    
    
    let tbodyInner = '';

    tableInfoList.forEach(function(item,index) {
        if(item.checked) {
            tbodyInner += `
                <tr> 
                    <td>${String(item.index + 1).padStart(2, '0')}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td><button class="delThis" data-index=${index}>删除</button></td>
                    <td> <input type="checkbox" class="check-td" data-index=${index} checked > </td>
                </tr> 
            `
        } else {
            tbodyInner += `
                <tr>
                    <td>${String(item.index + 1).padStart(2, '0')}</td>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td><button class="delThis" data-index=${index}>删除</button></td>
                    <td> <input type="checkbox" class="check-td" data-index=${index}> </td>
                </tr>
            `
        }
    })

    tbody.innerHTML = tbodyInner;

    if (tableInfoList.length == 0) {
        allSelectBtn.setAttribute('disabled','disabled');
    }else {
        allSelectBtn.removeAttribute('disabled');
    }
    
    // 存储复选框的选中状态 如果其中有一个没选中 那么全选按钮checked 为false
    let isCheckAll = tableInfoList.every((item) => {
        return item.checked == true
    })

    isCheckAll ? allSelectBtn.checked = true : allSelectBtn.checked = false;
    

}
updateTable();



// 动态添加小三角样式类名
function setSpanClass (activeTarget) {
    Arrow.forEach((item) => { 
        item.classList.remove("borderActive")
    });
    activeTarget.classList.add("borderActive")
}