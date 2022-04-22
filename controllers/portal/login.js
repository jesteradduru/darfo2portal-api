const bcrypt = require("bcrypt");

const handleLogin = (req, res, db) => {
  const { username, password } = req.body;

  db("login")
    .withSchema("portal")
    .select("*")
    .where({ user_username: username })
    .then((data) => {
      bcrypt.compare(password, data[0].login_hash, function (err, result) {
        if (result) {
          return db("users")
            .select("*")
            .withSchema("portal")
            .where({ user_username: username })
            .then((user) => {
                // check if 2fa is enabled if yes return
                res.json(user)
            })
        } else {
          res.status(400).json("Wrong Password");
        }
      });
    })
    .catch(err => res.json("Wrong Username"));
};

module.exports = {
  handleLogin,
};
