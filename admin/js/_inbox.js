/**
 * Inbox v1.0.0
 * All related to the inbox demo.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

(function($, data, templates, $scope) {
    $scope.emailsWorkSpace = null;
    $scope.emails = [];
    $scope.$emailContentWrapper = null;
    $scope.showReply = false;
    $scope.windowWidth = 0;
    $scope.inboxBreakpoint = 768;

    /**
     * Load all emails and process the result.
     **/
    $scope.loadEmails = function() {
        var dfd = new $.Deferred();

        data.getLatestEmails().done(function (messages) {
            $scope.emails = messages.reduce(function(a, b) { return a.items ? a.items.concat(b.items) : a.concat(b.items) });

            templates.getEmailListTemplate().done(function (source) {
                var template = Handlebars.compile(source);
                var html = template(messages);

                dfd.resolve(html);
            });
        });

        return dfd.promise();
    };

    $scope.buildMessage = function(email) {
        var dfd = new $.Deferred();

        templates.getEmailMessageTemplate().done(function (source) {
            var template = Handlebars.compile(source);
            var html = template(email);

            dfd.resolve(html);
        });

        return dfd.promise();
    };

    $scope.emailListToggle = function(addLoaded) {
        if ($scope.windowWidth <= $scope.inboxBreakpoint) {
            if (addLoaded) {
                $scope.emailsWorkSpace.addClass("message-loaded").css({"transform": "translate3d(" + (-$scope.windowWidth) + "px, 0, 0)"});
            } else {
                $scope.emailsWorkSpace.removeClass("message-loaded").css({"transform": ""});
            }
        }
    };

    $scope.searchEmail = function() {
        var $element = $(this);
        var id = $element.data("email");

        var email = $scope.emails.find(function(e) { return e.id === id; });

        if (email) {
            $scope.emailListToggle(true);
            $scope.buildMessage(email).done(function (html) {
                $scope.$emailContentWrapper.html(html);

                $element
                    .addClass('selected')
                    .siblings()
                    .removeClass('selected');

                $(".email-reply-wrapper").removeClass('d-none');
            });
        }
    };

    $scope.startReply = function() {
        if (!$scope.showReply) {
            $scope.showReply = true;

            var $reply = $('#reply-email').removeClass('d-none');
            $(this).addClass('d-none');

            // Initialize CkEditor plugin
            ClassicEditor
                .create($reply[0])
                .catch( function(error) {
                    console.error( error );
                });
        }
    };

    $scope.setInboxWorkspaceWidth = function() {
        $scope.windowWidth = $(window).outerWidth();

        if ($scope.windowWidth <= $scope.inboxBreakpoint) {
            $scope.emailsWorkSpace.css({"max-width": $scope.windowWidth});
        }
    };

    // Entry
    $(function() {
        var $wrapper = $(".emails-wrapper");
        $scope.$emailContentWrapper = $(".email-content-wrapper");
        $scope.emailsWorkSpace = $(".emails-ws");

        if (!$wrapper.data("loaded")) {
            $scope.loadEmails().done(function (html) {
                $wrapper.html(html);

                $wrapper.data("loaded", true);
            });
        }

        $wrapper.on('click', '[data-email]', $scope.searchEmail);

        $('.start-reply').on('click', $scope.startReply);
        $('.email-list-toggle').on('click', function() {
            $scope.emailListToggle(false);
        });

        $(window).on("resize", $scope.setInboxWorkspaceWidth);

        $scope.setInboxWorkspaceWidth();
    });
})(jQuery, dcData, dcTemplates, {});
