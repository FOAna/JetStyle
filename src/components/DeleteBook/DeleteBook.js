import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

import './DeleteBook.css';

export default function DeleteBook(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChangedBooks = props.change;

  const submit = () => {
    localStorage.removeItem(props.itemKey);
    localStorage.removeItem(props.image);
    onChangedBooks();
    handleClose();
  };

  return (
    <>
      <Button
        className={`DeleteBook__button ${props.className}`}
        variant='light'
        onClick={handleShow}
      >
        <RiDeleteBinLine />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Книга, которую мы больше не увидим</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`Вы уверены, что хотите безвозвратно удалить книгу «${props.name}» автора ${props.author}?`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Отмена
          </Button>
          <Button variant='primary' onClick={submit}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
