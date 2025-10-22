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
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

      // Verificar si ya comentó en las últimas 24 horas
      const hace24hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const ultimoComentario = await client.query(
        'SELECT creado_en FROM comentarios WHERE dispositivo_id = $1 AND creado_en > $2 ORDER BY creado_en DESC LIMIT 1',
        [dispositivo_id, hace24hrs]
      );

      if (ultimoComentario.rows.length > 0) {
        return {
          statusCode: 429,
          headers,
          body: JSON.stringify({ error: 'Solo puedes comentar una vez cada 24 horas' })
        };
      }

      const result = await client.query(
        'INSERT INTO comentarios (dispositivo_id, nombre, icono, mensaje, aprobado) VALUES ($1, $2, $3, $4, false) RETURNING id',
        [dispositivo_id, nombre, icono, mensaje]
      );

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ 
          message: 'Comentario enviado para aprobación',
          id: result.rows[0].id 
        })
      };
    }

    // PUT - editar comentario propio (solo el dueño)
    if (method === 'PUT') {
      const body = JSON.parse(event.body);
      const { id, dispositivo_id, mensaje } = body;

      if (!id || !dispositivo_id || !mensaje) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Faltan campos requeridos' })
        };
      }

      // Verificar que el comentario pertenece al dispositivo
      const comentario = await client.query(
        'SELECT dispositivo_id FROM comentarios WHERE id = $1',
        [id]
      );

      if (comentario.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Comentario no encontrado' })
        };
      }

      if (comentario.rows[0].dispositivo_id !== dispositivo_id) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'No puedes editar comentarios de otros' })
        };
      }

      await client.query(
        'UPDATE comentarios SET mensaje = $1 WHERE id = $2',
        [mensaje, id]
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Comentario actualizado' })
      };
    }

    // DELETE - borrar comentario propio (solo el dueño)
    if (method === 'DELETE') {
      const body = JSON.parse(event.body);
      const { id, dispositivo_id } = body;

      if (!id || !dispositivo_id) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Faltan campos requeridos' })
        };
      }

      // Verificar que el comentario pertenece al dispositivo
      const comentario = await client.query(
        'SELECT dispositivo_id FROM comentarios WHERE id = $1',
        [id]
      );

      if (comentario.rows.length === 0) {
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({ error: 'Comentario no encontrado' })
        };
      }

      if (comentario.rows[0].dispositivo_id !== dispositivo_id) {
        return {
          statusCode: 403,
          headers,
          body: JSON.stringify({ error: 'No puedes borrar comentarios de otros' })
        };
      }

      await client.query(
        'DELETE FROM comentarios WHERE id = $1',
        [id]
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Comentario eliminado' })
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
