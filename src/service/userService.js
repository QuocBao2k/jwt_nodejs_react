import bcrypt from "bcryptjs"; // Hash password
import mysql from "mysql2/promise"; // Database get the client
import bluebird from "bluebird"; // get the promise implementation, we will use bluebird
import db from "../models/index";
import { where } from "sequelize";

// query database

// create the connection to database
// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  return bcrypt.hashSync(userPassword, salt);
};
const createNewUser = async (email, password, username) => {
  // OPtion 1: Use basic mysql
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "JWT",
  //   Promise: bluebird,
  // });
  // let hash = hashPassword(password);
  // //create users:
  // //Cach 1:
  // // connection.query(
  // //   `INSERT INTO users(email,password,username) VALUES (?,?,?)`,
  // //   [email, hash, username],
  // //   function (err, results, fields) {
  // //     if (err) {
  // //       console.log(err);
  // //     }
  // //   }
  // // );
  // //Cach 2 su dung excute thay vi query
  // connection.execute(
  //   `INSERT INTO users(email,password,username) VALUES (?,?,?)`,
  //   [email, hash, username]
  // );
  //Option2: Using ORM (sequelize)
  let hash = hashPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hash,
    });
  } catch (error) {
    console.log(">>Check error create new User: ", error);
  }
  return 0;
};
const getUserList = async () => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "JWT",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM `users`");
  //   return rows;
  // } catch (error) {
  //   console.log("Check error from userService: ", error);
  // }
  let users = [];
  try {
    users = await db.User.findAll();
  } catch (error) {
    console.log(">>Check error from getUserList: ", error);
  }

  return users;
};
const deleteUser = async (ids) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "JWT",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "Delete from users where id=?",
  //     [id]
  //   );
  //   return rows;
  // } catch (error) {
  //   console.log("Check error from userService: ", error);
  // }
  await db.User.destroy({
    where: {
      id: ids,
    },
  });
};
const getUserById = async (id) => {
  //Query SQL:
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "JWT",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "Select * from users where id=?",
  //     [id]
  //   );
  //   return rows; // rows is array with data is obj
  // } catch (error) {
  //   console.log("Check error from userService: ", error);
  // }

  //ORM:
  let user = await db.User.findOne({ where: { id: id } }, { raw: true }); // find by primary key
  //console.log("check type: ", typeof user, "check data: ", user);
  return user.dataValues; //because user is oject ORM, the first data we need is Ojb name dataValues
  //video:
  // let user={};
  // user=await db.User.findOne({
  //   where:{id:id}
  // })
};
const updateUserInfor = async (email, username, id) => {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "JWT",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "update users set email=?,username=? where id=?",
  //     [email, username, id]
  //   );
  //   return rows; // rows is array with data is obj
  // } catch (error) {
  //   console.log("Check error from userService: ", error);
  // }

  await db.User.update(
    { email: email, username: username },
    {
      where: {
        id: id,
      },
    }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
