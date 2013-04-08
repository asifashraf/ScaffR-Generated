$.fn.bindValidator = function () {
    // Target Form
    var $form = $(this);

    // Unbind existing validation
    $form.unbind();

    $form.data("validator", null);

    // Check document for changes
    $.validator.unobtrusive.parse($form);

    // Re add validation with changes
    if ($form.data("unobtrusiveValidation")) {
        var options = $form.data("unobtrusiveValidation").options;

        var validator = $form.validate(options);

        return validator;
    } else {
        return null;
    }
    
}

$.fn.unbindValidator = function () {
    var $form = $(this);
    $form.unbind();
    $form.data("validator", null);
    $form.unbind('validate');
}

$('*[data-val-length-max]').live('keyup textchange', function () {
    var el = $(this);
    var len = window.parseInt(el.attr('data-val-length-max'));
    var typed = window.parseInt(el.val().length);

    var width = el.outerWidth();
    var pop = $('.text-length-pop');


    if (pop.size() == 0) {
        pop = $('<div class="text-length-pop"></div>');
        pop.appendTo('body');
    }

    var offset = el.offset();

    pop.text(typed + '/' + len);

    pop.css({
        position: 'absolute',
        top: offset.top + 18,
        left: offset.left + width
    });

    if (typed > len) {
        pop.css('color', 'red');
    } else {
        pop.css('color', 'gray');
    }
    pop.show();
});

$('*[data-val-length-max]').live('blur', function () {
    var pop = $('.text-length-pop');
    pop.hide();
});

