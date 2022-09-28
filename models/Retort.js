const { Schema, model, Types } = require('mongoose');

const moment = require('moment')



const retortSchema = new Schema (
    {
        retortText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300,
        },
        createStamp: {
            type: Date,
            default: Date.now,
            get: createdVal => moment(createdVal).format('MM DD, YY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        counters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Counter',
            },
        ],
    }
)


const Retort = model('Retort', retortSchema)

module.exports = Retort;