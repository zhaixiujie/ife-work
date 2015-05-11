/**
 * Created by DIYgod on 15/5/10.
 */

// localStorage + JSON 存储任务数据
// cate代表分类，childCate代表子分类，task代表任务
var cate;
var childCate;
var task;

var cateText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "默认分类",'
    +     '"num": 0,'
    +     '"child": []'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "百度IFE项目",'
    +     '"num": 3,'
    +     '"child": [0, 1]'
    + '}'
+ ']';

var childCateText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "task0001",'
    +     '"child": [0, 1, 2],'
    +     '"father": 1'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "task0002",'
    +     '"child": [3],'
    +     '"father": 1'
    + '}'
+ ']';

var taskText = '['
    + '{'
    +     '"id": 0,'
    +     '"name": "to-do 1",'
    +     '"father": 0,'
    +     '"finish": true,'
    +     '"date": "2015-05-28",'
    +     '"content": "开始task0001的编码任务。"'
    + '},'
    + '{'
    +     '"id": 1,'
    +     '"name": "to-do 2",'
    +     '"father": 0,'
    +     '"finish": false,'
    +     '"date": "2015-05-29",'
    +     '"content": "完成task0001的编码任务。"'
    + '},'
    + '{'
    +     '"id": 2,'
    +     '"name": "to-do 3",'
    +     '"father": 0,'
    +     '"finish": false,'
    +     '"date": "2015-05-29",'
    +     '"content": "重构task0001的编码任务。"'
    + '},'
    + '{'
    +     '"id": 3,'
    +     '"name": "to-do 1",'
    +     '"father": 1,'
    +     '"finish": false,'
    +     '"date": "2015-06-29",'
    +     '"content": "完成task0002的编码任务。"'
    + '}'
+ ']';

// 生成任务分类列表
function makeType() {
    var type = '';
    for (var i = 0; i < cate.length; i++) {
        type += ''
            + '<li>'
            +     '<h3 onclick="typeClick(this)"><i class="icon-folder-open-empty"></i><span>' + cate[i].name + '</span>(' + cate[i].num + ')<i class="delete icon-minus-circled"></i></h3>'
            +     '<ul class="item">';

        for (var j = 0; j < cate[i].child.length; j++) {
            var childNode = childCate[cate[i].child[j]];
            type += ''
            +         '<li>'
            +             '<h4 onclick="typeClick(this)"><i class="icon-doc-text"></i><span>' + childNode.name + '</span>(' + childNode.child.length + ')<i class="delete icon-minus-circled"></i></h4>'
            +         '</li>'
        }
        type += ''
            +     '</ul>'
            + '</li>'
    }
    type = type.replace(/<i class="delete icon-minus-circled"><\/i>/, '');    // 去掉默认分类的删除按钮
    $('.item-wrap').innerHTML = type;

    makeTask();
}

// 生成任务列表
function makeTask() {
    var ele = $('.type-wrap .choose');
    var eleTag = ele.tagName.toLowerCase();
    var name = ele.getElementsByTagName('span')[0].innerHTML;
    var taskIdArr = [];
    switch (eleTag) {
        case 'h2':                               // 选中了所有任务
            for (var i = 0; i < task.length; i++) {
                taskIdArr.push(task[i].id);
            }
            makeTaskById(taskIdArr);
            break;
        case 'h3':                               // 选中了分类
            var cateObj = getObjByKey(cate, 'name', name);     // 得到任务分类对象
            for (var i = 0; i < cateObj.child.length; i++) {
                var childObj = getObjByKey(childCate, 'id', cateObj.child[i]);  // 得到任务子分类对象
                for (var j = 0; j < childObj.child.length; j++) {
                    taskIdArr.push(childObj.child[j]);
                }
            }
            makeTaskById(taskIdArr);
            break;
        case 'h4':                               // 选中了子分类
            var childObj = getObjByKey(childCate, 'name', name);  // 得到任务子分类对象
            for (var i = 0; i < childObj.child.length; i++) {
                taskIdArr.push(childObj.child[i]);
            }
            makeTaskById(taskIdArr);
            break;
    }

    makeDetails();
}

// 根据传入的ID生成任务列表
function makeTaskById(taskIdArr) {
    console.log('makeTaskById:' + taskIdArr);
    var date = [];
    var taskObj;
    for (var i = 0; i < taskIdArr.length; i++) {              // 得到所有日期
        taskObj = getObjByKey(task, 'id', taskIdArr[i]);
        date.push(taskObj.date);
    }
    date = uniqArray(date);

    var html = '';
    for (var i = 0; i < date.length; i++) {
        html += ''
            + '<li>'
            +     '<h5> + date[i] + <i class="delete icon-minus-circled"></i></h5>'
            +     '<ul class="item">'
    }
    console.log(date);
}

// 根据某对象的某属性得到某对象
function getObjByKey(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return obj[i];
        }
    }
}

// 根据任务时间进行排序
function sortTask() {
    task = task.sort(function (a, b) {
        return a.date.replace(/-/g, '') - b.date.replace(/-/g, '');
    });
}

// 生成任务详细描述部分
function makeDetails() {

}

// 列表点击效果
function typeClick(ele) {
    var otherChoose = ele.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
    for (var i = 0; i < otherChoose.length; i++) {
        if (otherChoose[i].className === 'choose') {
            otherChoose[i].className = '';
            break;
        }
    }
    ele.className = 'choose';
    makeTask();
}

window.onload = function () {
    // if (!localStorage.getItem('cate')) {  // 页面之前没被访问过
        localStorage.cate = cateText;
        localStorage.childCate = childCateText;
        localStorage.task = taskText;
        document.getElementById('type-all').className = 'choose';
    // }
    cate = eval ('(' + localStorage.cate + ')');
    childCate = eval ('(' + localStorage.childCate + ')');
    task = eval ('(' + localStorage.task + ')');
    makeType();
}