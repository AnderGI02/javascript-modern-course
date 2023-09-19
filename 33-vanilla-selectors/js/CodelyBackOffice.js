import { iterateNodes } from "./utils.js";
import { getJSON } from "./callbacks/getJSON.js";
import { renderTextareaCharacterCount } from "./callbacks/renderTextareaCharacterCount.js";
import { toggleClassListHidden } from "./callbacks/toggleClassListHidden.js";
import { isFormValid } from "./validations.js";
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
    initCategoryFilter() {
      //Select element
      const filter = document.getElementById("category");
  
      filter.addEventListener("change", function () {
        const category = this.value;
  
        //div para cada curso
        const elementsToFilter = document.querySelectorAll(".js-filtered-item");

        iterateNodes(elementsToFilter, toggleClassListHidden);
      });
    },
    /*******************************************************************************************************************
     * Create user form
     ******************************************************************************************************************/
    initUserForm() {
      
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


