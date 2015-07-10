'use strict';

var config = require(__dirname + '/../config/config'),
    mysql = require('anytv-node-mysql'),
    _ = require('lodash'),
    squel = require('squel');


exports.get_users = function(params, next) {
	var start = function () {
		var q = squel.select(),
                query = [],
                fields = params.fields
                    ? params.fields.join(', ')
                    : '*';

            q.field(fields)
            	.from('users');

            if (params.limit) {
                q.limit(params.limit);
            }

            if (params.page) {
                q.offset(params.limit * (params.page-1));
            }

			if (params && params.find_params && params.find_params.length) {
                params.find_params.forEach(function (e) {
                    var binds = [];

                    if (Array.isArray(e)) {
                        e.forEach(function (item) {
                            query.push(item.field + ' ' + item.operation + ' ?');
                            binds.push(item.value);
                        });

                        q.where.apply(this, [query.join(' or ')].concat(binds));
                    }
                    else {
                        q.where(e.field + ' ' + e.operation + ' ?', e.value);
                    }

                });
            }

            if (params.join) {
            	_(params.join).forEach(function (e) {
            		q.join(e.table, e.alias, e.condition);
            	}).commit();
            }

            q.order('users.user_id', true);

            query = q.toParam();

            mysql.open(config.DB)
                .query(
                    query.text,
                    query.values,
                    next
                ).end();
		};

	start();
}

exports.get_guards = function (params, next) {
	var start = function () {
			if (!params.join) {
				params.join = [];
			}

			params.join.push({
				join_method : 'join',
				table: 'guards',
				alias: 'guards',
				condition: 'guards.user_id = users.user_id'
			});

			exports.get_users(params, next);
		};

	start();
}