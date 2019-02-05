/**
 * Dashcore Admin Template
 * Data script v1.0.0
 * This is the main Data script file, we put all data related stuff in here.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';
function DashCoreData(settings) {
    var apiUrl = settings.urls.api; // '/dashcore/src/srv/api/';
    var data = settings.urls.data; // '/dashcore/src/admin/data/';

    this.getLoggedUser = function() {
        return $.getJSON(apiUrl + 'auth');
    };

    // used for navigation top bar
    this.getLatestMessages = function (q) {
        return $.getJSON(apiUrl + 'messages', { n : q });
    };

    this.getLatestEmails = function() {
        return $.getJSON(apiUrl + 'emails');
    };

    this.getPendingTasks = function () {
        return $.getJSON(data + "task.json");
    };

    this.getNotifications = function () {
        return $.getJSON(data + "notifications.json");
    };

    // used for right aside
    this.getAsideTodos = function() {
        return $.getJSON(data + "todos.json");
    };

    // dashboard
    this.getGlobalAudience = function() {
        return $.getJSON(data + "audience.json");
    };

    this.getSocialSubscribers = function(time) {
        return $.getJSON(apiUrl + "subscribers", { time: time });
    };

    // used to populate the dashboard social-accordion
    this.getRecentlySubscribers = function() {
        return $.getJSON(apiUrl + "social/recently-subscribers");
    };

    this.getTwitterTrends = function() {
        return $.getJSON(apiUrl + "social/twitter-trends");
    };

    this.getMostViewedYtVideos = function() {
        return $.getJSON(apiUrl + "social/youtube-videos");
    };

    this.getFbAudienceGrowth = function() {
        return $.getJSON(apiUrl + "social/facebook-audience");
    };

}

(function(global) {
    var dcData = global.dcData || (global.dcData = new DashCoreData(global.dcSettings));
}(this));
