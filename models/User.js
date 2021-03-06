const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    streaming: [
      new mongoose.Schema({
        service_name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        billing_date: {
          type: Number,
          require: true,
        },
      }),
    ],
    my_review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

userSchema.pre('save', function (next) {
  try {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  } catch (err) {
    console.err(err);
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
