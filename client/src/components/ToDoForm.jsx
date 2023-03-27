import React, { useState } from "react";
import { Accordion, Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import showToast from "./Toastify";

const ToDoForm = ({ fetchToDos }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [chips, setChips] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleInput = (e) => {
    let input = e.target.name;

    input === "date" && setDate(e.target.value);
    input === "title" && setTitle(e.target.value);
    input === "subtitle" && setSubtitle(e.target.value);
    input === "chips" && setChips(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      date,
      title,
      subtitle,
      chips,
    };
    axios
      .post(process.env.REACT_APP_API + "/add-new", payload)
      .then((res) => {
        setIsLoading(false);
        fetchToDos();
        setDate("");
        setTitle("");
        setSubtitle("");
        setChips("");
        showToast("success", "ToDo added");
      })
      .catch((err) => {
        setIsLoading(false);
        showToast("error", "Failed! Somthing went wrong");
      });
  };

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add ToDo</Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} sm={3} controlid="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    placeholder="Enter Title"
                    onChange={handleInput}
                    value={date}
                  />
                </Form.Group>
                <div></div>
                <Form.Group as={Col} controlid="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={handleInput}
                    value={title}
                  />
                </Form.Group>

                <Form.Group as={Col} controlid="subtitle">
                  <Form.Label>Subtitle</Form.Label>
                  <Form.Control
                    type="text"
                    name="subtitle"
                    placeholder="Enter Subtitle"
                    onChange={handleInput}
                    value={subtitle}
                  />
                </Form.Group>

                <div></div>
                <Form.Group as={Col} sm={6} controlid="chips">
                  <Form.Label>Chips</Form.Label>
                  <Form.Control
                    type="text"
                    name="chips"
                    placeholder="Type chips separated by comma(,)"
                    onChange={handleInput}
                    value={chips}
                  />
                </Form.Group>

                <Col
                  sm={6}
                  controlid="btn"
                  className="d-flex justify-content-end align-items-end"
                >
                  <Button
                    variant="primary"
                    disabled={isLoading}
                    onClick={!isLoading ? handleSubmit : null}
                  >
                    {isLoading ? 'Saving...' : 'Save'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default ToDoForm;
