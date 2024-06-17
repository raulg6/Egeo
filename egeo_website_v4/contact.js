function sendMail() {
    const name = document.getElementById('input_name').value;
    const email = document.getElementById('input_mail').value;
    const title = document.getElementById('input_titel').value;
    const message = document.getElementById('input_message').value;

    const mailtoLink = `mailto:raul_gheorghiu@sluz.ch?subject=${encodeURIComponent(title)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;

    window.location.href = mailtoLink;
}
