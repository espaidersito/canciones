
const docenteLogueado = localStorage.getItem('docente');

if (!docenteLogueado) {
  alert('Acceso restringido. Iniciá sesión primero.');
  window.location.href = 'login_docentes.html';
}


const nombreDocenteDesktop = document.getElementById('nombreDocente');
const nombreDocenteMobile = document.getElementById('nombreDocenteOff');

if (nombreDocenteDesktop) {
  nombreDocenteDesktop.textContent = docenteLogueado;
}

if (nombreDocenteMobile) {
  nombreDocenteMobile.textContent = docenteLogueado;
}


function cerrarSesionDocente() {
  localStorage.removeItem('docente');
  localStorage.removeItem('registro_id');
  window.location.href = 'login_docentes.html';
}

const botonCerrarDesktop = document.getElementById('cerrarSesion');
const botonCerrarMobile = document.getElementById('cerrarSesionOff');

if (botonCerrarDesktop) {
  botonCerrarDesktop.addEventListener('click', cerrarSesionDocente);
}

if (botonCerrarMobile) {
  botonCerrarMobile.addEventListener('click', cerrarSesionDocente);
}


async function cargarPuntos() {
  try {
    const url = 'https://juegosinfantiles.tecnica4berazategui.edu.ar/essencial/excepcional/obtener_puntos.php';
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error('Error al obtener los datos');
    }

    const datos = await respuesta.json();

    cargarTablaDesktop(datos);
    cargarVistaMobile(datos);

  } catch (error) {
    console.error('Error:', error);
  }
}


function cargarTablaDesktop(datos) {
  const cuerpoTabla = document.querySelector('#tablaPuntos tbody');
  if (!cuerpoTabla) return;

  cuerpoTabla.textContent = '';

  if (!Array.isArray(datos) || datos.length === 0) {
    const fila = document.createElement('tr');
    const celda = document.createElement('td');

    celda.colSpan = 4;
    celda.textContent = 'No hay registros aún.';
    fila.appendChild(celda);
    cuerpoTabla.appendChild(fila);
    return;
  }

  datos.forEach(registro => {
    const fila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = registro.nombre;

    const celdaPuntos = document.createElement('td');
    celdaPuntos.id = `puntos-${registro.id}`;
    celdaPuntos.textContent = registro.puntos;

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = registro.ultima_actualizacion;

    const celdaAcciones = document.createElement('td');

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntos);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaAcciones);

    cuerpoTabla.appendChild(fila);
  });
}


function cargarVistaMobile(datos) {
  const contenedorMobile = document.getElementById('tablaPuntosMobile');
  if (!contenedorMobile) return;

  contenedorMobile.textContent = '';

  if (!Array.isArray(datos) || datos.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.className = 'text-center text-muted';
    mensaje.textContent = 'No hay registros aún.';
    contenedorMobile.appendChild(mensaje);
    return;
  }

  datos.forEach(registro => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card mb-2 shadow-sm';

    const cuerpoTarjeta = document.createElement('div');
    cuerpoTarjeta.className = 'card-body';

    const titulo = document.createElement('h5');
    titulo.className = 'card-title mb-1';
    titulo.textContent = registro.nombre;

    const textoPuntos = document.createElement('p');
    textoPuntos.className = 'mb-1';

    const etiquetaPuntos = document.createElement('strong');
    etiquetaPuntos.textContent = 'Puntos: ';

    const valorPuntos = document.createElement('span');
    valorPuntos.id = `mobile-puntos-${registro.id}`;
    valorPuntos.textContent = registro.puntos;

    textoPuntos.appendChild(etiquetaPuntos);
    textoPuntos.appendChild(valorPuntos);

    const fecha = document.createElement('p');
    fecha.className = 'mb-2 text-muted small';
    fecha.textContent = `Última: ${registro.ultima_actualizacion}`;

    cuerpoTarjeta.appendChild(titulo);
    cuerpoTarjeta.appendChild(textoPuntos);
    cuerpoTarjeta.appendChild(fecha);

    tarjeta.appendChild(cuerpoTarjeta);
    contenedorMobile.appendChild(tarjeta);
  });
}


const modalVideoBootstrap = new bootstrap.Modal(document.getElementById('videoModal'));
const videoModal = document.getElementById('modalVideo');

document.querySelectorAll('.play-btn').forEach(boton => {
  boton.addEventListener('click', () => {
    const srcVideo = boton.dataset.src;
    if (!srcVideo) return;

    videoModal.src = srcVideo;
    videoModal.play().catch(() => {});
    modalVideoBootstrap.show();
  });
});

document.getElementById('videoModal').addEventListener('hidden.bs.modal', () => {
  videoModal.pause();
  videoModal.src = '';
});


document.querySelectorAll('.video-card video').forEach(video => {
  video.addEventListener('click', () => {
    video.paused ? video.play() : video.pause();
  });
});
