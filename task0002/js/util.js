/**
 * Created by DIYgod on 15/4/24.
 */
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


// task 2.3
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var new_array = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        if (new_array.indexOf(arr[i]) < 0 ) {
            new_array.push(arr[i]);
        }
    }
    return new_array;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]

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
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (var i = 0, len = arr.length; i < len; i++) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
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
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

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
    return element.className.match(className);
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


// task 3.2
// 实现一个简单的Query
function $(selector) {
    var allchilds = [];
    var childs = function (element) {    // 递归获取所有子元素 或者用 element.getElementsByTagName('*');
        var childn = element.childNodes;
        if (childn.length !== 0) {
            for (var i = 0, len = childn.length; i < len; i++) {
                allchilds.push(childn[i]);
                childs(childn[i]);
            }
        }
        return allchilds;
    }

    var ele = document.getElementsByTagName('html')[0];    // 获取所有元素
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {
        ele = childs(ele);
        var eleLen = ele.length;

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].id === sele[i].substring(1)) {
                        ele = ele[j];
                        break;
                    }
                }
                break;
            case '.':
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].className === sele[i].substring(1)) {
                        ele = ele[j];
                        break;
                    }
                }
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key] === value) {
                            ele = ele[j];
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j][key]) {
                            ele = ele[j];
                            break;
                        }
                    }
                }
                break;
            default :
                for (var j = 0; j < eleLen; j++) {
                    if (ele[j].tagName === sele[i].toUpperCase()) {    // tagName 属性的返回值始终是大写的
                        ele = ele[j];
                        break;
                    }
                }
                break;
        }
    }

    if (ele === childs(document.getElementsByTagName('html')[0])) {
        ele = null;
    }

    return ele;
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// task 3.3
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    element['on' + event] = listener;
}

// 例如：
function clicklistener(event) {

}
addEvent($("#doma"), "click", a);

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
    element.onkeydown = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            listener();
        }
    }
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
var delegate = function (method) {    // 代理对象
    return function() {
        method(arguments);
    }
}
var $ = {
    on: delegate(addEvent),
    un: delegate(removeEvent),
    click: delegate(addClickEvent),
    enter: delegate(addEnterEvent)
};