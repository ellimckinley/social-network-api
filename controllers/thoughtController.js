import User from '../models/User.js';
import Thought from '../models/Thought.js';

const thoughtController = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
            }
            
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Post create thought + push to user
async createThought(req, res) {
  try {
    console.log('💬 Incoming Thought:', req.body);

    const thought = await Thought.create(req.body);
    console.log('✅ Thought created:', thought);

    const updatedUser = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    console.log('👤 User updated with thought:', updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found to attach thought' });
    }

    res.json(thought);
  } catch (err) {
    console.error('❌ Error in createThought:', err);
    res.status(500).json(err);
  }
},
    
    // Put update thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                req.body,
                { new: true, runValidators: true }
            );
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
        }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
        }
            res.json({ message: 'Thought has been deleted' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Post reaction to a thought
    async addReaction(req, res) {
        try {
            console.log('🧪 Reaction Body:', req.body);
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $push: { reactions: req.body} },
                { new:  true, runValidators: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
        }
    console.log('✅ Reaction added to thought:', thought);
    res.json(thought);
  } catch (err) {
    console.error('❌ Error adding reaction:', err);
    res.status(500).json(err);
  }
    },
    // Delete reaction from a thought
        async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID'});
        }

    res.json(thought);
  } catch (err) {
    console.error('❌ Error removing reaction:', err);
    res.status(500).json(err);
  }
    },
};




export default thoughtController;

