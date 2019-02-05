/**
 * Dashcore Admin Template
 * Templates administration v1.0.0
 * This is the main Data script file, we put all data related stuff in here.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

// TODO: cache the templates

'use strict';
function DashCoreTemplate(settings) {
    var path = settings.urls.templates;

    this.getLatestMessagesTemplate = function() {
        return $.get({ url: path + '/_messages.tmpl', dataType: 'html' });
    };

    this.getPendingTasksTemplate = function() {
        return $.get({ url: path + '/_tasks.tmpl', dataType: 'html' });
    };

    this.getNotificationsTemplate = function() {
        return $.get({ url: path + '/_notifications.tmpl', dataType: 'html' });
    };

    this.getTodosTemplate = function () {
        return $.get({ url: path + '/_todos.tmpl', dataType: 'html' });
    };

    this.getUsersTemplate = function() {
        return $.get({url: path + '/_users.tmpl', dataType: 'html'});
    };

    this.getEmailListTemplate = function() {
        return $.get({ url: path + '/inbox/_emails.tmpl', dataType: 'html' });
    };

    this.getEmailMessageTemplate = function() {
        return $.get({ url: path + '/inbox/_email-content.tmpl', dataType: 'html' });
    };

    this.getDashboardTemplate = function(name) {
        return $.get({ url: path + '/dashboard/_' + name + '.tmpl', dataType: 'html' });
    };

    this.getAudienceTemplate = function() {
        return $.get({ url: path + '/dashboard/_audience.tmpl', dataType: 'html' });
    };
}

(function(global) {
    var templates = global.dcTemplates || (global.dcTemplates = new DashCoreTemplate(global.dcSettings));
}(this));
