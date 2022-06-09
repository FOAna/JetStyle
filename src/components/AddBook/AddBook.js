import './AddBook.css';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useState } from 'react';

export default function AddBook(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const submit = () => {
    if (name.length > 0 && author.length > 3) {
      const id = `bookid:${name}${author}`.toLowerCase();
      localStorage.setItem(id, `${name}#|#${author}`);
      handleClose();
    }
  };

  return (
    <>
      <Button className={props.className} variant='light' onClick={handleShow}>
        Добавить новую книгу
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Новая книга</Modal.Title>
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
              onChange={(event) => setName(event.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId='floatingAuthor' label='Автор'>
            <Form.Control
              type='text'
              placeholder='Автор'
              onChange={(event) => setAuthor(event.target.value)}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='primary' onClick={submit}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
