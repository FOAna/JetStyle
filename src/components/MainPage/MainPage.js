import './MainPage.css';
import Books from '../Books/Books';
import AddBook from '../AddBook/AddBook';

export default function MainPage() {
  return (
    <div className='MainPage'>
      <AddBook className='MainPage__addButton' />
      <Books />
    </div>
  );
}
