import { pool } from "../config/db.js";

const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userType ENUM('user','admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const employeeTableQuery = `CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  posisiDilamar VARCHAR(100),
  nama VARCHAR(100),
  noKtp VARCHAR(100),
  tempatLahir VARCHAR(100),
  tanggalLahir VARCHAR(100),
  jenisKelamin VARCHAR(100),
  agama VARCHAR(100),
  golonganDarah VARCHAR(100),
  status VARCHAR(100),
  alamatKtp VARCHAR(225),
  alamatTinggal VARCHAR(225),
  noTelp VARCHAR(100),
  orangTerdekat VARCHAR(100),
  keahlian VARCHAR(225),
  bersedia VARCHAR(100),
  penghasilanDiharapkan VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const educationsTableQuery = `CREATE TABLE IF NOT EXISTS educations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  jenjang VARCHAR(100),
  namaInstitusiAkademi VARCHAR(100),
  jurusan VARCHAR(100),
  tahunLulus VARCHAR(100),
  ipk VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const trainingTableQuery = `CREATE TABLE IF NOT EXISTS trainings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  namaKursus VARCHAR(100),
  sertifikat VARCHAR(100),
  tahun VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const jobTableQuery = `CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  namaPerusahaan VARCHAR(100),
  posisiTerakhir VARCHAR(100),
  pendapatan VARCHAR(100),
  tahunMasuk VARCHAR(100),
  tahunKeluar VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTable = async (tableName, query) => {
  try {
    await pool.query(query);
    console.log(`${tableName} table created or already exists`);
  } catch (error) {
    console.log(`Error creating ${tableName}`, error);
  }
};

const createAllTable = async () => {
  try {
    await createTable("Users", userTableQuery);
    await createTable("Employees", employeeTableQuery);
    await createTable("Educations", educationsTableQuery);
    await createTable("Trainings", trainingTableQuery);
    await createTable("Jobs", jobTableQuery);
    console.log("All tables created successfully!!");
  } catch (error) {
    console.log("Error creating tables", error);
    throw error;
  }
};

export default createAllTable;
