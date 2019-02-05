/**
 * General Script v1.0.0
 * Intended to be used as a multi purpose entry script, here you can initialize some jquery plugins.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

Handlebars.registerHelper('strip-html', function(html) {
    var stripped = html.replace(/(<([^>]+)>)/ig,"");

    return new Handlebars.SafeString(stripped);
});

Handlebars.registerHelper('numberFormat', function (value, options) {
    // Helper parameters
    var dl = options.hash['decimalLength'] || 0;
    var ts = options.hash['thousandsSep'] || ',';
    var ds = options.hash['decimalSep'] || '.';

    // Parse to float
    value = parseFloat(value);

    // The regex
    var re = '\\d(?=(\\d{3})+' + (dl > 0 ? '\\D' : '$') + ')';

    // Formats the number with the decimals
    var num = value.toFixed(Math.max(0, ~~dl));

    // Returns the formatted number
    return (ds ? num.replace('.', ds) : num).replace(new RegExp(re, 'g'), '$&' + ts);
});

(function($, data) {
    $(function() {
        /** TODO: this will change when implementing logging functionality demo.
         * In login screen make the ajax call to the api, suggest the user that will be logged, validate it and
         * pass the user as a query string (or store it locally), then here take it and query with that user (again)
         **/
        data.getLoggedUser().done(function (data) {
            var user = data;

            // Setting the images
            $(".user-avatar").attr("src", user.picture.medium);

            // Setting the use info
            $(".user-name").html(user.name.first + ' ' + user.name.last);
            $(".user-info").html(user.email);
        });
    });
})(jQuery, dcData);
