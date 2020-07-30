$("#task-list").keyup(function(e) {

    var code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
        text = $(this).val();
        text += ">";
        $(this).val(text);
    }
});