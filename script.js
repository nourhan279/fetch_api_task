const apiUrl = "https://fakestoreapi.com/products";
const form = document.getElementById("form");
const addButton = document.getElementById("add_button");
const editButton = document.getElementById("edit_button");
const header = { "content-type": "application/json" };
const inputId = document.querySelector('input[name="id"]');
const inputTitle = document.querySelector('input[name="title"]');
const inputPrice = document.querySelector('input[name="price"]');
const inputDesc = document.querySelector('textarea[name="description"]');
const inputCat = document.querySelector('input[name="category"]');
const inputImage = document.querySelector('input[name="image"]');
const loader = document.querySelector(".loader");

function showloader() {
  loader.classList.remove("d-none");
}

function hideloader() {
  loader.classList.add("d-none");
}

async function getProducts() {
  showloader();
  try {
    let res = await fetch(apiUrl);
    if (!res.ok) {
      throw Error(`HTTP error status ${res.status}`);
    }
    let data = await res.json();
    // console.log(data);
    document.getElementById("products__cards").innerHTML = "";
    data.map((ele) => {
      const cardHtml = `<div class="cards" title="click to view more details">
      <div class="productimg"> 
  <img src="${ele.image}" width="100%" ></div>
  <h2>${ele.title}</h2>
  <p>${ele.description}</p>
  <div class="price">$${ele.price}</div>
    <div class="actions">
      <button product-id="${ele.id}" class="deletebtn">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button product-idd="${ele.id}" class="updatebtn">
        <i class="fa-solid fa-pen"></i>
      </button>
    </div>
  </div>
 `;
      //products details
      document.getElementById("products__cards").innerHTML += cardHtml;
    });
    const cardsdiv = document.querySelectorAll(".cards");
    for (let i = 0; i < cardsdiv.length; i++) {
      cardsdiv[i].addEventListener("click", () => {
        console.log("i am a card");
        const id = data[i].id;
        window.location.href = `products_details.html?id=${id}`;
      });
    }
    //delete button
    const deletebutton = document.querySelectorAll(".deletebtn");
    for (let i = 0; i < deletebutton.length; i++) {
      deletebutton[i].addEventListener("click", (event) => {
        event.stopPropagation();
        // console.log(deletebutton[i].getAttribute("product-id"));
        deleteProduct(deletebutton[i].getAttribute("product-id"));
      });
    }
    //update btn
    const updateButton = document.querySelectorAll(".updatebtn");
    for (let i = 0; i < updateButton.length; i++) {
      updateButton[i].addEventListener("click", (event) => {
        event.stopPropagation();

        updateProduct(updateButton[i].getAttribute("product-idd"));
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideloader();
  }
}
getProducts();

function displayError(error) {
  console.log(error);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addProduct();
});

//add product
async function addProduct() {
  showloader();
  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        id: inputId.value,
        title: inputTitle.value,
        price: inputPrice.value,
        description: inputDesc.value,
        image: inputImage.value,
        category: inputCat.value,
      }),
    });
    if (!res.ok) {
      throw Error(`HTTP error status ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    alert(`product ${inputTitle.value} has been added`);
    form.reset();

    getProducts();
  } catch (error) {
    displayError(error);
  }
}

//delete product by id

async function deleteProduct(id) {
  showloader();
  try {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw Error(`HTTP error status ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    console.log(`product with id ${id} has been deleted`);
    getProducts();
  } catch (error) {
    displayError(error);
  }
}

async function updateProduct(id) {
  showloader();
  try {
    const res1 = await fetch(`${apiUrl}/${id}`);

    if (!res1.ok) {
      throw Error(`HTTP error status ${res1.status}`);
    }
    const data1 = await res1.json();
    console.log(data1);
    addButton.classList.add("d-none");
    editButton.classList.remove("d-none");
    inputCat.value = data1.category;
    inputId.value = data1.id;
    inputDesc.value = data1.description;
    inputPrice.value = data1.price;
    inputImage.value = data1.image;
    inputTitle.value = data1.title;
    form.scrollIntoView();

    editButton.addEventListener("click", async () => {
      showloader();
      try {
        const res = await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: header,
          body: JSON.stringify({
            id: inputId.value,
            title: inputTitle.value,
            price: inputPrice.value,
            description: inputDesc.value,
            category: inputCat.value,
            image: inputImage.value,
          }),
        });
        if (!res.ok) {
          throw Error(`HTTP error status ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        getProducts();
        alert(`product with id:${id} has been updated!`);
        form.reset();
        editButton.classList.add("d-none");
        addButton.classList.remove("d-none");
      } catch (error) {
        displayError(error);
      }
    });
  } catch (error) {
    displayError(error);
  }
}
