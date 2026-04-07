let riwayat = []; // Array untuk menyimpan riwayat

function HitungKalori() {
    let tinggi = parseFloat(document.getElementById("tinggi").value);
    let berat = parseFloat(document.getElementById("berat").value);
    let umur = parseInt(document.getElementById("usia").value);
    let aktivitas = parseFloat(document.getElementById("aktivitas").value);
    let gender = document.querySelector('input[name="gender"]:checked');

    if (!tinggi || !berat || !umur || !aktivitas || !gender) {
        alert("Data belum lengkap!");
        return;
    }

    gender = gender.value;

    let bmr;
    if (gender === "Laki-laki") {
        bmr = 10 * berat + 6.25 * tinggi - 5 * umur + 5;
    } else {
        bmr = 10 * berat + 6.25 * tinggi - 5 * umur - 161;
    }

    let tdee = bmr * aktivitas;

    let waktu = new Date().toLocaleString();

    let data = {
        tinggi,
        berat,
        umur,
        gender,
        hasil: Math.round(tdee),
        waktu
    };

    riwayat.push(data);

    tampilkanHasil(tdee, waktu);
}

function tampilkanHasil(tdee, waktu) {
    let tampil = `
        <h2>Hasil Perhitungan</h2>
        <p>Kalori: <b>${Math.round(tdee)} kkal</b></p>
        <p>Waktu: ${waktu}</p>
        <hr>
        <h3>Riwayat</h3>
    `;

    riwayat.forEach((item, index) => {
        tampil += `
            <p>${index + 1}. ${item.hasil} kkal (${item.waktu})</p>
        `;
    });

    tampil += `
    <div class="btn-group">
        <button class="btn-update" onclick="updateHasil()">Update</button>
        <button class="btn-hapus" onclick="hapusHasil()">Hapus</button>
    </div>
`;

    document.getElementById("hasil").innerHTML = tampil;
}

function updateHasil() {
    HitungKalori();
}

function hapusHasil() {
    let yakin = confirm("Yakin mau hapus semua hasil?");
    
    if (yakin) {
        riwayat = [];
        document.getElementById("hasil").innerHTML = "<h3>Data berhasil dihapus</h3>";
    }
}