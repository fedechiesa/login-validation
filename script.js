document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const showHideButton = document.getElementById("show-hide");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });

  emailInput.addEventListener("blur", function () {
    validateEmail();
  });

  emailInput.addEventListener("change", function () {
    clearError(emailError);
  });

  passwordInput.addEventListener("change", function () {
    clearError(passwordError);
  });

  confirmPasswordInput.addEventListener("change", function () {
    clearError(confirmPasswordError);
  });

  showHideButton.addEventListener("click", () => {
    if (password.type == "password") {
      passwordInput.type = "text";
      confirmPasswordInput.type = "text";
    }else{
        passwordInput.type = 'password'
        confirmPasswordInput.type = 'password'
    }
  });

  function validateForm() {
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isMatched = validatePasswordMatch();

    if (isValidEmail && isValidPassword && isMatched) {
      saveToLocalStorage();
      alert("Has ingresado con exito!");
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValue = emailInput.value.trim();

    if (!emailRegex.test(emailValue)) {
      showError(emailError, "Ingresa un email correcto!");
      return false;
    }
    return true;
  }

  function validatePassword() {
    const passwordValue = passwordInput.value.trim();

    if (passwordValue.length < 6) {
      showError(passwordError, "Al menos debe tener 6 caracteres");
      return false;
    }
    return true;
  }

  function validatePasswordMatch() {
    const passwordValue = passwordInput.value.trim();
    const confirmPasswordValue = confirmPasswordInput.value.trim();

    if (passwordValue != confirmPasswordValue) {
      showError(confirmPasswordError, "Las contraseñas deben coincidir");
      return false;
    }
    return true;
  }

  const showError = (errorElement, message) => {
    errorElement.innerHTML = message;
    errorElement.style.display = "block";
  };

  const clearError = (errorElement) => {
    errorElement.innerHTML = "";
    errorElement.style.display = "none";
  };

  function saveToLocalStorage() {
    const emailValue = emailInput.value.trim();
    localStorage.setItem("email", emailValue);
    const body = bodyBuilderJSON();
    console.log(body);
  }

  function bodyBuilderJSON() {
    return {
      email: emailInput.value,
      password: passwordInput.value,
    };
  }
});
