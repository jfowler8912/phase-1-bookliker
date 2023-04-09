// When the page loads, get a list of books from http://localhost:3000/books and 
const baseUrl = 'http://localhost:3000/'
const booksUrl = baseUrl + 'books/'
const usersUrl = baseUrl + 'users/'

let users = []

function fetchBooks () {
    fetch (booksUrl)
    .then( response => response.json() )
    .then(booksData => renderBooks( booksData ))
}
function fetchUsers () {
    fetch(usersUrl)
    .then(response => response.json())
    .then (usersData => {
        users = [...usersData]
        console.log(usersData)
    })
}

fetchBooks()
fetchUsers()



const renderBooks = (books) => {
    books.forEach( book => renderBookLi( book ))
}
const renderBookLi = book => {
    const listUl = document.getElementById('list')
    const bookLi = document.createElement('li')
    listUl.appendChild(bookLi)
    bookLi.textContent = book.title

    bookLi.addEventListener("click", () => showBookInformation(book))
}

// display their titles by creating a li for each book and adding each li to the ul#list element.
function showBookInformation ( book ) {
    const showPanelDiv = document.getElementById('show-panel')
    const titleH1 = document.createElement('h1')
    titleH1.textContent = book.title
    showPanelDiv.appendChild(titleH1)
    const image = document.createElement('img')
    image.src = book.img_url
    showPanelDiv.appendChild(image)
    const description = document.createElement('p')
    description.textContent = book.description
    showPanelDiv.appendChild(description)
    const author = document.createElement('h4')
    author.textContent = 'By: ' + book.author
    showPanelDiv.appendChild(author)
    if ( book.subtitle ) {
        const bookSubtitleH3 = document.createElement( 'h3' )
        bookSubtitleH3.textContent = book.subtitle
        showPanelDiv.appendChild(bookSubtitleH3)
    }
    const userUl = document.createElement('ul')
    showPanelDiv.appendChild(userUl)

    book.users.forEach( user => renderUserLi(user,userUl))
     

// Display a LIKE button along with the book details.
    const likeButton = document.createElement('button')
    likeButton.textContent = "Like"
    showPanelDiv.appendChild(likeButton)

// add event listener to like button
    likeButton.addEventListener('click', ()=> clickToLikeBook(userUl,book) )

}
function renderUserLi(user,userUl) {
    const userLi = document.createElement('li')
    userLi.textContent = user.username
    userUl.appendChild(userLi)
}

function clickToLikeBook(userUl,book) {
    const currentUser = users.find( user => user.id === 1)
    if(currentUser) {
        let updatedUsersForBook = {...book, users, currentUser}
        let updatedBook = {... book, users: updatedUsersForBook}
        let postRequest = {
            method: 'PATCH'
            headers: {
                'Content-type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify('')
        }

        fetch(booksUrl + book.id, postRequest)
        .then(response => response.json())
        .then(updatedBookData => showBookInformation(updatedBookData))

    }
    
}








// When the button is clicked, send a PATCH request to http://localhost:3000/books/:id with an array of users who like the book, and add a new user to the list.














// document.addEventListener("DOMContentLoaded", function() {});





























// const baseUrl = "http://localhost:3000"
// const booksUrl = baseUrl + 'books/'

// function fetchBooks () {
//     fetch( booksUrl )
//     .then(response => response.json() )
//     .then( console.log )
// }
// fetchBooks()

// const renderBooks = ( books ) => {
//     books.forEach( book => renderBookLi( book ))
// }

// const renderBookLi = book => {
//     const listUl = document.getElementById('list')

//     const bookLi = document.createElement
// }