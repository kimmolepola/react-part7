const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  comment: { type: String, default: '', required: true },
  blogId: { type: String, default: '', required: true },
});


commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable no-param-reassign, no-underscore-dangle */
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    /* eslint-enable no-param-reassign, no-underscore-dangle */
  },
});

module.exports = mongoose.model('Comments', commentSchema);
