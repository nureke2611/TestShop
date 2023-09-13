const productApi = 'api/products';
const categoryApi = 'api/productCategories';
let products = [];
let categories = [];

function getProducts() {
    fetch(productApi)
        .then(response => response.json())
        .then(data => _displayProducts(data))
        .catch(error => console.error('Ошибка отображения', error));
}
function getCategories() {
    fetch(categoryApi)
        .then(response => response.json())
        .then(data => _displayCategories(data))
        .catch(error => console.error('Ошибка отображения', error));
}

document.getElementById("addProduct").onclick = function () {
    var modal = document.getElementById("addProductModal");
    modal.style.display = "block";
}

document.getElementById("closeProductModal").onclick = function () {
    var modal = document.getElementById("addProductModal");
    modal.style.display = "none";
}

document.getElementById("addCategory").onclick = function () {
    var modal = document.getElementById("addCategoryModal");
    modal.style.display = "block";
}

document.getElementById("closeCategoryModal").onclick = function () {
    var modal = document.getElementById("addCategoryModal");
    modal.style.display = "none";
}

function addProductItem() {
    let item = {
        Name: $('#add_name').val(),
        Description: $('#add_description').val(),
        Price: $('#add_price').val(),
        Weight: $('#add_weight').val(),
        Color: $('#add_color').val(),
        ProductCategoryId: $('#productCategoryItems').val(),
        ProductCategory: {
            Name: '',
            Description: ''
        }
    };

    fetch(productApi, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getProducts();
            getCategories();
            document.getElementById("addProductModal").style.display = "none";
        })
        .catch(error => console.error('Ошибка добавления', error));
}

function addCategoryItem() {
    let item = {
        Name: $('#category_name').val(),
        Description: $('#category_description').val()
    };

    fetch(categoryApi, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getProducts();
            getCategories();
            document.getElementById("addCategoryModal").style.display = "none";
        })
        .catch(error => console.error('Ошибка добавления', error));
}

function deleteProduct(id) {
    fetch(`${productApi}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getProducts())
        .catch(error => console.error('Ошибка удаления', error));
}

function deleteCategory(id) {
    fetch(`${categoryApi}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getCategories())
        .catch(error => console.error('Ошибка удаления', error));
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'Продукт' : 'Продукта';

    document.getElementById('productCount').innerText = `${itemCount} ${name}`;
}

function _displayCategoryCount(itemCount) {
    const name = (itemCount === 1) ? 'Категория' : 'Категории';

    document.getElementById('categoryCount').innerText = `${itemCount} ${name}`;
}

function _displayProducts(data) {
    const tBody = $('#products')[0];
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Удалить';
        deleteButton.setAttribute('onclick', `deleteProduct(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.id));

        let td2 = tr.insertCell(1);
        let name = document.createTextNode(item.name);
        td2.appendChild(name);

        let td3 = tr.insertCell(2);
        td3.appendChild(document.createTextNode(item.description));

        let td4 = tr.insertCell(3);
        td4.appendChild(document.createTextNode(item.price));

        let td5 = tr.insertCell(4);
        let weight = document.createTextNode(item.weight);
        td5.appendChild(weight);

        let td6 = tr.insertCell(5);
        td6.appendChild(document.createTextNode(item.color));

        let td7 = tr.insertCell(6);
        td7.appendChild(document.createTextNode(item.productCategory?.name));

        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });

    products = data;
}
function _displayCategories(data) {
    const tBody = $('#categories')[0];
    tBody.innerHTML = '';

    _displayCategoryCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Удалить';
        deleteButton.setAttribute('onclick', `deleteCategory(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.id));

        let td2 = tr.insertCell(1);
        let name = document.createTextNode(item.name);
        td2.appendChild(name);

        let td3 = tr.insertCell(2);
        td3.appendChild(document.createTextNode(item.description));

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    categories = data;
    if (document.getElementById('productCategoryItems') == null) {
        var select = document.createElement("select");
        select.name = "productCategoryItems";
        select.id = "productCategoryItems"
        for (const category of data) {
            var option = document.createElement("option");
            option.value = category.id;
            option.text = category.name.charAt(0).toUpperCase() + category.name.slice(1);
            select.appendChild(option);
        }

        var label = document.createElement("label");
        label.innerHTML = "Категория: "
        label.htmlFor = "productCategoryItems";

        document.getElementById("categoryDropDownList").appendChild(label).appendChild(select);
    }
}