import userModel from "../models/userModel";
import Group from "../models/groupModel"

export const createGroup = async (req, res) => {
  try {
    const { name, memberIds, createdBy } = req.body;

    const newGroup = new Group({ name, members: memberIds, createdBy });
    await newGroup.save();

    // Add group to all members
    await userModel.updateMany(
      { _id: { $in: memberIds } },
      { $push: { groups: newGroup._id } }
    );

    res.status(201).json({ group: newGroup });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
