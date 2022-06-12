import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/esm/Form';
import { useState } from 'react';
import { GrEdit } from 'react-icons/gr';

import './EditBook.css';

export default function EditBook(props) {
  const date = new Date();

  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);
  const handleShow = () => {
    setIsShow(true);
    setImage(null);
  };
  const onChangedBooks = props.change;

  const [name, setName] = useState(props.name);
  const [author, setAuthor] = useState(props.author);
  const [image, setImage] = useState(null);

  const submit = () => {
    localStorage.removeItem(props.itemKey);
    const id = `bookid:${name}${author}`.toLowerCase();
    localStorage.setItem(
      id,
      `${name}#|#${author}#|#${image ? image.name : ''}#|#${date.getTime()}`
    );
    if (image) {
      if (image.name !== props.image) {
        localStorage.removeItem(props.image);
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem(image.name, reader.result);
      };
      reader.readAsDataURL(image);
    } else if (props.image.length) {
      localStorage.removeItem(props.image);
    }
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
        show={isShow}
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
          <Form.Group controlId='formFile' className='mb-3 EditBook__fileInput'>
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
            disabled={
              name.length > 0 &&
              author.length > 3 &&
              (name !== props.name ||
                author !== props.author ||
                (image && image.name !== props.image) ||
                (props.image.length && !image))
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
