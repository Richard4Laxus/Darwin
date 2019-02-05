/**
 * Navigation script v1.0.0
 * All navigation relates stuff such as top navigation menu, side (left and right) navigation behavior.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';
(function($, data, templates, $scope) {
    $scope.asideBehavior = null;
    $scope.$asideToggler = null;
    $scope.$quickView = null;

    $scope.handleAjaxRequest = function(e) {
        var $this = $(this);

        var method = $this.data("rel");
        var href = $(e.target).attr('href');
        var $target = $(href ? href : this);

        if (!method || !$target) { return; }

        if (!$this.data("loaded")) {
            var fn = 'load' + method.charAt(0).toUpperCase() + method.slice(1); // per instance: 'loadTodos'
            var $wrapper = $(".load-content", $target);

            if(typeof $scope[fn] === 'function') {
                // calling the function, since every one is returning a promise, we use deferred.done method to handle te response
                $scope[fn]().done(function (html) {
                    $wrapper.html(html);

                    $this.data("loaded", true);
                });
            }
        }
    };

    /**
     * HEADER - TOP NAVIGATION
     **/
    // Functions definitions for handling the dropdown options in the top navigation bar
    $scope.loadMessages = function() {
        var dfd = new $.Deferred();

        data.getLatestMessages(9).done(function (messages) {
            return templates.getLatestMessagesTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(messages);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    $scope.loadTasks = function() {
        var dfd = new $.Deferred();

        data.getPendingTasks().done(function(tasks) {
            $.each(tasks, function (i, t) {
                var p = t.percentage;

                t.status = (p < 30 ? 'danger' :
                    p > 30 && p < 45 ? 'warning' :
                        p > 45 && p < 60 ? 'info' :
                            p > 60 && p < 90 ? 'success' :
                                p > 90 ? 'primary' : 'default')
            });

            return templates.getPendingTasksTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(tasks);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    $scope.loadNotifications = function() {
        var dfd = new $.Deferred();

        data.getNotifications().done(function(notifications) {
            return templates.getNotificationsTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(notifications);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    /**
     * ASIDE NAVIGATION
     **/
    $scope.loadTodos = function() {
        var dfd = new $.Deferred();

        data.getAsideTodos().done(function(todos) {
            return templates.getTodosTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(todos);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    $scope.loadUsers = function() {
        var dfd = new $.Deferred();

        data.getLatestMessages(9).done(function (messages) {
            return templates.getUsersTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(messages);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    $(function($) {
        $scope.$asideToggler = $(".aside-toggler");
        $scope.$quickView = $(".quick-view");
        $scope.asideBehavior = $scope.$asideToggler.data("behavior");

        /**
         * Handle top navigation bar dropdown options' click.
         * Whenever a click is done in an dropdown-able element an ajax call is made in order to get the data to be displayed
         * within the content of the dropdown. Every option is loaded using a function, the name of the function is taken from the
         * 'data-rel' attribute.
         **/
        $('.main-header .dropdown[data-rel]').on('show.bs.dropdown', $scope.handleAjaxRequest);

        $('#header-search').on('focus blur', '.form-control', function () {
            $(this).closest('.form').toggleClass('waiting');
        });

        $('.navbar-toggler').on('click', function () {
            $('body').toggleClass('side-nav-collapsed');
        });

        if ($scope.asideBehavior) {
            $scope.$quickView.addClass($scope.asideBehavior);

            if ($scope.asideBehavior === "absolute") {
                $('body').append($('<div>', {class: "aside-overlay"}));
            }
        }

        $scope.$asideToggler.on('click', function () {
            $('body').toggleClass('quick-view-expanded');

            if ($scope.asideBehavior) {
                $('body').toggleClass('is-' + $scope.asideBehavior);
            }

            //TODO: layout.js, will contain all layout elements and will be global
        });

        /**
         * SIDE NAVIGATION
         **/
        $('.nav-dropdown').on('click', '> .nav-link', function (e) {
            e.stopPropagation();
            var $dropDown = $(this).closest(".nav-dropdown");

            $dropDown.toggleClass('open')
                .siblings()
                .removeClass('open');
        });

        $('.nav-link[data-rel]', $scope.$quickView).on('show.bs.tab', $scope.handleAjaxRequest);
    });
})(jQuery, dcData, dcTemplates, {});