/**
*@fileoverview 函数模块
*@author yhw <hongwei@weimi.me>
*@version 0.1
*/

; (function(window, document, undefined){ // 解释为什么这么写-> http://dwz.cn/gSkwj
	var oldWM = window.WM,
        WM = {};
	WM.version = '0.1';
	
	// define WM for Node module pattern loaders
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = WM;
	
	// define WM as an AMD module
	} else if (typeof define === 'function' && define.amd) {
		define(WM);
	}
	
    // 为 WM 变量规定新的名称
    WM.noConflict = function () {
	    window.WM = oldWM;
	    return this;
    };

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
		*@description 保留小数位数，最小保留1位，默认保留5位
		*@param {number} num 数值[必须]
		*@param {number} digits 位数[可选}
		*/
		formatNum: function (num, digits) {
			var pow = Math.pow(10, digits || 5);
			return Math.round(num * pow) / pow;
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
		emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',

       /**
        *@description 设置cookie
        */
        setCookie:function(sName,sValue,oExpires,sPath,sDomain,bSecure){
            var currDate = new Date(),
                sExpires = typeof oExpires == 'undefined'?'':';expires=' + new Date(currDate.getTime() + (oExpires * 24 * 60 * 60* 1000)).toUTCString();
            document.cookie = sName + '=' + sValue + sExpires + ((sPath == null)?'':(' ;path=' + sPath)) + ((sDomain == null)?'':(' ;domain=' + sDomain)) + ((bSecure == true)?' ; secure':'');
        },

         /**
        *@description 获取cookie
        */
        getCookie:function(sName){
            var regRes = document.cookie.match(new RegExp("(^| )" + sName + "=([^;]*)(;|$)"));
            return (regRes != null)?unescape(regRes[2]):'-';
        },

        /**
        *@description base64加密
        */
        base64encode: function(G) {
                var A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                var C, E, z;
                var F, D, B;
                z = G.length;
                E = 0;
                C = "";
                while (E < z) {
                    F = G.charCodeAt(E++) & 255;
                    if (E == z) {
                        C += A.charAt(F >> 2);
                        C += A.charAt((F & 3) << 4);
                        C += "==";
                        break
                    }
                    D = G.charCodeAt(E++);
                    if (E == z) {
                        C += A.charAt(F >> 2);
                        C += A.charAt(((F & 3) << 4) | ((D & 240) >> 4));
                        C += A.charAt((D & 15) << 2);
                        C += "=";
                        break
                    }
                    B = G.charCodeAt(E++);
                    C += A.charAt(F >> 2);
                    C += A.charAt(((F & 3) << 4) | ((D & 240) >> 4));
                    C += A.charAt(((D & 15) << 2) | ((B & 192) >> 6));
                    C += A.charAt(B & 63)
                }
                return C
            },
            /**
            *@description 全球唯一标识符
            */
            guid: function(){
                    var e = (new Date).getTime();
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                                var r, n;
                                return r = (e + 16 * Math.random()) % 16 | 0,
                                e = Math.floor(e / 16),
                                n = "x" === t ? r : 3 & r | 8,
                                n.toString(16)
                            });
            },
            addEvent: function(o,s,fn){
                o.attachEvent?o.attachEvent('on'+s,fn):o.addEventListener(s,fn,false);
                return o;                
            },
            domReady: function(domLoadedHandler){
                    /*if (readyBound ) return;
                    readyBound = true;*/

                    if ( document.addEventListener ) {
                        document.addEventListener( "DOMContentLoaded", function(){
                            document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
                            domLoadedHandler;
                        }, false );

                    } else if ( document.attachEvent ) {
                        // 考虑网页中嵌入iframes
                        document.attachEvent("onreadystatechange", function(){
                            if ( document.readyState === "complete" ) {
                                document.detachEvent( "onreadystatechange", arguments.callee );
                                domLoadedHandler;
                            }
                        });

                        //是IE并且没有iframe，不断检查，看看是否准备好
                        if ( document.documentElement.doScroll && typeof window.frameElement === "undefined" ) (function(){
                            //if ( jQuery.isReady ) return;
                            try {
                                //如果是IE，使用这个技巧 http://javascript.nwbox.com/IEContentLoaded/
                                document.documentElement.doScroll("left");
                            } catch( error ) {
                                setTimeout( arguments.callee, 0 );
                                return;
                            }

                            //执行等待的函数
                            domLoadedHandler;
                        })();
                    }

                    window.addEventListener('load',domLoadedHandler,false);
              },
              beforeunload:function(){ // 兼容卸载页面代码，统计页面停留时间。 （为了防止页面beforeunload不执行，采用定时发起请求）

              },
	};

        /**
    *@description Ajax 兼容IE6+
    */  
    ST.Ajax = {
        config:{
            contentType: 'application/x-www-form-urlencoded'
        },
        parse: function (req) {
            var result;
            try {
                //var a = !!window.ActiveXObject && +/msie\s(\d+)/i.exec(navigator.userAgent)[1] || 0 / 0;
                // 9 > a ? 加载json2 : 
                  result = JSON.parse(req.responseText);
                } catch (e) {
                  result = req.responseText;
                }
            return [result, req];
        },
        xhr: function (type, url, data) {
                var methods = {
                  success: function () {},
                  error: function () {},
                  always: function () {}
                }, parse =  this.parse;
                var XHR = XMLHttpRequest || ActiveXObject;
                var request = new XHR('MSXML2.XMLHTTP.3.0');

                request.open(type, url, true);
                request.setRequestHeader('Content-type', this.config.contentType);
                request.onreadystatechange = function () {
                  var req;
                  if (request.readyState === 4) {
                    req = parse(request);
                    if (request.status >= 200 && request.status < 300) {
                      methods.success.apply(methods, req);
                    } else {
                      methods.error.apply(methods, req);
                    }
                    methods.always.apply(methods, req);
                  }
                };
                request.send(data);

                var atomXHR = {
                  success: function (callback) {
                    methods.success = callback;
                    return atomXHR;
                  },
                  error: function (callback) {
                    methods.error = callback;
                    return atomXHR;
                  },
                  always: function (callback) {
                    methods.always = callback;
                    return atomXHR;
                  }
                };
                return atomXHR;
           },
          get: function (src) {
            return this.xhr('GET', src);
          },
          post: function (url, data) {
            return this.xhr('POST', url, data);
          },
          setContentType: function(value) {
            this.config.contentType = value;
          }
    };
	
}(window, document));
