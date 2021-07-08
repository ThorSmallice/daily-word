



function Carousel (boxClass, pisiID) {
    this.boxObj = document.querySelector(boxClass);
    this.ul = this.boxObj.querySelector("ul"); // ul 图片列表
    this.leftArrow = this.boxObj.querySelector(".leftArrow"); // 左按钮
    this.rightArrow = this.boxObj.querySelector(".rightArrow"); // 右按钮
    this.pointListOl = this.boxObj.querySelector(".pointList"); // 小圆点的列表容器
    this.nowIndex = 1; 
    
    this.timer;
    this.isRun = true;
    
    this.ul.innerHTML = "";
    this.pointListOl.innerHTML = '';
    _ajax("GET",`http://student.0melon0.cn/index/index/get_carousel?position_id=${pisiID}`, (res) => {
        this.picStr = "";
        res.data.forEach((item) => {
            this.picStr += `
                <li><a href=""><img src="${item}" alt=""></a></li>
            `
        })
        this.ul.innerHTML = this.picStr;

        for (let i = 0; i < this.ul.childElementCount; i++) {
            if (i == 0) {
                this.pointListOl.innerHTML += `
                    <li class="active"></li>
                `
            } else {
                this.pointListOl.innerHTML += `
                    <li></li>
                `
            }
        }

        this.pointList = this.boxObj.querySelectorAll(".pointList li");   // 小圆点
        this.ul.insertBefore(this.ul.lastElementChild.cloneNode(true),this.ul.firstElementChild);
        this.ul.style.transition = 'none';
        this.ul.style.transform = `translateX(-100%)`;
        getComputedStyle(this.ul).transition;
        this.ul.style.transition = '';
        this.ul.appendChild(this.ul.children[1].cloneNode(true));

        this.pointList.forEach( (item,index) => {
            item.addEventListener("click", () => {
                console.log(index);
                this.nowIndex = index + 1;
                this.Run();
            })
        })

         // 自动轮播
        this.timer = setInterval(() => {
            this.rightArrow.click();
        },3000)

        // 鼠标移入，取消轮播
        this.boxObj.addEventListener("mouseenter", () => {
            clearInterval(this.timer);
        })

        // 鼠标移出，继续轮播
        this.boxObj.addEventListener("mouseleave", () => {
            this.timer = setInterval(() => {
                this.rightArrow.click();
            }, 3000) 
        })

         // 当浏览器窗口切换到别的界面时，暂停轮播
        document.addEventListener("visibilitychange",  () => {
            if (document.visibilityState == "visible") {
                this.timer = setInterval(() =>{
                    this.rightArrow.click();
                }, 3000) 
            }else {
               
                clearInterval(this.timer);
            }
        })
    })
    

    

    
    

    
    /**
     * 左箭头事件
     */
    this.leftArrow.addEventListener("click", () => {
        if (this.isRun) {
            this.isRun = false;
            this.nowIndex--;
            this.Run();
            this.isRun = true;
            
        }
    })

    // 右箭头事件
    this.rightArrow.addEventListener("click" , () => {
        if (this.isRun) {
            this.isRun = false;
            this.nowIndex++;
            this.Run();
            this.isRun = true; 
        }
    })

    // 过渡动画结束后
    this.ul.addEventListener("transitionend", () => {	
        this.ul.style.transition = "none";					// 清除动画属性
        // console.log(nowIndex);
        if (this.nowIndex == this.ul.childElementCount - 1) {		// 当前显示图片的下标如果等于倒数第一个，说明走到最后一张了（克隆的图片1）
            this.nowIndex = 1;								// 将当前显示图片的下标重置回第一张（图片1）
        }
        if (!this.nowIndex) {								// 如果下标==0，说明走到了最前面克隆的那张（克隆的图片4）
            this.nowIndex = this.ul.childElementCount - 2  		// 那么当前显示图片的下标就要变到倒数第二张（图片4）
        }
        // console.log(nowIndex);
        this.ul.style.transform = `translateX(-${this.nowIndex}00%)`; 
        getComputedStyle(this.ul).transition;
        this.ul.style.transition = "";
        this.pointActive()
    }) 
     

   

   
}

// 图片滚动
Carousel.prototype.Run = function () {
    this.ul.style.transform = `translateX(-${this.nowIndex}00%)`;
}

/**
 * 小圆点状态更改
 */
Carousel.prototype.pointActive = function () {
    this.pointList.forEach((item) => {
		item.classList.remove('active');
	})
	this.pointList[this.nowIndex-1].classList.add("active")
}

