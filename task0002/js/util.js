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
function cloneObject(src) {// 对于 数字 字符串 布尔 null undefined
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
    if (!isArray(arr)) {
        console.log('Wrong Object!');
        return null;
    }
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
    if (typeof str !== 'string') {
        console.log('Wrong Object!');
        return null;
    }
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
    if (typeof str !== 'string') {
        console.log('Wrong Object!');
        return null;
    }
    return str.replace(/^\s+|\s+$/g, '');
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    if (!isArray(arr) || !isFunction(fn)) {
        console.log('Wrong Object!');
        return null;
    }
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
    if (typeof obj !== 'object') {
        console.log('Wrong Object!');
        return null;
    }
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
    // your implement
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
}
// your implement