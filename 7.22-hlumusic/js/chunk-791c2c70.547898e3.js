(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-791c2c70"],{4031:function(t,s,a){},8084:function(t,s,a){"use strict";a("4031")},"878a":function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"comment-floor"}},[a("ul",{staticClass:"comment-ul"},[t._l(t.datas,(function(s){return[a("li",{key:s.commentId,staticClass:"comment-item"},[a("router-link",{staticClass:"head-port",attrs:{to:"#"}},[a("img",{attrs:{src:s.user.avatarUrl||"",alt:""}})]),a("div",{staticClass:"user-info-wrap"},[a("router-link",{staticClass:"user-head",attrs:{to:"#"}},[t._v(" "+t._s(s.user.nickname)+" "),a("i",{staticClass:"iconfonts-vip"})]),a("p",{staticClass:"comment-times"},[t._v(t._s(t._f("getFormatTime")(s.time,2)))]),a("span",{staticClass:"comment-content"},[t._v(" "+t._s(s.content)+" ")]),a("div",{staticClass:"dianzan"},[t._v(" "+t._s(s.likedCount)+" "),a("svg",{class:["icon","iconfonts-dianzan",{"dianzan-like":s.liked}],attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-dianzan"}})])])],1)],1)]}))],2)])},n=[],e={props:{datas:Array}},o=e,c=(a("8084"),a("2877")),r=Object(c["a"])(o,i,n,!1,null,"6ecb8313",null);s["a"]=r.exports},"9e2a":function(t,s,a){},a4f0:function(t,s,a){},aac4:function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"musicList"}},[a("ul",{staticClass:"musics-ul"},[t._l(t.datas,(function(s,i){return[a("router-link",{key:s.id,attrs:{tag:"li",to:"/song/"+s.id}},[a("div",{staticClass:"index"},[t._v(" "+t._s(i+1)+" ")]),a("div",{staticClass:"music-text-wrap"},[a("div",{staticClass:"music-title"},[t._v(" "+t._s(s.name)+" "),a("span",[t._v(t._s(t._f("getMusicTitle")(s.alia[0])))])]),a("div",{staticClass:"music-author"},[a("i",{staticClass:"iconfonts-sq"}),a("p",[t._v(t._s(s.ar[0].name+"-"+s.name))])])]),a("div",{staticClass:"music-playbtn"},[a("svg",{staticClass:"icon icon-bofang",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-bofang"}})])])])]}))],2)])},n=[],e={props:{datas:Array},data:function(){return{}},methods:{},computed:{},filters:{getMusicTitle:function(t){return t?"(".concat(t," )"):""}}},o=e,c=(a("ff1d"),a("2877")),r=Object(c["a"])(o,i,n,!1,null,"70f38b4e",null);s["a"]=r.exports},ad6a:function(t,s,a){"use strict";a("9e2a")},b0c0:function(t,s,a){var i=a("83ab"),n=a("9bf2").f,e=Function.prototype,o=e.toString,c=/^\s*function ([^ (]*)/,r="name";i&&!(r in e)&&n(e,r,{configurable:!0,get:function(){try{return o.call(this).match(c)[1]}catch(t){return""}}})},ee18:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"Album"}},[a("header",[a("div",{staticClass:"header-bg",style:"background-image:url("+t.AlbumInfo.blurPicUrl+")"}),a("div",{staticClass:"user-wrap"},[a("div",{staticClass:"user-portrait"},[a("img",{attrs:{src:t.AlbumInfo.blurPicUrl+"?imageView=1&type=webp&thumbnail=378y378"}})]),a("router-link",{staticClass:"user-music-text",attrs:{tag:"div",to:"/user/"+t.AlbumInfo.userId}},[a("h2",[t._v(t._s(t.AlbumInfo.name))]),a("div",{staticClass:"recomm-user"},[t._v(" 歌手："),a("span",[t._v(t._s(t.AlbumAuthor))]),a("p",[t._v("发行时间: "+t._s(t._f("getFormatTime")(t.AlbumInfo.publishTime,1)))])])])],1)]),a("section",{staticClass:"album-introduce"},[a("div",{class:["introduce-content",{"show-all":!t.introduceShow}]},[t._v(" 简介："+t._s(t.AlbumInfo.description)+" ")]),t.introduceShow?a("span",{staticClass:"iconfonts-xiajiantou",on:{click:t.showAllIntroduce}},[a("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-jiantou-copy-copy-copy"}})])]):a("span",{staticClass:"iconfonts-xiajiantou",on:{click:t.showAllIntroduce}},[a("svg",{staticClass:"icon",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-jiantou"}})])])]),a("main",[a("p",{staticClass:"music-list-text"},[t._v("歌曲列表")]),a("musicListTh",{attrs:{datas:t.CurrentDate}}),a("p",{staticClass:"music-list-text"},[t._v("精彩评论")]),a("comment-floor",{attrs:{datas:t.CommentData}}),a("router-link",{staticClass:"comment-lookall",attrs:{to:"#",tag:"p"}},[t._v("查看全部"+t._s(t.Commenttotal)+"条评论")])],1),a("footer",[a("button",{staticClass:"collectionList"},[a("svg",{staticClass:"icon icon-logo",attrs:{"aria-hidden":"true"}},[a("use",{attrs:{"xlink:href":"#icon-bingtanghulu"}})]),t._v(" 收藏专辑 ")])])])},n=[],e=(a("b0c0"),a("aac4")),o=a("878a"),c={data:function(){return{introduceShow:!1,CurrentDate:[],CommentData:[],Commenttotal:"",creatorData:{},AlbumInfo:{},AlbumAuthor:""}},methods:{getCurrentDate:function(){var t=this;this.axios.get("/album?id=".concat(this.$route.params.id)).then((function(s){t.AlbumInfo=s.album,t.AlbumAuthor=s.album.artist.name,t.CurrentDate=s.songs})),this.axios.get("/comment/album?id=".concat(this.$route.params.id)).then((function(s){console.log(s),t.CommentData=s.hotComments.length?s.hotComments:s.comments,t.Commenttotal=s.total}))},showAllIntroduce:function(){this.introduceShow=!this.introduceShow}},created:function(){this.getCurrentDate()},watch:{},components:{musicListTh:e["a"],"comment-floor":o["a"]}},r=c,u=(a("ad6a"),a("2877")),l=Object(u["a"])(r,i,n,!1,null,"521028ca",null);s["default"]=l.exports},ff1d:function(t,s,a){"use strict";a("a4f0")}}]);
//# sourceMappingURL=chunk-791c2c70.547898e3.js.map