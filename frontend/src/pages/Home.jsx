import { useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isModalOpen, setModelOpen] = useState(false);
  const navigate = useNavigate();
  const closeModel = () => {
    setModelOpen(false);
  };
  const addNote = async ({ title, description }) => {
    try {
      const response = await axios.post("http://localhost:5000/api/note/add", {
        title,
        description,
      });
      if (response.data.success) {
        navigate("/");
        closeModel();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full text-3xl"
      >
        +
      </button>
      {isModalOpen && <NoteModal closeModel={closeModel} addNote={addNote} />}
    </div>
  );
};

export default Home;
