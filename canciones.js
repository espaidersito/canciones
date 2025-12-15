
const docenteLogueado = localStorage.getItem('docente');

if (!docenteLogueado) {
  alert('Acceso restringido. Iniciá sesión primero.');
  window.location.href = 'login_docentes.html';
} else {
  const nombreDocenteDesktop = document.getElementById('nombreDocente');
  const nombreDocenteMobile = document.getElementById('nombreDocenteOff');

  if (nombreDocenteDesktop) nombreDocenteDesktop.textContent = docenteLogueado;
  if (nombreDocenteMobile) nombreDocenteMobile.textContent = docenteLogueado;
}


function cerrarSesionDocente() {
  localStorage.removeItem('docente');
  localStorage.removeItem('registro_id');
  window.location.href = 'login_docentes.html';
}

const botonCerrarDesktop = document.getElementById('cerrarSesion');
const botonCerrarMobile = document.getElementById('cerrarSesionOff');

if (botonCerrarDesktop) botonCerrarDesktop.addEventListener('click', cerrarSesionDocente);
if (botonCerrarMobile) botonCerrarMobile.addEventListener('click', cerrarSesionDocente);


async function cargarPuntosAlumnos() {
  try {
    const url = 'https://juegosinfantiles.tecnica4berazategui.edu.ar/essencial/excepcional/obtener_puntos.php';
    const respuestaServidor = await fetch(url);

    if (!respuestaServidor.ok) {
      throw new Error('Error al obtener los datos');
    }

    const listaAlumnos = await respuestaServidor.json();

    cargarTablaDesktop(listaAlumnos);
    cargarTarjetasMobile(listaAlumnos);

  } catch (error) {
    console.error('Error:', error);
  }
}


function cargarTablaDesktop(alumnos) {
  const cuerpoTabla = document.querySelector('#tablaPuntos tbody');
  if (!cuerpoTabla) return;

  cuerpoTabla.replaceChildren();

  if (!Array.isArray(alumnos) || alumnos.length === 0) {
    const fila = document.createElement('tr');
    const celda = document.createElement('td');
    celda.colSpan = 4;
    celda.textContent = 'No hay registros aún';
    fila.append(celda);
    cuerpoTabla.append(fila);
    return;
  }

  alumnos.forEach(alumno => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = alumno.nombre;

    const celdaPuntos = document.createElement('td');
    celdaPuntos.textContent = alumno.puntos;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = alumno.ultima_actualizacion;

    const celdaAcciones = document.createElement('td');

    fila.append(
      celdaNombre,
      celdaPuntos,
      celdaFecha,
      celdaAcciones
    );

    cuerpoTabla.append(fila);
  });
}


function cargarTarjetasMobile(alumnos) {
  const contenedorMobile = document.getElementById('tablaPuntosMobile');
  if (!contenedorMobile) return;

  contenedorMobile.replaceChildren();

  if (!Array.isArray(alumnos) || alumnos.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.className = 'text-center text-muted';
    mensaje.textContent = 'No hay registros aún';
    contenedorMobile.append(mensaje);
    return;
  }

  alumnos.forEach(alumno => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card mb-2 shadow-sm';

    const cuerpoTarjeta = document.createElement('div');
    cuerpoTarjeta.className = 'card-body';

    const nombre = document.createElement('h5');
    nombre.textContent = alumno.nombre;

    const puntos = document.createElement('p');
    puntos.textContent = `Puntos: ${alumno.puntos}`;

    const fecha = document.createElement('p');
    fecha.className = 'text-muted small';
    fecha.textContent = `Última: ${alumno.ultima_actualizacion}`;

    cuerpoTarjeta.append(nombre, puntos, fecha);
    tarjeta.append(cuerpoTarjeta);
    contenedorMobile.append(tarjeta);
  });
}


document.addEventListener('DOMContentLoaded', () => {
  cargarPuntosAlumnos();
  setInterval(cargarPuntosAlumnos, 10000);
});
