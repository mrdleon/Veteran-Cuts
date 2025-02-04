function calculateTotal() {
        let total = 0;
    
        // Harga masing-masing layanan
        const hargaPangkas = 50000;
        const hargaCuci = 20000;
        const hargaWarnai = 100000;
        const hargaPijet = 30000;
    
        // Mengecek apakah layanan dipilih
        if (document.getElementById("pangkas").checked) total += hargaPangkas;
        if (document.getElementById("cuci").checked) total += hargaCuci;
        if (document.getElementById("warnai").checked) total += hargaWarnai;
        if (document.getElementById("pijet").checked) total += hargaPijet;
    
        // Menampilkan total di elemen HTML
        document.getElementById("total").textContent = total;
    }
    
    function submitForm() {
        // Menyimpan input ke dalam variabel
        const nama = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        
        // Validasi sederhana (contoh, bisa dikembangkan)
        if (!nama || !email || !phone) {
        alert("Mohon lengkapi data Anda!");
        return;
        }
    
        // Konfirmasi pemesanan
        alert("Data berhasil dikirim! Total yang harus dibayar: Rp " + document.getElementById("total").textContent);
    }