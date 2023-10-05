import userService from "../service/userService";

const handleHome = (req, res) => {
  return res.render("home.ejs");
};
const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();

  return res.render("user.ejs", { userList }); // truyen bien userlist duoi dang obj cho views
};
const handleCreateNewUser = (req, res) => {
  let email = req.body.email; // body parser
  let password = req.body.password;
  let username = req.body.username;
  userService.createNewUser(email, password, username);
  return res.redirect("/user");
};
const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let userData = await userService.getUserById(id); // vari-user is array with data is user

  return res.render("user-update.ejs", { userData });
};
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  await userService.updateUserInfor(email, username, id);
  return res.redirect("/user");
};
module.exports = {
  handleHome,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
