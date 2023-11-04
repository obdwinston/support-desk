import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { createTicket, reset } from "../features/ticket/ticketSlice";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const NewTicket = () => {
  const [product, setProduct] = useState("Mac");
  const [description, setDescription] = useState("");

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/tickets");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="text"
            className="form-control"
            value={user.email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="Mac">Mac</option>
              <option value="iPad">iPad</option>
              <option value="iPhone">iPhone</option>
              <option value="Watch">Watch</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              placeholder="Please enter issue description"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="10"
              style={{ resize: "none" }}
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>

          <div className="spacer"></div>
        </form>
      </section>
    </div>
  );
};

export default NewTicket;
