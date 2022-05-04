const express = require("express");
const PORT = 5000;
const app = express();
const jwt = require("jsonwebtoken")

app.use(express.json())

const users = [
  { id: 1, username: "James", password: "James123", isAdmin: true },
  { id: 2, username: "Jantira", password: "Jantira123", isAdmin: false },
];

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = users.find(user => user.username === username && user.password=== password)
  if(user.length === 0) {
    return res.status(403).json("Unauthorized")
  }
  // Valid user  => Generate an access token
  //payload, secret, expiration
  const accessToken = jwt.sign({
    id: user.id,
    isAdmin: user.isAdmin
  }, "mySecretKey");

   res.json({
    username: user.username,
    isAdmin: user.isAdmin,
    accessToken
  })
})

const verify = (req, res, next) => {
  // verify user with token to perform action
  const authHeader = req.headers.authorization
  if(authHeader) {

  } else {
    res.status(401).json('You are not authenticated')
  }
}


app.listen(PORT, () => {
  console.log("Listening on port  " + PORT);
});
