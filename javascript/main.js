document.addEventListener('DOMContentLoaded', function() {
    // Función para cargar productos
    function cargarProductos() {
        const url = '../javascript/productos.json';  // Verifica la ruta de tu archivo JSON
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }
                return response.json();  // Convertir la respuesta a JSON
            })
            .then(data => {
                const productos = data.productos;
                const productosAMostrar = getProductosAMostrar(productos);
                mostrarProductos(productosAMostrar);  // Mostrar los productos en la página
            })
            .catch(error => {
                console.error(error);
            });
    }

    // Función para obtener la cantidad de productos a mostrar, dependiendo de la página
    function getCantidadDeProductosParaMostrar() {
        if (window.location.pathname.includes('index.html')) {
            return 3;  // Mostrar solo 3 productos
        }
        return Infinity;  // Muestra todos los productos (sin límite)
    }

    // Función para limitar los productos que se mostrarán en la página
    function getProductosAMostrar(productos) {
        const cantidad = getCantidadDeProductosParaMostrar();
        return productos.slice(0, cantidad);  // Limita la cantidad de productos a mostrar
    }

    // Función para filtrar los productos por precio
    function filtrarProductosPorPrecio(productos) {
        const minPrecio = parseFloat(document.getElementById('minPrecio').value) || 0;
        const maxPrecio = parseFloat(document.getElementById('maxPrecio').value) || Infinity;

        // Filtramos los productos que estén dentro del rango de precio
        return productos.filter(producto => {
            return producto.precio >= minPrecio && producto.precio <= maxPrecio;
        });
    }

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        const contenedor = document.querySelector('.contenedor-anuncios');
        contenedor.innerHTML = '';  // Limpiar contenido previo

        productos.forEach(producto => {
            const anuncioHTML = `
                <div class="anuncio">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="contenido-anuncio">
                        <h3>${producto.nombre}</h3>
                        <p class="precio">$${producto.precio}</p>
                        <ul class="iconos-caracteristicas">
                            <li><img src="/assets/img/jugadores.svg" width="20px" alt=""><p>${producto.jugadores}</p></li>
                            <li><img src="/assets/img/icono_micro.svg" width="30px" alt=""><p>${producto.microfono}</p></li>
                            <li><img src="/assets/img/control.svg" width="30px" alt=""><p>${producto.controles}</p></li>
                        </ul>
                        <a href="${producto.url}" class="boton boton-amarillo d-block">Ver Juego</a>
                    </div>
                </div>
            `;

            contenedor.innerHTML += anuncioHTML;
        });
    }

    // Función para aplicar el filtro de precio
    function aplicarFiltro() {
        const url = '../javascript/productos.json';  // Verifica la ruta de tu archivo JSON
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const productos = data.productos;
                const productosFiltrados = filtrarProductosPorPrecio(productos);
                mostrarProductos(productosFiltrados);
            })
            .catch(error => console.error('Error al cargar los productos para filtrar:', error));
    }

    // Asignamos el evento de filtrado al botón "Filtrar"
    const botonFiltrar = document.getElementById('filtrar');
    if (botonFiltrar) {
        botonFiltrar.addEventListener('click', aplicarFiltro);
    }

    // Cargar los productos inicialmente
    cargarProductos();
});
