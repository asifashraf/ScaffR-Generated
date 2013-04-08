function getErrorFromXhr(xhr) {
    if (xhr.responseText.indexOf('<title>') > -1) {
        var text = xhr.responseText;
        text = text.substring(text.indexOf('<title>') + 7,
            text.indexOf('</title>'));
        return text;
    } else {
        return "An AJAX error occured";
    }
}

function msg(text, type) {
    var nt = noty({
        'text': text,
        'type': type,
        layout: 'bottomRight',
        dismissQueue: true
    });
    (function (nt) {
        window.setTimeout(function () {
            nt.close();
        }, 5000);
    })(nt);
}


//Notification plugin 
// http://needim.github.com/noty/


function showLoading(form, button) {
    var $button = $(button);
    //$button.data('default-text', $button.text());
    //$button.text('Processing...');
    $button.attr('data-loading-left-offset', 10);
    $button.showLoading();
}

function hideLoading(form, button, response) {
    var $button = $(button);    
    //$button.text($button.data('default-text'));
    //$button.data('default-text', null);
    $button.hideLoading();
}

function successHandler(form, button, response) {
    msg(response.text, 'success');
    if (window.refreshRightPanel) {
        refreshRightPanel();
    }
}
function completeCallback(form, button, response) {
    $(button).hideLoading();
    
}
function errorCallback(form, button, xhr) {
    msg(getErrorFromXhr(xhr), 'error');
}

function failureHandler(form, button, response) {
    var nt = noty({ text: response.text, type: 'error', layout: 'topCenter' });
    (function (nt) {
        window.setTimeout(function () {
            nt.close();
        }, 5000);
    })(nt);
}

function validationErrorsHandler(form, button, response) {
    //TODO:Implement this 
    //msg('There are validation errors', 'error');
    //if (response.object) {
    //    if (response.object.length) {
    //        var count = response.object.length;
    //        for (var i = 0; i < count; i++) {
    //            var verror = response.object[i];
    //            if (verror.Errors.length > 0) {
    //                var $field = $(form).find('*[Name="' + verror.Name + '"]');
    //                $field.data('invalid-value', verror.Value);
    //                setValidationErrorOnField(form, button, verror.Name, verror.Errors);
    //            }
    //        }
    //    }
    //}
}

function exceptionHandler(form, button, response) {
    console.log("showServerException", form, button, response);
}

function codewordHandler(form, button, response) {
    handleCodeWords(response.text, form, button, response);
}


function cancelClicked(form, button) {
    closeEditWindow();
}



//Misc
function setValidationErrorOnField(form, button, name, errors) {
    console.log(name, errors);
    var $form = $(form);
    var $field = $form.find('*[Name="' + name + '"]');

    $field.tooltip('destroy');

    var markup = '<ol>';
    for (var i = 0; i < errors.length; i++) {
        markup = markup + '<li>' + errors[i] + '</li>'
    }
    markup = markup + '</ol>';
    if (errors.length == 1) {
        markup = errors[0];
    }
    //get position of element in form
    var dw = $(document).width() / 2;
    var rightCorner = $field.width() + $field.offset().left;
    var place = rightCorner < dw ? 'left' : 'right';
    setTooltip($field, markup, place);

    (function ($field, markup, place) {

        //$field.on('click', function () { $(this).tooltip('show'); });
        $field.hover(function () {
            if ($field.data('invalid-value') == $field.val()) {
                setTooltip($field, markup, place);
                $field.tooltip('show');
            } else {
                hideTooltip($field);
            }
        },
        function () {
            $field.tooltip('hide');
        });
        $field.on('mouseenter click', function () {
            if ($field.data('invalid-value') == $field.val()) {
                setTooltip($field, markup, place);
                $field.tooltip('show');
            } else {
                hideTooltip($field);
            }
        });
        $field.on('mouseleave', function () {
            $field.tooltip('hide');
        });
        $field.alive('focus', function () {
            if ($field.data('invalid-value') == $field.val()) {
                setTooltip($field, markup, place);
                $field.tooltip('show');
            } else {
                hideTooltip($field);
            }
        });
        //$field.on('focus', function () { $(this).data('init-value', $(this).val()); });
        $field.alive('blur', function () {
            if ($field.data('invalid-value') != $field.val()) {
                $field.removeClass(classInvalid);
                //$field.tooltip('destroy');                
            } else {
                $field.addClass(classInvalid);
            }
            hideTooltip($field);
        });

    })($field, markup, place);

    $field.addClass(classInvalid);
    $(button).addClass(classInvalid);
    $form.addClass(classInvalid);
    //$(button).text('Your input was invalid, would you like to try again?');
}

function setTooltip($field, markup, place) {
    $field.tooltip({
        title: markup,
        html: true,
        trigger: 'manual',
        placement: place,
        delay: 0
    });
}

function hideTooltip($field) {
    $('.tooltip:visible').hide();
    //$field.tooltip('hide');

}

function handleCodeWords(codeword, form, button, response) {
    switch (codeword) {
        case "CompanyRegistered":
            msg('Success! Redirecting now...', 'success');
            window.setTimeout(function () {
                window.location = '/Account/Login';
            }, 2000);
            break;
    }
}