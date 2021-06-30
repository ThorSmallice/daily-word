/*
_method     -- GET / POST
url         -- 请求地址
_callback   -- 回调函数
parames     -- 传入参数
    postPrames -- post请求传递的参数
    requestHeader -- 请求头类型
*/
function _ajax(_method, url, _callback, parames = {
    postData : "", 
    requestHeader: "application/x-www-form-urlencoded"
}) {
    let xhr = new XMLHttpRequest();
    xhr.open(_method, url);
    if (_method == "POST") {
        xhr.setRequestHeader("Content-Type",parames.requestHeader)
    }
    xhr.send(parames.postData);
    xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                _callback && _callback(JSON.parse(xhr.responseText));
            }else {
                console.warn({
                    "res":"失败",
                    "状态码": xhr.status
                });
            }
        } else {
            // console.warn({
            //     "res":"正在请求",
            //     "请求阶段": xhr.readyState
            // });
        }
    })
}

