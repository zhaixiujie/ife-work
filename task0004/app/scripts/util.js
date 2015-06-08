/**
 * Created by DIYgod on 15/4/24.
 */
define(function() {
// task 2.1
// 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
        // return arr instanceof Array;  //简易判断，准确度差
        return Object.prototype.toString.call(arr) === '[object Array]';
    }

// 判断fn是否为一个函数，返回一个bool值
    function isFunction(fn) {
        // typeof fn === 'function'  //简易判断，准确度差
        return !!fn
            && !fn.nodeName
            && fn.constructor != String
            && fn.constructor != RegExp
            && fn.constructor != Array
            && /function/i.test(fn + '');
    }


// task 2.2
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
    function cloneObject(src) {
        // 对于 数字 字符串 布尔 null undefined
        if (src == null || typeof src != 'object') {
            return src;
        }

        // 对于 Date
        if (src instanceof Date) {
            var clone = new Date(src.getDate());
            return clone;
        }

        // 对于 数组
        if (src instanceof Array) {
            var clone = [];
            for (var i = 0, len = src.length; i < len; i++) {
                clone[i] = src[i];
            }
            return clone;
        }

        // 对于 Object
        if (src instanceof Object) {
            var clone = {};
            for (var key in src) {
                if (src.hasOwnProperty(key)) {       // 忽略掉继承属性
                    clone[key] = cloneObject(src[key]);
                }
            }
            return clone;
        }
    }

// 测试用例：
    /*
     var srcObj = {
     a: 1,
     b: {
     b1: ["hello", "hi"],
     b2: "JavaScript"
     }
     };
     var abObj = srcObj;
     var tarObj = cloneObject(srcObj);

     srcObj.a = 2;
     srcObj.b.b1[0] = "Hello";

     console.log(abObj.a);
     console.log(abObj.b.b1[0]);

     console.log(tarObj.a);      // 1
     console.log(tarObj.b.b1[0]);    // "hello"
     */


// task 2.3
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        var new_array = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i] !== '' && new_array.indexOf(arr[i]) < 0) {
                new_array.push(arr[i]);
            }
        }
        return new_array;
    }

// 使用示例
    /*
     var a = [1, 3, 5, 7, 5, 3];
     var b = uniqArray(a);
     console.log(b); // [1, 3, 5, 7]
     */

// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
    function simpleTrim(str) {
        var len = str.length;
        for (var i = 0; i < len && (str.charAt(i) === ' ' || str.charAt(i) === '\t'); i++);
        if (i === len) {
            return '';
        }
        for (var j = len; j && (str.charAt(j - 1) === ' ' || str.charAt(j - 1) === '\t'); j--);
        return str.substring(i, j);
    }

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
    function trim(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }

// 使用示例
    /*
     var str = '   hi!  ';
     str = trim(str);
     console.log(str); // 'hi!'
     */

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
    function each(arr, fn) {
        for (var i = 0, len = arr.length; i < len; i++) {
            fn(arr[i], i);
        }
    }

// 其中fn函数可以接受两个参数：item和index

// 使用示例
    /*
     var arr = ['java', 'c', 'php', 'html'];
     function output(item) {
     console.log(item)
     }
     each(arr, output);  // java, c, php, html

     // 使用示例
     var arr = ['java', 'c', 'php', 'html'];
     function output(item, index) {
     console.log(index + ': ' + item)
     }
     each(arr, output);  // 0:java, 1:c, 2:php, 3:html
     */

// 获取一个对象里面第一层元素的数量，返回一个整数
    function getObjectLength(obj) {
        var element = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                element++;
            }
        }
        return element;
    }

// 使用示例
    /*
     var obj = {
     a: 1,
     b: 2,
     c: {
     c1: 3,
     c2: 4
     }
     };
     console.log(getObjectLength(obj)); // 3
     */

// task 2.4
// 判断是否为邮箱地址
    function isEmail(emailStr) {
        return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
    }

// 判断是否为手机号
    function isMobilePhone(phone) {
        phone = phone + '';
        return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
    }


// task 3.1
    function hasClass(element, className) {
        var name = element.className.split(' ');
        if (name.indexOf(className) !== -1) {
            return true;
        }
        return false;

    }

// 为element增加一个样式名为newClassName的新样式
    function addClass(element, newClassName) {
        if (!hasClass(element, newClassName)) {
            element.className += ' ' + newClassName;
        }
    }

// 移除element中的样式oldClassName
    function removeClass(element, oldClassName) {
        if (hasClass(element, oldClassName)) {
            element.className = element.className.replace(oldClassName, '');
        }
    }

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
    function isSiblingNode(element, siblingNode) {
        return element.parentNode === siblingNode.parentNode;
    }

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
    function getPosition(element) {
        var left = element.offsetLeft;
        var top = element.offsetTop;
        var parent = element.offsetParent;

        while (parent !== null) {
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }

        var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
        var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;

        left -= scrollLeft;
        top -= scrollTop;

        return {
            x: left,
            y: top
        }
    }

// task 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
    function addEvent(element, event, listener) {
        element['on' + event] = listener;
    }

// 移除element对象对于event事件发生时执行listener的响应
    function removeEvent(element, event, listener) {
        element['on' + event] = null;
    }

// 实现对click事件的绑定
    function addClickEvent(element, listener) {
        element.onclick = listener;
    }

// 实现对于按Enter键时的事件绑定
    function addEnterEvent(element, listener) {
        element.onkeydown = function (e) {
            e = e || window.event;
            if (e.keyCode === 13) {
                listener();
            }
        }
    }

// task 5.1
// 判断是否为IE浏览器，返回-1或者版本号
    function isIE() {
        var ua = navigator.userAgent.toLowerCase();
        var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie ([\d.]+)/);
        if (ie) {
            return ie[1];
        }
        else {
            return -1;
        }
    }

// 设置cookie
    function setCookie(cookieName, cookieValue, expiredays) {
        if (expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            var expires = ';expires=' + exdate.toUTCString();
        }
        else {
            expires = '';
        }
        document.cookie = cookieName + '=' + escape(cookieValue) + expires;
    }

// 获取cookie值
    function getCookie(cookieName) {
        var re = new RegExp(cookieName + '=(.*?)($|;)');
        return re.exec(document.cookie)[1];
    }

// task 6.1
// 学习Ajax，并尝试自己封装一个Ajax方法。
    function ajax(url, options) {
        // 创建对象
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {        //兼容 IE5 IE6
            xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
        }

        // 处理data
        if (options.data) {
            var dataarr = [];
            for (var item in options.data) {
                dataarr.push(item + '=' + options.data[item]);
            }
            var data = dataarr.join('&');
        }

        // 处理type
        if (!options.type) {
            options.type = 'GET';
        }
        options.type = options.type.toUpperCase();

        // 发送请求
        if (options.type === 'GET') {
            var myURL = '';
            if (options.data) {
                myURL = url + '?' + data;
            }
            else {
                myURL = url;
            }
            xmlhttp.open('GET', myURL, true);
            xmlhttp.send();
        }
        else if (options.type === 'POST') {
            xmlhttp.open('POST', url, true);
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlhttp.send(data);
        }

        // readyState
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    if (options.onsuccess) {
                        options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                    }
                }
                else {
                    if (options.onfail) {
                        options.onfail();
                    }
                }
            }
        }
    }

// 使用示例：
    /*
     ajax(
     'prompt.php',
     {
     data: {
     q: 'a'
     },
     onsuccess: function (responseText, xhr) {
     console.log(responseText);
     },
     onfail : function () {
     console.log('fail');
     }
     }
     );
     */

    function htmlEncode(str) {
        return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2f;")
            .replace(/\n/g, "<br>");
    }

    return {
        isArray: isArray,
        isFunction: isFunction,
        cloneObject: cloneObject,
        uniqArray: uniqArray,
        trim: trim,
        each: each,
        getObjectLength: getObjectLength,
        isEmail: isEmail,
        isMobilePhone: isMobilePhone,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        isSiblingNode: isSiblingNode,
        getPosition: getPosition,
        addEvent: addEvent,
        removeEvent: removeEvent,
        addClickEvent: addClickEvent,
        addEnterEvent: addEnterEvent,
        isIE: isIE,
        setCookie: setCookie,
        getCookie: getCookie,
        ajax: ajax,
        htmlEncode: htmlEncode
    }
});
