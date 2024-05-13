const isAdmin = (req, res, next) => {
    console.log(req.session)
    if (req.session && req.session.user.isAdmin) {
      // User is an admin
      next();
    } else {
      // User is not an admin, handle unauthorized access
      res.status(403).send('Unauthorized');
    }
  };

module.exports = isAdmin