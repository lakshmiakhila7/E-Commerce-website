// Function to handle form submission and store product data in local storage
function addProduct(event) {
    event.preventDefault();

    // Get product details from form inputs
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productDescription = document.getElementById('productDescription').value;

    // Get existing products from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Create a new product object
    const newProduct = {
        name: productName,
        image: productImage,
        description: productDescription,
        rating: 0
    };

    // Add the new product to the list
    products.push(newProduct);

    // Save the updated products list to local storage
    localStorage.setItem('products', JSON.stringify(products));

    // Alert user and clear the form
    alert('Product added successfully!');
    event.target.reset();

    // Reload products to update the list with the new product
    loadProducts();
}

// Function to load products from local storage and display them on the products page
function loadProducts() {
    const productList = document.getElementById('productList');
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Clear existing products
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.dataset.index = index;

        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.name;

        const productTitle = document.createElement('p');
        productTitle.textContent = product.name;

        const productDesc = document.createElement('p');
        productDesc.textContent = product.description;

        const ratingDiv = document.createElement('div');
        ratingDiv.className = 'rating';
        for (let i = 5; i >= 1; i--) {
            const ratingInput = document.createElement('input');
            ratingInput.type = 'radio';
            ratingInput.id = `star${i}-${index}`;
            ratingInput.name = `rating-${index}`;
            ratingInput.value = i;
            ratingInput.checked = product.rating === i;
            ratingInput.onchange = () => updateRating(index, i);
            const ratingLabel = document.createElement('label');
            ratingLabel.htmlFor = `star${i}-${index}`;
            ratingDiv.appendChild(ratingInput);
            ratingDiv.appendChild(ratingLabel);
        }

        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy Now';
        buyButton.onclick = () => buyNow(product.name);

        const threeDots = document.createElement('div');
        threeDots.className = 'three-dots';
        threeDots.innerHTML = '&#x22EE;';
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-content';
        const editLink = document.createElement('a');
        editLink.textContent = 'Edit';
        editLink.onclick = () => editProduct(index);
        const deleteLink = document.createElement('a');
        deleteLink.textContent = 'Delete';
        deleteLink.onclick = () => deleteProduct(index);
        dropdown.appendChild(editLink);
        dropdown.appendChild(deleteLink);
        threeDots.appendChild(dropdown);

        productDiv.appendChild(productImg);
        productDiv.appendChild(productTitle);
        productDiv.appendChild(productDesc);
        productDiv.appendChild(ratingDiv);
        productDiv.appendChild(buyButton);
        productDiv.appendChild(threeDots);

        productList.appendChild(productDiv);
    });
}

// Function to handle "Buy Now" button click
function buyNow(productName) {
    alert(`You have selected to buy ${productName}.`);
}

// Function to handle contact form submission
function contactAlert(event) {
    event.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    event.target.reset();
}

// Function to update product rating
function updateRating(index, rating) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products[index].rating = rating;
    localStorage.setItem('products', JSON.stringify(products));
}

// Function to edit a product
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    const newName = prompt('Enter new product name:', product.name);
    const newImage = prompt('Enter new product image URL:', product.image);
    const newDescription = prompt('Enter new product description:', product.description);

    if (newName !== null && newImage !== null && newDescription !== null) {
        products[index] = {
            name: newName,
            image: newImage,
            description: newDescription,
            rating: product.rating // Preserve existing rating
        };

        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
    }
}

// Function to delete a product
function deleteProduct(index) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}

// Check if the current page is the products page and load products if it is
if (document.getElementById('productList')) {
    loadProducts();
}
