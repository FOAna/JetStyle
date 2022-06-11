import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import { useState } from 'react';
import { GrEdit } from 'react-icons/gr';

import './EditBook.css';

export default function EditBook(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChangedBooks = props.change;

  const [name, setName] = useState(props.name);
  const [author, setAuthor] = useState(props.author);
  const submit = () => {
    localStorage.removeItem(props.itemKey);
    const id = `bookid:${name}${author}`.toLowerCase();
    localStorage.setItem(id, `${name}#|#${author}`);
    onChangedBooks();
    handleClose();
  };

  return (
    <>
      <Button
        className={`EditBook__button ${props.className}`}
        variant='light'
        onClick={handleShow}
      >
        <GrEdit />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактируемая книга</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
            controlId='floatingName'
            label='Название книги'
            className='mb-3'
          >
            <Form.Control
              type='text'
              placeholder='Название книги'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='floatingAuthor' label='Автор'>
            <Form.Control
              type='text'
              placeholder='Автор'
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button
            variant='primary'
            onClick={submit}
            disabled={
              name.length > 0 &&
              author.length > 3 &&
              (name !== props.name || author !== props.author)
                ? false
                : true
            }
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
