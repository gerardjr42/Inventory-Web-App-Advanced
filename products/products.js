function loadBookData() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  // console.log(books);
  const tableBody = document.querySelector("#bookTable");

books.forEach((book) => {
  const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td data-cell="title">${book.title}</td>
      <td data-cell="author">${book.author}</td>
      <td data-cell="cover-type">${book.cover}</td>
      <td data-cell="genre">${book.genre}</td>
      <td data-cell="ISBN">${book.isbn}</td>
      <td data-cell="Price">${book.price}</td>
      <td data-cell="Status">${book.stock}</td>
    `;
      tableBody.appendChild(newRow);
});
}

document.addEventListener("DOMContentLoaded", loadBookData);