// nav mobile button

const navBtn = document.getElementById('deploy-menu-btn')
const navMenu = document.querySelector('.m-nav-list')

navBtn.addEventListener('click', () => {
  navMenu.classList.toggle('m-nav-list_active')
})


const alertSending = document.querySelector('.form-message-loading')
const alertSuccess = document.querySelector('.form-message-success')
const alertError = document.querySelector('.form-message-error')
const alertSuccessBtn = document.getElementById('success-btn')
const alertErrorBtn = document.getElementById('error-btn')
const contFormBtn = document.getElementById('contact-form-btn')
const contactForm = document.getElementById('contact-form')

alertSuccessBtn.addEventListener('click', () => {
  alertSuccess.classList.remove('form-message-success_active')
})
alertErrorBtn.addEventListener('click', () => {
  alertError.classList.remove('form-message-error_active')
})

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  alertSending.classList.add('form-message-loading_active')

  const cParams = {
    c_email: document.getElementById('email').value,
    c_name: document.getElementById('name').value,
    c_message: document.getElementById('message').value
  }
  
  emailjs.send("service_ppww80m", "template_d9ibf1e", cParams)
    .then(function (res) {
      console.log("Solicitud enviada con éxito!", res.status)
      alertSuccess.classList.add('form-message-success_active')
      alertSending.classList.remove('form-message-loading_active')
    })
    .catch(function (err) {
      console.error("Error al enviar", err)
      alertError.classList.add('form-message-error_active')
      alertSending.classList.remove('form-message-loading_active')
    });
})