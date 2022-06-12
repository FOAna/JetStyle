import AddBook from '../AddBook/AddBook';
import { useEffect, useState } from 'react';
import jacket from '../../images/book.jpg';
import EditBook from '../EditBook/EditBook';
import DeleteBook from '../DeleteBook/DeleteBook';

import './MainPage.css';

export default function MainPage() {
  const [cards, setCards] = useState([]);

  const onChangedBooks = () => {
    const books = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && /^bookid:/.test(key)) {
        const bookData = localStorage.getItem(key).split(/#\|#/);
        books.push({
          key: key,
          name: bookData[0],
          author: bookData[1],
          image: bookData[2],
          date: bookData[3],
        });
      }
    }

    setCards(
      books
        .sort((a, b) => {
          return b.date - a.date;
        })
        .map((book) => {
          return (
            <div
              className='MainPage__book'
              key={book.key}
              onMouseEnter={(event) => {
                document.getElementById(book.key).style.visibility = 'visible';
              }}
              onMouseLeave={(event) => {
                document.getElementById(book.key).style.visibility = 'hidden';
              }}
            >
              <img
                className='MainPage__bookJacket'
                src={
                  book.image.length ? localStorage.getItem(book.image) : jacket
                }
                width='145px'
                height='205px'
                alt='Картинка ждёт обновления страницы, чтобы появиться)'
              />
              <p className='MainPage__bookName'>
                {book.name.length > 65
                  ? `${book.name.substring(0, 65)}...`
                  : book.name}
              </p>
              <p className='MainPage__bookAuthor'>
                {book.author.length > 45
                  ? `${book.author.substring(0, 45)}...`
                  : book.author}
              </p>
              <div className='MainPage__bookButtons' id={book.key}>
                <EditBook
                  className='MainPage__button'
                  itemKey={book.key}
                  name={book.name}
                  author={book.author}
                  image={book.image}
                  change={onChangedBooks}
                />
                <DeleteBook
                  className='MainPage__button'
                  itemKey={book.key}
                  name={book.name}
                  author={book.author}
                  image={book.image}
                  change={onChangedBooks}
                />
              </div>
            </div>
          );
        })
    );
  };

  useEffect(() => {
    onChangedBooks();
  }, []);

  return (
    <div className='MainPage'>
      <div className='MainPage__rightButtons'>
        <AddBook
          className='MainPage__button MainPage__button_add'
          change={onChangedBooks}
        />
        <DeleteBook className='MainPage__button' all change={onChangedBooks} />
      </div>
      <div className='MainPage__bookCards'>{cards}</div>
    </div>
  );
}
