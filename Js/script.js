// Toggle Class active
const navbarNav = document.querySelector('.navbar-nav');

// Ketika humbermenu di click
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active');
    };


// klik di luar sidebar untuk menghilangkan nav 
const hamburger = document.querySelector('#hamburger-menu');

//const sc = document.querySelector('#scissors-button');

document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active');
    }

    });


// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
});


// klik tombol close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

// Klik di luar modal

window.onclick = (e) => {
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display = 'none';
    }
};

// Fungsi untuk menghitung total harga berdasarkan pilihan paket layanan
function calculateTotal() {
    let total = 0;

    /*harga pangkas = 50000, 
    harga cuci = 20000, 
    harga warnai = 100000, 
    harga pijet = 30000*/

    // Menambahkan harga layanan yang dipilih
    if (document.getElementById("pangkas").checked) 
        {total += parseInt(document.getElementById("pangkas").value)};
    if (document.getElementById("cuci").checked) 
        {total += parseInt(document.getElementById("cuci").value)};
    if (document.getElementById("warnai").checked) 
        {total += parseInt(document.getElementById("warnai").value)};
    if (document.getElementById("pijet").checked) 
        {total += parseInt(document.getElementById("pijet").value)};

    // Menampilkan total harga
    document.getElementById("total").textContent = total;
}

//////////////====Adhafa====//////////////

// Login
async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const messageElement = document.getElementById('message');

    try {
        const response = await fetch("http://localhost:1234/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        console.log("Response status:", response.status);

        const data = await response.json();  // Mengambil response JSON
        console.log("Response data:", data);
        const [firstMessage] = data;

        // Cek apakah login berhasil
        if (firstMessage?.message === "Login successful") {
            messageElement.textContent = 'Login berhasil.';
            messageElement.style.color = 'green';

            document.body.classList.add("fade-out");

            setTimeout(() => {
                window.location.href = "/frontend/index.html";
            }, 600);
        } else {
            // Menampilkan pesan kesalahan
            messageElement.textContent = 'Email atau kata sandi salah! Silakan coba lagi.';
            messageElement.style.color = 'red';

            // Mengosongkan input password untuk percobaan berikutnya
            document.getElementById("login-password").value = '';

            // Menghilangkan pesan setelah beberapa detik
            setTimeout(() => {
                messageElement.textContent = '';
            }, 2000); // 3000ms = 3 detik
        }

    } catch (error) {
        console.error("Error:", error);
        messageElement.textContent = 'Terjadi kesalahan saat login.';
        messageElement.style.color = 'red';
    }
}


// Register
async function registerUser (event) {
    event.preventDefault();  // Prevent the default form submission
    console.log("Form submitted");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        messageElement.textContent = 'Password dan konfirmasi password tidak cocok.';
        messageElement.style.color = 'red';
        setTimeout(() => {
            messageElement.textContent = ''
        }, 2000)
        return;
    }

    try {
        const response = await fetch('http://localhost:1234/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name: name, email, password, phone_number: phone, gender })
        });
        const data = await response.json();

        console.log("Response data:", data); // Tambahkan log ini

        // if (response.ok) {
        //     alert("Registrasi berhasil");
        //     window.location.href = "/frontend/component/login.html";  // Redirect to login page
        const messageElement = document.getElementById('message');  // Menambahkan elemen untuk pesan

        // Pastikan data adalah array dan periksa pesan di elemen pertama
        if (response.ok) {
            messageElement.textContent = 'Register berhasil.';
            messageElement.style.color = 'green';
            
            document.body.classList.add("fade-out");
            // Redirect ke halaman utama setelah 2 detik
            setTimeout(() => {
                window.location.href = "login.html";  // Mengarahkan ke halaman utama
            }, 600);  // Menunggu detik sebelum redirect
        } else {
            // alert(data.message || "Registrasi gagal");
            messageElement.textContent = data.message || 'Registrasi Gagal!';
            messageElement.style.color = 'red';

            setTimeout(() => {
                messageElement.textContent = ''
            }, 2000)
        }
    } catch (error) {
        console.error("Error:", error);
        const messageElement = document.getElementById('message');  // Menambahkan elemen untuk pesan
        messageElement.textContent = 'Terjadi kesalahan saat login.';
        messageElement.style.color = 'red';
    }
    document.querySelector('.registration-form').addEventListener('submit', registerUser);
}

///// Login Update
async function changePassword(event) {
    event.preventDefault();  // Mencegah form submit secara default

    const email = document.getElementById('email').value;
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageElement = document.getElementById('message');

    // Validasi kesesuaian password baru dan konfirmasi password
    if (newPassword !== confirmPassword) {
        messageElement.textContent = 'Password baru dan konfirmasi password tidak cocok.';
        messageElement.style.color = 'red';
        setTimeout(() => {
            messageElement.textContent = ''
        }, 2000)
        return;
    }

    // Validasi panjang password baru minimal 6 karakter
    if (newPassword.length < 6) {
        messageElement.textContent = 'Password baru harus memiliki minimal 6 karakter.';
        messageElement.style.color = 'red';
        setTimeout(() => {
            messageElement.textContent = ''
        }, 2000)
        return;
    }

    try {
        // Membuat objek data untuk dikirim ke server
        const data = {
            email: email,
            currentPassword: currentPassword,
            newPassword: newPassword
        };

        // Mengirim request PUT untuk memperbarui password
        const response = await fetch('http://localhost:1234/login/updatePassword', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json(); // Mengambil response JSON

        if (response.ok) {
            messageElement.textContent = 'Password berhasil diubah.';
            messageElement.style.color = 'green';
            
            document.body.classList.add("fade-out");
            // Redirect ke halaman login setelah password berhasil diubah
            setTimeout(() => {
                window.location.href = "login.html";  // Mengarahkan ke halaman login
            }, 600); // Menunggu detik sebelum redirect
        
        } else {
            messageElement.textContent = responseData.message || 'Email atau Password Salah!';
            messageElement.style.color = 'red';

            setTimeout(() => {
                messageElement.textContent = ''
            }, 2000)
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.textContent = 'Terjadi kesalahan saat menghubungi server.';
        messageElement.style.color = 'red';
    }
}
// Menambahkan event listener pada form untuk submit
document.querySelector('.changePasswordForm').addEventListener('submit', changePassword);


// Reservasi
// Fungsi untuk mengirimkan data form ke backend
async function submitReservation(event) {
    event.preventDefault(); // Mencegah form submit secara default

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("phone").value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    // const reservation_date = new Date().toISOString(); // Tanggal saat ini
    const reservation_date = `${new Date().toISOString().split('T')[0]} - ${document.querySelector('input[name="schedule"]:checked').value}`;
    // const reservation_date = document.querySelector('input[name="schedule"]:checked').value; // Tanggal saat ini
    const total_price = document.getElementById("total").textContent;

    // Mengambil layanan yang dipilih
    const services = [];
    if (document.getElementById("pangkas").checked) services.push("Pangkas");
    if (document.getElementById("cuci").checked) services.push("Cuci Rambut");
    if (document.getElementById("warnai").checked) services.push("Warnai Rambut");
    if (document.getElementById("pijet").checked) services.push("Pijet");

    // Menampilkan elemen untuk pesan status reservasi
    const messageElement = document.getElementById('message');

    try {
        // Mengirim data ke backend
        const response = await fetch("http://localhost:1234/reservasi", {
            method: "POST",
            headers: { //mengatur tipe data yg dikirim
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, phone_number, gender, reservation_date, total_price, services })
        }); 


        const data = await response.json(); // Mengambil respon JSON dari server

        if (response.ok) {
            messageElement.textContent = 'Reservasi berhasil dibuat!';
            messageElement.style.color = 'green';

            document.body.classList.add("fade-out");
            // Redirect ke halaman konfirmasi atau home setelah 1 detik
            setTimeout(() => {
                window.location.href = "/frontend/index.html"; // Ganti dengan halaman yang diinginkan
            }, 1000);
        } else {
            messageElement.textContent = data.message || 'Gagal membuat reservasi.';
            messageElement.style.color = 'red';

            setTimeout(() => {
                messageElement.textContent = ''
            }, 2000)
        }
    } catch (error) {
        console.error("Terjadi kesalahan:", error);
        messageElement.textContent = 'Terjadi kesalahan saat memproses reservasi.';
        messageElement.style.color = 'red';
    }
}

document.querySelector('.reservation-form').addEventListener('submit', submitReservation);


function handleLinkClick(event, targetUrl) {
    event.preventDefault(); // Mencegah link langsung diklik

    document.body.classList.add('fade-out');
    
    setTimeout(function() {
        window.location.href = targetUrl;
    }, 600);
}
    //////////////====Adhafa====//////////////