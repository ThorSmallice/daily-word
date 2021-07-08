function _promise (_url, _method="GET",parames = {
    postData : "", 
    requestHeader: "application/x-www-form-urlencoded"
}) {
    return new Promise( (resolve,reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(_method,_url);
        if (_method == "POST") {
            xhr.setRequestHeader("Content-Type",parames.requestHeader)
        }
        parames.postData? xhr.send(parames.postData) : xhr.send();
        xhr.addEventListener("readystatechange", () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText).data);
                } else {
                    reject("请求失败!");
                }
            }
        })
    })
}