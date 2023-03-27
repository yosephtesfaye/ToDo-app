import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import ToDo from "./pages/ToDo";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Container className="my-5">
        <ToDo />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
      />
    </>
  );
};

export default App;
