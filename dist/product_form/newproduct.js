//Query Select Form Inputs
const form = $("form");
const title = $("#title");
const author = $("#author");
const genre = $("#genre");
const price = $("#price");
const isbn = $("#isbn");
const cover = $("#cover");
const imgURL = $("#imageURL");
const stock = $("#In-Stock");
const reset = $("#reset");
const submit = $("#submit");
const container = $(".section-container");
const sectionForm = $(".section-form");
const table = $("table");

const ul = create("ul");
ul.className = "error";
sectionForm.appendChild(ul);

form.on("submit", (event) => {
  event.preventDefault();

  //Add Section Form
  const section = create("section");
  section.className = "section-item";
  section.innerHTML = `
    <div class="item-img">
      <img src="" alt="Book Title" class="item__src">
    </div>
    <div class="item-info">
      <h1 class="item__title section-headers"></h1>
      <hr class="item__line">
      <h2 class="item__author"></h2>
      <h3 class ="item__genre"></h3>
      <h3 class="item__price"></h3>
      <h4 class="item__isbn"></h4>
      <h4 class="item__cover"></h4>
      <h4 class="item__stock"></h4>
      <br>
    <label for="remove"></label>
    <button id="remove" name="remove">Remove</button>
    </div>
  `;

  //Add Table Implementation
  const tr = create("tr");
  tr.innerHTML = `
  <td data-cell="title"></td>
  <td data-cell="author"></td>
  <td data-cell="cover-type"></td>
  <td data-cell="genre"></td>
  <td data-cell="ISBN"></td>
  <td data-cell="Price"></td>
  <td data-cell="Status"></td>
`;

  //Book variables
  const bookTitle = section.$(".item__title");
  const bookAuthor = section.$(".item__author");
  const bookGenre = section.$(".item__genre");
  const bookPrice = section.$(".item__price");
  const bookISBN = section.$(".item__isbn");
  const bookCover = section.$(".item__cover")
  const bookStock = section.$(".item__stock");
  const bookImg = section.$(".item__src"); 
  
  //Table variables
  const titleCell = tr.$('[data-cell="title"]');
  const authorCell = tr.$('[data-cell="author"]');
  const coverCell = tr.$('[data-cell="cover-type"]');
  const genreCell = tr.$('[data-cell="genre"]');
  const isbnCell = tr.$('[data-cell="ISBN"]');
  const priceCell = tr.$('[data-cell="Price"]');
  const stockCell = tr.$('[data-cell="Status"]');

  //Append section to container, below appends to end
  // container.appendChild(section);

  //Append section to container, below appends to start
  container.insertBefore(section, container.firstChild);

  //Reset innerHTML from ul for each error submission
  ul.innerHTML = "";


  //Add Errors for each text box:

  //Book error statement
  if (title.value.length < 3) {
    const li = create("li");
    li.textContent = "Name must be more than 3 characters";
    ul.appendChild(li);
    section.remove();
  } else {
    bookTitle.textContent = title.value;
    // titleCell.innerText = title.value;
  };

  //Author error statement
  if(author.value.length < 3) {
    const li = create("li");
    li.textContent = "Author must be more than 3 characters";
    ul.appendChild(li);
    section.remove();
  } else {
    bookAuthor.textContent = author.value;
    // authorCell.innerText = author.value;
  };

  const genres = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Historical Fiction", "Horror", "Young Adult", "Non-Fiction", "Biography", "Self-Help", "Fiction"];

  //Genre error statement
  if (!genres.includes(genre.value)) {
    const li = create("li");
    li.textContent = "Unlisted Genre, please enter a known genre"
    ul.appendChild(li);
    section.remove();
  } else {
    bookGenre.textContent = genre.value;
    // genreCell.innerText = genre.value;
  };

  //Price error statement
  if(isNaN(price.value) || price.value < 1){
    const li = create("li");
    li.textContent = "Price must be greater than $1";
    ul.appendChild(li);
    section.remove();
  } else {
    bookPrice.textContent = `$${price.value}`;
    // priceCell.innerHTML = `$${price.value}`;
  };

  //Stock error statement
  if(stock.value === "default") {
    const li = create("li");
    li.textContent = "In Stock cannot be blank";
    ul.appendChild(li);
    section.remove();
    } else {
      bookStock.textContent = stock.value;
      // stockCell.innerText = stock.value;
    };

    addGlobalEventListener("click", ".item__stock", e => {
      e.target.textContent = e.target.textContent === "Out of Stock" ? "In Stock" : "Out of Stock";
      e.target.classList.toggle("In-Stock");
    });

    
    //Img error statement
    if (!imgURL.value.startsWith("http")) {
      const li = create("li");
      li.textContent = "Image URL path does not exist";
      ul.append(li);
      section.remove();
    } else {
      bookImg.src = imgURL.value;
    };


    //Book Cover Error Statement
    if(cover.value === "default") {
      const li = create("li");
      li.textContent = "Cover type cannot be blank";
      ul.appendChild(li);
      section.remove();
    } else {
      bookCover.textContent = cover.value;
      // coverCell.innerText = cover.value;
    }

    //Book ISBN Error
    if(isNaN(isbn.value) && isbn.value.length < 13) {
      const li = create("li");
      li.textContent = "ISBN must be 13 exactly numbers";
      ul.appendChild("li");
      section.remove();
    } else {
      bookISBN.textContent = isbn.value
      // isbnCell.innerText = isbn.value;
    }
    
    table.appendChild(tr);
    form.reset();
});

addGlobalEventListener("click", "#remove", e => {
  e.target.parentNode.parentNode.remove();
});

reset.addEventListener("click", (e) => {
  ul.innerHTML = "";
  ul.style.display = "none";
  form.reset();
});