// listado de productos
const listado = [
    { id: 1, producto: 'Fundas', precio: 8000 },
    { id: 2, producto: 'Cargadores', precio: 15000 },
    { id: 3, producto: 'Vidrios templados', precio: 7500 }
];

// Función para mostrar productos en la página
const mostrarProductos = () => {
    const contenedor = document.getElementById('listado');
    listado.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.innerHTML = `<span>${producto.producto} - $${producto.precio}</span>`;
        
        const button = document.createElement('button');
        button.textContent = 'Añadir al Carro';
        button.addEventListener('click', () => agregarAlCarro(producto.id));
        
        divProducto.appendChild(button);
        contenedor.appendChild(divProducto);
    });
};

// Array para almacenar los productos añadidos al carrito
let carro = [];

// Función para añadir productos al carro
const agregarAlCarro = (id) => {
    const producto = listado.find(item => item.id === id);
    if (producto) {
        carro.push(producto); // Añade producto al carrito
        actualizarCarro(); // Actualiza visualmente el carrito
        calcularTotal(); // Calcular y mostrar el total
    }
};

// Función para actualizar la sección del carrito
const actualizarCarro = () => {
    const contenedorCarro = document.getElementById('carro');
    contenedorCarro.innerHTML = '';  // Limpiar el contenido previo antes de actualizar

    // Mostrar productos en el carrito
    carro.forEach(item => {
        const divItem = document.createElement('div');
        divItem.innerHTML = `${item.producto} - $${item.precio}`;
        contenedorCarro.appendChild(divItem);
    });
};

// Función para calcular el total de la compra
const calcularTotal = () => {
    const total = carro.reduce((producto, item) => producto + item.precio, 0); // Sumar los productos agregados
    document.getElementById('total').innerText = total; // Mostrar el total
};

// Función para finalizar la compra
const finalizarCompra = () => {
    const nombre = document.getElementById('inputName').value;
    const telefono = document.getElementById('inputPhone').value;

    // Validación de campos
    const mensajeError = document.getElementById('mensajeError');
    if (!nombre || !telefono) {
        mensajeError.innerText = "Por favor, ingrese su nombre y su número de teléfono."; // Mostrar error
        return; // Detener la ejecución si los campos están vacíos
    }
    mensajeError.innerText = ""; // Limpiar el mensaje de error si los datos son correctos

    // Calcular el total final de la compra
    const total = carro.reduce((acc, item) => acc + item.precio, 0);

    // Crear el objeto compra con los datos del cliente y productos
    const compra = {
        nombre: nombre,
        telefono: telefono,
        total: total,
        productos: carro
    };

    // Guardar la compra en localStorage
    const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || [];
    comprasGuardadas.push(compra);
    localStorage.setItem('compras', JSON.stringify(comprasGuardadas));

    // Mostrar un mensaje de confirmación en la página
    const mensajeConfirmacion = document.getElementById('mensajeConfirmacion');
    mensajeConfirmacion.innerText = `Compra realizada. Nombre: ${nombre}, Total: $${total}. En breve nos comunicaremos al celular brindado.`;
    
    // Vaciar el carrito y actualizar el contenedor visual
    carro = [];
    document.getElementById('carro').innerHTML = '';
    document.getElementById('total').innerText = '0';

    // Mostrar en consola el detalle de la compra realizada
    console.log("Compra realizada: ", compra);
};

// Función para guardar en localStorage
const guardarlocal = (clave, valor) => { localStorage.setItem(clave, valor); };
guardarlocal('productos', JSON.stringify(listado));

// Mostrar productos al cargar la página
mostrarProductos();

// Añadir inputs al HTML
const body = document.body;

const input1 = document.createElement('input');
input1.type = 'text';
input1.placeholder = 'Ingrese su nombre';
input1.id = 'inputName';
body.appendChild(input1);

const input2 = document.createElement('input');
input2.type = 'phone';
input2.placeholder = 'Ingrese su número de celular';
input2.id = 'inputPhone';
body.appendChild(input2);

// Agregar el botón para finalizar la compra
const button = document.createElement('button');
button.textContent = 'Finalizar compra';
button.id = 'SubmitBuy';
body.appendChild(button);

// Elemento para mostrar mensajes de error
const mensajeError = document.createElement('p');
mensajeError.id = 'mensajeError';
mensajeError.style.color = 'red';
body.appendChild(mensajeError);

// Elemento para mostrar mensajes de confirmación
const mensajeConfirmacion = document.createElement('p');
mensajeConfirmacion.id = 'mensajeConfirmacion';
mensajeConfirmacion.style.color = 'green';
body.appendChild(mensajeConfirmacion);

// Añadir el evento al botón de finalizar compra
document.getElementById('SubmitBuy').addEventListener('click', finalizarCompra);








