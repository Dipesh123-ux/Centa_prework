const User = require("../models/user");
const State = require("../models/state");
const { generateOtp } = require("../utils/otp");
const { sendOTP } = require("../utils/sendmail");
const Subject = require("../models/timeslot");
const Registrations = require("../models/registrations");

exports.adminRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    let otp = generateOtp();
    let admin = await User.findOne({ email });
    if (admin) {
      admin.password = password;
      await admin.save();
      sendOTP(email, otp,"Verify Yourself");
      return res.status(200).json({ msg: "success", email: email });
    }

    // Create a new admin user
    admin = new User({
      name,
      email,
      password,
      otp,
    });

    await admin.save();
    await sendOTP(email, otp);

    res.status(200).json({ msg: "success", email: email });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.verifyAdmin = async (req, res) => {
  try {
    const { email, otp } = req.body;

    let admin = await User.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Error in verifying please try again!" }] });
    }

    if (admin.otp !== otp) {
      return res.status(400).json({
        msg: "Please enter the correct otp",
      });
    }
    admin.verified = true;
    admin.isAdmin = true;
    await admin.save();
    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let admin = await User.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        msg: "Can not find the user registered with this email",
      });
    }

    if (admin.verified == false || admin.isAdmin == false) {
      return res.status(400).json({
        msg: "Please verify yourself",
      });
    }

    if (admin.password !== password) {
      return res.status(400).json({
        msg: "Please enter the correct password!",
      });
    }

    return res.status(200).json({
      msg: "success",
      user: admin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

exports.addCity = async (req, res, next) => {
  try {
    const { state, city } = req.body;

    const stateExist = await State.findOne({ name: state });

    if (stateExist) {
      const cityExist = stateExist.cities.includes(city);
      if (cityExist) {
        return res.status(400).json({
          msg: "City already exists",
        });
      }
      stateExist.cities.push(city);
      await stateExist.save();
      return res.status(200).json({
        msg: "success",
      });
    }

    const newState = new State({
      name: state,
      cities: [city],
    });

    await newState.save();

    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addSubject = async (req, res, next) => {
  try {
    const { subject, date, time } = req.body;
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

    if (exist) {
      const checkTime = exist.slots.includes(time);
      if (checkTime) {
        return res.status(400).json({
          msg: "Select a different slot this slot is already added",
        });
      }
      exist.slots.push(time);
      await exist.save();
      return res.status(200).json({
        msg: "success",
      });
    }

    const newSubject = new Subject({
      subject: sub,
      date: date,
      slots: [time],
    });

    await newSubject.save();

    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const users = await Registrations.find({}).populate("user");
    return res.status(200).json({
      msg: "success",
      users,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.getRegistration = async (req, res) => {
  try {
    const user = await Registrations.findById(req.params.id);
    return res.status(200).json({
      msg: "success",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteRegistration = async (req, res) => {
  try {
    await Registrations.findByIdAndRemove(req.params.id);
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

exports.updateRegistration = async (req, res) => {
  try {
    const { state, city, subject, date, slot } = req.body;
    const registration = await Registrations.findById(req.params.id);
    if (!registration) {
      return res.status(400).json({
        msg: "Can not find the registration",
      });
    }

    registration.state = state;
    registration.city = city;
    registration.subject = subject;
    registration.date = date;
    registration.slot = slot;

    await registration.save();

    return res.status(200).json({
      msg: "success",
    });
  } catch (err) {
    console.log(err)
  }
};
