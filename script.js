let currid = 0;
const objetos = [];

function borrarTabla(id) {
  // Buscar y eliminar el objeto con el ID especificado
  objetos.forEach((objeto, index) => {
    if (objeto.id == id) {
      objetos.splice(index, 1);
    }
  });
  cargarTabla();
}

function cargarTabla() {
  const tablaBody = document.getElementById('tabla-body');
  tablaBody.innerHTML = '';

  let variant = true

  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  objetos.forEach(objeto => {
    // Filtrar objetos dentro del rango de fechas
    const row = document.createElement('tr');
    objeto.id = currid;
    row.innerHTML = `
      <td>${objeto.dia}</td>
      <td>${objeto.hora}</td>
      <td>${objeto.lugar}</td>
      <td>${objeto.territorio}</td>
      <td>${objeto.conductor}</td>
      <td class="deleteTable"><button class="deleteBtn" onclick="borrarTabla(${objeto.id})"><i class="fa-solid fa-trash"></i></button></td>
    `;
    currid++;
    if(variant) row.classList.add("variant");
    variant = !variant
    tablaBody.appendChild(row);
  });
}

function agregarObjeto() {
  const nuevoDia = document.getElementById('nuevo-dia').value;
  const nuevaHora = document.getElementById('nueva-hora').value;
  const nuevoLugar = document.getElementById('nuevo-lugar').value;
  const nuevoTerritorio = document.getElementById('nuevo-territorio').value;
  const nuevoConductor = document.getElementById('nuevo-conductor').value;

  const nuevoObjeto = {
    dia: nuevoDia,
    hora: nuevaHora,
    lugar: nuevoLugar,
    territorio: nuevoTerritorio,
    conductor: nuevoConductor
  };

  objetos.push(nuevoObjeto);
  cargarTabla();
  // Limpiar los campos de entrada
  document.getElementById('nuevo-dia').value = '';
  document.getElementById('nueva-hora').value = '';
  document.getElementById('nuevo-lugar').value = '';
  document.getElementById('nuevo-territorio').value = '';
  document.getElementById('nuevo-conductor').value = '';
}

function check()
{
  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  
  if(desde === '' || hasta === '')
  {
      alert("Asegurate de introducir las fechas de forma correcta. Descarga Cancelada")
      return false
  }
  else if (objetos.length == 0)
  {
    alert("¡No hay ningun grupo en la lista!. Descarga Cancelada")
    return false
  }
  
  return true;

}



function capturarTabla() {

  if(!check()) return;
  const desde = document.getElementById('desde').value;
  const hasta = document.getElementById('hasta').value;

  const content = document.getElementById("contenido");
  content.classList.add("capture");

  // Mostrar las fechas seleccionadas en el elemento p
  pDesde.innerHTML = desde;
  pHasta.innerHTML = hasta;

  setTimeout(function() {
    html2canvas(content)
      .then(function(canvas) {
        canvas.toBlob(function(blob) {
          saveAs(blob, `Grupos(${desde}/${hasta}).png`);
        });
      });
    content.classList.remove("capture");
    pDesde.innerHTML = "";
    pHasta.innerHTML = "";
  }, 1000);
}
