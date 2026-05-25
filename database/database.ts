import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('gallery.db');

export function initDatabase() {

  database.execSync(`
    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      image_uri TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      created_at TEXT NOT NULL
    );
  `);

  console.log('Banco criado com sucesso!');
}

export function savePhoto(
  title: string,
  imageUri: string,
  latitude: number,
  longitude: number
) {

  database.runSync(
    `
      INSERT INTO photos
      (title, image_uri, latitude, longitude, created_at)
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      title,
      imageUri,
      latitude,
      longitude,
      new Date().toISOString(),
    ]
  );

  console.log('Foto salva!');
}

export function getPhotos() {

  const photos = database.getAllSync(`
    SELECT * FROM photos
    ORDER BY id DESC
  `);

  return photos;
}
export function deletePhoto(id: number) {
  database.runSync(
    `
      DELETE FROM photos
      WHERE id = ?
    `,
    [id]
  );

  console.log('Foto excluída!');
}

export default database;