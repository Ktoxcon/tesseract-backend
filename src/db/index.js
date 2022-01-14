const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

async function initializeDB() {
  try {
    const db = await open({
      filename: "database.db",
      driver: sqlite3.Database,
    });

    await db.exec(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        is_done INTEGER DEFAULT 0 
      )
    `
    );
  } catch (error) {
    console.error(
      "There was an error trying to initiliaze the database: ",
      error.message
    );
  }
}

module.exports = { initializeDB };
