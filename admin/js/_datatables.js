/**
 * DataTables, interaction script v1.0.0
 * All related to the datatables demo.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';

(function($, data, settings, $scope) {
    // Set some default options for all datatables to keep the style smooth
    $scope.options = {
        responsive: true,

        language: {
            paginate: {
                previous: $("<i>", { class: "fas fa-angle-left" }),
                next: $("<i>", { class: "fas fa-angle-right" })
            }
        }
    };
    $scope.tables = {};
    $scope.checkboxTemplate = '<div class="checkbox"><input type="checkbox" class="dt-checkboxes"><label></label></div>';

    $scope.exists = function(elementId) {
        return document.getElementById(elementId);
    };

    // DOM is ready
    $(function() {
        /* 1. Basic DataTable initialization */
        if ($scope.exists("dt-basic")) {
            $scope.tables.basic =
                $('#dt-basic').DataTable($scope.options)
        }

        /* 2. Checkbox select on first column */
        // https://www.gyrocode.com/projects/jquery-datatables-checkboxes
        if ($scope.exists("dt-checkbox-select")) {
            // Checkbox column initialization: adding the columns to table since the data are already in HTML, no need for ajax data call
            $('#dt-checkbox-select thead tr').prepend("<th/>");
            $('#dt-checkbox-select tbody tr').prepend("<td/>");

            $scope.tables.checkbox =
                $('#dt-checkbox-select').DataTable($.extend({}, $scope.options, {
                    columnDefs: [{
                        targets: 0,
                        render: function(data, type, row, meta) {
                            if(type === 'display') {
                                data = $scope.checkboxTemplate;
                            }

                            return data;
                        },
                        checkboxes: {
                            selectRow: true,
                            selectAllRender: function () {
                                return $scope.checkboxTemplate;
                            }
                        }
                    }],
                    select: {
                        style: 'multi',
                        selector: 'td:first-child label'
                    },
                    order: [[1, 'asc']]
                }));
        }

        /* 3. Ajax data tables */
        if ($scope.exists("dt-ajax")) {
            $scope.tables.ajax =
                $('#dt-ajax').DataTable($.extend({}, $scope.options, {
                    ajax: settings.urls.api + "/subscribers/today",
                    columns: [
                        {
                            data: "user",
                            render: function (data) {
                                data = '<div class="media">' +
                                            '<img src="' + data.picture + '" class="rounded-circle mr-3 shadow" alt="">' +
                                            '<span class="status ' + data.status + '"></span>' +
                                            '<div class="media-body">' +
                                                '<p class="mb-0 d-flex w-100 justify-content-between">' +
                                                    '<span class="bold mb-1 text-capitalize">' + data.name + '</span>' +
                                                '</p>' +
                                                '<p class="small color-2 alpha-5 mb-0">' + data.email + '</p>' +
                                            '</div>' +
                                        '</div>';

                                return data;
                            }
                        },
                        {
                            data: "user.email",
                            render: function (data) {
                                data = '<a href="mailto:' + data + '">' + data + '</a>';
                                return data;
                            }
                        },
                        {
                            data: "origin",
                            render: function (data) {
                                data = '<span class="badge badge-pill px-2 py-1 shadow-sm brand-' + data + '">' + data + '</span>';
                                return data;
                            }
                        },
                        {
                            data: "location",
                            render: function (data) {
                                data = '<p class="text-capitalize bold mb-0">' + data.city + '</p><p class="text-capitalize mb-0">' + data.state + '</p>';
                                return data;
                            }
                        },
                        {
                            data: "location",
                            render: function (data) {
                                data = '<p class="text-capitalize mb-0">' + data.street + '</p><p class="text-capitalize mb-0">' + data.postcode + '</p>';
                                return data;
                            }
                        },
                        {
                            sortable: false,
                            // width: 100,
                            render: function (data) {
                                return '<ul class="nav">' +
                                            '<li class="nav-item">' +
                                                '<a href="javascript:;" class="nav-link pl-0 color-4">' +
                                                    '<i class="far fa-edit"></i>' +
                                                '</a>' +
                                            '</li>' +
                                            '<li class="nav-item">' +
                                                '<a href="javascript:;" class="nav-link pl-0 text-danger">' +
                                                    '<i class="far fa-trash-alt"></i>' +
                                                '</a>' +
                                            '</li>' +
                                            '<li class="nav-item">' +
                                                '<a href="javascript:;" class="nav-link pl-0 color-accent" data-toggle="dropdown">' +
                                                    '<i class="fas fa-ellipsis-v"></i>' +
                                                '</a>' +
                                                '<div class="dropdown-menu dropdown-menu-right">' +
                                                    '<h6 class="dropdown-header">Additional actions</h6>' +
                                                    '<a href="javascript:;" class="dropdown-item"><i class="icon far fa-eye"></i>View Profile</a>' +
                                                    '<a href="javascript:;" class="dropdown-item"><i class="icon far fa-dot-circle"></i>Unsubscribe</a>' +
                                                    '<a href="javascript:;" class="dropdown-item"><i class="icon far fa-user-circle"></i>DashCore Account</a>' +
                                                '</div>' +
                                            '</li>' +
                                    '</ul>';
                            }
                        }
                    ]
                }));
        }
    });
})(jQuery, dcData, dcSettings, {});
