/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
let baseUrl = 'http://192.168.1.180:8888/mockjs/2'; 
let routerMode = 'hash';
let baseImgPath;
if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://192.168.1.180:8888/mockjs/2';
	baseImgPath = '/img/';
}else{
	baseUrl = 'http://192.168.1.180:8088/VTE';
    baseImgPath = 'http://192.168.1.180:8088/VTE/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}