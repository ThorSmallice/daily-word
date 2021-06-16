 let wrap = document.querySelector(".wrap");
let box = document.querySelector(".box");
let ul = box.querySelector("ul")
let list = document.querySelectorAll(".box ul li");

let btnList = document.querySelectorAll(".btn-arrow");
// console.log(ul.offsetWidth);

let rotateDeg = 360 / ul.childElementCount / 2;
let tranSf = (ul.offsetWidth / 2) / (Math.tan( rotateDeg * (Math.PI/180))).toFixed(4);
// console.log( (Math.tan(45 * (Math.PI/180))).toFixed(4));
// console.log(tranSf);
list.forEach((item, index) => {
    item.style.transform = `rotateY(-${index * rotateDeg * 2}deg) translate3d(0,0,${tranSf}px)`
})

let count = 0;
btnList.forEach((item, index) => {
    item.addEventListener("click",() => {
        index == 0 ?  count-- : count++;
        ul.style.transform = `rotateY(${count * rotateDeg * 2}deg)`; 
    })
})