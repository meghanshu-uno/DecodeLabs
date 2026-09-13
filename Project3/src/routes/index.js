const express = require('express');
const userRoutes = require('./v1/userRoutes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
