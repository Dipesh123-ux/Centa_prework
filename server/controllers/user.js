const User = require("../models/user");
const State = require("../models/state");
const { generateOtp } = require("../utils/otp");
const { sendOTP } = require("../utils/sendmail");
const Subject = require("../models/timeslot");
const Registrations = require("../models/registrations");

exports.userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let otp = generateOtp();
    let user = await User.findOne({ email: email, isAdmin: false });
    if (user) {
      user.password = password;
      await user.save();
      await sendOTP(email, otp);
      return res.status(200).json({ msg: "success", email: email });
    }

    // Create a new admin user
    user = new User({
      name,
      email,
      password,
      otp,
    });

    await user.save();
    await sendOTP(email, otp);

    res.status(200).json({ msg: "success", email: email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { email, otp } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Error in verifying please try again!" }] });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        msg: "Please enter the correct otp",
      });
    }
    user.verified = true;
    user.isAdmin = false;
    await user.save();
    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email, isAdmin: false });
    if (!user) {
      return res.status(400).json({
        msg: "Can not find the user registered with this email",
      });
    }

    if (user.verified == false) {
      return res.status(400).json({
        msg: "Please verify yourself",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        msg: "Please enter the correct password!",
      });
    }

    return res.status(200).json({
      msg: "success",
      user: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.getStates = async (req, res, next) => {
  try {
    const findStates = await State.find({}, "name");
    const states = findStates.map((state) => state.name);
    return res.status(200).json({
      msg: "success",
      states: states,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};

exports.getCities = async (req, res, next) => {
  try {
    const state = req.params.state;
    const findState = await State.findOne({ name: state });
    if (!findState) {
      return res.status(400).json({
        msg: "can not find the state",
      });
    }
    return res.status(200).json({
      msg: "success",
      cities: findState.cities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.distinct("subject");
    return res.status(200).json({
      msg: "success",
      subjects,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};

exports.getDatesforSubject = async (req, res, next) => {
  try {
    const subject = req.params.subject.toLowerCase();
    const docs = await Subject.find({ subject: subject });
    const dates = docs.map((item) => item.date);
    return res.status(200).json({
      msg: "success",
      dates: dates,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};

exports.getSlotsForSubject = async (req, res) => {
  try {
    const { subject, date } = req.body;
    let sub = subject.toLowerCase();

    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);

    const exist = await Subject.findOne({
      subject: sub,
      date: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (!exist) {
      return res.status(404).json({
        msg: "No time slots available for a specific date",
      });
    }

    return res.status(200).json({
      msg: "success",
      slots: exist.slots,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};

exports.addUserData = async (req, res, next) => {
  try {
    const { user, state, city, subject, date, slot } = req.body;
    const newRegistration = new Registrations({
      user,
      state,
      city,
      subject,
      date,
      slot,
    });

    const mailUser = await User.findById(user);
    await newRegistration.save();
    await sendOTP(mailUser.email,"You have successfully Registered!");
    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "server error",
    });
  }
};
