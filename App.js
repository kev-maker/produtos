class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        // Creando un nuevo elemento 
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Product</strong>: ${product.name}  
                <strong>Price</strong>: ${product.price}   
                <strong>Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
    `;
    productList.appendChild(element);

    }
    // Limpiando el formulario
    resetForm() {
        document.getElementById('product-form').reset();
    }
    // Eliminando producto 
    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto Eliminado Correctamente', 'danger');
        }
    }
    // Alerta informativa
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Show in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        // TIMER
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);
        // UI INTERATUANDO CON PRODUCT
        const ui = new UI();
        // Validacion de Datos
        if(name === '' || price === '' || year === '') {
           return ui.showMessage('Completa los campos', 'info')
        }
        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Producto Agregado Correctamente', 'success');

        e.preventDefault(); //To Cancel the website reload
    });
    // Botton de Eliminar
document.getElementById('product-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
});