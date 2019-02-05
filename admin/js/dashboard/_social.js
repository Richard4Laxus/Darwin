/**
 * Social v1.0.0
 * Demo for the social interaction from the dashboard.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

(function($, charts, data, templates, $scope) {
    $scope.subscribers = [];
    $scope.config = {
        type: 'line',
        options: {
            responsive: true,
            title: {
                display: false,
                text: 'Monthly subscribers'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };
    $scope.socialChart = null;

    // Subscribers Graph
    $scope.processSubscribers = function(subscribers) {
        var datasets = [];
        var xAxe = subscribers[0].subscribers;
        var xLabels = $.map(xAxe, function(v, i) { return [i] });

        subscribers.forEach(function(network) {
            var decor = network.label === "facebook" ? { borderDash: [5, 5] } : {};
            var serie = {
                label: network.label,
                backgroundColor: charts.utils.colors[network.label],
                borderColor: charts.utils.colors[network.label],
                data: $.map(network.subscribers, function(v) { return [v] }),
                fill: false,
                pointRadius: 1,
                pointHoverRadius: 5
            };

            datasets.push($.extend({}, serie, decor));
        });

        return {
            data: {
                labels: xLabels,
                datasets: datasets
            }
        };
    };

    $scope.loadSocialSubscribers = function(time) {
        var dfd = new $.Deferred();

        data.getSocialSubscribers(time).done(function (subscribers) {
            $scope.subscribers = subscribers;
            $("#monthly-subscribers-panel .loader-container").hide();

            dfd.resolve(subscribers);
        });

        return dfd.promise();
    };

    // Accordion
    $scope.handleAjaxRequest = function(e) {
        var $target = $(this);
        var parts = $target.attr("id").split("-");

        if (!$target.data("loaded")) {
            var $wrapper = $(".load-content", $target);

            // calling the function, since every one is returning a promise, we use deferred.done method to handle the response
            $scope.getData(parts).done(function (html) {
                $wrapper.html(html);

                $target.data("loaded", true);
            });
        }
    };

    /**
     * This method calls the API to get the data related to each collapsible element, the method and template are defined by the collapsible element Id
     * parts: Is an array containing the string parts of the template name: ["twitter", "trends"]
     **/
    $scope.getData = function(parts) {
        var dfd = new $.Deferred();
        var method = "";

        for(var i = 0; i < parts.length - 1; ++i) {
            method += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }

        var fn = 'get' + method; // per instance: 'getTwitterTrends'

        if(typeof data[fn] === 'function') {
            data[fn]().done(function (response) {
                return templates.getDashboardTemplate(parts.slice(0, -1).join("-")).done(function (source) {
                    var template = Handlebars.compile(source);
                    var html = template(response);

                    dfd.resolve(html);
                });
            });
        }

        return dfd.promise();
    };

    $(function() {
        $('#monthly-subscribers-actions')
            .selectpicker({
                size: 4
            })
            .on('changed.bs.select', function(e) {
                $("#monthly-subscribers-panel .loader-container").show();

                $scope.loadSocialSubscribers(e.target.value).done(function(data) {
                    $scope.socialChart.data = $scope.processSubscribers(data).data;
                    $scope.socialChart.update();
                });
            });

        $scope.loadSocialSubscribers().done(function(data) {
            var conf = $.extend({}, $scope.config, $scope.processSubscribers(data));
            $scope.socialChart = charts.utils.renderChart('social-subscribers', conf);
        });

        $('[data-toggle="collapse"]', $('#social-accordion')).each(function() {
            var $target = $($(this).data('target'));

            $target.on('shown.bs.collapse', $scope.handleAjaxRequest);
        });
    });
})(jQuery, Samples, dcData, dcTemplates, {});
