 function validateRequiredField(field) {
    const isValid = !!field.value;

    if (!isValid) {
      field.classList.add("error");
    }
    return isValid;
  }

  function validateEmail() {
    const field = document.getElementById("email");
    const isValid = new RegExp(
      "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
    ).test(field.value);

    if (!isValid) {
      field.classList.add("error");
    }
    return isValid;
  }

  function validateDob() {
    const field = document.getElementById("dob");
    const date = +new Date(field.value);
    const now = +new Date();
    const isValid = Math.abs(new Date(now - date).getUTCFullYear() - 1970) > 18;

    if (!isValid) {
      field.classList.add("error");
    }
    return isValid;
  }

  function validateBio() {
    const field = document.getElementById("bio");
    const fieldLength = field.value.length;
    const isValid = fieldLength > 0 && field.value.length <= 200;

    if (!isValid) {
      field.classList.add("error");
    }
    return isValid;
  }
     
  const isValid =
    validateRequiredField(document.getElementById("first_name")) &&
    validateRequiredField(document.getElementById("last_name")) &&
    validateEmail() &&
    validateDob() &&
    validateRequiredField(document.getElementById("country")) &&
    validateBio();

   export function isFormValid() {
        document.getElementById("user_form_error").classList.add("hidden");
  
        const formControls = document.querySelectorAll(".js-form-control");
  
        iterateNodes(formControls, function (control) {
          control.classList.remove("error");
        });

  
        if (!isValid) {
          document.getElementById("user_form_error").classList.remove("hidden");
        }
  
        return isValid;
      }