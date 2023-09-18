import { countChars } from "../utils.js";
export function renderTextareaCharacterCount (counter) {
    //textarea id=bio Tell us a bit about yourself
   const form_field = counter.parentElement.querySelector(".js-form-control");
   //spans con los caracteres hasta 200
   const char_counter_container = counter.querySelector(".js-count-chars"); 
   
   char_counter_container.innerHTML = countChars(form_field.value);
  
   form_field.addEventListener("keyup", function () {
     char_counter_container.innerHTML = countChars(form_field.value);
   });
  }