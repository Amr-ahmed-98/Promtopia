import { Schema, model, models } from 'mongoose';
// Schema bt7dd shkl el data ely htt5zn fl database
// model dah by create wa7da bna2a 3la promptSchema msla
// models dah by create wa7da bna2a 3la model
const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;

// dlw2ty mongoose w mongodb 3arfa ezay el database htb2a 3amla ezay
