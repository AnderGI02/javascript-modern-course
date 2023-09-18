import $ from "jquery";

import { countChars, iterateNodes } from "./utils.js";

export const CodelyBackoffice = {
    /*******************************************************************************************************************
     * Common features
     ******************************************************************************************************************/
    initCommon() {
      /**
       * Show/hide an element based on a change in another field.
       */
      const trigger = document.querySelector(".js-trigger-container");
  
      trigger.addEventListener("click", function () {
        document
          .getElementById(trigger.getAttribute("rel"))
          .classList.toggle("hidden");
      });
    },
    /*******************************************************************************************************************
     * Common forms functions
     ******************************************************************************************************************/
    initForms () {
      /**
       * Count character in selected fields
       */
      const contentCounters = document.querySelectorAll(".js-count-content");
  
      //callback mover
      function renderTextareaCharacterCount (counter) {
        //textarea id=bio Tell us a bit about yourself
       const form_field = counter.parentElement.querySelector(".js-form-control");
       //spans con los caracteres hasta 200
       const char_counter_container = counter.querySelector(".js-count-chars"); 
       
       char_counter_container.innerHTML = countChars(form_field.value);
 
       form_field.addEventListener("keyup", function () {
         char_counter_container.innerHTML = countChars(form_field.value);
       });
     }
      iterateNodes(contentCounters, renderTextareaCharacterCount);
  
      /**
       * Load select data
       */
      const dataLoaders = document.querySelectorAll(".js-load-data");
      //callback mover
      async function getJSON (select) {
        // eslint-disable-next-line jquery/no-ajax
        try{
          const reponse = await fetch(`http://${"localhost" == document.domain ? "localhost:8080" : document.domain}/data/${select.getAttribute("data-type")}.json`)
          const data = reponse.json()
          renderJSON(data)
        }catch(err){
          return;
        }  
      }
      function renderJSON (json) {
        if (json && json.data) {
          for (let i = 0, len = json.data.length; i < len; i++) {
            const option = document.createElement("option");
            option.textContent = json.data[i].name;
            select.append(option);
          }
        } else {
          console.warn(
            "Could not find" + select.getAttribute("data-type") + ".json"
          );
        }
      }
      iterateNodes(dataLoaders, getJSON);
    },
    /*******************************************************************************************************************
     * Filter courses by category
     ******************************************************************************************************************/
    initCategoryFilter: function () {
      var filter = document.getElementById("category");
  
      filter.addEventListener("change", function () {
        var category = this.value;
  
        var elementsToFilter = document.querySelectorAll(".js-filtered-item");
  
        iterateNodes(elementsToFilter, function (element) {
          if (category && category !== element.getAttribute("data-category")) {
            element.classList.add("hidden");
          } else {
            element.classList.remove("hidden");
          }
        });
      });
    },
    /*******************************************************************************************************************
     * Create user form
     ******************************************************************************************************************/
    initUserForm: function () {
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
  
      function isFormValid() {
        document.getElementById("user_form_error").classList.add("hidden");
  
        const formControls = document.querySelectorAll(".js-form-control");
  
        iterateNodes(formControls, function (control) {
          control.classList.remove("error");
        });
  
        const isValid =
          validateRequiredField(document.getElementById("first_name")) &&
          validateRequiredField(document.getElementById("last_name")) &&
          validateEmail() &&
          validateDob() &&
          validateRequiredField(document.getElementById("country")) &&
          validateBio();
  
        if (!isValid) {
          document.getElementById("user_form_error").classList.remove("hidden");
        }
  
        return isValid;
      }
  
      document
        .getElementById("user_form")
        .addEventListener("submit", function (ev) {
          ev.preventDefault();
  
          if (isFormValid()) {
            this.classList.add("hidden");
            document.getElementById("thanks").classList.remove("hidden");
          }
        });
    },
  };


