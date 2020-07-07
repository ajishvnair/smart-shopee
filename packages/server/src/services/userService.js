const { User } = require('../models/user.model');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET || 'the default secret';
// gives us access to our environment variables
const jwt = require('jsonwebtoken');

// service for check user email for identify already registerd or not
exports.regcheck = async function(email) {
  try {
    check = await User.findOne({email});
    if (check) throw Error;
    if (!check) console.log('new user ');
  } catch (e) {
    throw Error('User Account / email  already Exists.');
  }
};


exports.create = async function(teacher) {
    try {
      const dat = await new Teacher(teacher);
      await dat.save();
      return dat;
    } catch (error) {
      throw Error('Error while Posting data ');
    }
  };
// service for new user registraion
exports.saveuser = async function(user) {
  try {
    const newUser = await new User(user);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    return newUser;
  } catch (e) {
    throw Error('Error while creating User ');
  }
};

// service for check email is present in db or is a valid user for login
exports.logincheck = async function(email) {
  try {
    check = await User.findOne({ email });
    if (!check) throw Error;
  } catch (e) {
    throw Error('No Account Found');
  }
};
// service for  user login
exports.login = async function(user) {
    email = user.email;
  const check = await User.findOne({ email });
  password = check.password;
  try {
    isMatch = await bcrypt.compare(user.password, password);
    if (isMatch == false) throw Error;
    const payload = { id: check.id, username: check.username };
    const token = jwt.sign(payload, secret, { expiresIn: 36000 });
    return {
      _id: check._id,
      username: check.username,
      user_authentication: 'sucess',
      role: check.role,
      token,
    };
  } catch (e) {
    throw Error('password is incorrect');
  }
};
// service for get all  data
exports.list = async function() {
    try {
      const user = await User.find({});
      return user;
    } catch (e) {
      throw Error('Error while getting all data  ');
    }
  };
// service for get user data using id
exports.show = async function(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (e) {
    throw Error('no user found');
  }
};
// service for delete user data using id
exports.delete = async function(id) {
  try {
    await User.findByIdAndRemove(id);
  } catch (error) {
    throw Error('Error while deleting data');
  }
};
// check user credintals match or not
exports.usermatch = async function(email, pword) {
  try {
    const check = await User.findOne({ email });
    id = check._id;
    password = check.password;
    isMatch = await bcrypt.compare(pword, password);
    return isMatch;
  } catch (e) {
    throw Error('must enter correct username and password ');
  }
};
exports.passvalid = async function(email, pword) {
  try {
    const check = await User.findOne({ email });
    const pas = check.password;
    isMatch = await bcrypt.compare(pword, pas);
    if (isMatch == true) return pas;
    throw Error('password must be valid');
  } catch (e) {
    throw Error('password must be valid');
  }
};
// service for update user data using id
exports.update = async function(email, pword, user) {
  try {
    const check = await User.findOne({ email });
    id = check._id;
    const dat = await User.findByIdAndUpdate(id, user, { new: true });
    if (user.newemail) dat.email = user.newemail;
    if (user.newpassword) dat.password = user.newpassword;
    passhas = await passhash(id, dat, { new: true });
    const ans = await User.findById(id);
    return ans;
  } catch (error) {
    throw Error('valid username and password are mandatory');
  }
};
// hash password and update
passhash = async function(id, dat) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dat.password, salt);
    dat.password = hash;
    const res = await User.findByIdAndUpdate(id, dat, { new: true });
    return res;
  } catch (error) {
    throw Error('Error while hashing password ');
  }
};
