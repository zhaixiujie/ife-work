/**
 * Created by DIYgod on 15/6/8.
 */
define(function() {
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

    function $(selector) {
        var childs = function (element) {    // 递归获取所有子元素
            return element.getElementsByTagName('*');
        }

        var ele = document.getElementsByTagName('html')[0];    // 获取所有元素
        var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

        for (var i = 0, len = sele.length; i < len; i++) {
            ele = childs(ele);
            var eleLen = ele.length;
            var isGet = false;

            switch (sele[i][0]) {    // 从子节点中查找
                case '#':
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j].id === sele[i].substring(1)) {
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                    break;
                case '.':
                    for (var j = 0; j < eleLen; j++) {
                        var name = uniqArray(ele[j].className.split(' '));
                        if (name.indexOf(sele[i].substring(1)) !== -1) {
                            ele = ele[j];
                            isGet = true;
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
                                isGet = true;
                                break;
                            }
                        }
                    }
                    else {
                        var key = sele[i].substring(1, sele[i].length - 1);
                        for (var j = 0; j < eleLen; j++) {
                            if (ele[j][key]) {
                                ele = ele[j];
                                isGet = true;
                                break;
                            }
                        }
                    }
                    break;
                default :
                    for (var j = 0; j < eleLen; j++) {
                        if (ele[j].tagName === sele[i].toUpperCase()) {    // tagName 属性的返回值始终是大写的
                            ele = ele[j];
                            isGet = true;
                            break;
                        }
                    }
                    break;
            }
        }

        if (!isGet) {
            ele = null;
        }

        return ele;
    }

    return $;
});
