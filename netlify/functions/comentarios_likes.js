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
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

    // GET - obtener likes de un comentario y verificar si el usuario ya dio like
    if (method === 'GET') {
      const comentario_id = event.queryStringParameters?.comentario_id;
      const dispositivo_id = event.queryStringParameters?.dispositivo_id;

      if (!comentario_id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Falta comentario_id' })
        };
      }

      // Obtener total de likes
      const likesResult = await client.query(
        'SELECT likes FROM comentarios WHERE id = $1',
        [comentario_id]
      );

      if (likesResult.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Comentario no encontrado' })
        };
      }

      const totalLikes = likesResult.rows[0].likes || 0;

      // Verificar si este dispositivo ya dio like
      let yaLike = false;
      if (dispositivo_id) {
        const likeExistente = await client.query(
          'SELECT id FROM comentarios_likes WHERE comentario_id = $1 AND dispositivo_id = $2',
          [comentario_id, dispositivo_id]
        );
        yaLike = likeExistente.rows.length > 0;
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          comentario_id: parseInt(comentario_id),
          likes: totalLikes,
          yaLike: yaLike
        })
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
