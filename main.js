const addButtons = document.querySelectorAll(".add-button");
const formContainer = document.getElementById("form-container");
const tableBody = document.getElementById("table-body");
const submitted = document.getElementById("submitted");

let bookNumber = 0;
let myLibrary = [];

const book1 = {
  title: "Crime and punishment",
  author: "Fyodor Dostoyevksy",
  page: 671,
  read: "Yes",
};
const book2 = {
  title: "A brief history of time",
  author: "Stephen Hawking",
  page: 212,
  read: "No",
};

myLibrary.push(book1); // add ")"
myLibrary.push(book2);

render();

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formContainer.style.display = "block";
  });
}); // add ")"

function addDeleteButtons() {
  let deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    if (button.getAttribute("data-book") == bookNumber) {
      //Only add eventListeners to new books
      button.addEventListener("click", () => {
        // remove the extra letters "s"
        deleteBook(button.getAttribute("data-book"));
      });
    }
  });
}
// add button
function addReadButtons() {
  let readButtons = document.querySelectorAll(".change-read");

  readButtons.forEach((button) => {
    if (button.getAttribute("data-book") == bookNumber) {
      button.addEventListener("click", () => {
        changeReadStatus(button.getAttribute("data-book"), button);
      });
    }
  });
}
// delete books
function deleteBook(number) {
  let toDelete = document.querySelector(`tr[data-book="${number}"]`);
  toDelete.remove();
}
// change read status
function changeReadStatus(number, button) {
  if (myLibrary[number]["read"] === "Yes") {
    myLibrary[number]["read"] = "No"; // == or === is missing
    button.innerText = "No"; // == or === is missing
    button.classList.remove("button-green");
    button.classList.add("button-red");
  } else {
    myLibrary[number]["read"] = "Yes";
    button.innerText = "Yes";
    button.classList.remove("button-red");
    button.classList.add("button-green");
  }
}
// add book to library
function addBookToLibrary(title, author, pages, read) {
  let book = { title: title, author: author, page: pages, read: read };
  myLibrary.push(book);
}
// render
function render() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (i === bookNumber) {
      let row = document.createElement("tr");

      if (bookNumber % 2 !== 0) {
        //Adds color to every other row
        row.classList.add("color-row");
      }

      row.setAttribute("data-book", bookNumber);

      let titleCell = document.createElement("td");
      titleCell.append(myLibrary[i].title);
      row.append(titleCell); // we removed extra letter "a"

      let authorCell = document.createElement("td");
      authorCell.append(myLibrary[i].author);
      row.append(authorCell);

      let pageCell = document.createElement("td");
      pageCell.append(myLibrary[i].page);
      row.append(pageCell);

      let readCell = document.createElement("td");
      let button = document.createElement("button");
      button.innerText = myLibrary[i].read;

      if (myLibrary[i].read === "Yes") {
        button.classList.add("button-green");
      } else {
        button.classList.add("button-red");
      }

      button.classList.add("change-read");
      button.setAttribute("type", "button");
      button.setAttribute("data-book", bookNumber);
      readCell.append(button);
      row.append(readCell);

      let deleteCell = document.createElement("td");
      let deleteButton = document.createElement("button");
      // we changed deleteButton name (it was deleteB)
      let icon = document.createElement("ion-icon");
      icon.setAttribute("name", "trash-outline");
      deleteButton.classList.add("delete");
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("data-book", bookNumber);

      deleteButton.append(icon);
      deleteCell.append(deleteButton);
      row.append(deleteCell);

      tableBody.insertBefore(row, tableBody.firstChild);

      addDeleteButtons(); // remove letter "d" after DeleteX
      addReadButtons();

      bookNumber++;
    }
  }
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let form = document.querySelector("form");
  let bookArgs = [];

  for (let element of form.elements) {
    if (element.id === "read") {
      element.checked ? bookArgs.push("Yes") : bookArgs.push("No");
      element.checked = false;
    } else {
      bookArgs.push(element.value);
      if (element.id !== "submit") {
        element.value = "";
      }
    }
  }

  formContainer.style.display = "none";
  addBookToLibrary(bookArgs[1], bookArgs[0], bookArgs[2], bookArgs[3]);
  render();
});
