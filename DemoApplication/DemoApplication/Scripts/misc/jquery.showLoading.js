$(function () {

    //preload        
    $('<img />').attr('src', '/images/loading.gif').hide().appendTo('body');

    $.fn.showLoading = function (paramHeight) {
        //setup this variable before putting this function your file
        var gifHeight = paramHeight ? paramHeight : 64;

        var el = $(this);

        var leftOffset = el.attr('data-loading-left-offset') ? parseFloat(el.attr('data-loading-left-offset')) : 0;
        var topOffset = el.attr('data-loading-top-offset') ? parseFloat(el.attr('data-loading-top-offset')) : 0;

        el.hideLoading();
        var off = el.offset();
        if (off) {
            var width = el.outerWidth();
            var height = el.outerHeight();
            var right = off.left + (width / 2) - (43);
            var top = off.top + (height / 2);
            var zindex = 1000000;
            var gif = $('<img />')
                .addClass('loading-img')
                .attr('title', 'loading...')
                .attr('src', '/images/loading.gif')
            .css(
            {
                position: 'absolute',
                left: right + leftOffset,
                zIndex: zindex,
                'top': off.top - (gifHeight) + topOffset
            }).appendTo('body');
            el.data('loading-gif', gif);
            return gif;
        }

    };


    $.fn.hideLoading = function () {
        var el = $(this);
        if (el.data('loading-gif')) {
            el.data('loading-gif').remove();
            el.data('loading-gif', null);
        }
    };

});