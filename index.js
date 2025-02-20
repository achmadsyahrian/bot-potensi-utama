const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Inisialisasi Client
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

// Variabel untuk menyimpan pertanyaan
const pertanyaan = [
  "Apa saja syarat pendaftaran?",
  "Apakah ada biaya pendaftarannya?",
  "Apakah di UPU ada beasiswa?",
  "Apakah UPU menerima mahasiswa ekstensi?",
  "Berapa biaya mahasiswa ekstensi?",
  "Bagaimana cara mendaftar via online?",
  "Apakah ada tes masuk di UPU?",
  "Apa saja materi tes masuknya?",
  "Apa saja organisasi yang ada di UPU?",
  "Kapan mulai perkuliahannya?",
  "Apakah UPU menerima KIP Kuliah?",
  "Bagaimana cara mendaftar KIP Kuliah?",
  "Berapa biaya kuliahnya?",
  "Kuliahnya dari jam berapa saja ya?",
  "Akreditasinya apa?",
  "Fasilitasnya apa saja kak?",
];

const pesan = {
  salam: (name) => {
    let daftarPertanyaan = pertanyaan
      .map((item, index) => `${index + 1}. ${item}`)
      .join("\n");

    return `Halo ${name}! 👋\n\nSelamat datang di *Universitas Potensi Utama*!\nAda yang bisa mimin bantu? 🥰\n\n${daftarPertanyaan}\n\nMohon pilih opsi angka untuk informasinya yaa.`;
  },
  jawaban: [
    `📋 *Apa saja syarat pendaftaran?*\n\nSyarat pendaftaran di Universitas Potensi Utama adalah:\n- Fotocopy Ijazah/SKTL (1 Lembar)\n- Fotocopy KTP (3 Lembar)\n- Fotocopy KK (2 Lembar)\n- Pas foto 3x4 (Softcopy)\n\n📌 Pembayaran tahap 1 atau tunai.`,
    `💸 *Apakah ada biaya pendaftarannya?*\n\nTidak ada kak/bg, di UPU gratis biaya pendaftaran, jadi kakak/abang hanya membayar biaya perkuliahan saja. 😊`,
    `🎓 *Apakah di UPU ada beasiswa?*\n\nUPU hanya menyediakan beasiswa KIP Kuliah ya kak/bg.`,
    `📚 *Apakah UPU menerima mahasiswa ekstensi?*\n\nYa, UPU menerima mahasiswa ekstensi kak/bg.`,
    `💵 *Berapa biaya mahasiswa ekstensi?*\n\nKhusus mahasiswa ekstensi, ada tambahan biaya pengecekan transkrip nilai oleh Kaprodi sebesar Rp. 3.000.000.`,
    `🌐 *Bagaimana cara mendaftar via online?*\n\nKakak/abang bisa mendaftar melalui website: http://penerimaan.potensi-utama.ac.id/`,
    `📄 *Apakah ada tes masuk di UPU?*\n\nAda kak/bg, tes masuk dinamakan Ujian Saring Masuk (USM).`,
    `📑 *Apa saja materi tes masuknya?*\n\nMateri tes masuk meliputi Tes Potensi Akademik atau terkait jurusan yang dipilih.`,
    `👥 *Apa saja organisasi yang ada di UPU?*\n\nOrganisasi di UPU meliputi:\n- UKMI ULUL ALBAB\n- IMK (Ikatan Mahasiswa Kristen)\n- UPUCC (UPU-Computer Club)\n- UPURC (UPU-Robotic Club)\n- UPUEC (UPU-English Club)\n- SaseUPU (Sanggar Seni-UPU)\n- Pascal-UPU (Persatuan Mahasiswa Pecinta Alam dan Lingkungan-UPU)`,
    `📅 *Kapan mulai perkuliahannya?*\n\nPerkuliahan dimulai pada tanggal 15 September 2025.`,
    `🏫 *Apakah UPU menerima KIP Kuliah?*\n\nYa, UPU menerima KIP Kuliah kak/bg.`,
    `🌐 *Bagaimana cara mendaftar KIP Kuliah?*\n\nKakak/abang dapat mendaftar melalui website https://kip-kuliah.kemdikbud.go.id. Isi data kakak/abang, lalu pilih Universitas Potensi Utama. Jurusan yang tersedia hanya yang muncul di pilihan web KIP Kuliah.`,
    `💸 *Berapa biaya kuliahnya?*\n\nBiaya kuliah biasanya tergantung pada program studi yang dipilih, sesuai dengan brosur yang tersedia. 😊`,
    `⏰ *Kuliahnya dari jam berapa saja ya?*\n\nPerkuliahan memiliki 3 shift:\n- Kelas pagi: 08.30-12.30\n- Kelas siang: 13.00-17.00\n- Kelas sore: 17.30-21.00`,
    `🎓 *Akreditasinya apa?*\n\nAkreditasi kampus kita sudah *Baik Sekali*. Berikut rincian akreditasi prodi:\n- Teknik Industri: Baik\n- Informatika: Baik Sekali\n- Sistem Informasi: Baik Sekali\n- Rekayasa Perangkat Lunak: Baik\n- Desain Komunikasi Visual: Baik Sekali\n- Film dan Televisi: Baik Sekali\n- Hubungan Internasional: Baik\n- Pendidikan Bahasa Inggris: Baik Sekali\n- Perbankan Syariah: Baik Sekali\n- Akuntansi: Baik Sekali\n- Manajemen: Baik Sekali\n- Psikologi: Baik\n- Hukum: Baik`,
    `🏢 *Fasilitasnya apa saja kak?*\n\nFasilitas di UPU meliputi:\n- Aula Gedung B\n- Perpustakaan (Library)\n- International Relation Lab\n- Mushollah\n- Investment Gallery\n- Mini Bank\n- Art Gallery\n- Lab Komputer\n- Studio Film & Fotografi\n- Podcast Studio\n- Ruang Peradilan Semu\n- Ruang Konseling\n- Ruang Inkubator Bisnis\n- Lab Fisika\n- Area Mural`,
  ],
};

// Generate QR Code
client.on("qr", (qr) => {
  console.log("Scan QR Code ini dengan WhatsApp:");
  qrcode.generate(qr, { small: true });
});

// Terkoneksi
client.on("ready", () => {
  console.log("Bot sudah siap!");
});

// Menangani pesan masuk
client.on("message", async (message) => {
  if (message.from.includes("@g.us")) {
    return; // Abaikan pesan dari grup
  }

  const chat = message.body.toLowerCase(); // Pesan dari user
  const name = message._data.notifyName; // Nama pengirim

  // Menyapa dan memberikan daftar pertanyaan
  if (chat.includes("halo")) {
    message.reply(pesan.salam(name));
    return;
  }

  const kataKunciSalam = ["hi", "hai", "bantuan", "info"];
  if (kataKunciSalam.includes(chat)) {
    message.reply(pesan.salam(name));
    return;
  }

  // Menjawab pertanyaan berdasarkan angka yang dipilih
  const pilihan = parseInt(chat);
  if (!isNaN(pilihan) && pilihan >= 1 && pilihan <= pertanyaan.length) {
    message.reply(pesan.jawaban[pilihan - 1]);
    return;
  }

  if (chat === "terima kasih" || chat === "makasih" || chat === "makasih yaa") {
    message.reply(
      "Sama-sama, kak! 😊 Semoga informasi yang mimin berikan bermanfaat ya! Jika ada pertanyaan lain, silakan tanyakan saja."
    );
    return;
  }

  // Menangani pesan yang tidak dikenali
  // message.reply(
  //   `Maaf kak, mimin belum paham pertanyaan kakak. 😢\n\nSilakan pilih angka dari daftar pertanyaan atau ketik "bantuan" untuk melihat daftar pertanyaan yang tersedia. 😊`
  // );
});

// Inisialisasi client
client.initialize();
