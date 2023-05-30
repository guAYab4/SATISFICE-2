console.log("Hecho por Angelica Rodriguez Guayacoso, del 4to B de Programación");

let carts = document.querySelectorAll(".add-cart");

let products = [
	{
		name: "Acondicionador sólido",
		tag: "acondicionadorsolido",
		price: 90,
		incart: 0,
	},
	{
		name: "Cepillo de bambú",
		tag: "cepillodebambu",
		price: 40,
		incart: 0,
	},
	{
		name: "Copa menstrual",
		tag: "copamenstrual",
		price: 190,
		incart: 0,
	},
	{
		name: "Hisopos de bambú",
		tag: "hisoposdebambu",
		price: 50,
		incart: 0,
	},
	{
		name: "Papel ecológico",
		tag: "papelecologico",
		price: 20,
		incart: 0,
	},
	{
		name: "Pasta Sólida",
		tag: "pastasolida",
		price: 30,
		incart: 0,
	},
	{
		name: "Shampoo sólido",
		tag: "shampoosolido",
		price: 80,
		incart: 0,
	},
	{
		name: "Rastrillo reutilizable",
		tag: "rastrilloreutilizable",
		price: 20,
		incart: 0,
	},
	{
		name: "Bolsa biodegradable",
		tag: "bolsabiodegradable",
		price: 12,
		incart: 0,
	},
	{
		name: "Bolsa de tela",
		tag: "bolsadetela",
		price: 20,
		incart: 0,
	},
    {
		name: "Lapices con semillas",
		tag: "lapicesconsemillas",
		price: 20,
		incart: 0,
	},
    {
		name: "Pads desmaquillantes",
		tag: "padsdesmaquillantes",
		price: 20,
		incart: 0,
	},
    {
		name: "Popotes de metal",
		tag: "popotesdemetal",
		price: 20,
		incart: 0,
	},
    {
		name: "Termo",
		tag: "termo",
		price: 20,
		incart: 0,
	},
    {
		name: "Cubiertos de bambú",
		tag: "cubiertosdebambu",
		price: 20,
		incart: 0,
	},
    {
		name: "Bolsas para frutas",
		tag: "bolsasparafrutas",
		price: 20,
		incart: 0,
	},
];

for (let i = 0; i < carts.length; i++) {
	carts[i].addEventListener("click", () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	});
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem("cartNumbers");
	if (productNumbers) {
		document.querySelector(".cart span").textContent = productNumbers;
	}
}

function cartNumbers(product) {
	let productNumbers = localStorage.getItem("cartNumbers");
	productNumbers = parseInt(productNumbers);

	if (productNumbers) {
		localStorage.setItem("cartNumbers", productNumbers + 1);
		document.querySelector(".cart span").textContent = productNumbers + 1;
	} else {
		localStorage.setItem("cartNumbers", 1);
		document.querySelector(".cart span").textContent = 1;
	}

	setItems(product);
}

function setItems(product) {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);

	if (cartItems !== null) {
		if (cartItems[product.tag] === undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product,
			};
		}
		cartItems[product.tag].incart += 1;
	} else {
		product.incart = 1;
		cartItems = {
			[product.tag]: product,
		};
	}
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem("totalCost");

	if (cartCost !== null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function decreaseItem(product, price) {
	let cartNumbers = localStorage.getItem("cartNumbers");
	cartNumbers = parseInt(cartNumbers);
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let totalCost = localStorage.getItem("totalCost");
	totalCost = parseInt(totalCost);

	cartItems[product].incart -= 1;
	localStorage.setItem("cartNumbers", (cartNumbers -= 1));
	document.querySelector(".cart span").textContent = cartNumbers;
	totalCost -= price;
	if (cartItems[product].incart === 0) {
		delete cartItems[product];
		localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	}
	localStorage.setItem("totalCost", totalCost);
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	displayCart();
}

function increaseItem(product, price) {
	let cartNumbers = localStorage.getItem("cartNumbers");
	cartNumbers = parseInt(cartNumbers);
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let totalCost = localStorage.getItem("totalCost");
	totalCost = parseInt(totalCost);

	cartItems[product].incart += 1;
	localStorage.setItem("cartNumbers", (cartNumbers += 1));
	document.querySelector(".cart span").textContent = cartNumbers;
	totalCost += price;
	localStorage.setItem("totalCost", totalCost);
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	displayCart();
}

function removeItem(product, incart, price) {
	let cartNumbers = localStorage.getItem("cartNumbers");
	cartNumbers = parseInt(cartNumbers);
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let totalCost = localStorage.getItem("totalCost");
	totalCost = parseInt(totalCost);

	cartItems[product].incart = 0;
	localStorage.setItem("cartNumbers", (cartNumbers -= incart));
	document.querySelector(".cart span").textContent = cartNumbers;
	totalCost -= price * incart;
	delete cartItems[product];
	localStorage.setItem("productsInCart", JSON.stringify(cartItems));
	localStorage.setItem("totalCost", totalCost);
	displayCart();
}

function pagar() {
	let total = localStorage.getItem("totalCost");
	localStorage.setItem("cartNumbers", 0);
	localStorage.setItem("totalCost", 0);
	localStorage.setItem("productsInCart", null);
	document.querySelector(".cart span").textContent = 0;
	document.querySelector(".products").innerHTML = "";
	alert(`Gracias por su compra de $${total}.00`);
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");

	if (cartItems && productContainer) {
		productContainer.innerHTML = "";
		Object.values(cartItems).map((item) => {
			productContainer.innerHTML += `
			<div class="product">
			<ion-icon name="close-circle-outline" class="remove" onclick="removeItem('${
				item.tag
			}', ${item.incart}, ${item.price})"></ion-icon>
				<img src="./images/${item.tag}.jpg"/>
				<span>${item.name}</span>
			</div>

			<div class="price">$${item.price}.00</div>

			<div class="quantity">
				<ion-icon class="decrease" name="chevron-back-circle-outline" onclick="decreaseItem('${
					item.tag
				}', ${item.price})"></ion-icon>
				<span>${item.incart}</span>
				<ion-icon class="increase" name="chevron-forward-circle-outline" onclick="increaseItem('${
					item.tag
				}', ${item.price})"></ion-icon>
			</div>
			
			<div class="total">$${item.incart * item.price}.00</div>
			`;
		});

		productContainer.innerHTML += `
		<div class="cartTotalContainer">
			<h4 class="cartTotalTitle">Total del carrito</h4>
			<h4 class="cartTotal">$${localStorage.getItem("totalCost")}.00</h4>
		</div>
		<div class="pagar" onclick="pagar()">
			<h4>$ Pagar</h4>
		</div>
		`;
	}
}

onLoadCartNumbers();
displayCart();