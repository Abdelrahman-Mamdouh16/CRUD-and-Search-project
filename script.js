var productNameData = document.getElementById("productName");
var productPriceData = document.getElementById("productPrice");
var productCategoryData = document.getElementById("productCategory");
var productDescriptionData = document.getElementById("productDescription");
var SearchInput = document.getElementById("SearchInput");

var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");


var totalIndex = 0;
var productCounter = [];

if (localStorage.getItem("products") != null) {
    productCounter = JSON.parse(localStorage.getItem("products"));

    displayData();
}

function addProduct() {

    var product = {
        name: productNameData.value,
        price: productPriceData.value,
        category: productCategoryData.value,
        description: productDescriptionData.value,
    }
    productCounter.push(product);
    localStorage.setItem("products", JSON.stringify(productCounter));
    displayData();
    clearData();
}


function displayData() {
    var tbody = document.getElementById("tbody");
    var container = "";
    for (i = 0; i < productCounter.length; i++) {
        var productData = productCounter[i];
        container += `<tr>
                            <td>${i}</td>
                            <td> ${productData.name} </td>
                            <td> ${productData.price} </td>
                            <td> ${productData.category} </td>
                            <td> ${productData.description} </td>
                            <td class="text-center">
                                <button class="btn btn-outline-warning" onclick="setData(${i})">Update</button>
                                <button class="btn btn-outline-danger"onclick="deleteData(${i})"> Delete</button>
                            </td>
                        </tr>`;
    }
    tbody.innerHTML = container;
}

function clearData() {
    productNameData.value = "";
    productPriceData.value = "";
    productCategoryData.value = "";
    productDescriptionData.value = "";
}


function deleteData(index) {
    productCounter.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(productCounter));
    displayData();
}

function Search() {
    var tbody = document.getElementById("tbody");
    var container = "";

    var term = SearchInput.value;
    for (i = 0; i < productCounter.length; i++) {
        if (productCounter[i].name.toLowerCase().includes(term.toLowerCase()) || i == term) {
            container += `<tr>
                            <td>${i}</td>
                            <td> ${productCounter[i].name} </td>
                            <td> ${productCounter[i].price} </td>
                            <td> ${productCounter[i].category} </td>
                            <td> ${productCounter[i].description} </td>
                            <td class="text-center">
                                <button class="btn btn-outline-warning">Update</button>
                                <button class="btn btn-outline-danger"onclick="deleteData(${i})"> Delete</button>
                            </td>
                        </tr>`;
        }
    }
    tbody.innerHTML = container;
}


function setData(index) {
    totalIndex = index;
    var currentProduct = productCounter[index];

    productNameData.value = currentProduct.name;
    productPriceData.value = currentProduct.price;
    productCategoryData.value = currentProduct.category;
    productDescriptionData.value = currentProduct.description;

    updateBtn.classList.remove("d-none");
    addBtn.classList.add("d-none");

}


function updateProduct() {
    var product = {
        name: productNameData.value,
        price: productPriceData.value,
        category: productCategoryData.value,
        description: productDescriptionData.value,
    };
    productCounter.splice(totalIndex, 1, product);
    localStorage.setItem("products", JSON.stringify(productCounter));
    displayData();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    clearData()
}