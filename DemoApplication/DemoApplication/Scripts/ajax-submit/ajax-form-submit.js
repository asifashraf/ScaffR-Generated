$(function () {

    $('form').live('click', function (event) {
        $(this).data('clicked', $(event.target))
    });

    //Restful form submit standard
    //Valid form attributes action,method,data-pre-submit,data-post-submit
    //global useful functions: showLoading, hideLoading, showMessage, showError, showErrors
    //Valid classes: just-validate, dont-handle-result
    $('form.ajax-submit').live('submit', function (e) {
        window.setTimeout(function () {

            var pop = $('.text-length-pop');
            pop.hide();

        }, 350);
        var form = $(this);
        var button = form.data('clicked');
        if (button) {
            if (button.text() == 'cancel' || button.text() == 'Cancel' || button.hasClass('no-ajax-submit')
                || form.hasClass('no-ajax-submit')) {
                callFunc('cancelClicked', [form, button]);
                e.preventDefault();
                return false;
            }

        }
        //form validation help
        //http://stackoverflow.com/questions/6062905/using-bassistances-jquery-validation-plug-in-how-can-i-validate-the-form-progr
        if (form.valid({
            errorPlacement: function (error, element) {
            //error.appendTo(element.parent("div").next("div.errlabel"));
        }
        })) {
            //pre Submit event            
            callFunc(form.attr('data-pre-submit'), [form, button]);

            if (form.hasClass('just-validate')) {
                e.preventDefault();
                return false;
            }

            (function (form) {
                var button = form.data('clicked');
                var url = form.attr('action');    // URL
                var method = form.attr('method'); //METHOD
                if (!method) {
                    method = 'post';
                }

                callFunc('showLoading', [form, button]);

                $.ajax({
                    'url': url,
                    type: method,
                    data: form.serialize(),
                    success: function (response) {
                        
                        //Run javascript in the text
                        executeInlineJs(response);

                        callFunc('hideLoading', [form, button, response]);

                        //post Submit event
                        callFunc(form.attr('data-post-submit'), [form, button, response]);

                        //stop automatic processing
                        if (form.hasClass('dont-handle-result')) {
                            //Prevent the submit event and remain on the screen
                            e.preventDefault();
                            return false;
                        }
                        
                        //Start automatic processing
                        //response can have three properties
                        // status, text and json
                        //status values:empty,successMessage,failureMessage,validationErrors,
                        //serverException, specialCodeWord, redirectToUrl, functionName, jsCode
                        if (response.status) {
                            
                            switch (response.status) {
                                case 'success':
                                    callFunc('successHandler', [form, button, response]);
                                    break;

                                case 'failure':
                                    callFunc('failureHandler', [form, button, response]);
                                    break;

                                case 'validationerrors':
                                    callFunc('validationErrorsHandler', [form, button, response]);
                                    break;

                                case 'exception':
                                    callFunc('exceptionHandler', [form, button, response]);
                                    break;

                                case 'codeword':
                                    callFunc('codewordHandler', [form, button, response]);
                                    break;

                                case 'redirect':
                                    window.location = response.text;
                                    break;

                                case 'function':
                                    callFunc(response.text, [form, button, response]);
                                    break;

                                case 'code':
                                    eval(response.text);
                                    break;

                            }
                        }

                    } //succes function
                    , complete: function (response) {
                        callFunc('completeCallback', [form, button, response]);
                    },
                    error: function (response) {
                        
                        callFunc('errorCallback', [form, button, response]);
                    }
                }); //ajax function call

            })(form); //closure 

        }  //end if form.valid

        //Prevent the submit event and remain on the screen
        e.preventDefault();
        return false;
    }); //$('form.restful-submit').alive('submit')

    
});

function executeInlineJs(markup) {
    var $m = $(markup);
    var $t = $m.find('script');
    globalEval($t.text());
    return $m;
}

function globalEval(src) {
    if (window.execScript) {
        window.execScript(src);
        return;
    }
    var fn = function () {
        window.eval.call(window, src);
    };
    fn();
};

function callFunc(name, params) {
    if (name) {
        if (window[name]) {
            window[name].apply(null, params);
        }        
    } //end if preSubmitEvent
}