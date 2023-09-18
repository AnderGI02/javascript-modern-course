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