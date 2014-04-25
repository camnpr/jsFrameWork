/**
*@fileoverview 函数模块
*@author yhw <hongwei@weimi.me>
*@version 0.1
*/

(function(window, document, undefined){ // 解释为什么这么写-> http://dwz.cn/gSkwj
	var WM = WM || {};
	WM.version = '0.1';
	
	// define WM for Node module pattern loaders
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = WM;
	
	// define WM as an AMD module
	} else if (typeof define === 'function' && define.amd) {
		define(WM);
	}
	
	window.WM = WM;
	
	/**
	*@description 实用函数集合
	*/	
	WM.Util = {
		/**
		*@description 对象扩展，参数形式 (Object[, Object, ...]) ->
		*@param {object} dest 目标对象
		*@param {object} source 源对象，将被扩展到目标对象上
		*@returns 扩展后的目标对象dest
		*/
		extend: function(dest){
				var sources = Array.prototype.slice.call(arguments, 1),
					i, j, len, src;
		
				for (j = 0, len = sources.length; j < len; j++) {
					src = sources[j] || {};
					for (i in src) {
						if (src.hasOwnProperty(i)) {
							dest[i] = src[i];
						}
					}
				}
				return dest;
		},
		
		/**
		*@description 扩展函数功能,apply继承
		*@example ...
		*@param {function} fn 函数
		*@param {object} obj 对象
		*@returns 返回闭包函数
		*/
		bind: function (fn, obj) { // (Function, Object) -> Function
			var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
			return function () {
				return fn.apply(obj, args || arguments);
			};
		},
		
		/**
		*@description 去除字符串首尾空格
		*@param {string} str 字符串
		*@returns 字符串
		*/
		trim: function(str){
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
			// function isString(value){return typeof value === 'string';}
			// native trim is way faster: http://jsperf.com/angular-trim-test
			// but IE doesn't have it... :-(
			// TODO: we should move this into IE/ES5 polyfill
			//if (!String.prototype.trim) {
				//return function(value) {
				  //return isString(value) ? value.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : value;
				//};
			  //}
			  //return function(value) {
				//return isString(value) ? value.trim() : value;
			  //};
		},
		
		/**
		*@description 分割字符串为数组，分隔符是空白字符(包括空格、制表符、换页符等等)
		*@param {string} str 字符串
		*@returns 数组
		*/
		splitWords: function(str){
			return WM.Util.trim(str).split(/\s+/);
		},
		
		/**
		*@description 合并对象的options选项
		*@example var obj = {options:{name:"init", minZoom: 1}}; WM.setOptions(obj, {maxZoom: 10, minZoom: 5});
		*@param {object} obj 源对象，可以带初始化options的对象
		*@param {object} options 要合并的对象
		*@returns 返回经过合并后的源对象的options属性
		*/
		setOptions: function (obj, options) {
			obj.options = WM.extend({}, obj.options, options);
			return obj.options;
		},

		/**
		*@description 判断类型是否是数组
		*@param {object} obj 任何对象
		*@returns 布尔值
		*/
		isArray: Array.isArray || function (obj) {
			return (Object.prototype.toString.call(obj) === '[object Array]');
		},
		
		/**
		*@description 空图片URL
		*/
		emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

	};
	
}(window, document));