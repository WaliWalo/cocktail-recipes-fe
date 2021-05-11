import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/setup/store";
import { registerUser } from "../../store/user/userSlice";
import { IRegisterProps } from "./Types";
import { gsap } from "gsap";

function RegisterForm(props: IRegisterProps) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    favs: [],
    _id: "",
  });

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.loggedIn) {
      props.handleModal();
    }
    if (user.status === "error") {
      gsap.to("#loginAlert", {
        autoAlpha: 1,
        text: user.error,
        duration: 1,
        onComplete: function () {
          gsap.to("#loginAlert", { delay: 3, autoAlpha: 0 });
        },
      });
    }
    // eslint-disable-next-line
    // eslint-disable-next-line
  }, [user, form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.currentTarget.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            type="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={form.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            type="text"
            placeholder="First Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={form.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            type="text"
            placeholder="Last Name"
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={form.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>

        <div className="formFooter">
          <Button variant="primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
