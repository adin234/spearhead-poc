'use strict';

var importer = require('anytv-node-importer');

module.exports = function (router) {
    var c = importer.dirloadSync(__dirname + '/../controllers');

    router.del = router.delete;

    router.get('/users', c.user.get_users);
    router.get('/guards', c.user.get_guards);
    router.get('/create_timesheet/:user_id', c.user.create_timesheet);
    router.post('/create_timesheet/:user_id', c.user.save_timesheet);

    router.all('*', function (req, res) {
        res.status(404)
            .send({
                message: 'Nothing to do here.'
            });
    });

    return router;
};
