
let app = new Vue({
	el:"#app",
	data: {
		nowIndex:1,
		canClick: true,
		autoRunTimer: null,
		ulStyle: { 
            transition: "",
			transform: "translateX(-100%)"
		},
		carouselArr: ["img/1.png","img/2.png","img/3.png"]
	},
	methods:{
		rightClick() {
			if (this.canClick) {
				this.canClick = false;
				this.nowIndex++; 
				this.Run();
			}
		},
		leftClick() {
			if (this.canClick) {
				this.canClick = false;
				this.nowIndex--;
				this.Run()
			}
		},
        pointClick (index) {
            if (this.canClick) {
                this.canClick = false;
                this.nowIndex = index;
                this.Run()
            }
        },
		// 轮播图切换
		Run() {
			this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`
		},
		// 自动轮播
		autoRun () {
			this.autoRunTimer = setInterval(() => { 
				// if (this.canClick) {
				// 	this.canClick = false;
				// 	this.nowIndex++; 
				// 	this.Run(); 
				// }
                this.rightClick()
			}, 3500)
		},
		// 取消自动轮播
		clearAutoRun () {
			clearInterval(this.autoRunTimer)
		},
		// 偷龙转凤
		togglePic (e) {
			// if (this.nowIndex  == this.carouselArr.length - 1 || this.nowIndex == 0) {
			// 	this.$refs.ul.style.transition = "none";
			// }
			// if (this.nowIndex == this.carouselArr.length - 1) {
			// 	this.nowIndex = 1;
			// }
			// if ( this.nowIndex == 0 ) {
			// 	this.nowIndex = this.carouselArr.length - 2;
			// }
			// this.$refs.ul.style.transform = `translateX(-${this.nowIndex}00%)`; 
			// getComputedStyle(this.$refs.ul).transition;  
			// this.$refs.ul.style.transition = ""; 
			// this.canClick = true;

            if (this.nowIndex  == this.carouselArr.length - 1 || this.nowIndex == 0) {
				this.ulStyle.transition = "none";
                !this.nowIndex? this.nowIndex = this.carouselArr.length - 2: this.nowIndex = 1;
                this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`;
                this.$nextTick( function () {
                    getComputedStyle(e.target).transition
                    this.ulStyle.transition = "";
                })
			}
            this.canClick = true;
		}
	},
	computed:{
		resCarouselArr () {
			this.carouselArr.push(String(this.carouselArr.slice(0,1)));
			this.carouselArr.unshift(String(this.carouselArr.slice(-2,-1)))
			return this.carouselArr;
		}
	},
    created() {
        _promise("http://student.0melon0.cn/index/index/get_carousel?position_id=1")
        .then((res) => { 
            this.carouselArr = res;
        })
    },
	mounted() {
		this.autoRun();
	}
}) 


// app.$refs.ul.addEventListener("transitionend", function () {
// 	this.style.transition = "none";
// 	if (app.nowIndex == app.carouselArr.length - 1) {
// 		app.nowIndex = 1;
// 	}
// 	if ( app.nowIndex == 0 ) {
// 		app.nowIndex = app.carouselArr.length - 2;
// 	}
// 	this.style.transform = `translateX(-${app.nowIndex}00%)`;
// 	getComputedStyle(this).transition; 
// 	this.style.transition = ""; 
// 	app.canClick = true;
// })
