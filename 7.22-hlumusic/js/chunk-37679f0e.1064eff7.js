(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-37679f0e"],{1591:function(t,s,e){},"1b67":function(t,s,e){"use strict";e("1591")},2601:function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"search"}},[e("header",[e("div",{staticClass:"search-inp-wrap"},[e("span",{staticClass:"icon-box iconfonts-search"},[e("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-fangdajing"}})])]),e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.searchInpContent,expression:"searchInpContent",modifiers:{trim:!0}}],ref:"searchInp",staticClass:"search-inp",attrs:{type:"text",placeholder:"搜索歌曲、歌手、专辑"},domProps:{value:t.searchInpContent},on:{input:[function(s){s.target.composing||(t.searchInpContent=s.target.value.trim())},t.SearchAdvice],keyup:function(s){return!s.type.indexOf("key")&&t._k(s.keyCode,"enter",13,s.key,"Enter")?null:t.Search.apply(null,arguments)},blur:function(s){return t.$forceUpdate()}}}),e("span",{directives:[{name:"show",rawName:"v-show",value:t.showcloseBtn,expression:"showcloseBtn"}],staticClass:"icon-box iconfonts-close",on:{click:t.clearInp}},[e("svg",{staticClass:"icon ",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-htmal5icon19"}})])])])]),e("main",[e("div",{staticClass:"hot-search"},[e("h4",[t._v("热门搜索")]),e("ul",{staticClass:"hot-serch-list"},[t._l(t.hotsearchArr,(function(s,a){return[e("li",{key:a,staticClass:"hot-serch-item",on:{click:function(e){return t.toSearch(s.first)}}},[t._v(" "+t._s(s.first)+" ")])]}))],2)])]),e("section",[e("ul",{staticClass:"search-history-list"},[t._l(t.historySearchArr,(function(s){return[e("li",{key:s.historyId,staticClass:"search-history-item"},[e("span",{staticClass:"icon-wrap"},[e("svg",{staticClass:"icon iconfonts-history",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-lishi"}})])]),e("p",{staticClass:"search-history-text",on:{click:function(e){return t.toSearch(s.text)}}},[t._v(t._s(s.text))]),e("span",{staticClass:"icon-wrap",on:{click:function(e){return t.delHistoryItem(s.historyId)}}},[e("svg",{staticClass:"icon iconfonts-history-delete",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-guanbi"}})])])])]}))],2)]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showSearchAdvice,expression:"showSearchAdvice"}],staticClass:"search-advice"},[e("ul",{staticClass:"search-advice-list"},[e("li",{staticClass:"search-advice-item"},[t._v("搜索 “ "+t._s(t.searchInpContent)+" ”")]),t._l(t.searchAdviceData,(function(s,a){return[e("li",{key:a,staticClass:"search-advice-item",on:{click:function(e){return t.toSearch(s.keyword)}}},[e("svg",{staticClass:"icon iconfonts-search",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-fangdajing"}})]),t._v(" "+t._s(s.keyword)+" ")])]}))],2)]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showSearchResult,expression:"showSearchResult"}],staticClass:"search-result"},[e("music-listfth",{attrs:{datas:t.searchResultData}})],1)])},i=[],r=(e("4795"),e("6eba"),e("0d03"),e("4de4"),function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"musicList"}},[e("ul",{staticClass:"musics-ul"},[t._l(t.datas,(function(s){return[e("router-link",{key:s.id,attrs:{tag:"li",to:"/song/"+s.id}},[t._t("index"),e("div",{staticClass:"music-text-wrap"},[e("div",{staticClass:"music-title"},[t._v(" "+t._s(s.name)+" ")]),e("div",{staticClass:"music-author"},[e("i",{staticClass:"iconfonts-sq"}),t._l(s.artists,(function(s){return[e("p",{key:s.id},[t._v(t._s(s.name))])]})),e("p",[t._v(t._s(s.album.name))])],2)]),e("div",{staticClass:"music-playbtn"},[e("svg",{staticClass:"icon icon-bofang",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-bofang"}})])])],2)]}))],2)])}),n=[],c={props:{datas:Array},data:function(){return{}},methods:{},computed:{},filters:{getMusicTitle:function(t){return t?"(".concat(t," )"):""}}},o=c,h=(e("aaf6"),e("2877")),l=Object(h["a"])(o,r,n,!1,null,"54ee1379",null),u=l.exports,d={data:function(){return{showcloseBtn:!1,advicetimer:null,showSearchAdvice:!1,showSearchResult:!1,canSearch:!0,searchInpContent:"",searchAdviceData:[],searchResultData:[],hotsearchArr:[],historySearchArr:[]}},methods:{gethistorySearchData:function(){this.historySearchArr=localStorage.getItem("historySearchArr")?JSON.parse(localStorage.getItem("historySearchArr")):[]},getHotsearchData:function(){var t=this;this.axios.get("/search/hot").then((function(s){t.hotsearchArr=s.result.hots}))},SearchAdvice:function(){var t=this;this.showSearchAdvice=!!this.searchInpContent.length,this.showcloseBtn=!!this.searchInpContent.length,clearTimeout(this.advicetimer),this.advicetimer=setTimeout((function(){t.axios.get("/search/suggest?keywords=".concat(t.searchInpContent,"&type=mobile")).then((function(s){t.searchAdviceData=s.result.allMatch?s.result.allMatch:[]}))}),2500)},Search:function(){var t=this;this.canSearch&&(this.searchResultData=[],this.canSearch=!1,this.showSearchResult=!0,this.showSearchAdvice=!1,this.showcloseBtn=!0,this.$refs.searchInp.blur(),this.axios.get("/search?keywords=".concat(this.searchInpContent,"&limit=30")).then((function(s){t.searchResultData=s.result.songs,t.canSearch=!0})),this.historySearchArr.push({historyId:Date.now(),text:this.searchInpContent}),setTimeout((function(){t.canSearch=!0}),2e3))},toSearch:function(t){this.searchInpContent=t,this.Search()},clearInp:function(){this.searchInpContent="",this.showSearchAdvice=!1,this.searchResultData=[],this.showSearchResult=!1,this.showcloseBtn=!1},delHistoryItem:function(t){this.historySearchArr=this.historySearchArr.filter((function(s){return s.historyId!=t}))}},created:function(){this.getHotsearchData(),this.gethistorySearchData()},watch:{historySearchArr:function(){localStorage.setItem("historySearchArr",JSON.stringify(this.historySearchArr))}},components:{"music-listfth":u}},f=d,v=(e("1b67"),Object(h["a"])(f,a,i,!1,null,"10873d10",null));s["default"]=v.exports},4795:function(t,s,e){var a=e("23e7"),i=e("da84"),r=e("342f"),n=[].slice,c=/MSIE .\./.test(r),o=function(t){return function(s,e){var a=arguments.length>2,i=a?n.call(arguments,2):void 0;return t(a?function(){("function"==typeof s?s:Function(s)).apply(this,i)}:s,e)}};a({global:!0,bind:!0,forced:c},{setTimeout:o(i.setTimeout),setInterval:o(i.setInterval)})},"6eba":function(t,s,e){var a=e("23e7");a({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},aaf6:function(t,s,e){"use strict";e("b7ff")},b7ff:function(t,s,e){}}]);
//# sourceMappingURL=chunk-37679f0e.1064eff7.js.map