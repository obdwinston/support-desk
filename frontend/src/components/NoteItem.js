import React from "react";
import { useSelector } from "react-redux";

const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        {note.isStaff ? (
          <span>
            Staff @ {new Date(note.createdAt).toLocaleString("en-US")}
          </span>
        ) : (
          <span>
            {user.name} @ {new Date(note.createdAt).toLocaleString("en-US")}
          </span>
        )}
      </h4>
      <p>{note.text}</p>
    </div>
  );
};

export default NoteItem;
