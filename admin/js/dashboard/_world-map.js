/**
 * WorldMap v1.0.0
 * Demo for the world map usage.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

(function($, data, templates, $scope) {
    $scope.audience = [];

    $scope.sortDesc = function(obj) {
        var arr = [];

        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                arr.push({
                    'country': prop,
                    'value': obj[prop]
                });
            }
        }

        arr.sort(function(a, b) {
            return -a.value + b.value; // sorting in descending order
        });

        return arr;
    };

    $scope.loadGlobalSales = function() {
        var dfd = new $.Deferred();

        data.getGlobalAudience().done(function (audience) {
            $scope.audience = $scope.sortDesc(audience.audience);

            $scope.audience.forEach(function(sale) {
                sale.country = audience.countries.find(function(ct) {
                    return ct.code === sale.country;
                });

                sale.percentage = ((sale.value / audience.total.audience) * 100).toFixed(2);
                sale.bg = (sale.percentage < 5 ? "danger" : sale.percentage < 20 ? "warning" : sale.percentage < 40 ? "info" : "success");
            });

            templates.getAudienceTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template($scope.audience);

                dfd.resolve({ rawData: audience.audience, html: html });
            });
        });

        return dfd.promise();
    };

    $(function() {
        $scope.loadGlobalSales().done(function(data) {
            $(".global-audience-table").html(data.html);

            $('#world-map').vectorMap({
                map: 'world_mill',
                backgroundColor: "#fff",
                series: {
                    regions: [{
                        values: data.rawData,
                        scale: ['#e9eaee', '#d5d6da'],
                        normalizeFunction: 'polynomial'
                    }]
                },
                regionStyle: {
                    initial: {
                        fill: '#e9eaee',
                        "fill-opacity": 1,
                        stroke: 'none',
                        "stroke-width": 0,
                        "stroke-opacity": 1
                    },
                    hover: {
                        "fill-opacity": 0.8,
                        cursor: 'pointer'
                    },
                    selected: {
                        fill: 'yellow'
                    },
                    selectedHover: {
                    }
                }
            });
        });
    });
})(jQuery, dcData, dcTemplates, {});
