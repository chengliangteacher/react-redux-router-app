/* 
    @description  请求路径
    @autor        cheng liang
    @create       2020-10-22 14:10"
    @params       
    @return       
*/
export const developNodeImgUrl = 'http://localhost:3009/uploads/';
export const developUrl = '/api';
//获取当前的URL中的地址，同时携带端口号,不携带http://
let projectAddrass = window.location.host;
// let projectAddrassNoPort = window.location.hostname;
//返回当前的URL协议,既http协议还是https协议
let protocol = document.location.protocol;
//封装请求接口的地址,如果服务器中套了一层性项目名称，需要在这里面添加上,需要留意，例如: /zzxl/
export const interfaceIp = `${protocol}//${projectAddrass}/inspection`;
