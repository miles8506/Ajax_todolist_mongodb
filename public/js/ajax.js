let todoArr = [];


//查
$.ajax({
    type: 'get',
    url: 'http://localhost:3000/todo/task',
    success: function (data) {
        todoArr = data;
        result(todoArr);
        amount(todoArr);
    }
});


//增
$('#task').on('keyup', function (e) {
    if (e.keyCode == 13) {
        const val = $(this).val();
        if (val.trim() !== '') {
            $.ajax({
                type: 'post',
                url: 'http://localhost:3000/todo/addTask',
                contentType: 'application/json',
                data: JSON.stringify({ title: val }),
                success: (data) => {
                    todoArr.push(data)
                    result(todoArr);
                    $('#task').val('');
                    amount(todoArr);
                }
            });
        } else {
            alert('請輸入todo內容');
            return;
        };
    };
});


//刪
$('#todo-list').on('click', '.destroy', function () {
    const id = $(this).attr("id");
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/todo/deleteTask',
        data: {
            _id: id
        },
        success: function (data) {
            const delIndex = todoArr.findIndex((value, index) => {
                if (value._id == data) {
                    return index;
                };
            });
            todoArr.splice(delIndex, 1);
            result(todoArr);
            amount(todoArr);
        }
    });
});


//改-checkbox
$('.todo-list').on('click', '.check', function () {
    const status = $(this).is(':checked');
    const id = $(this).siblings('.destroy').attr('id');
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/todo/modifyTask',
        contentType: 'application/json',
        data: JSON.stringify({
            _id: id,
            completed: status,
        }),
        success: function (data) {
            const arr = todoArr.find((value) => {
                if (value._id == data._id) {
                    return value;
                };
            });
            arr.completed = data.completed;
            result(todoArr);
            amount(todoArr);
        }
    });
});


// 改 - title
$('.todo-list').on('dblclick', 'label', function () {
    $(this).parent().parent().addClass('editing');
    const text = $(this).text();
    $(this).parent().siblings('.edit').val(text).focus();
});
$('.todo-list').on('blur', '.edit', function () {
    const val = $(this).val();
    const id = $(this).siblings().children('.destroy').attr('id');
    $.ajax({
        type: 'post',
        url: 'http://localhost:3000/todo/modifyTaskTitle',
        contentType: 'application/json',
        data: JSON.stringify({
            title: val,
            _id: id
        }),
        success: function (data) {
            const arr = todoArr.find((value) => {
                if (value._id == data._id) {
                    return value
                };
            });
            arr.title = data.title;
            $(this).siblings().children('label').text(val);
            $(this).parent().removeClass('editing');
            result(todoArr);
            amount(todoArr);
        }
    });
});


//footer-All
$('#all').on('click', function () {
    result(todoArr);
    amount(todoArr);
});


//footer-Active
$('#active').on('click', function () {
    let actArr = todoArr.filter((value) => {
        return value.completed == false;
    });
    result(actArr)
    amount(actArr);
});


//footer-Completed
$('#completed').on('click', function () {
    let comArr = todoArr.filter((value) => {
        return value.completed == true;
    });
    result(comArr)
    amount(comArr);
});


//border 
$('.filters li a').on('click', function () {
    $('.filters li a').removeClass('selected');
    $(this).addClass('selected');
});


//clear-completed
$('.clear-completed').on('click', function () {
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/todo/clearCompleted',
        success: function (data) {
            let newArr = [];
            newArr = todoArr.filter((value, index) => {
                if (value.completed == false) {
                    return value;
                };
            });
            todoArr = newArr;
            result(todoArr);
            amount(newArr);
        }
    });
});


//渲染tpl封裝
const result = function (arr) {
    const html = template('tasktpl', {
        task: arr
    });
    $('#todo-list').html(html);
};


//todo數量封裝
const amount = function (arr) {
    const Arr = arr.length;
    $('#count').text(Arr);
};

