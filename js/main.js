class Alumnos{
    static contadorId=1;
    constructor(nombre, apellido, edad, sexo, anioLectivo,bachiller,id =null){
        if (id !== null) {
          this.id = id;
        } else {
          this.id = Alumnos.contadorId++;
        }
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.sexo = sexo;
        this.anioLectivo = anioLectivo;
        this.bachiller = bachiller;
    }
    mostrarInfo(){
        return `ID: ${this.id}, Nombre: ${this.nombre}, Apellido: ${this.apellido}, Edad: ${this.edad}, Sexo: ${this.sexo}, Año Lectivo: ${this.anioLectivo}, Bachiller: ${this.bachiller}`;    
    }
}

const alumnos = [];

const form = document.getElementById("formAlumno");
form.addEventListener("submit", registrarAlumno);

function registrarAlumno(evento){
    evento.preventDefault();

    
    const errorNombre = document.getElementById("errorNombre");
    if (errorNombre) errorNombre.remove(); 

    const errorApellido = document.getElementById("errorApellido");
    if (errorApellido) errorApellido.remove();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const sexo = document.getElementById("sexo").value;
    const anioLectivo = document.getElementById("anioLectivo").value;
    const bachiller = document.getElementById("bachiller").value;
    
    let edadNum = parseInt(edad);
    let anioLectivoNum = parseInt(anioLectivo);
   

    if (isNaN(edadNum) ) {
        alertaError("La edad debe ser un numero");
        return;
    }
    if (edadNum < 0 ) {
         alertaError("La edad no puede ser negativa");
        return;
    }
    
    if (isNaN(anioLectivoNum) ) {
        alertaError("El año lectivo debe ser un numero");
        return;
    }
    if (anioLectivoNum < 0 ) {
        alertaError("El año lectivo no puede ser negativo");
        return;
    }

   
   if (!nombre ){
        alertaWarning("El nombre no puede estar vacio");
        return;
   }
   
   for (let i =0 ; i<nombre.length; i++){
        const letra = nombre[i];
     
      if( !(letra>='a' && letra<='z') && !(letra>='A' && letra<='Z') && letra !== ' '){
        alertaWarning("El nombre solo puede contener letras y espacios");
        return;
      }     
  

   }


   if (!apellido ){
       alertaWarning("El apellido no puede estar vacio");
       return;
   }
    for (let i =0 ; i<apellido.length; i++){
        const letra = apellido[i];
     
      if( !(letra>='a' && letra<='z') && !(letra>='A' && letra<='Z') && letra !== ' '){
        alertaWarning("El apellido solo puede contener letras y espacios");
        return;
      }
    
    }

     if (alumnos.some(alumno => alumno.nombre === nombre && alumno.apellido === apellido)) {
       
        alertaWarning("Ya existe un alumno con ese nombre y apellido");
        return;
    }
    
    const nuevoAlumno = new Alumnos(nombre, apellido, edad, sexo, anioLectivoNum,bachiller);

    alumnos.push(nuevoAlumno);
    
    
    alertaExito("Alumno agregado correctamente");
  
    form.reset();
}

const btnLimpiar = document.getElementById("btnLimpiar");
btnLimpiar.addEventListener("click", limpiarLista);

function limpiarLista() {
   alertaConfirmacion("Se eliminaran todos los alumnos", () => {
        alumnos.length = 0; 
        localStorage.removeItem("alumnos");
        mostrarLista();
        alertaExito("Lista eliminada");

   });

}


const btnVerLista = document.getElementById("btnVerLista");
btnVerLista.addEventListener("click", mostrarLista);

function mostrarLista() {
  const contenedor = document.getElementById("listaAlumnos");
  contenedor.innerHTML = "";

  if (alumnos.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-warning">
        No hay alumnos cargados.
      </div>
    `;
    return;
  }

  alumnos.forEach(alumno => {
    const card = document.createElement("div");
    card.className = "card mb-3 shadow-sm";

    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h5 class="card-title mb-1">${alumno.nombre} ${alumno.apellido}</h5>
            <small class="text-muted">ID: ${alumno.id}</small>
          </div>
          <span class="badge text-bg-primary">${alumno.anioLectivo}</span>
        </div>

        <div class="mt-3">
          <p class="card-text mb-1"><strong>Edad:</strong> ${alumno.edad}</p>
          <p class="card-text mb-1"><strong>Sexo:</strong> ${alumno.sexo}</p>
          <p class="card-text mb-0"><strong>Bachiller:</strong> ${alumno.bachiller ?? "-"}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(card);
  });
}


const btnGuardar = document.getElementById("btnGuardar");
btnGuardar.addEventListener("click", guardarEnLocalStorage);

function guardarEnLocalStorage() {
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    alertaExito("Alumnos guardados correctamente");
  
}

const btnCargar = document.getElementById("btnCargar");
btnCargar.addEventListener("click", cargarDesdeLocalStorage);

function cargarDesdeLocalStorage() {

  const alumnosGuardados = localStorage.getItem("alumnos");

  if (!alumnosGuardados) {
    alertaError("No hay alumnos guardados");
    return;
  }

  alumnos.length = 0; 

  const alumnosArray = JSON.parse(alumnosGuardados);

  alumnosArray.forEach(alumnoData => {
    const alumno = new Alumnos(
      alumnoData.nombre,
      alumnoData.apellido,
      alumnoData.edad,
      alumnoData.sexo,
      alumnoData.anioLectivo,
      alumnoData.bachiller,
      alumnoData.id
    );
    alumnos.push(alumno);
  });
  
  const maxId = alumnos.length > 0
    ? Math.max(...alumnos.map(alumno => alumno.id))
    : 0;

  Alumnos.contadorId = maxId + 1;
  alertaExito(`Se cargaron ${alumnos.length} alumnos`);;

 mostrarLista()
}
