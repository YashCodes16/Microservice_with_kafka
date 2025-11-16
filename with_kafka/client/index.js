const products = [
  {
    id: 1,
    name: "Laptop",
    price: 999,
    image:
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?cs=srgb&dl=pexels-life-of-pix-7974.jpg&fm=jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 599,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSK8_BdPpbzhlPqJTQBXUofFwDAyrUceBwTg&s",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    image:
      "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
  },
];

let cart = [];

const productsList = document.getElementById("productsList");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

products.forEach((product) => {
  productsList.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
});

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  updateCart();
}

function updateCart() {
  if (cart.length === 0) {
    cartItems.textContent = "No items yet";
    totalPrice.textContent = "0.00";
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => `${item.name} - $${item.price}`)
    .join("<br>");
  totalPrice.textContent = cart
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);
}

document.getElementById("checkoutBtn").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price, 0),
  };

  try {
    const response = await fetch("http://localhost:8000/payment-service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: order,
      }),
    });
    if (response.status != 200) {
      const data = await response.json();
      alert(JSON.stringify(data));
    } else {
      const data = await response.json();
      alert(`${data.message}!! \n OrderId: ` + data.orderId);
    }

    cart = [];
    updateCart();
  } catch (error) {
    alert("Error placing order!");
    console.error(error);
  }
});
