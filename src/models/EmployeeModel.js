class EmployeeModel {
    constructor(employee = {}) {
      // Data Pribadi
      this.posisiDilamar = employee.posisiDilamar || '';
      this.nama = employee.nama || '';
      this.noKtp = employee.noKtp || '';
      this.tempatLahir = employee.tempatLahir || '';
      this.tanggalLahir = employee.tanggalLahir || '';
      this.jenisKelamin = employee.jenisKelamin || '';
      this.agama = employee.agama || '';
      this.golonganDarah = employee.golonganDarah || '';
      this.status = employee.status || ''; 
      this.alamatKtp = employee.alamatKtp || '';
      this.alamatTinggal = employee.alamatTinggal || '';
      this.email = employee.email || '';
      this.noTelp = employee.noTelp || '';
      this.orangTerdekat = employee.orangTerdekat || '';
  
      // Pendidikan Terakhir
      this.pendidikanTerakhir = employee.pendidikanTerakhir || {
        jenjang: '',
        namaInstitusiAkademi: '',
        jurusan: '',
        tahunLulus: '',
        ipk: ''
      };
  
      // Riwayat Pelatihan (array of objects)
      this.riwayatPelatihan = Array.isArray(employee.riwayatPelatihan) && employee.riwayatPelatihan.length > 0
        ? employee.riwayatPelatihan.map(item => ({
            namaKursus: item.namaKursus || '',
            sertifikat: item.sertifikat || '', // "Ada" / "Tidak"
            tahun: item.tahun || ''
          }))
        : [
            {
              namaKursus: '',
              sertifikat: '',
              tahun: ''
            }
          ];
  
      // Riwayat Pekerjaan (array of objects)
      this.riwayatPekerjaan = Array.isArray(employee.riwayatPekerjaan) && employee.riwayatPekerjaan.length > 0
        ? employee.riwayatPekerjaan.map(item => ({
            namaPerusahaan: item.namaPerusahaan || '',
            posisiTerakhir: item.posisiTerakhir || '',
            pendapatan: item.pendapatan || '',
            tahunMasuk: item.tahunMasuk || '',
            tahunKeluar: item.tahunKeluar || ''
          }))
        : [
            {
              namaPerusahaan: '',
              posisiTerakhir: '',
              pendapatan: '',
              tahunMasuk: '',
              tahunKeluar: ''
            }
          ];
  
      // Data Lain
      this.keahlian = employee.keahlian || '';
      this.bersedia = employee.bersedia || '';
      this.penghasilanDiharapkan = employee.penghasilanDiharapkan || '';
    }
  }
  
export default EmployeeModel;  