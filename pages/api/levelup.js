import sql from 'mssql';
import dbConfig from '../../constants/dbconfig';


export default async function handler(req, res) {
  try {
    const { playerId, key } = req.query;

    const pool = await sql.connect(dbConfig);

    const result = await pool.request().query(`SELECT * FROM PLAYERS WHERE PLAYER_ID = '${playerId}'`);

    if (result.recordset.length === 0) {
      res.status(400).json({ message: `Player with ID ${playerId} not found` });
      return;
    }

    const player = result.recordset[0];
    const { LEVEL } = player;

    if (PLAYER_SOLUTIONS[LEVEL] !== key) {
      res.status(403).json({ message: 'Invalid key' });
      return;
    }

    await pool.request().query(`
      UPDATE PLAYERS
      SET LEVEL = ${LEVEL + 1}, UPDATED_AT = DATEADD(hour, 1, GETDATE())
      WHERE PLAYER_ID = '${playerId}'
    `);

    res.status(200).json({ message: 'Player leveled up' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}