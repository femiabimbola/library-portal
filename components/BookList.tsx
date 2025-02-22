
import BookCard from '@/components/BookCard';


interface Props {
  title: string;
  books: Book[]; //that another inteface
  containerClassName?: string;
}

const BookList = ({title, books,  containerClassName} : Props) => {
  if (books.length <2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">
        {title}
      </h2>

      <ul className='book-list'>
        {books.map((book) => (
          // ...book spreads the property
          <BookCard key={book.title} {...book}/>
        ))}
      </ul>
    </section>
  )
}

export default BookList