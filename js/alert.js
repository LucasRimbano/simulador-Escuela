function alertaExito(texto) {
  Swal.fire({
    icon: "success",
    title: texto,
    timer: 1500,
    showConfirmButton: false
  });
}

function alertaError(texto) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: texto
  });
}

function alertaWarning(texto) {
  Swal.fire({
    icon: "warning",
    title: "Atención",
    text: texto
  });
}

function alertaConfirmacion(texto, callback) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: texto,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}