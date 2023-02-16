let searchedBooks = document.querySelector('#searchdisplay');


const newBookHandler = async (event) => {
    event.preventDefault(event);

    searchedBooks.addEventListener('click', function(event) {
        const addBook = event.target.id;
    });
  
      const response = await fetch(`/api/booksRoutes`, {
        method: 'POST',
        //replace these parameters with the api parameters?
        body: JSON.stringify({ books_id, have_read, books_issn, book_title, buy_link, user_id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        prompt("Book added to bookmarked list");
      } else {
        alert('Failed to add book');
      }
    };


    _.sortBy(booksData, ['book', '']);