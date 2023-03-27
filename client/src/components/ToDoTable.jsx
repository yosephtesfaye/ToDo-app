import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Table, Col, Button, Form } from "react-bootstrap";
import {
  BsFillTrashFill,
  BsPencilSquare,
  BsXLg,
  BsCheckLg,
} from "react-icons/bs";

import showToast from "./Toastify";

const ToDoTable = ({ toDos, fetchToDos }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [chips, setChips] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    renderToDo();
  }, [toDos]);

  const handleEdit = (todo) => {
    setId(todo._id);
    setDate(todo.Date);
    setTitle(todo.Title);
    setSubtitle(todo.Subtitle);
    setChips(todo.Chips);
  };

  const handleDelete = (id) => {
    axios
      .delete(process.env.REACT_APP_API + "/remove/" + id)
      .then((res) => {
        fetchToDos();
      })
      .catch((err) => {
        showToast("error", "Failed! Somthing went wrong");
      });
  };

  const handleUpdate = (e) => {
    let input = e.target.name;
    input === "date" && setDate(e.target.value);
    input === "title" && setTitle(e.target.value);
    input === "subtitle" && setSubtitle(e.target.value);
    input === "chips" && setChips(e.target.value);
  };

  const handleSubmit = (id) => {
    const payload = {
      date,
      title,
      subtitle,
      chips,
    };
    axios
      .put(process.env.REACT_APP_API + "/update/" + id, payload)
      .then((res) => {
        showToast("success", "Updated successfully");
        setId("");
        fetchToDos();
      })
      .catch((err) => {
        showToast("error", "Failed! Somthing went wrong");
      });

  };
  
  const renderToDo = () => {
    return toDos.map((todo) => {
      if (todo._id === id) {
        return (
          <tr key={todo._id}>
            <th>
              <Form.Control type="date" name="date" onChange={handleUpdate} value={date} />
            </th>
            <td>
              <Form.Control type="text" name="title" value={title} onChange={handleUpdate} />
            </td>
            <td>
              <Form.Control type="text" name="subtitle" value={subtitle} onChange={handleUpdate} />
            </td>
            <td>
              <Form.Control type="text" name="chips" value={chips} onChange={handleUpdate} />
            </td>
            <td>
              <Row className="m-0">
                <Col sm={4} className="text-center">
                  <Button variant="link text-danger" className="shadow-none" onClick={() => setId("")}>
                    <BsXLg />
                  </Button>
                </Col>
                <Col sm={4} className="text-center">
                  <Button variant="link text-success" className="shadow-none" onClick={() => handleSubmit(todo._id)} >
                    <BsCheckLg />
                  </Button>
                </Col>
                <Col sm={4} className="text-center">
                  <Button variant="link text-danger" className="shadow-none" onClick={() => handleDelete(todo._id)} >
                    <BsFillTrashFill />
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
        );
      } else {
        return (
          <tr key={todo._id}>
            <th>{todo.Date}</th>
            <td>{todo.Title}</td>
            <td>{todo.Subtitle}</td>
            <td>{todo.Chips}</td>
            <td>
              <Row className="m-0">
                <Col sm={6} className="text-center">
                  <Button variant="link text-primary" className="shadow-none" onClick={() => handleEdit(todo)} >
                    <BsPencilSquare />
                  </Button>
                </Col>
                <Col sm={6} className="text-center">
                  <Button variant="link text-danger" className="shadow-none" onClick={() => handleDelete(todo._id)} >
                    <BsFillTrashFill />
                  </Button>
                </Col>
              </Row>
            </td>
          </tr>
        );
      }
    });
  };

  return (
    <>
      {
        toDos.length > 0 ? <Table striped bordered hover size="sm" responsive className="mt-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Chips</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderToDo()}</tbody>
        </Table> : <Row className="justify-content-center">
          <lord-icon
            src="https://cdn.lordicon.com/nocovwne.json"
            trigger="loop" colors="primary:#121331,secondary:#0b5ed7" style={{ width: "250px", height: "250px", opacity: 0.5 }}>
          </lord-icon>
          <span className="text-muted h2 text-center">No To-Do found</span>
        </Row>
      }
    </>
  );
};

export default ToDoTable;
