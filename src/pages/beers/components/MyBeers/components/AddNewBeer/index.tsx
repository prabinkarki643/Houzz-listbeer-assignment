import React, { useState } from "react";
import { Beer } from "../../../../typings";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import AppButton from "../../../../../../components/AppButton";
import houzzBeerImage from "../../../../../../assets/images/houzz_beer.png";
import styles from "./styles.module.css";
import { EntityStatus } from "../../../../../../types";

interface AddNewBeerProps {
  onSuccess?: (beer: Beer) => void;
  onCancel?: () => void;
}

export default function AddNewBeer({ onCancel, onSuccess }: AddNewBeerProps) {
  const [form, setForm] = useState({
    validated: false,
    data: {
      name: "",
      genre: "",
      description: "",
    },
    submitStatus: EntityStatus.Idle,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const formTarget = event.currentTarget;
    if (formTarget.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setForm((prevState) => ({
      ...prevState,
      validated: true,
      submitStatus: EntityStatus.Loading,
    }));

    const { name, genre, description } = form.data;
    var newBeer: Beer = {
      id: Date.now(),
      name: name,
      tagline: genre,
      description: description,
    };
    setForm((prevState) => ({
      ...prevState,
      validated: true,
      submitStatus: EntityStatus.Loaded,
    }));
    onSuccess?.(newBeer);
  };

  return (
    <div>
      <Form noValidate validated={form.validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} xs={12} controlId="image" className="mb-2">
            <Card className={styles.houzzBeerImgContainer}>
              <Image
                className={styles.houzzBeerImg}
                src={houzzBeerImage}
                alt="huzz-beer"
                rounded
              />
            </Card>
          </Form.Group>

          <Form.Group as={Col} xs={12} controlId="name" className="mb-2">
            <Form.Control
              required
              type="text"
              placeholder="Beer name *"
              value={form.data.name}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  data: { ...prevState.data, name: e.target.value },
                }))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a beer name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} controlId="genre" className="mb-2">
            <Form.Control
              required
              type="text"
              placeholder="Genre *"
              value={form.data.genre}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  data: { ...prevState.data, genre: e.target.value },
                }))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a genre
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} controlId="description" className="mb-2">
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Description *"
              value={form.data.description}
              onChange={(e) =>
                setForm((prevState) => ({
                  ...prevState,
                  data: { ...prevState.data, description: e.target.value },
                }))
              }
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex align-items-center justify-content-end mt-3 mb-2">
            <AppButton isTextButton onClick={onCancel}>
              Cancel
            </AppButton>
            <AppButton type="submit">Save</AppButton>
          </div>
        </Row>
      </Form>
    </div>
  );
}
