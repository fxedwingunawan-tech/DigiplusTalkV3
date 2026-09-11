# Cara Setup Digiplus Talk di GitHub + Netlify (dengan Netlify Blobs)

Struktur folder ini:
```
digiplus-talk-netlify/
├── index.html                     ← aplikasinya
├── netlify.toml                   ← konfigurasi Netlify
├── package.json                   ← daftar dependency
└── netlify/
    └── functions/
        └── data.js                ← "jembatan" API ke Netlify Blobs
```

Dengan cara ini, kamu **tidak perlu setup database terpisah** (seperti Google Sheets) — penyimpanan datanya sudah otomatis ditangani Netlify sendiri lewat fitur **Netlify Blobs**, dan aplikasinya memanggil endpoint `/api/data` di domain yang sama (tidak perlu isi URL apapun secara manual).

## Langkah 1: Upload ke GitHub
1. Buat akun GitHub kalau belum punya ([github.com](https://github.com)).
2. Buat repository baru (public atau private, bebas), misalnya beri nama `digiplus-talk`.
3. Upload semua isi folder `digiplus-talk-netlify` ini ke repository tersebut:
   - Cara termudah tanpa command line: di halaman repository, klik **Add file > Upload files**, lalu drag semua file & folder di atas (pastikan struktur foldernya tetap sama, termasuk folder `netlify/functions/`).
   - Klik **Commit changes**.

## Langkah 2: Hubungkan ke Netlify
1. Buat akun di [netlify.com](https://netlify.com) kalau belum punya (bisa langsung daftar pakai akun GitHub).
2. Di dashboard Netlify, klik **Add new site > Import an existing project**.
3. Pilih **GitHub**, lalu pilih repository `digiplus-talk` yang tadi kamu buat.
4. Netlify akan otomatis mendeteksi `netlify.toml` — biarkan pengaturan default (build command boleh dikosongkan, publish directory otomatis terbaca `.`).
5. Klik **Deploy site**.
6. Tunggu proses deploy selesai (biasanya 1-2 menit), lalu Netlify akan memberikan link seperti `https://nama-acak.netlify.app`.

## Langkah 3: Aktifkan Netlify Blobs
Netlify Blobs otomatis aktif untuk setiap site Netlify tanpa perlu setting tambahan — begitu function `data.js` pertama kali dipanggil (misalnya saat aplikasi pertama kali dibuka), Netlify akan otomatis membuat blob store-nya sendiri. Tidak ada langkah manual di sini.

## Langkah 4: Coba buka aplikasinya
1. Buka link `https://nama-acak.netlify.app` yang diberikan Netlify.
2. Aplikasi Digiplus Talk akan muncul dan otomatis terisi data contoh saat pertama kali dibuka.
3. Coba masuk mode admin (PIN default `1234`), tambah/ubah data, lalu buka link yang sama dari HP lain — perubahan seharusnya ikut muncul di sana, karena semua tersimpan di Netlify Blobs yang sama.

## (Opsional) Ganti nama domain
Di Netlify dashboard, buka **Site configuration > Domain management**, kamu bisa ganti subdomain `.netlify.app` jadi nama lain yang lebih mudah diingat staff (misalnya `digiplus-talk.netlify.app`), atau hubungkan domain sendiri kalau toko punya domain.

## Catatan keamanan
- `API_KEY` di `index.html` dan di `netlify/functions/data.js` **harus sama persis** (`digiplus2026` secara default) — ini hanya perlindungan dasar, bukan keamanan tingkat tinggi. Kalau mau ganti, ubah nilainya di kedua file tersebut sebelum di-upload ke GitHub.
- PIN admin di dalam aplikasi (`ADMIN_PIN`, default `1234`) terpisah dari `API_KEY` di atas — itu untuk mengunci fitur tambah/ubah/hapus data di dalam tampilan aplikasi.
- Karena repository berisi PIN dan API key dalam bentuk teks biasa, sebaiknya buat repository **private** di GitHub kalau datanya kamu anggap perlu dijaga kerahasiaannya.

## Kalau nanti mau update aplikasi
Setiap kali kamu upload perubahan baru ke file-file ini di GitHub (misalnya lewat "Upload files" lagi atau git push), Netlify akan **otomatis deploy ulang** tanpa perlu langkah tambahan.

## Fitur baru di versi ini
- **Foto spesifikasi per tipe HP**: di halaman tiap tipe HP ada bagian "Foto Spesifikasi". Mode admin bisa ketuk "Upload foto" untuk memasukkan beberapa foto sekaligus (foto otomatis dikecilkan di browser sebelum disimpan). Semua orang bisa ketuk foto untuk melihat versi besarnya (dengan tombol geser kiri/kanan kalau lebih dari satu).
- **Bulk update selling point**: di halaman tiap tipe HP, mode admin ada tombol "Bulk update selling point" untuk memasukkan banyak selling point sekaligus lewat satu kotak teks, satu baris per selling point dengan format `Kategori | Selling point | Sales talk`. Bisa pilih mau ditambahkan ke data yang sudah ada, atau mengganti semua selling point tipe HP tersebut.
- **Tampilan brand tanpa ikon lingkaran**: kartu brand di halaman utama sekarang menampilkan nama brand langsung (bukan lagi lingkaran berisi inisial huruf).
- **Logo & tulisan header diperbesar**, dan tampilan keseluruhan dirapikan (kartu lebih lembut, bayangan halus, transisi hover) supaya terasa lebih modern.

Catatan: karena foto disimpan sebagai bagian dari data yang sama (Netlify Blobs), disarankan tidak mengunggah foto beresolusi sangat besar dalam jumlah banyak sekaligus per tipe HP — aplikasi sudah otomatis mengecilkan ukuran foto, tapi tetap bijak dalam jumlah foto per tipe HP agar loading tetap cepat.
