import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import showToast from "../components/Toastify";

import ToDoForm from "../components/ToDoForm";
import ToDoTable from "../components/ToDoTable";

const ToDo = () => {
  const [toDo, setToDo] = useState([]);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = () => {
    axios
      .get(process.env.REACT_APP_API + "/get-all")
      .then((res) => {
        res.data.reverse()
        setToDo(res.data);
      })
      .catch((err) => {
        showToast("error", "Something went wrong");
      });
  };
  return (
    <>
      <ToDoForm fetchToDos={fetchToDos} />
      <ToDoTable toDos={toDo} fetchToDos={fetchToDos} />
    </>
  );
};

export default ToDo;
