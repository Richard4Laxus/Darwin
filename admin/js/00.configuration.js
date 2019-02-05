/**
 * Dashcore Admin Template
 * Configuration values v1.0.0
 * This is the main Data script file, we put all data related stuff in here.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';
(function(global) {
    var basePath = "/dashcore/src";

    var Configuration = global.dcSettings || (global.dcSettings = {
        urls : {
            api: basePath + '/srv/api/',
            data: basePath + '/admin/data/',
            templates: basePath + '/admin/templates'
        }
    });
}(this));
