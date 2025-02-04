let currentSlide = 0;
let slideInterval;

// Fungsi untuk menampilkan slide
function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    if (index >= totalSlides) {
        currentSlide = 0; // Kembali ke slide pertama
    } else if (index < 0) {
        currentSlide = totalSlides - 1; // Kembali ke slide terakhir
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

// Fungsi untuk mengganti slide secara otomatis
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1); // Pindah ke slide berikutnya setiap beberapa detik
    }, 3000); // Ganti setiap 3 detik
}

// Fungsi untuk mengubah slide saat tombol diklik
function changeSlide(step) {
    showSlide(currentSlide + step);
    resetAutoSlide(); // Reset interval jika tombol ditekan
}

// Fungsi untuk mereset interval slide saat tombol ditekan
function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide(); // Mulai ulang interval
}

// Memulai slide otomatis saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startAutoSlide();
});
