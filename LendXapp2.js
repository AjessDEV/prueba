// nav mobile button

const navBtn = document.getElementById('deploy-menu-btn')
const navMenu = document.querySelector('.m-nav-list')

navBtn.addEventListener('click', () => {
  navMenu.classList.toggle('m-nav-list_active')
})

// dropdown inputs

const dropdowns = document.querySelectorAll('.dropdown')

dropdowns.forEach(dropdown => {
  const select = dropdown.querySelector('.select')
  const caret = dropdown.querySelector('.caret')
  const menu = dropdown.querySelector('.menu')
  const options = dropdown.querySelectorAll('.menu li')
  const selected = dropdown.querySelector('.selected')

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked')
    caret.classList.toggle('caret-rotate')
    menu.classList.toggle('menu-open')
  })

  options.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerText = option.innerText;
      select.classList.remove('select-clicked')
      caret.classList.remove('caret-rotate')
      menu.classList.remove('menu-open')

      options.forEach(option => {
        option.classList.remove('active')
      })

      option.classList.add('active')

      const hsFormSubmitBtn = document.getElementById('submit-btn')

      const hsCountry = document.getElementById('hs-country') ? document.getElementById('hs-country').innerText.trim() : ''
      const hsService = document.getElementById('hs-service') ? document.getElementById('hs-service').innerText.trim() : ''
      const hsPaymentMethod = document.getElementById('hs-payment') ? document.getElementById('hs-payment').innerText.trim() : ''

      const defaultValues = ['Selecciona tu País', 'Select your Country', 'Selecciona el Servicio', 'Select a Service',
        'Elige un Método de Pago', 'Choose a Payment Method'
      ]

      const allValid =
        !defaultValues.includes(hsCountry) &&
        !defaultValues.includes(hsService) &&
        !defaultValues.includes(hsPaymentMethod)

      if (allValid) {
        hsFormSubmitBtn.classList.add('can-submit')
      } else {
        hsFormSubmitBtn.classList.remove('can-submit')
      }

      if (selected.id === 'hs-country') {
        const reflected = document.getElementById('r-c-country')
        reflected.textContent = selected.innerText
      }

      if (selected.id === 'hs-payment') {
        const reflected = document.getElementById('r-pm-paymethod')
        reflected.textContent = selected.innerText
      }

      if (selected.id === 'hs-service') {
        const reflected = document.getElementById('req-service-list')
        reflected.textContent = null;
        reflected.innerHTML = `<li id="rs-service">${selected.innerText}</li>`
      }

    })
  })
})

const extraCheckbox = document.getElementById('extra-service')
const extraservValue = document.getElementById('extraserv-value')

extraCheckbox.addEventListener('change', () => {
  extraservValue.textContent = (extraCheckbox.checked ? 'Si' : 'No')
})


// hire form

// form values
const hsName = document.getElementById('hs-name')
const hsEmail = document.getElementById('hs-email')

// form buttons
const hsFormSubmitBtn = document.getElementById('submit-btn');
const formAgreeBtn = document.getElementById('agree-button');

// summary info
const rsName = document.getElementById('r-f-name')
const rsEmail = document.getElementById('r-e-email')
const rsCountry = document.getElementById('r-c-country')
const rsPayment = document.getElementById('r-pm-paymethod')
const rsService = document.getElementById('rs-service')
const hsFormulary = document.getElementById('hs-form')
const discContainer = document.querySelector('.disclaimer-container')
const discText = document.querySelector('.disc-text')
const discContainerID = document.getElementById('disc-container');
const alertSending = document.querySelector('.form-message-loading')
const alertSuccess = document.querySelector('.form-message-success')
const alertError = document.querySelector('.form-message-error')
const alertSuccessBtn = document.getElementById('success-btn')
const alertErrorBtn = document.getElementById('error-btn')

// funtionality 

hsName.addEventListener('input', () => {
  rsName.textContent = hsName.value
})
hsEmail.addEventListener('input', () => {
  rsEmail.textContent = hsEmail.value
})

hsFormulary.addEventListener('submit', (e) => {
  e.preventDefault()
  discContainer.classList.add('disclaimer-container_active')
})

discContainerID.addEventListener('click', () => {
  discContainer.classList.remove('disclaimer-container_active')
})

alertSuccessBtn.addEventListener('click', () => {
  alertSuccess.classList.remove('form-message-success_active')
})
alertErrorBtn.addEventListener('click', () => {
  alertError.classList.remove('form-message-error_active')
})

formAgreeBtn.addEventListener('click', () => {
  discContainer.classList.remove('disclaimer-container_active')
  
  const params = {
    hs_name: document.getElementById('r-f-name').innerText.trim(),
    hs_email: document.getElementById('r-e-email').innerText.trim(),
    hs_country: document.getElementById('r-c-country').innerText.trim(),
    hs_service: document.getElementById('rs-service').innerText.trim(),
    hs_extra: document.getElementById('extraserv-value').innerText.trim(),
    hs_payment: document.getElementById('r-pm-paymethod').innerText.trim()
  };

  alertSending.classList.add('form-message-loading_active')

  emailjs.send("service_ppww80m", "template_wdqyqqd", params)
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