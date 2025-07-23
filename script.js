const apiUrl = "https://fakestoreapi.com/products";

async function getdata() {
  try {
    let res = await fetch(apiUrl);
    if (!res.ok) {
      throw Error(`HTTP error status ${res.status}`);
    }
    let data = await res.json();
    console.log(data);

    data.map((ele) => {
      const cardHtml = `<div class="cards">
  <img src="${ele.image}" width="100%" height="251px" >
  <h2>${ele.title}</h2>
  <p>${ele.description}</p>
  <div class="price">$${ele.price}</div>
  </div>`;
      document.getElementById("products__cards").innerHTML += cardHtml;
    });
  } catch (error) {
    console.log(error);
  }
}

getdata();
