const router = require('express').Router();
const notesRoute = require('../apiRoutes/notesRoute');

router.use(notesRoute);
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

module.exports = router;