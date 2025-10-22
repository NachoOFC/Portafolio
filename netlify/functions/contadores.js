// Usar pg para conectar a Neon (PostgreSQL)
const { Client } = require('pg');

const getDatabaseClient = () => {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
};

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

  let client;

  try {
    client = getDatabaseClient();
    await client.connect();

    // ============ CONTADORES ============

    // GET /contadores - obtener contadores
    if (method === 'GET') {
      const result = await client.query(
        'SELECT tipo, cantidad FROM contadores ORDER BY tipo'
      );

      const contadores = {};
      result.rows.forEach(row => {
        contadores[row.tipo] = row.cantidad;
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          likes: contadores.likes || 0,
          visitas: contadores.visitas || 0
        })
      };
    }

    // POST - incrementar contadores O crear comentario
    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const { action, dispositivo_id, nombre, icono, mensaje } = body;

      // Incrementar contadores
      if (action === 'like' || action === 'visita') {
        await client.query(
          'UPDATE contadores SET cantidad = cantidad + 1, actualizado_en = NOW() WHERE tipo = $1',
          [action === 'like' ? 'likes' : 'visitas']
        );

        const result = await client.query(
          'SELECT tipo, cantidad FROM contadores ORDER BY tipo'
        );

        const contadores = {};
        result.rows.forEach(row => {
          contadores[row.tipo] = row.cantidad;
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            likes: contadores.likes || 0,
            visitas: contadores.visitas || 0
          })
        };
      }

      // Crear comentario
      if (dispositivo_id && nombre && icono && mensaje) {
        await client.query(
          'INSERT INTO comentarios (dispositivo_id, nombre, icono, mensaje, aprobado) VALUES ($1, $2, $3, $4, false)',
          [dispositivo_id, nombre, icono, mensaje]
        );

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({ message: 'Comentario enviado para aprobación' })
        };
      }
    }

    // GET comentarios aprobados
    if (method === 'GET') {
      const result = await client.query(
        'SELECT id, nombre, icono, mensaje, creado_en FROM comentarios WHERE aprobado = true ORDER BY creado_en DESC'
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result.rows)
      };
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Acción no válida' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  } finally {
    if (client) {
      await client.end();
    }
  }
};
