import AddBook from '../AddBook/AddBook';
import { useEffect, useState } from 'react';
import dorian from '../../images/Dorian.jpg';
import EditBook from '../EditBook/EditBook';
import DeleteBook from '../DeleteBook/DeleteBook';

import './MainPage.css';

export default function MainPage() {
  const [bookCards, setBookCards] = useState([]);

  const onChangedBooks = () => {
    const cards = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && /^bookid:/.test(key)) {
        const bookData = localStorage.getItem(key).split(/#\|#/);
        const name =
          bookData[0].length > 65
            ? `${bookData[0].substring(0, 65)}...`
            : bookData[0];
        const author =
          bookData[1].length > 20
            ? `${bookData[1].substring(0, 20)}...`
            : bookData[1];
        cards.push(
          <div className='MainPage__book' key={key}>
            <img
              className='MainPage__bookJacket'
              src={dorian}
              alt='Обложка книги'
            />
            <p className='MainPage__bookName'>{name}</p>
            <p className='MainPage__bookAuthor'>{author}</p>
            <div className='MainPage__bookButtons'>
              <EditBook
                className='MainPage__bookEdit'
                itemKey={key}
                name={bookData[0]}
                author={bookData[1]}
                change={onChangedBooks}
              />
              <DeleteBook
                className='MainPage__bookDelete'
                itemKey={key}
                name={bookData[0]}
                author={bookData[1]}
                change={onChangedBooks}
              />
            </div>
          </div>
        );
      }
    }
    setBookCards(cards);
  };

  useEffect(() => {
    onChangedBooks();
  }, []);

  return (
    <div className='MainPage'>
      <AddBook className='MainPage__addButton' change={onChangedBooks} />
      <div className='MainPage__bookCards'>{bookCards}</div>
    </div>
  );
}
