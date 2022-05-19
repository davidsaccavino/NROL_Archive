const mongoose = require('mongoose');

const launchSchema = mongoose.Schema(
    {
        title: String,
        description: String,
        published: Boolean
    },
    { timestamps: true }
);

launchSchema.virtual('id').get(()=> {
    return this._id.toHexString();
})

launchSchema.virtual('id').get(()=> {
    return this.__v.toHexString();
})

launchSchema.set("ToJSON", {
    virtuals: true
});

const Launch = mongoose.model("launch", launchSchema);
module.exports = Launch;



