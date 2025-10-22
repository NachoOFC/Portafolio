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

    // GET - obtener comentarios aprobados + pendientes del usuario
    if (method === 'GET') {
      const dispositivo_id = event.queryStringParameters?.dispositivo_id;
      
      // Si viene con dispositivo_id, retorna aprobados + sus pendientes
      let query = 'SELECT id, nombre, icono, mensaje, creado_en, aprobado, dispositivo_id, likes FROM comentarios WHERE aprobado = true';
      let params = [];
      
      if (dispositivo_id) {
        query += ' OR dispositivo_id = $1';
        params = [dispositivo_id];
      }
      
      query += ' ORDER BY likes DESC, creado_en DESC';
      
      const result = await client.query(query, params);

      // Si vienen comentarios, agregar información de likes del usuario
      let comentarios = result.rows;
      if (dispositivo_id && comentarios.length > 0) {
        const likesResult = await client.query(
          'SELECT comentario_id FROM comentarios_likes WHERE dispositivo_id = $1',
          [dispositivo_id]
        );
        const misLikes = new Set(likesResult.rows.map(r => r.comentario_id));
        
        comentarios = comentarios.map(c => ({
          ...c,
          yaLike: misLikes.has(c.id)
        }));
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(comentarios)
      };
    }

    // POST - crear comentario O dar like a comentario
    if (method === 'POST') {
      const body = JSON.parse(event.body);
      const { dispositivo_id, nombre, icono, mensaje, comentario_id, action } = body;

      // ACCIÓN: DAR LIKE A UN COMENTARIO
      if (action === 'like' && comentario_id && dispositivo_id) {
        // Verificar si ya dio like
        const yaLike = await client.query(
          'SELECT id FROM comentarios_likes WHERE comentario_id = $1 AND dispositivo_id = $2',
          [comentario_id, dispositivo_id]
        );

        if (yaLike.rows.length > 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Ya diste like a este comentario' })
          };
        }

        // Insertar like
        await client.query(
          'INSERT INTO comentarios_likes (comentario_id, dispositivo_id) VALUES ($1, $2)',
          [comentario_id, dispositivo_id]
        );

        // Incrementar contador de likes en comentarios
        await client.query(
          'UPDATE comentarios SET likes = likes + 1 WHERE id = $1',
          [comentario_id]
        );

        // Obtener nuevo contador
        const resultado = await client.query(
          'SELECT likes FROM comentarios WHERE id = $1',
          [comentario_id]
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Like agregado',
            likes: resultado.rows[0].likes
          })
        };
      }

      // ACCIÓN: CREAR COMENTARIO
      if (!dispositivo_id || !nombre || !icono || !mensaje) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Faltan campos requeridos' })
        };
      }

      // Verificar si ya comentó en las últimas 24 horas (solo comentarios APROBADOS cuentan)
      const hace24hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const ultimoComentario = await client.query(
        'SELECT creado_en FROM comentarios WHERE dispositivo_id = $1 AND aprobado = true AND creado_en > $2 ORDER BY creado_en DESC LIMIT 1',
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

    // DELETE - borrar comentario propio (solo el dueño) O quitar like
    if (method === 'DELETE') {
      const body = JSON.parse(event.body);
      const { id, dispositivo_id, action } = body;

      // ACCIÓN: QUITAR LIKE A UN COMENTARIO
      if (action === 'unlike' && id && dispositivo_id) {
        // Verificar si el usuario tiene like en este comentario
        const likeExistente = await client.query(
          'SELECT id FROM comentarios_likes WHERE comentario_id = $1 AND dispositivo_id = $2',
          [id, dispositivo_id]
        );

        if (likeExistente.rows.length === 0) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'No has dado like a este comentario' })
          };
        }

        // Eliminar like
        await client.query(
          'DELETE FROM comentarios_likes WHERE comentario_id = $1 AND dispositivo_id = $2',
          [id, dispositivo_id]
        );

        // Decrementar contador de likes en comentarios
        await client.query(
          'UPDATE comentarios SET likes = GREATEST(likes - 1, 0) WHERE id = $1',
          [id]
        );

        // Obtener nuevo contador
        const resultado = await client.query(
          'SELECT likes FROM comentarios WHERE id = $1',
          [id]
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ 
            message: 'Like removido',
            likes: resultado.rows[0].likes
          })
        };
      }

      // ACCIÓN: ELIMINAR COMENTARIO PROPIO
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
