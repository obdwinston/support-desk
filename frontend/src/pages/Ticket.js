import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket, reset } from "../features/ticket/ticketSlice";
import {
  getNotes,
  createNote,
  reset as resetNotes,
} from "../features/note/noteSlice";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");
// modal mounts on root element

const Ticket = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: isLoadingNotes } = useSelector(
    (state) => state.note
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(params.id));
    dispatch(getNotes(params.id));

    return () => {
      if (isSuccess) {
        dispatch(reset());
        dispatch(resetNotes());
      }
    };
  }, [params.id, dispatch, isError, isSuccess, message]);

  const onCloseTicket = () => {
    dispatch(closeTicket(params.id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  const onSubmitNote = (e) => {
    e.preventDefault();
    dispatch(createNote({ ticketId: params.id, noteText }));
    toast.success("Note submitted");
    closeModal();
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isError) {
    return <h3>Unable to retrieve ticket</h3>;
  }

  if (isLoading || isLoadingNotes) {
    return <Spinner />;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Create Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create Note"
      >
        <h2>Create Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onSubmitNote}>
          <div className="form-group">
            <textarea
              className="form-control"
              name="noteText"
              id="noteText"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add note text"
              rows="10"
              style={{ resize: "none" }}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit Note
            </button>
          </div>
        </form>
      </Modal>

      {notes.length > 0 ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <p>No notes available</p>
      )}

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onCloseTicket}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
