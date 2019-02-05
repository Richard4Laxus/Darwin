/**
 * Calendar v1.0.0
 * All related to the calendar plugin and demo.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';
(function($, data, $scope) {
    $(function() {
        var todayDate = moment().startOf('day');
        var YM = todayDate.format('YYYY-MM');
        var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
        var TODAY = todayDate.format('YYYY-MM-DD');
        var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                    title: 'All Day Event',
                    start: YM + '-01',
                    className: "fc-event-outline-accent"
                },
                {
                    title: 'Long Event',
                    start: YM + '-07',
                    end: YM + '-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: YM + '-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: YM + '-16T16:00:00',
                    className: "fc-event-warning"
                },
                {
                    title: 'Conference',
                    start: YESTERDAY,
                    end: TOMORROW,
                    className: "fc-event-accent"
                },
                {
                    title: 'Meeting',
                    start: TODAY + 'T10:30:00',
                    end: TODAY + 'T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: TODAY + 'T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: TODAY + 'T14:30:00',
                    className: "fc-event-primary"
                },
                {
                    title: 'Happy Hour',
                    start: YM + '-15T17:30:00',
                    className: "fc-event-outline-danger"
                },
                {
                    title: 'Dinner',
                    start: TODAY + 'T20:00:00',
                    description: "Lorem ipsum dolor sit incid idunt ut",
                    className: "fc-event-success"
                },
                {
                    title: 'Birthday Party',
                    start: TOMORROW + 'T07:00:00',
                    className: "fc-event-info"
                }
            ]
        })
    });
})(jQuery, dcData, {});
