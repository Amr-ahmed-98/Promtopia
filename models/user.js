import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Emai already exists!'],
    required: [true, 'Emai is required!'],
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      'Username must be between 8 and 20 characters',
    ],
  },
  image: {
    type: String,
  },
});

// look into the models.user see if it there and only if it's not there create the model
const User = models.User || model('User', UserSchema);
export default User;
