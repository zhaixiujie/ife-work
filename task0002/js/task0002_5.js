/**
 * Created by DIYgod on 15/5/5.
 */
var startX;         // 点击滑块时鼠标的坐标
var startY;
var startLeft;      // 拖动前滑块中心的坐标
var startTop;
var block;          // 被拖动的滑块
var wrap = document.getElementsByClassName('drag-wrap');

function nextDrag(element) {                     // 获取下一个滑块
    var brother = element.nextSibling;
    while (brother && brother.nodeName === '#text') {
        brother = nextDrag(brother);
    }
    return brother;
}

function moveDrag(element, move) {               // 将某滑块及其下面的滑块移动move个像素
    while (element) {
        element.style.top = parseInt(element.style.top) + move + 'px';
        element = nextDrag(element);
    }
}

function dragCenter(event) {                     // 计算滑块中心的位置
    var center = [];
    var moveX = event.clientX - startX;          // 计算位移
    var moveY = event.clientY - startY;
    center[1] = startTop + moveY;
    center[0] = startLeft + moveX;
    return center;
}

function getLocation(x, y) {                     // 计算滑块降落的位置
    var location = [];                           // location的第一个元素代表容器的序号，第二个元素代表滑块在容器中的序号

    if (x < 230) {                               // 容器的序号
        location[0] = 0;
    }
    else if (x >= 230 && x <= 540) {
        location[0] = 1;
    }
    else {
        location[0] = 2;
    }

    location[1] = Math.floor((y + 20) / 40);      // 滑块在容器中的序号
    var dragNum = wrap[location[0]].getElementsByClassName('drag').length;  // 容器中滑块的数量
    location[1] = Math.max(location[1], 0);
    location[1] = Math.min(location[1], dragNum);

    return location;
}

window.onload = function () {
    var wrapLeft = $('.drag-container').offsetLeft;                  // 计算滑块中心相对drag-container的位置之用

    var drag = document.getElementsByClassName('drag');
    for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 6 * 41) + 'px';

        drag[i].addEventListener('dragstart', function (e) {         // 开始拖动
            e = e || window.event;
            block = e.target;
            var parent = this.parentNode;
            startX = e.clientX;                                      // 记录鼠标位置
            startY = e.clientY;
            startTop = parseInt(this.style.top) + 20;                // 滑块中心相对容器的位置
            startLeft = parent.offsetLeft - wrapLeft + 75;
            this.style.zIndex = 1;
            this.className = '';
            moveDrag(nextDrag(this), -41);                                     // 下面的滑块上移41个像素
        });

        drag[i].addEventListener('drag', function (e) {              // 拖动中，使滑块在原容器中消失
            this.style.top = '-1000px';
            this.style.left = '-1000px';
        });
    }

    document.body.addEventListener('dragover', function (e) {        // 拖动中，避免浏览器对容器的默认处理（默认无法将数据/元素放置到其他元素中）
        e.preventDefault();
    });

    document.body.addEventListener('drop', function (e) {            // 拖动结束，将滑块加到新容器
        e = e || window.event;
        e.preventDefault();                                          // 避免浏览器对容器的默认处理（默认以链接形式打开）
        var center = dragCenter(e);                                  // 滑块中心位置
        var location = getLocation(center[0], center[1]);            // 滑块降落的位置
        var myWrap = wrap[location[0]];
        var myDrag = myWrap.getElementsByClassName('drag')[location[1]];
        if (myDrag) {
            var myTop = myDrag.style.top;
        }
        else {                                                       // 兼容滑块放到最下面的情况
            var myTop = parseInt(myWrap.getElementsByClassName('drag')[location[1] - 1].style.top) + 41 + 'px';
        }
        moveDrag(myDrag, 41);
        block.style.top = myTop;
        block.style.left = 0;
        block.style.zIndex = 0;
        block.className = 'drag';

        myWrap.insertBefore(block, myDrag);

    });
}