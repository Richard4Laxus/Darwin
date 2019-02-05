/**
 * HtmlTables, interaction script v1.0.0
 * All related to the html tables demo.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

(function($, data, $scope) {
    $(function() {
        $scope.table = $("#html-table");

        $("thead th", $scope.table).each(function(i, th) {
            $("tbody td:nth-child(" + (i + 1) + ")", $scope.table).attr("data-title", $(th).html());
        });
    });
})(jQuery, dcData, {});
