// services/userService.js
import { pool } from "../config/db.js";
import EmployeeModel from '../models/EmployeeModel.js';

// saveEmployee 
export const saveEmployee = async (employee) => {
    try {
        let response = { success: false, message: '' };
        const [existingEmployee] = await pool.query('SELECT * FROM employees WHERE email = ?', [employee.email]);
        const objColumn = [ "email", "posisiDilamar", "nama", "noKtp","tempatLahir","tanggalLahir",
            "jenisKelamin","agama","golonganDarah","status","alamatKtp","alamatTinggal","noTelp",
            "orangTerdekat","keahlian","bersedia","penghasilanDiharapkan"
        ];
        const queryColumnSave = objColumn.join(',');
        const queryValueSave = objColumn.map(() => '?').join(',');
        const columnUpdate = objColumn.filter(col => col !== "email");
        const querycolumnUpdate = columnUpdate.map(col => `${col} = ?`).join(', ');
        let query ="";
        let values ="";
        if (existingEmployee.length > 0) {

            query = `UPDATE employees SET ${querycolumnUpdate} WHERE email = "${employee.email}"`;
            values = [employee.posisiDilamar, employee.nama, employee.noKtp,employee.tempatLahir,
                employee.tanggalLahir,employee.jenisKelamin,employee.agama,employee.golonganDarah,employee.status,employee.alamatKtp,
                employee.alamatTinggal,employee.noTelp,employee.orangTerdekat,employee.keahlian,employee.bersedia,employee.penghasilanDiharapkan];
            response = { success: true, message: 'employee updated successfully'};
        }else{

            query = `INSERT INTO employees (${queryColumnSave}) VALUES (${queryValueSave})`;
            values = [employee.email, employee.posisiDilamar, employee.nama, employee.noKtp,employee.tempatLahir,
                employee.tanggalLahir,employee.jenisKelamin,employee.agama,employee.golonganDarah,employee.status,employee.alamatKtp,
                employee.alamatTinggal,employee.noTelp,employee.orangTerdekat,employee.keahlian,employee.bersedia,employee.penghasilanDiharapkan];
            response = { success: true, message: 'employee save successfully'};
        }

        //education table
        const [existingEducation] = await pool.query('SELECT * FROM educations WHERE email = ?', [employee.email]);
        const educationColumn = [ "email", "jenjang","namaInstitusiAkademi","jurusan","tahunLulus","ipk"];
        const queryEducationColumnSave = educationColumn.join(',');
        const queryEducationValueSave = educationColumn.map(() => '?').join(',');
        const educationColumnUpdate = educationColumn.filter(col => col !== "email");
        const queryEducationcolumnUpdate = educationColumnUpdate.map(col => `${col} = ?`).join(', ');
        let queryEducation ="";
        let valuesEducation ="";
        if (existingEducation.length > 0) {
            queryEducation = `UPDATE educations SET ${queryEducationcolumnUpdate} WHERE email = "${employee.email}"`;
            valuesEducation = [employee.pendidikanTerakhir.jenjang,employee.pendidikanTerakhir.namaInstitusiAkademi,
                employee.pendidikanTerakhir.jurusan,employee.pendidikanTerakhir.tahunLulus,employee.pendidikanTerakhir.ipk
            ];
        }else{
            queryEducation = `INSERT INTO educations (${queryEducationColumnSave}) VALUES (${queryEducationValueSave})`;
            valuesEducation = [employee.email,employee.pendidikanTerakhir.jenjang,employee.pendidikanTerakhir.namaInstitusiAkademi,
                employee.pendidikanTerakhir.jurusan,employee.pendidikanTerakhir.tahunLulus,employee.pendidikanTerakhir.ipk
            ];
        }

        //training 
        const [existingTraining] = await pool.query('SELECT * FROM trainings WHERE email = ?', [employee.email]);
        const trainingColumn = [ "email", "namaKursus","sertifikat","tahun"];
        const queryTrainingColumnSave = trainingColumn.join(',');
        if (existingTraining.length > 0) {
            await pool.query('DELETE FROM trainings WHERE email = ?', [employee.email]);
        }
        let queryTraining = `INSERT INTO trainings (${queryTrainingColumnSave}) VALUES ?`;
        const valuesTraining = employee.riwayatPelatihan.map(item => [
            employee.email,
            item.namaKursus,
            item.sertifikat,
            item.tahun
          ]);

        //job
        const [existingJob] = await pool.query('SELECT * FROM jobs WHERE email = ?', [employee.email]);
        const jobColumn = ["email", "namaPerusahaan","posisiTerakhir","pendapatan","tahunMasuk","tahunKeluar"];
        const queryJobColumnSave = jobColumn.join(',');
        if (existingJob.length > 0) {
            await pool.query('DELETE FROM jobs WHERE email = ?', [employee.email]);
        }
        let queryJob = `INSERT INTO jobs (${queryJobColumnSave}) VALUES ?`;
        const valuesJob = employee.riwayatPekerjaan.map(item => [
            employee.email,
            item.namaPerusahaan,
            item.posisiTerakhir,
            item.pendapatan,
            item.tahunMasuk,
            item.tahunKeluar,
        ]);

        
        await pool.query(query, values);
        await pool.query(queryEducation, valuesEducation);
        await pool.query(queryTraining, [valuesTraining]);
        await pool.query(queryJob, [valuesJob]);
        return response;
    } catch (error) {
        console.error("save data error:", error);
        return { success: false, message: 'Save data failed. Please try again later.' };
    }
};

export const getEmployeeDetail = async (email) => {
    try {
        
        const [employees] = await pool.query('SELECT * FROM employees WHERE email = ?', [email]);
        const [educations] = await pool.query('SELECT * FROM educations WHERE email = ?', [email]);
        const [trainings] = await pool.query('SELECT * FROM trainings WHERE email = ?', [email]);
        const [jobs] = await pool.query('SELECT * FROM jobs WHERE email = ?', [email]);
        const employee = new EmployeeModel(employees[0]);
        if (educations.length > 0) {
            const { jenjang, namaInstitusiAkademi, jurusan, tahunLulus, ipk } = educations[0];
            employee.pendidikanTerakhir = {
              jenjang,
              namaInstitusiAkademi,
              jurusan,
              tahunLulus,
              ipk
            };
        }
        if (trainings.length > 0) {
            employee.riwayatPelatihan = trainings.map(train => {
              const { namaKursus, sertifikat, employee } = train;
              return { namaKursus, sertifikat, employee };
            });
        } else {
            employee.riwayatPelatihan = [];
        }
        if (jobs.length > 0) {
            employee.riwayatPekerjaan = jobs.map(train => {
              const { namaPerusahaan, posisiTerakhir, pendapatan,tahunMasuk,tahunKeluar } = train;
              return { namaPerusahaan, posisiTerakhir, pendapatan,tahunMasuk,tahunKeluar };
            });
        } else {
            employee.riwayatPekerjaan = [];
        }
        console.log("employee model",employee);
       
        return { 
            success: true, 
            message: 'Get data successful', 
            data: employee
        };
    } catch (error) {
        console.error("Get data error:", error);
        return { success: false, message: 'Get data failed. Please try again later.' };
    }
};

export const getEmployee = async () => {
    try {
        const [employees] = await pool.query('SELECT * FROM employees');
        const employeeList = employees.map(empData => new EmployeeModel(empData));
        console.log("List of Employee Models:", employeeList);  
       
        return { 
            success: true, 
            message: 'Get data successful', 
            data: employeeList
        };
    } catch (error) {
        console.error("Get data error:", error);
        return { success: false, message: 'Get data failed. Please try again later.' };
    }
};
