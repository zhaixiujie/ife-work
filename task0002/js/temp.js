/**
 * Created by DIYgod on 15/4/29.
 */
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
        return method.apply(null, arguments);
    }
}
var $ = {
    on: delegate(addEvent),
    un: delegate(removeEvent),
    click: delegate(addClickEvent),
    enter: delegate(addEnterEvent)
};