import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String, 
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString(),
    },
},
{
    toJSON: {
        getters: true,
    },
    id: false,
});

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString(),
    },
    username: {
        type: String, 
        required: true,
    },
    reactions: {
        type: [reactionSchema],
        default: [],
    },
    userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    }
},


{
    toJSON: {
        virtuals: true, 
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions?.length || 0;
});

const Thought = model('Thought', thoughtSchema);

export default Thought;