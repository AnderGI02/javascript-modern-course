
import { getJSON, iterateNodes, renderTextareaCharacterCount } from "./utils.js";

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
    initForms() {
      /**
       * Count character in selected fields
       */
      const contentCounters = document.querySelectorAll(".js-count-content");
  
      iterateNodes(contentCounters, renderTextareaCharacterCount);
  
      /**
       * Load select data
       */
      const dataLoaders = document.querySelectorAll(".js-load-data");
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


