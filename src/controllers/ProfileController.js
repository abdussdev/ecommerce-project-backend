const ProfileModel = require("../models/ProfileModel");

exports.createOrUpdateProfile = async (req, res) => {
  try {
    const userID = req.userId;
    const profileData = req.body;

    const updatedProfile = await ProfileModel.findOneAndUpdate(
      {userID},
      profileData,
      { new: true, upsert: true}
    );

    const isNewProfile = updatedProfile.isNew;

    if (isNewProfile) {
      res.status(201).json({ message: 'Profile created successfully', profile: updatedProfile });
    } else {
      res.json({ message: 'Profile updated successfully', profile: updatedProfile });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating or updating profile" });
  }
};

exports.readProfile = async (req, res) => {
  try {
    const userID = req.userId;

    const userProfile = await ProfileModel.findOne({ userID });

    if (!userProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
