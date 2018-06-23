
const mongoose = require("mongoose");
// Save a reference to the Schema constructor
const Schema = mongoose.Schema;
// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
const NoteSchema = new Schema({
  // `title` is of type String
  title: String,
});
// This creates our model from the above schema, using mongoose's model method
const Notes = mongoose.model("Notes", NoteSchema);
// Export the Note model
module.exports = Notes;