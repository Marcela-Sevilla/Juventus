const formArticulos = document.getElementById('formArticulos');
const articulo = document.getElementById('articulo');
const descripcion = document.getElementById('descripcion');
const cantidad = document.getElementById('cantidad');
const precioUni = document.getElementById('precioUni');
const tbodyAnadirArticulos = document.getElementById('tbodyAnadirArticulos');
const formObservacion = document.getElementById('formObservacion');
const observacion = document.getElementById('observacion');
const gasto = document.getElementById('gasto');
const formDatoClientes = document.getElementById('formDatoClientes');
const nombreCliente = document.getElementById('nombreCliente');
const documento = document.getElementById('documento');
const numeroContacto = document.getElementById('numeroContacto');
const correo = document.getElementById('correo');
const cardCrearFactura = document.getElementById('cardCrearFactura');
const cardFactura = document.getElementById('cardFactura');
const tbodyFactura = document.getElementById('tbodyFactura');

let arregloArticulos = [];

let o = 0;
let a = 0;
let valorInicial = 0;

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function eliminarFila(){
    let rowEliminar = Array.prototype.slice.call(document.getElementsByClassName("eliminar"), 0);
  
    for(let element of rowEliminar){
        element.remove();
    } 
}

const sumarTotalFactura = (valor)=>{

    let suma = valorInicial + valor;
    valorInicial = suma;

    document.getElementById('valorTotal').textContent = `$${new Intl.NumberFormat().format(valorInicial)}`;
};

function eliminar(id, valor){
    let row = document.getElementById(id);
    tbodyAnadirArticulos.removeChild(row);

    let restar = valorInicial - valor;
    valorInicial = restar;

    document.getElementById('valorTotal').textContent = `$${new Intl.NumberFormat().format(valorInicial)}`;
}

function llenarTabla(id){
    if(arregloArticulos[id].id == a++){
        let fila = document.createElement('tr');
        fila.setAttribute('id', arregloArticulos[id].id);
        fila.innerHTML = `<td>${capitalize(arregloArticulos[id].articulo)}</td>
        <td>${capitalize(arregloArticulos[id].descripcion)}</td>
        <td>${arregloArticulos[id].cantidad}</td>
        <td>$${new Intl.NumberFormat().format(arregloArticulos[id].precioUni)}</td>
        <td>$${new Intl.NumberFormat().format(arregloArticulos[id].precioTotal)}</td>
        <td class="text-center eliminar" id="${arregloArticulos[id].id}">
            <button class="btn btn-danger shadow-sm" onclick="eliminar(${arregloArticulos[id].id},${arregloArticulos[id].precioTotal})"><i class="bi bi-trash3-fill"></i></button>
        </td>`;
        
        tbodyAnadirArticulos.appendChild(fila);
        sumarTotalFactura(arregloArticulos[id].precioTotal);

    }
}

formArticulos.onsubmit = (e)=>{
    e.preventDefault();

    let id = o++;
    const objetoArticulo = {
        id:id,
        articulo: articulo.value,
        descripcion: descripcion.value,
        cantidad: cantidad.value,
        precioUni: precioUni.value,
        precioTotal: cantidad.value*precioUni.value
    }
    
    arregloArticulos.push(objetoArticulo);
    llenarTabla(id);

    formArticulos.reset();
}

formDatoClientes.onsubmit = (e)=>{
    e.preventDefault();

    const capturarfecha = new Date();
    let mesActual = new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date());
    let fecha = `${capturarfecha.getDate()} de ${capitalize(mesActual)} del ${capturarfecha.getFullYear()}`;

    const objetoCliente = {
        cliente: capitalize(nombreCliente.value),
        documento: documento.value,
        celular: numeroContacto.value,
        correo: correo.value
    }

    document.getElementById('tdCliente').textContent = capitalize(objetoCliente.cliente);
    document.getElementById('tdNit').textContent = objetoCliente.documento;
    document.getElementById('tdCelular').textContent = objetoCliente.celular;
    document.getElementById('tdCorreo').textContent = objetoCliente.correo;
    document.getElementById('tdFecha').textContent = fecha;

    eliminarFila();

    let elementosFactura = tbodyAnadirArticulos.innerHTML;
    tbodyFactura.innerHTML = elementosFactura;

    document.getElementById('observacionFactura').innerHTML = document.getElementById('tdObservacion').innerHTML;
    document.getElementById('totalFactura').innerHTML = document.getElementById('valorTotal').innerHTML;
    
    cardFactura.classList.remove('d-none');
    cardCrearFactura.classList.add('d-none');
    formDatoClientes.reset();
}

formObservacion.onsubmit = (e)=>{
    e.preventDefault();

    sumarTotalFactura(parseInt(gasto.value));

    let stringObservacion = `${observacion.value } $${new Intl.NumberFormat().format(gasto.value)}`;
    document.getElementById('tdObservacion').textContent = capitalize(stringObservacion);

    formObservacion.reset();
}