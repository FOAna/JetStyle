import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/esm/Modal';
import { useState } from 'react';
import { RiDeleteBinLine, RiDeleteBin2Line } from 'react-icons/ri';

import './DeleteBook.css';

export default function DeleteBook(props) {
  const [isShow, setIsShow] = useState(false);
  const handleClose = () => setIsShow(false);
  const handleShow = () => setIsShow(true);
  const onChangedBooks = props.change;

  const submit = () => {
    if (props.all) {
      localStorage.clear();
    } else {
      localStorage.removeItem(props.itemKey);
      localStorage.removeItem(props.image);
    }
    onChangedBooks();
    handleClose();
  };

  return (
    <>
      <Button
        className={`DeleteBook__button${props.all ? '_all' : ''} ${
          props.className
        }`}
        variant='light'
        onClick={handleShow}
      >
        {props.all ? (
          <RiDeleteBin2Line className='DeleteBook__ico' />
        ) : (
          <RiDeleteBinLine />
        )}
      </Button>

      <Modal
        show={isShow}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.all
              ? 'Полная зачистка'
              : 'Книга, которую мы больше не увидим'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.all
            ? 'Вы уверены, что хотите удалить все книги?'
            : `Вы уверены, что хотите безвозвратно удалить книгу «${props.name}» автора ${props.author}?`}
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
