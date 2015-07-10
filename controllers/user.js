'use strict';

var config = require(__dirname + '/../config/config'),
    mysql = require('anytv-node-mysql'),
    User = require(__dirname + '/../models/user');


exports.get_users = function (req, res, next) {
    var start = function () {
            User.get_users({}, send_response);
        },

        send_response = function (err, result) {
            if (err) {
                return next(err);
            }

            if (!result.length) {
                return next('User not found');
            }

            res.send(result);
        };

    start();
};

exports.get_guards = function (req, res, next) {
    var start = function () {
            User.get_guards({}, send_response);
        },

        send_response = function (err, result) {
            if (err) {
                return next(err);
            }

            if (!result.length) {
                return next('User not found');
            }

            res.send(result);
        };

    start();
};

exports.create_timesheet = function (req, res, next) {
    var start = function () {
            User.get_guards({
                find_params : [ {
                    field: 'users.user_id',
                    operation: '=',
                    value: req.params.user_id
                } ]
            }, send_response);
        },

        send_response = function (err, result) {
            if (err) {
                return next (err);
            }

            if (!result.length) {
                result = [ {firstname: 'User', lastname: 'not found'} ]
            }

            res.render('timesheets', result[0]);
        }
    
    start();
};

exports.save_timesheet = function (req, res, next) {
    res.send(req.body);
};