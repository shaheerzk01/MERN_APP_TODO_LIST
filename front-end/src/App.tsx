import { useState, ChangeEventHandler, useEffect } from "react";
import NoteItem from "./components/NoteItems";
import NoteButton from "./components/NoteButton";
import axios from "axios";

type noteType = {
  id: string;
  title: string;
  description?: string;
};

const App = () => {
  const [notes, setNotes] = useState<noteType[]>([]);

  const [noteToView, setNoteToView] = useState<noteType>();

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const [selectedNoteId, setSelectedNoteId] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await axios("http://localhost:8000/note");
      setNotes(data.notes);
      //call the api and fetch all the notes
    };
    fetchNotes();
  }, []);

  const HandleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value }); //update the value of title and des from values.
  };
  return (
    <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="w-2/3 max-w-3xl mx-auto overflow-x-auto bg-white p-5 shadow-2xl rounded border border-gray-400 space-y-4 overflow-auto hover:overflow-scroll">
        <form
          onSubmit={async (evt) => {
            evt.preventDefault();
            if (selectedNoteId) {
              //then we update the note
              const { data } = await axios.patch(
                "http://localhost:8000/note/" + selectedNoteId,
                {
                  title: values.title,
                  description: values.description,
                }
              );
              const updatedNotes = notes.map((note) => {
                if (note.id === selectedNoteId) {
                  note.title = data.note.title;
                  note.description = data.note.description;
                }
                return note;
              });
              setNotes([...updatedNotes]);
              setValues({ title: "", description: "" });
              return;
            }
            const { data } = await axios.post(
              "http://localhost:8000/note/create",
              {
                title: values.title,
                description: values.description,
              }
            );
            setNotes([data.note, ...notes]);
            setValues({ title: "", description: "" });
          }}
          className="space-y-6"
        >
          <h1 className="font-semibold text-2xl text-center">
            Note Application
          </h1>
          <div>
            {values.title.trim() && values.title.length < 3 ? (
              <p className="text-red-500">Title is too short</p>
            ) : null}
            <input
              type="text"
              placeholder="Tittle"
              className="w-full border-b-2 border-gray-700 outline-none"
              onChange={HandleChange}
              value={values.title}
              name="title"
            />
          </div>
          <div>
            {values.description.trim() && values.description.length < 8 ? (
              <p className="text-red-500">Description is too short</p>
            ) : null}
            <textarea
              placeholder="Description"
              className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
              value={values.description}
              onChange={HandleChange}
              name="description"
            ></textarea>
          </div>
          <div className="text-center">
            <NoteButton title="Submit" color={"green"}></NoteButton>
          </div>
        </form>
        {/* Note items */}
        <div className="w-100 h-64 overflow-y-scroll space-y-4 bg-white p-5 shadow-lg rounded border border-gray-200 ">
          {notes.map((note) => {
            return (
              <NoteItem
                onViewClick={() => {
                  if (noteToView) {
                    setNoteToView(undefined);
                  } else {
                    setNoteToView(note);
                  }
                }}
                description={
                  noteToView?.id === note.id ? noteToView?.description : ""
                }
                onEditClick={() => {
                  setSelectedNoteId(note.id);
                  setValues({
                    title: note.title,
                    description: note.description || "",
                  });
                }}
                onDeleteClick={async () => {
                  const result = confirm("Are you sure");
                  if (result) {
                    //delete
                    await axios.delete("http://localhost:8000/note/" + note.id);
                    const updatedNotes = notes.filter(({ id }) => {
                      if (id !== note.id) return note;
                    });
                    setNotes([...updatedNotes]);
                  }
                }}
                key={note.id}
                title={note.title}
              ></NoteItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
