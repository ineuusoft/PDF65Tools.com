const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { sessionId, operationType, fileName, fileSize, processingTime, success, errorMessage } = JSON.parse(event.body);
    
    const client = await pool.connect();
    
    const query = `
      INSERT INTO file_operations 
      (session_id, operation_type, file_name, file_size, processing_time, success, error_message)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;
    
    const result = await client.query(query, [
      sessionId, operationType, fileName, fileSize, processingTime, success, errorMessage
    ]);
    
    // Update user stats
    await client.query(`
      UPDATE users 
      SET total_files_processed = total_files_processed + 1,
          total_operations = total_operations + 1
      WHERE session_id = $1
    `, [sessionId]);
    
    client.release();
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Operation logged successfully',
        operationId: result.rows[0].id
      })
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message 
      })
    };
  }
};
