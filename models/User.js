const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        retorts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Retort",
            },
        ],
        accomplices: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
userSchema.virtual("accompliceCount").get(function () {
    return this.accomplices.length;
})

const User = model('User', userSchema);

module.exports = User;