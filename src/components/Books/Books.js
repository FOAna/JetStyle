import dorian from '../../images/Dorian.jpg';
import EditBook from '../EditBook/EditBook';
import { useState, useEffect } from 'react';

import './Books.css';

export default function Books() {
  const [bookCards, setBookCards] = useState([]);

  useEffect(() => {
    document.addEventListener('storage', () => {
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
            <div className='Book'>
              <img className='Book__jacket' src={dorian} alt='Обложка книги' />
              <p className='Book__name'>{name}</p>
              <p className='Book__author'>{author}</p>
              <EditBook
                className='Book__edit'
                itemKey={key}
                name={bookData[0]}
                author={bookData[1]}
              />
            </div>
          );
        }
      }
      setBookCards(cards);
      console.log('Книги обновились');
    });
  }, [setBookCards]);

  return <div className='Books'>{bookCards}</div>;
}
