import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket, reset } from "../features/ticket/ticketSlice";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const Ticket = () => {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(params.id));

    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [params.id, dispatch, isError, isSuccess, message]);

  const onCloseTicket = () => {
    dispatch(closeTicket(params.id));
    toast.success("Ticket closed");
    navigate("/tickets");
  };

  if (isError) {
    return <h3>Unable to retrieve ticket</h3>;
  }

  if (isLoading) {
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
      </header>

      {ticket.status !== "closed" && (
        <button className="btn btn-block btn-danger" onClick={onCloseTicket}>
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default Ticket;
