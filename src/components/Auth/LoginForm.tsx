import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/setup/store";
import { login } from "../../store/user/userSlice";
import { ILoginProps } from "./Types";

function LoginForm(props: ILoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.loggedIn) {
      props.handleModal();
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.currentTarget.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="formFooter">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
