/**
 * Created by DIYgod on 15/5/5.
 */
var drag = $('.center').getElementsByTagName('li');
var startX;         // 点击滑块时鼠标的坐标
var startY;
var startLeft;      // 拖动前滑块中心的坐标
var startTop;

function nextDrag(element) {
    var brother = element.nextSibling;
    while (brother && brother.nodeName === '#text') {
        brother = nextDrag(brother);
    }
    return brother;
}

window.onload = function () {
    var wrapLeft = $('.drag-container').offsetLeft;                  // 计算滑块中心相对drag-container的位置之用
    for (var i = 0, len = drag.length; i < len; i++) {
        drag[i].draggable = true;
        drag[i].style.top = (i % 6 * 41) + 'px';

        drag[i].addEventListener('dragstart', function (e) {         // 开始拖动
            e = e || window.event;                                   // 记录鼠标位置和计算滑块中心相对drag-container的位置
            var parent = this.parentNode;
            startX = e.clientX;
            startY = e.clientY;
            startTop = parseInt(this.style.top) + 20;
            startLeft = parent.offsetLeft - wrapLeft + 75;
            this.style.zIndex = '1';

            var brother = nextDrag(this);                            // 下面的滑块上移
            while (brother) {
                brother.style.top = parseInt(brother.style.top) - 41 + 'px';
                brother = nextDrag(brother);
            }
        });

        drag[i].addEventListener('drag', function (e) {              // 拖动中，使滑块在原容器中消失
            e = e || window.event;
            var moveX = e.clientX - startX;
            var moveY = e.clientY - startY;
            this.style.top = '1000px';
            this.style.left = '1000px';
        });

        drag[i].addEventListener('dragend', function (e) {           // 拖动结束，将滑块加到新容器

        });
    }
}