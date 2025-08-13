import userModel from "../models/userModel.js";
import Group from "../models/groupModel.js"

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

export const addFriendToGroup = async (req, res) => {
  try {
    const { groupId, userIdToAdd } = req.body;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ msg: 'Group not found' });

    // Check if user is already in group
    if (group.members.includes(userIdToAdd)) {
      return res.status(400).json({ msg: 'User already in group' });
    }

    // Add user to group
    group.members.push(userIdToAdd);
    await group.save();

    // Optional: Add group to user's record
    await User.findByIdAndUpdate(userIdToAdd, {
      $addToSet: { groups: group._id },
    });

    res.status(200).json({ msg: 'User added to group', group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user.id;

    const groups = await Group
      .find({ members: userId })
      .populate('members', 'name') // ✅ get member names
      .populate('createdBy', 'name');

    res.json({ groups });
  } catch (err) {
    console.error('Error fetching user groups:', err.message);
    res.status(500).json({ message: 'Failed to fetch groups' });
  }
};

// controllers/groupController.js
export const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.user.id; // from auth middleware

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // ✅ Only creator can delete
    if (group.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this group" });
    }

    // Remove group from all members' `groups` list
    await userModel.updateMany(
      { _id: { $in: group.members } },
      { $pull: { groups: group._id } }
    );

    // Delete group
    await Group.findByIdAndDelete(groupId);

    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting group:", err);
    res.status(500).json({ message: "Server error" });
  }
};
