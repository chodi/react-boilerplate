module.exports = (mongoose) => {
  const Todo = mongoose.model('Todo', new mongoose.Schema({
    owner: { type: String, required: true },
    todo: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
  }));
  return Todo;
};
