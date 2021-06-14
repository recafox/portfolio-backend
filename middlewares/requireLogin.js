// next refers to the "next" middleware in the chain (if have multiple, if not, pass to router)
module.exports = (req, res, next) => {
  if (!req.user) {
    // stop the whole request, send back error msg
    return res.status(401).send({ error: "You must log in!" });
  }
  // if no error, next step
  next();
};
