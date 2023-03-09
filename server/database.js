const admin = require("firebase-admin");

var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://friendify-e9ac8-default-rtdb.firebaseio.com",
  storageBucket: "friendify-e9ac8.appspot.com",
  authDomain: "friendify-e9ac8.firebaseapp.com",
});

var db = admin.database();
var userRef = db.ref("users");

function encodeUserEmail(userEmail) {
  return userEmail.replace(".", ",");
}

function decodeUserEmail(userEmail) {
  return userEmail.replace(",", ".");
}

const userOperation = {
  addUser(obj, res) {
    const usersRef = admin.database().ref("users");
    var oneUser = userRef.child(encodeUserEmail(obj.email));
    usersRef
      .orderByChild("email")
      .equalTo(obj.email)
      .once("value")
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log("User exists");
          res.status(300).json({
            msg: "Something went wrong",
            error: "User already exists",
          });
        } else {
          oneUser.update(obj, (err) => {
            if (err) {
              res.status(300).json({ msg: "Something went wrong", error: err });
            } else {
              res.status(200).json({ msg: "user created sucessfully" });
            }
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  getUsers(res) {
    userRef.once("value", function (snap) {
      res.status(200).json({ users: snap.val() });
    });
  },
  getOneUser(obj, res) {
    var userRefdemo = db.ref("users");
    var oneUser = userRefdemo.child(encodeUserEmail(obj.email));
    oneUser.once("value", function (snap) {
      res.status(200).json({ user: snap.val() });
    });
  },
};

module.exports = userOperation;
