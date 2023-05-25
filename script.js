const objetos = [];
let currentEdit = -1


function modifyTable(id)
{
  if(currentEdit != -1) 
  {
    alert("Ya estas editando una tabla, guardala para poder editar otra")
    return;
  }
    objetos.forEach((objeto, index) => {
    if (objeto.id == id) {
      objeto.edited = true
      document.getElementById('nuevo-dia').value = objeto.dia;
      document.getElementById('nueva-hora').value = objeto.hora;
      document.getElementById('nuevo-lugar').value = objeto.lugar;
      document.getElementById('nuevo-territorio').value = objeto.territorio;
      document.getElementById('nuevo-conductor').value = objeto.conductor;
    
      currentEdit = objeto.id;

      addRowBtn.classList.add("hiddenRow")
      editRowBtn.classList.remove("hiddenRow")
    
    }
  });
  cargarTabla();
  window.scrollTo(0, document.body.scrollHeight);
}


function saveEdit()
{
  if(currentEdit == -1) return false;
  objetos.forEach(objeto => {
    if (objeto.id == currentEdit) {


      objeto.edited = false
      objeto.dia = document.getElementById('nuevo-dia').value;
      objeto.hora = document.getElementById('nueva-hora').value;
      objeto.lugar = document.getElementById('nuevo-lugar').value;
      objeto.territorio = document.getElementById('nuevo-territorio').value;
      objeto.conductor = document.getElementById('nuevo-conductor').value;


    }
  });

  currentEdit = -1

  document.getElementById('nuevo-dia').value = '';
  document.getElementById('nueva-hora').value = '';
  document.getElementById('nuevo-lugar').value = '';
  document.getElementById('nuevo-territorio').value = '';
  document.getElementById('nuevo-conductor').value = '';

  addRowBtn.classList.remove("hiddenRow")
  editRowBtn.classList.add("hiddenRow")

  cargarTabla()

  return true;
}


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

  let currid = 0;
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
      <td class="deleteTable"><button class="deleteBtn" onclick="borrarTabla(${objeto.id})"><i class="fa-solid fa-trash"></i></button><button class="editBtn" onclick="modifyTable(${objeto.id})"><i class="fa-solid fa-pen-to-square"></i></button></td>
    `;
    currid++;
    if(variant) row.classList.add("variant");
    if(objeto.edited) row.classList.add("hiddenRow");
    variant = !variant
    tablaBody.appendChild(row);
  });
}

function agregarObjeto() {

  if(saveEdit()) return;

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
    conductor: nuevoConductor,
    edited: false
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