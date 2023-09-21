import bcrypt from "bcryptjs"; // Hash password
import mysql from "mysql2"; // Database get the client
// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};
const createNewUser = (email, password, username) => {
  let hash = hashPassword(password);
  connection.query(
    `INSERT INTO users(email,password,username) VALUES (?,?,?)`,
    [email, hash, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
  return 0;
};
const getUserList = () => {
  connection.query(`Select * users`, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
  });
  return 0;
};
module.exports = {
  createNewUser,
};
