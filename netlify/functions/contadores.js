// Almacenamiento en memoria (se reinicia con cada deploy, pero es simple para empezar)
let contadores = {
  likes: 0,
  visitas: 0,
  ultimaActualizacion: new Date().toISOString()
};

// En producción usarías una DB real
// Por ahora, esto se reinicia cada vez que Netlify redeploya la función

exports.handler = async (event) => {
  const method = event.httpMethod;
  const path = event.path;

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Preflight CORS
  if (method === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // GET /contadores - obtener contadores
    if (method === 'GET' && path === '/.netlify/functions/contadores') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contadores)
      };
    }

    // POST /contadores - agregar like
    if (method === 'POST' && path === '/.netlify/functions/contadores') {
      const body = JSON.parse(event.body);
      
      if (body.action === 'like') {
        contadores.likes += 1;
        contadores.ultimaActualizacion = new Date().toISOString();
      }
      
      if (body.action === 'visita') {
        contadores.visitas += 1;
        contadores.ultimaActualizacion = new Date().toISOString();
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contadores)
      };
    }

    // PUT /contadores - actualizar contadores (si alguien quiere resetear)
    if (method === 'PUT' && path === '/.netlify/functions/contadores') {
      const body = JSON.parse(event.body);
      
      if (body.likes !== undefined) {
        contadores.likes = body.likes;
      }
      if (body.visitas !== undefined) {
        contadores.visitas = body.visitas;
      }
      
      contadores.ultimaActualizacion = new Date().toISOString();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contadores)
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Ruta no encontrada' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
