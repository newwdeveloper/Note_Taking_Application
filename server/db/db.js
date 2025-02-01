import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/note_app");
    //When Is note_app Created?
    //The database is created automatically when you insert the first document into a collection (e.g., adding a note).
    //Think of it as "lazy creation"—MongoDB waits until there's actual data to store.
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("error connecting mongoDB", error.message);
  }
};

export default connectToMongoDB;
