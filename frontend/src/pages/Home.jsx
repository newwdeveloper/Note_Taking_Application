import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModal from "../components/NoteModal";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const Home = () => {
  const [isModalOpen, setModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/note");
      console.log(response.data);
      const data = response.data;
      console.log(data);
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModel = () => {
    setModelOpen(false);
  };
  const addNote = async ({ title, description }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        {
          title,
          description,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {notes && notes.length > 0 ? (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        ) : (
          <p>No notes available</p>
        )}
      </div>

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
