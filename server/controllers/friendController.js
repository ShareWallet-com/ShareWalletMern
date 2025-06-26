import userModel from '../models/userModel.js';
import { io } from '../server.js';

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await userModel.find({
      name: { $regex: query, $options: 'i' }
    }).select('name _id username email');   // for changing 
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendFriendRequest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.id;


  if (!senderId || !receiverId) {
    return res.status(400).json({ success: false, message: "Missing sender or receiver ID" });
  }

  if (senderId === receiverId) {
    return res.status(400).json({ success: false, message: "You can't send a friend request to yourself" });
  }

  try {
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ success: false, message: "Sender or receiver not found" });
    }

    if (receiver.friendRequests.includes(senderId)) {
      return res.status(400).json({ success: false, message: "Request already sent" });
    }

    receiver.friendRequests.push(senderId);
    sender.sentRequests.push(receiverId);

    await receiver.save();
    await sender.save();

const receiverSocketId = req.app.get('userSocketMap').get(receiverId);
if (receiverSocketId) {
  req.app.get('io').to(receiverSocketId).emit('friend_request_received', {
    _id: sender._id,
    name: sender.name
  });
}



    return res.json({ success: true, message: "Friend request sent" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};



export const acceptFriendRequest = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.params.id;

  try {
    const receiver = await userModel.findById(receiverId);
    const sender = await userModel.findById(senderId);

    if (!receiver || !sender) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove pending request
    receiver.friendRequests = receiver.friendRequests.filter(
      id => id.toString() !== senderId
    );
    sender.sentRequests = sender.sentRequests.filter(
      id => id.toString() !== receiverId
    );

    // Add each other as friends (prevent duplicates)
    if (!receiver.friends.includes(senderId)) {
      receiver.friends.push(senderId);
    }
    if (!sender.friends.includes(receiverId)) {
      sender.friends.push(receiverId);
    }

    await receiver.save();
    await sender.save();

    // Emit socket events
    const io = req.app.get('io');
    const map = req.app.get('userSocketMap');

    const receiverSocketId = map.get(receiverId);
    const senderSocketId = map.get(senderId);

    if (senderSocketId) {
      io.to(senderSocketId).emit('friend_request_accepted', {
        _id: receiver._id,
        name: receiver.name,
      });
    }

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('new_friend', {
        _id: sender._id,
        name: sender.name,
      });
    }

    res.json({ message: 'Friend request accepted' });
  } catch (err) {
    console.error('Error accepting friend request:', err.message);
    res.status(500).json({ error: err.message });
  }
};


export const removeFriend = async (req, res) => {
  const userId = req.user.id;           // Logged-in user
  const friendId = req.params.id;       // Friend to remove

  try {
    const user = await userModel.findById(userId);
    const friend = await userModel.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ success: false, message: "User or friend not found" });
    }

    // Remove each other from friends list
    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    await user.save();
    await friend.save();

    // ✅ Emit to friend (if online) that they were removed
    const io = req.app.get('io');
    const userSocketMap = req.app.get('userSocketMap');
    const friendSocketId = userSocketMap.get(friendId);

    if (friendSocketId) {
      io.to(friendSocketId).emit('friend_removed', userId); // send back remover's ID
    }

    return res.json({ success: true, message: "Friend removed successfully" });
  } catch (err) {
    console.error("Remove friend error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getFriendsList = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).populate('friends', 'name _id');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, friends: user.friends });
  } catch (err) {
    console.error('Error fetching friends list:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
