import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoginIcon from "./log-in.svg";
import "./styles.css";
function Login() {
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(!show);
  };

  return (
    <>
      <div id="loginContainer" onClick={handleModal}>
        <img src={LoginIcon} alt="LoginIcon-icon" className="loginIcon" />
      </div>
      <Modal show={show} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
