import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { ILoginModalProps } from "./Types";
import "./styles.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
function LoginModal(props: ILoginModalProps) {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6} id="loginDivider">
              <LoginForm handleModal={props.handleModal} />
            </Col>
            <Col xs={12} md={6}>
              <RegisterForm handleModal={props.handleModal} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <div>Sign up with google</div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
