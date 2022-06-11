import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import { useState } from 'react';

import './AddBook.css';

export default function AddBook(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setImage(null);
  };
  const onChangedBooks = props.change;

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  const submit = () => {
    const id = `bookid:${name}${author}`.toLowerCase();
    localStorage.setItem(
      id,
      `${name}#|#${author}#|#${image ? image.name : ''}`
    );
    if (image) {
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem(image.name, reader.result);
      };
      reader.readAsDataURL(image);
    }
    onChangedBooks();
    handleClose();
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
          <Form.Group controlId='formFile' className='mb-3 AddBook__fileInput'>
            <Form.Control
              type='file'
              accept='image/*'
              onChange={(event) => setImage(event.target.files[0])}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button
            variant='primary'
            onClick={submit}
            disabled={name.length > 0 && author.length > 3 ? false : true}
          >
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
