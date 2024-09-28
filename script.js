//Agrego con JS a el HTML los input para el nombre y el numero de celular


localStorage.clear();
const body = document.body;

const input1 = document.createElement('input')

input1.type = 'text';
input1.placeholder = 'Ingrese su nombre';
input1.id = 'inputName';

body.appendChild(input1);

const input2 = document.createElement('input')

input2.type = 'phone';
input2.placeholder = 'ingrese su numero de celular';
input2.id = 'inputPhone';

body.appendChild(input2);


//agrego al HTML el boton de finalizar la compra para que cargue los datos
const button = document.createElement('button');
button.textContent = 'Finalizar compra';
button.id = 'SubmitBuy';
body.appendChild(button);

// Definición del listado de productos
const listado = [
    { id: 1, producto: 'Fundas', precio: 8000 },
    { id: 2, producto: 'Cargadores', precio: 15000 },
    { id: 3, producto: 'Vidrios templados', precio: 7500 }
];

// Función para mostrar productos en la página
const mostrarProductos = () => {
    const contenedor = document.getElementById('listado');
    listado.forEach(producto => {
        const divProducto = document.createElement('div'); // Creo un elemento div para cada producto que añado al carro
        divProducto.innerHTML = `
            <span>${producto.producto} - $${producto.precio}</span>
            <button onclick="agregarAlCarro(${producto.id})">Añadir al Carro</button>
        `;
        contenedor.appendChild(divProducto); // Se agrega el div al contenedor
    });
};

// Mostrar productos al cargar la página
mostrarProductos();

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


    // Mostrar productos en el carrito
    carro.forEach(item => {
        const divItem = document.createElement('div');
        divItem.innerHTML = `${item.producto} - $${item.precio}`;
        contenedorCarro.appendChild(divItem); // Agregar el div al carrito en html
    });
};

// Función para calcular el total de la compra
const calcularTotal = () => {
    const total = carro.reduce((producto, item) => producto + item.precio, 0); // Sumar los productos agregados
    document.getElementById('total').innerText = total; // Mustrar el total
};

// Manejo del evento para finalizar la compra
const finalizarCompra = () => {
    const nombre = document.getElementById('inputName').value;
    const telefono = document.getElementById('inputPhone').value;


    const total = carro.reduce((acc, item) => acc + item.precio, 0); // Calcular el total final

    // Crear un objeto de compra
    const compra = {
        nombre: nombre,
        telefono: telefono,
        total: total,
        productos: carro
    };

     // Guardar en localStorage
     const comprasGuardadas = JSON.parse(localStorage.getItem('compras')) || []; // Obtener las compras guardadas
     comprasGuardadas.push(compra); // Agregar la nueva compra
     localStorage.setItem('compras', JSON.stringify(comprasGuardadas)); // Guardar de nuevo
 

    // Mostrar mensaje de confirmación
    const mensaje = `Compra realizada, en breve nos comunicaremos al celular brindado.\nNombre: ${nombre}\nTotal: $${total}`;
    document.getElementById('mensajeConfirmacion').innerText = mensaje;
};

// Añadir el evento al botón de finalizar compra
document.getElementById('SubmitBuy').addEventListener('click', finalizarCompra);



// Función para guardar en localStorage
const guardarlocal = (clave, valor) => { localStorage.setItem(clave, valor); };
guardarlocal('productos', JSON.stringify(listado));























