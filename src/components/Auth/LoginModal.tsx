import React from "react";
import { Alert, Col, Modal, Row, Spinner } from "react-bootstrap";
import { ILoginModalProps } from "./Types";
import "./styles.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useAppSelector } from "../../store/setup/store";
import { Facebook, Google } from "react-bootstrap-icons";
function LoginModal(props: ILoginModalProps) {
  const user = useAppSelector((state) => state.user);

  return (
    <div>
      <Modal show={props.show} onHide={props.handleModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Login or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user.status !== "loading" ? (
            <>
              <Row>
                <Col xs={12} md={6} id="loginDivider">
                  <LoginForm handleModal={props.handleModal} />
                </Col>
                <Col xs={12} md={6}>
                  <RegisterForm handleModal={props.handleModal} />
                </Col>
              </Row>

              <Alert variant="danger" id="loginAlert">
                zxcvzxcv
              </Alert>
            </>
          ) : (
            <Spinner animation="grow" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <a href={`${process.env.REACT_APP_BE_URL}/api/auth/facebookLogin`}>
            <div className="socialLogoContainer mr-3">
              <Facebook />
            </div>
          </a>
          <a href={`${process.env.REACT_APP_BE_URL}/api/auth/googleLogin`}>
            <div className="socialLogoContainer">
              <Google />
            </div>
          </a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;
