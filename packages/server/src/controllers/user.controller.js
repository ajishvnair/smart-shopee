const userService = require('../services/userService');
const { userValidation } = require('../validation/schema/user.schema');
const { updateValidation } = require('../validation/schema/user.schema');
// New user register
exports.register = async function(req, res, next) {
  try {
    const  user  = req.body;
    const  email  = req.body.email;
    const { error } = userValidation(user);
    if (error) return res.status(422).send(error.details)
    await userService.regcheck(email);
    const dat = await userService.saveuser(user);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
// User Login
exports.login = async function(req, res, next) {
  try {
    const user = req.body;
    const email = user.email;
    // joi validation ****
    const { error } = updateValidation(user);
    if (error) return res.status(422).send(error.details);
    await userService.logincheck(email);
    const dat = await userService.login(user);
    return res.status(200).json({ data: dat });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// api for getting all data
exports.list = async function(req, res, next) {
    try {
      const user = await userService.list({}, (page = 10), (limit = 10));
      return res.status(200).json({ data: user });
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

// show user
exports.show = async function(req, res, next) {
  const id = req.params.id;
  try {
    const user = await userService.show(id);
    return res.status(200).json({ data: user });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
// delete user

exports.delete = async function(req, res, next) {
  const id = req.params.id;
  try {
    await userService.delete(id);
    return res.status(204).json();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
// api for update
exports.update = async function(req, res, next) {
  const userdata = req.body;
  try {
    const email = userdata.email;
    const pword = userdata.password;
// joi validation ****
    const { error } = updateValidation(userdata);
    if (error) return res.status(422).send(error.details);    
    const usercheck = await userService.usermatch(email, pword);
    if (!usercheck) return res.status(404).json({ message: 'user not found' });
    const user = await userService.update(email, pword, userdata);
    return res.status(200).json({ data: user });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};
