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

    // GET - obtener contadores
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

    // POST - incrementar contadores
    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const { action } = body; // action: 'like' o 'visita'

      if (action === 'like' || action === 'visita') {
        await client.query(
          'UPDATE contadores SET cantidad = cantidad + 1, actualizado_en = NOW() WHERE tipo = $1',
          [action === 'like' ? 'likes' : 'visitas']
        );

        // Obtener nuevos valores
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
