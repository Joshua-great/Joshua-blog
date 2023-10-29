const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min:6 },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  blog: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
 
});

// Hash the password before saving it

userSchema.pre("save", async function (next) {
 const user=this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
