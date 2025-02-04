function submitReservation(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const schedule = document.querySelector('input[name="schedule"]:checked').value;
    
    const serviceCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const services = Array.from(serviceCheckboxes).map(checkbox => checkbox.parentElement.innerText.trim());
    const total = document.getElementById('total').innerText;

    // Store data in localStorage
    const reservationData = {
        name,
        email,
        phone,
        gender,
        services,
        schedule,
        total
    };
    localStorage.setItem('reservationData', JSON.stringify(reservationData));

    // Redirect to result page
    window.location.href = 'result.html';
}

function calculateTotal() {
    const serviceCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const total = Array.from(serviceCheckboxes).reduce((sum, checkbox) => {
        return sum + parseInt(checkbox.value, 10);
    }, 0);

    document.getElementById('total').innerText = total;
}
