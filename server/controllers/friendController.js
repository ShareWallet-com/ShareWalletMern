import userModel from '../models/userModel.js';

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await userModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('name _id username email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendFriendRequest = async (req, res) => {
  const { senderId } = req.body;
  const receiverId = req.params.id;

  try {
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    if (!receiver.friendRequests.includes(senderId)) {
      receiver.friendRequests.push(senderId);
      sender.sentRequests.push(receiverId);
      await sender.save();
      await receiver.save();
      return res.json({ message: 'Friend request sent' });
    }

    res.status(400).json({ message: 'Already sent request' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.params.id;

  try {
    const receiver = await userModel.findById(receiverId);
    const sender = await userModel.findById(senderId);

    receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
    sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== receiverId);

    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    await receiver.save();
    await sender.save();

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
