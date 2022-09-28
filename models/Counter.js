const { Schema, model, Types } = require('mongoose');

const moment = require('moment')

const counterSchema = new Schema (
    {
        counterId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        counterText: {
            type: String,
            required: true,
            maxlength: 300
        },
        username: {
            type: String,
            required: true,
        },
        createStamp: {
            type: Date,
            default: Date.now,
            get: createdVal => moment(createdVal).format('MM DD, YY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

counterSchema.virtual('counterCount')
.get(function() {
    return this.counters.length;
})

const Counter = model('Counter', counterSchema)

module.exports = Counter