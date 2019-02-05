/**
 * Charts script v1.0.0
 * Utils chart.js default and util functions.
 *
 * Copyright 2018, 5studios
 * http://www.5studios.net
 */

'use strict';
(function(global) {
	var Months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	var COLORS = [
		'#4dc9f6',
		'#f67019',
		'#f53794',
		'#537bc4',
		'#acc236',
		'#166a8f',
		'#00a950',
		'#58595b',
		'#8549ba'
	];

	var Samples = global.Samples || (global.Samples = {});
	var Color = global.Color;

	Samples.utils = {
		// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
		srand: function(seed) {
			this._seed = seed;
		},

		rand: function(min, max) {
			var seed = this._seed;
			min = min === undefined ? 0 : min;
			max = max === undefined ? 1 : max;
			this._seed = (seed * 9301 + 49297) % 233280;
			return min + (this._seed / 233280) * (max - min);
		},

		numbers: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 1;
			var from = cfg.from || [];
			var count = cfg.count || 8;
			var decimals = cfg.decimals || 8;
			var continuity = cfg.continuity || 1;
			var dfactor = Math.pow(10, decimals) || 0;
			var data = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = (from[i] || 0) + this.rand(min, max);
				if (this.rand() <= continuity) {
					data.push(Math.round(dfactor * value) / dfactor);
				} else {
					data.push(null);
				}
			}

			return data;
		},

		labels: function(config) {
			var cfg = config || {};
			var min = cfg.min || 0;
			var max = cfg.max || 100;
			var count = cfg.count || 8;
			var step = (max - min) / count;
			var decimals = cfg.decimals || 8;
			var dfactor = Math.pow(10, decimals) || 0;
			var prefix = cfg.prefix || '';
			var values = [];
			var i;

			for (i = min; i < max; i += step) {
				values.push(prefix + Math.round(dfactor * i) / dfactor);
			}

			return values;
		},

		months: function(config) {
			var cfg = config || {};
			var count = cfg.count || 12;
			var section = cfg.section;
			var values = [];
			var i, value;

			for (i = 0; i < count; ++i) {
				value = Months[Math.ceil(i) % 12];
				values.push(value.substring(0, section));
			}

			return values;
		},

		color: function(index) {
			return COLORS[index % COLORS.length];
		},

		transparentize: function(color, opacity) {
			var alpha = opacity === undefined ? 0.5 : 1 - opacity;
			return Color(color).alpha(alpha).rgbString();
		}
	};

	// INITIALIZATION
	Samples.utils.srand(Date.now());

	Samples.utils.randomScalingFactor = function() {
        return Math.round(Math.random() * 100);
    };

	Samples.utils.renderChart = function(element, config) {
        var ctx = document.getElementById(element).getContext('2d');
        if (!ctx) return;

        return new Chart(ctx, config);
    };

    Samples.utils.colors = {
        red:        'rgb(255, 99, 132)',
        orange:     'rgb(255, 159, 64)',
        yellow:     'rgb(255, 205, 86)',
        green:      'rgb(75, 192, 192)',
        blue:       'rgb(54, 162, 235)',
        purple:     'rgb(153, 102, 255)',
        grey:       'rgb(201, 203, 207)',

        // social
        facebook:   'rgb(59,89,152)',
        google:     'rgb(221,75,57)',
        twitter:    'rgb(0,172,237)',
        pinterest:  'rgb(203,32,39)',
        linkedin:    'rgb(0,123,182)',
        tumblr:     'rgb(50,80,109)',
        youtube:    'rgb(250,0,0)',
        flickr:     'rgb(255,0,132)',
        reddit:     'rgb(255,69,0)',
        dribbble:   'rgb(234,76,137)',
        instagram:  'rgb(81,127,164)',
        behance:    'rgb(23,105,255)',
        snapchat:   'rgb(255,252,0)',
        vimeo:      'rgb(170,212,80)'
    };
}(this));
