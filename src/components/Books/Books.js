import './Books.css';
import dorian from '../../images/Dorian.jpg';
import EditBook from '../EditBook/EditBook';
import { useState, useEffect } from 'react';

export default function Books() {
  const [bookCards, setBookCards] = useState([]);
  useEffect(() => {
    const cards = [];
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && /^bookid:/.test(key)) {
        const bookData = localStorage.getItem(key).split(/#\|#/);
        cards.push(
          <div className='Book'>
            <img className='Book__jacket' src={dorian} alt='Обложка книги' />
            <p className='Book__name'>{bookData[0]}</p>
            <p className='Book__author'>{bookData[1]}</p>
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
  }, []);

  return <div className='Books'>{bookCards}</div>;
}
