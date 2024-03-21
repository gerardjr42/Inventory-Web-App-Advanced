//Query Select Form Inputs
const form = $(".form-List");
const title = $("#title");
const author = $("#author");
const genre = $("#genre");
const price = $("#price");
const isbn = $("#isbn");
const cover = $("#cover");
const imgURL = $("#imageURL");
const stock = $("#In-Stock");
const reset = $("#resetBtn");
const submit = $("#submit");
const container = $(".section-container");
const sectionForm = $(".section-form");

const ul = create("ul");
ul.className = "error";
sectionForm.appendChild(ul);


// Variable for innerHTML
const sectionHTML = `
<div class="item-img">
  <img src="" alt="Book Title" class="item__src">
</div>
<div class="item-info">
  <h1 class="item__title section-headers"></h1>
  <hr class="item__line">
  <h2 class="item__author"></h2>
  <h3 class="item__genre"></h3>
  <h3 class="item__price"></h3>
  <h4 class="item__isbn"></h4>
  <h4 class="item__cover"></h4>
  <h4 class="item__stock"></h4>
  <br>
  <label for="remove"></label>
  <button id="remove" name="remove" class="remove">Remove</button>
  <div class="counter">
    <span class="decrement">-</span>
    <span class="num">01</span>
    <span class="increment">+</span>
  </div>
</div>
`;

// Call loadFormData function when the page loads
document.addEventListener("DOMContentLoaded", loadFormData);

// Function to save book data into localStorage
function saveBookData(bookData) {
  // Retrieve existing book data from localStorage
  let books = JSON.parse(localStorage.getItem("books")) || [];
  // Add new book data to the array
  books.push(bookData);
  // Save updated book data back to localStorage
  localStorage.setItem("books", JSON.stringify(books));
};

// Function to load book data from localStorage and recreate the lists
function loadBookData() {
  const books = JSON.parse(localStorage.getItem("books")) || [];
  console.log(books);
  books.forEach((bookData) => {
    // Recreate list item for each book
    const section = document.createElement("section");
    section.className = "section-item";
    section.innerHTML = sectionHTML;

    // Set the values for each book in the recreated list item
    const bookTitle = section.$(".item__title");
    const bookAuthor = section.$(".item__author");
    const bookGenre = section.$(".item__genre");
    const bookPrice = section.$(".item__price");
    const bookISBN = section.$(".item__isbn");
    const bookCover = section.$(".item__cover");
    const bookStock = section.$(".item__stock");
    const bookImg = section.$(".item__src");

    bookTitle.textContent = bookData.title;
    bookAuthor.textContent = bookData.author;
    bookGenre.textContent = bookData.genre;
    bookPrice.textContent = `$${bookData.price}`;
    bookISBN.textContent = bookData.isbn;
    bookCover.textContent = bookData.cover;
    bookStock.textContent = bookData.stock;
    bookImg.src = bookData.imgURL;

    // Append the recreated list item to the container
    container.insertBefore(section, container.firstChild);
  });
}
// Call loadBookData function when the page loads
document.addEventListener("DOMContentLoaded", loadBookData);

// Function to save form data into localStorage
function saveFormData() {
  const formData = {
    title: title.value,
    author: author.value,
    genre: genre.value,
    price: price.value,
    isbn: isbn.value,
    cover: cover.value,
    imgURL: imgURL.value,
    stock: stock.value,
  };

  // Convert formData object to JSON string
  const jsonData = JSON.stringify(formData);

  // Save JSON string to localStorage
  localStorage.setItem("formData", jsonData);
}

// Function to load form data from localStorage and populate the table
function loadFormData() {
  const jsonData = localStorage.getItem("formData");
  if (jsonData) {
    const formData = JSON.parse(jsonData);
    title.value = formData.title;
    author.value = formData.author;
    genre.value = formData.genre;
    price.value = formData.price;
    isbn.value = formData.isbn;
    cover.value = formData.cover;
    imgURL.value = formData.imgURL;
    stock.value = formData.stock;
  }
} 
// Call loadFormData function when the page loads
document.addEventListener("DOMContentLoaded", loadFormData);

//Form Submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Call saveFormData function to save form data
  saveFormData();
  saveBookData({
    title: title.value,
    author: author.value,
    genre: genre.value,
    price: price.value,
    isbn: isbn.value,
    cover: cover.value,
    imgURL: imgURL.value,
    stock: stock.value,
  });

  //Add Section Form
  const section = create("section");
  section.className = "section-item";
  section.innerHTML = sectionHTML;

  //Book variables
  const bookTitle = section.$(".item__title");
  const bookAuthor = section.$(".item__author");
  const bookGenre = section.$(".item__genre");
  const bookPrice = section.$(".item__price");
  const bookISBN = section.$(".item__isbn");
  const bookCover = section.$(".item__cover");
  const bookStock = section.$(".item__stock");
  const bookImg = section.$(".item__src");

  //Append section to container, appends to start
  container.insertBefore(section, container.firstChild);

  //Reset innerHTML from ul to clear error text after each submission
  ul.innerHTML = "";

  //Book error statement
  if (title.value.length < 3) {
    const li = create("li");
    li.textContent = "Name must be more than 3 characters";
    ul.appendChild(li);
    section.remove();
  } else {
    bookTitle.textContent = title.value;
  }

  //Author error statement
  if (author.value.length < 3) {
    const li = create("li");
    li.textContent = "Author must be more than 3 characters";
    ul.appendChild(li);
    section.remove();
  } else {
    bookAuthor.textContent = author.value;
  }

  //Array of Genres
  const genres = [
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Horror",
    "Young Adult",
    "Non-Fiction",
    "Biography",
    "Self-Help",
    "Fiction",
  ];

  //Genre error statement
  if (!genres.includes(genre.value)) {
    const li = create("li");
    li.textContent = "Unlisted Genre, please enter a known genre";
    ul.appendChild(li);
    section.remove();
  } else {
    bookGenre.textContent = genre.value;
  }

  //Price error statement
  if (isNaN(price.value) || price.value < 1) {
    const li = create("li");
    li.textContent = "Price must be greater than $1";
    ul.appendChild(li);
    section.remove();
  } else {
    bookPrice.textContent = `$${price.value}`;
  }

  // Stock error statement
  if (stock.value === "default") {
    const li = create("li");
    li.textContent = "In Stock cannot be blank";
    ul.appendChild(li);
    section.remove();
  } else {
    bookStock.textContent = stock.value;
  }

  //Img error statement
  if (!imgURL.value.startsWith("http")) {
    const li = create("li");
    li.textContent = "Image URL path does not exist";
    ul.appendChild(li);
    section.remove();
  } else {
    bookImg.src = imgURL.value;
  }

  //Book Cover Error Statement
  if (cover.value === "default") {
    const li = create("li");
    li.textContent = "Cover type cannot be blank";
    ul.appendChild(li);
    section.remove();
  } else {
    bookCover.textContent = cover.value;
  }

  //Book ISBN Error
  if (isNaN(isbn.value) && isbn.value.length < 13) {
    const li = create("li");
    li.textContent = "ISBN must be 13 digits";
    ul.appendChild(li);
    section.remove();
  } else {
    bookISBN.textContent = isbn.value;
  }
  // form.reset();
});

//Toggle class for switching text color on stock option
addGlobalEventListener("click", ".item__stock", (e) => {
  e.target.textContent =
    e.target.textContent === "Out of Stock" ? "In Stock" : "Out of Stock";
  e.target.classList.toggle("In-Stock");
});

//Incrementing on button
addGlobalEventListener("click", ".increment", (e) => {
  const num = e.target.parentElement.$(".num");
  let i = parseInt(num.innerText);
  i++;
  i = i < 10 ? "0" + i : i;
  num.innerText = i;
});

//Decrementing on button
addGlobalEventListener("click", ".decrement", (e) => {
  const num = e.target.parentElement.$(".num");
  let i = parseInt(num.innerText);
  if (i > 1) {
    i--;
    i = i < 10 ? "0" + i : i;
    num.innerText = i;
  }
});

//Removing book from list and from local storage
addGlobalEventListener("click", ".remove", (e) => {
  // Remove the corresponding book from the DOM
  const section = e.target.closest(".section-item");
  section.remove();
  
  // Remove the corresponding book from localStorage
  const books = JSON.parse(localStorage.getItem("books")) || [];
  const bookTitle = section.$(".item__title").textContent;
  const index = books.findIndex(book => book.title === bookTitle);
  if (index !== -1) {
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
  }
});

reset.addEventListener("click", () => {
  ul.innerHTML = "";
  ul.style.display = "none";
  form.reset();
});