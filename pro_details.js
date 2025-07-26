const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log(productId);
const apiUrl = "https://fakestoreapi.com/products";

async function getProductDetails(id) {
  try {
    const res = await fetch(`${apiUrl}/${productId}`);
    if (!res.ok) {
      throw Error(`error: ${res.status}`);
    }
    const data = await res.json();
    console.log(data); // cashe to data

    const display = `<div class="product_details">
 <div class="productImg">
  <img src="${data.image}" width="90%" ></div>
  <div class="product_content">
  <h2>${data.title}</h2>
  <h3>Category:${data.category}</h3>
  <p>${data.description}</p>
  <div class="price2">$${data.price}</div>
   <button id="goback">Go Back</button>
   </div>
  </div>
 `;

    document.querySelector(".pro_details").innerHTML += display;
    const btn = document.getElementById("goback");
    btn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  } catch (error) {
    console.log(error);
  }
}

getProductDetails(productId);
