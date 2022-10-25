// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont');
const smallMenu = document.querySelector('.header__sm-menu');
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu');
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
);
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link');

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active');
  } else {
    smallMenu.classList.add('header__sm-menu--active');
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none');
    headerHamMenuCloseBtn.classList.add('d-none');
  } else {
    headerHamMenuBtn.classList.add('d-none');
    headerHamMenuCloseBtn.classList.remove('d-none');
  }
});

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active');
    headerHamMenuBtn.classList.remove('d-none');
    headerHamMenuCloseBtn.classList.add('d-none');
  });
}

// --- // validação do form // --- //
const fields = document.querySelectorAll('[required]');
// console.log(fields);

function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    // for in intera com elementos que estiverem no objeto
    for (let error in field.validity) {
      // para saber só o valor
      // console.log(field.validity[error]);
      // se não for curtomError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }

    console.log(foundError);

    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: 'Por favor, preencha este campo',
      },
      email: {
        valueMissing: 'Email é obrigatório',
        typeMismatch: 'Por favor, preencha um email válido',
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector('span.error');
    if (message) {
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove('active');
      spanError.innerHTML = '';
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = 'red';
      setCustomMessage(message);
    } else {
      field.style.borderColor = 'green';
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

// ta pegando um dos input e alocando na variavel;
// for of intera com uma lista
for (let field of fields) {
  field.addEventListener('invalid', (event) => {
    // eliminar o bubble
    event.preventDefault();
    customValidation(event);
  });
  field.addEventListener('blur', customValidation);
}

// let formulario = document.querySelector('#form');

// formulario.addEventListener('submit', (e) => {
//   e.preventDefault();

//   alert('enviado com sucesso');
// });

const submitAlert = document.getElementById('form');
submitAlert.addEventListener('submit', () => {
  alert('Enviado com sucesso');
});
