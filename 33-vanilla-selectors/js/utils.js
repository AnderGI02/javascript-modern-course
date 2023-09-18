export function countWords(str) {
  return str.split(" ").length;
}

function countChars(str) {
    return str.split("").length;
}

export async function iterateNodes(array, callback) {
  for (var i = 0; i < array.length; ++i) {
    await callback(array[i]);
  }
}

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


export async function getJSON (select) {
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