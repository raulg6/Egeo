var lastScrollTop = 0;

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var landingPageImg = document.querySelector('.landing_page_img');

    var blurIntensity = Math.min(scrollPosition / 20, 7);
    var opacity = 1 - (scrollPosition / (window.innerHeight * 0.70));

    landingPageImg.style.filter = 'blur(' + blurIntensity + 'px)';
    landingPageImg.style.opacity = opacity;
});

function submitMail() {
    var email = document.getElementById('email').value;

    fetch('http://localhost:3000/submit_email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log response from backend
        // Handle response as needed
        if (data.success) {
            alert("Email submitted successfully!");
        } else {
            alert("Failed to submit email. Please try again later.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
    });
}