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

  // CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

    // GET - obtener comentarios aprobados
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

    // POST - crear comentario (aprobado = false por defecto)
    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const { dispositivo_id, nombre, icono, mensaje } = body;

      if (!dispositivo_id || !nombre || !icono || !mensaje) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Faltan campos requeridos' })
        };
      }

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
