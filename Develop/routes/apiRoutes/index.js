const router = require('express').Router();
const notesRoute = require('../apiRoutes/notesRoute');

router.use(notesRoute);


module.exports = router;