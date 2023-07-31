var productNameData = document.getElementById("productName");
var productPriceData = document.getElementById("productPrice");
var productCategoryData = document.getElementById("productCategory");
var productDescriptionData = document.getElementById("productDescription");
var SearchInput = document.getElementById("SearchInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var alert = document.getElementById("alert");
var productNameAlert = document.querySelector("#productNameAlert");
var productPriceAlert = document.querySelector("#productPriceAlert");
var productCategoryAlert = document.querySelector("#productCategoryAlert");
var productDescriptionAlert = document.querySelector("#productDescriptionAlert");

var totalIndex = 0;
var productCounter = [];

if (localStorage.getItem("products") != null) {
    productCounter = JSON.parse(localStorage.getItem("products"));

    displayData();
}

function addProduct() {
    if (productNameValid() == false || productPriceValid() == false || productCategoryValid() == false || productDescriptionValid() == false) {
        alert.innerHTML = `<div class="alert alert-danger" role="alert">
        <span style="background-color: transparent;" class="d-block">Product Name must contain at least 3 characters </span>
        <span style="background-color: transparent;" class="d-block">Product Price must be a valid Number</span>
        <span style="background-color: transparent;" class="d-block">Product Category must contain at least 3 characters</span>
        <span style="background-color: transparent;" class="d-block">Product Description must be a valid one</span>
        </div>`;
        clearValidation();
    } else {
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
        clearValidation();
    }
}


function displayData() {
    var tbody = document.getElementById("tbody");
    var container = "";
    for (i = 0; i < productCounter.length; i++) {
        var productData = productCounter[i];
        container += `<tr>
                            <td>${i + 1}</td>
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
function clearValidation() {
    productNameData.classList.remove("is-valid");
    productNameData.classList.remove("is-invalid");
    productNameAlert.classList.remove("d-block");
    productNameAlert.classList.add("d-none");
    //!----------------------------------------
    productPriceData.classList.remove("is-valid");
    productPriceData.classList.remove("is-invalid");
    productPriceAlert.classList.remove("d-block");
    productPriceAlert.classList.add("d-none");
    //!----------------------------------------
    productCategoryData.classList.remove("is-valid");
    productCategoryData.classList.remove("is-invalid");
    productCategoryAlert.classList.remove("d-block");
    productCategoryAlert.classList.add("d-none");
    //!----------------------------------------
    productDescriptionData.classList.remove("is-valid");
    productDescriptionData.classList.remove("is-invalid");
    productDescriptionAlert.classList.remove("d-block");
    productDescriptionAlert.classList.add("d-none");
    //!----------------------------------------

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


function productNameValid() {
    var productNameRegex = /^[A-Z][a-z]{1,}\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?$/;
    var Name = productNameData.value;
    if (productNameRegex.test(Name) == true) {
        productNameData.classList.add("is-valid");
        productNameData.classList.remove("is-invalid");
        productNameAlert.classList.remove("d-block");
        productNameAlert.classList.add("d-none");
        alert.innerHTML = "";
        return true;
    }
    else {
        productNameData.classList.add("is-invalid");
        productNameData.classList.remove("is-valid");
        productNameAlert.classList.add("d-block")
        productNameAlert.classList.remove("d-none");
        return false;

    }
}

function productPriceValid() {
    var productPriceRegex = /^[0-9]{3,10}$/;
    var price = productPriceData.value;

    console.log(price);

    if (productPriceRegex.test(price) == true) {
        productPriceData.classList.add("is-valid");
        productPriceData.classList.remove("is-invalid");
        productPriceAlert.classList.remove("d-block");
        productPriceAlert.classList.add("d-none");
        alert.innerHTML = "";
        return true;
    }
    else {
        productPriceData.classList.add("is-invalid");
        productPriceData.classList.remove("is-valid");
        productPriceAlert.classList.add("d-block")
        productPriceAlert.classList.remove("d-none");
        return false;

    }
}

function productCategoryValid() {
    var productCategoryRegex = /^[A-Z][a-z]{1,}\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?$/;
    var Category = productCategoryData.value;
    if (productCategoryRegex.test(Category) == true) {
        productCategoryData.classList.add("is-valid");
        productCategoryData.classList.remove("is-invalid");
        productCategoryAlert.classList.remove("d-block");
        productCategoryAlert.classList.add("d-none");
        alert.innerHTML = "";
        return true;
    }
    else {
        productCategoryData.classList.add("is-invalid");
        productCategoryData.classList.remove("is-valid");
        productCategoryAlert.classList.add("d-block");
        productCategoryAlert.classList.remove("d-none");
        return false;

    }
}

function productDescriptionValid() {
    var productDescriptionRegex = /^[A-Z][a-z]{1,}\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?\s?([A-Z]?[a-z]{1,})?$/;
    var Description = productDescriptionData.value;
    if (productDescriptionRegex.test(Description) == true) {
        productDescriptionData.classList.add("is-valid");
        productDescriptionData.classList.remove("is-invalid");
        productDescriptionAlert.classList.remove("d-block");
        productDescriptionAlert.classList.add("d-none");
        alert.innerHTML = "";
        return true;
    }
    else {
        productDescriptionData.classList.add("is-invalid");
        productDescriptionData.classList.remove("is-valid");
        productDescriptionAlert.classList.add("d-block");
        productDescriptionAlert.classList.remove("d-none");
        return false;
    }
}