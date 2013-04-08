(function ($) {

    //Is valid item from combo
    jQuery.validator.addMethod("isitemfromcombo", function (value, element, param) {
        
        var el = $(element);

        var sOptions = el.find('option');
        var sCount = sOptions.size();
        var textValue = value;
        for (var k = 0; k < sCount; k++) {
            var sOp = $(sOptions[k]);
            if (sOp.attr('value') == value) {
                textValue = sOp.text();
            }
        }

        var required = el.attr('data-val-required');

        if (value === '' || value === null) {
            if (required) {
                //console.log('required but empty', found);
                return false;
            }
        }


        var com = el.data('kendoComboBox');
        var options = com.list.find('ul li');
        var count = options.size();
        var found = false;
        for (var i = 0; i < count; i++) {
            var option = $(options[i]);
            var optionValue = option.text();
            //console.log('optionValue ', optionValue);
            if (optionValue === textValue) {
                found = true;
            }
        }
        //console.log('found', found);
        return found;
        
    });
    jQuery.validator.unobtrusive.adapters.addBool("isitemfromcombo");

    //Is valid item from combo
    jQuery.validator.addMethod("hastendigits", function (value, element, param) {

        var el = $(element);

        var val = el.val();
        if (val == '') {
            return true;
        }

        val = val.split(' ').join('');
        val = val.split('-').join('');
        val = val.split('(').join('');
        val = val.split(')').join('');
        val = val.split('.').join('');
        
        var count = val.length;
        
        if (count !== 10) {
            return false;
        }
        var intRegex = /^\d+$/;
        for (var i = 0; i < count; i++) {
            var current = val[i];
            if(!intRegex.test(current)){
                return false;
            }
        }
        return true;
        //return /[2-9]{2}\d{8}/.test(val);
    });
    jQuery.validator.unobtrusive.adapters.addBool("hastendigits");

}(jQuery));