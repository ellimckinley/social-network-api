import User from '../models/User.js';
import Thought from '../models/Thought.js';

const userController = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('friends').populate('thoughts');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
            .populate('friends')
            .populate('thoughts');

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Post create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Put update user
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                req.body,
                { new: true, runValidators: true}
            );
        
        if (!user) {
                return res.status(404).json({ message: 'No user found with that ID'});
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete user (and thoughts)
    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID'});
        }
        // Delete user's thoughts
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'The user and associated thoughts have been deleted'});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Post add friend
    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true}
            );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID'});
        }
        res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Delete remove friend
    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndDelete(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true}
            );
        if (!user) {
            return res.status(404).json({ message: 'No user found with that ID'});
        }
        res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
export default userController;