var jss=[
    "/vendor/jquery/jquery.min.js",
    "/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "/vendor/jquery-easing/jquery.easing.min.js",
    "/js/sb-admin-2.min.js",
    "https://cdn.staticfile.org/jquery-cookie/1.4.1/jquery.cookie.min.js",
    "https://cdn.jsdelivr.net/npm/sweetalert2@9.10.9/dist/sweetalert2.all.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.1/jquery.validate.min.js",

    "/vendor/datatables/jquery.dataTables.min.js",
    "/vendor/datatables/dataTables.bootstrap4.min.js",

    "https://unpkg.com/bootstrap-table@1.16.0/dist/bootstrap-table.min.js",
    "/js/jquery.js"
];
for(var i in jss){
    document.write("<script src=\""+jss[i]+"\"></script>");
}

var host="http://localhost:8080/project";

function get(url) {
    var data = $.ajax({
        type: 'GET',
        async: false,
        header: {
            "Access-Control-Allow-Origin": "*"
        },
        url: host + url,
    }).responseText;
    return JSON.parse(data);
}
function exportFile(url){
    window.location.href=host+url;
}
function getNoHeader(url) {
    var data = $.ajax({
        type: 'GET',
        async: false,
        header: {
            "Access-Control-Allow-Origin": "*"
        },
        url: url,
    }).responseText;
    return JSON.parse(data);
}
function post(url, body) {
    if ($.cookie('user') != null) {
        body.verify = $.cookie('user')
    }
    if ($.cookie('manager') != null) {
        body.verify = $.cookie('manager')
    }
    var data = $.ajax({
        type: 'POST',
        async: false,
        header: {
            "Access-Control-Allow-Origin": "*",
        },
        url: host + url,
        data: body
    }).responseText;
    return JSON.parse(data);
}
function put(url, body) {
    if ($.cookie('user') != null) {
        body.verify = $.cookie('user')
    }
    if ($.cookie('manager') != null) {
        body.verify = $.cookie('manager')
    }
    var data = $.ajax({
        type: 'PUT',
        async: false,
        header: {
            "Access-Control-Allow-Origin": "*"
        },
        url: host + url,
        data: body
    }).responseText;
    return JSON.parse(data);
}
function del(url) {
    var data = $.ajax({
        type: 'DELETE',
        async: false,
        header: {
            "Access-Control-Allow-Origin": "*"
        },
        url: host + url,
    }).responseText;
    return JSON.parse(data);
}



function getCookie(){
    return $.cookie('info');
}
function cookie(info){
    clearcookie();
    $.cookie('info', info, { expires: 7, path: '/' });
}
function clearcookie(){
    $.removeCookie('info', { expires: 7, path: '/' });
}





Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


function globalLogin(type){
    var info=getCookie();
    var res
    if(type==1){
        res=get("/owner/"+info);
    }else if(type==2){
        res=get("/developer/"+info);
    }else if(type==3){
        res=get("/manager/"+info);
    }
    if(res.code==200){
        $("#loginname").html(res.data.name);
    }else{
        clearcookie();
        window.location.href="/";
    }
    console.log(info);
}