

const sortByAuthor = document.getElementsByClassName("sortbyauthor");
const sortByTitle = document.getElementsByClassName("sortbytitle");
const sortByRatingAsc = document.getElementsByClassName("sortbyratingasc");
const sortByRatingDesc = document.getElementsByClassName("sortbyratingdesc");

sortByAuthor.addEventListener('click', function(event) {
    _.sortBy(savedBooks, ['bookinfo', 'author']);
});

sortByTitle.addEventListener('click', function(event) {
    _.sortBy(savedBooks, ['bookinfo', 'title']);
});

sortByRatingAsc.addEventListener('click', function(event) {
    _.orderBy(savedBooks, ['bookinfo', 'rating'], ['asc']);
});

sortByRatingDesc.addEventListener('click', function(event) {
    _.orderBy(savedBooks, ['bookinfo', 'rating'], ['desc']);
});