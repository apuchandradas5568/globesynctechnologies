import { usersCollection } from "../db/mongoConnect.js";

export const userRegistration = async (req, res) => {
  try {
    const checkUser = await usersCollection.findOne({ email: req.body.email });

    console.log("checked user", checkUser);

    if (checkUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(user);

    const createdUser = await usersCollection.findOne({
      email: req.body.email,
    });


    res.status(201).json({
      message: "User created successfully",
      user: createdUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userOtpVerification = async (req, res) => {
  const { otp} = req.body;

  if(otp === "123456") {
    return res.status(200).json({ message: "OTP verified" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
