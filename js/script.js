// https://github.com/amine-lotfi

const search_btn = document.getElementById("btn-search");
const country_input = document.getElementById("country-input");
const tip_text = document.getElementById("tip-text");
const result = document.getElementById("result-section");

search_btn.addEventListener("click", () => {

    tip_text.style.display = "none";

    if (country_input.value === "") {

        result.innerHTML = `<h5 class="text-center mt-5 text-danger" id="tip-text"><i class="bi bi-info-circle-fill"></i> You have not typed anything! Please enter a country name.<br>i.e: Germany</h5>`;

    } else {

        let country_name = country_input.value;
        let API_url = `https://restcountries.com/v3.1/name/${country_name}?fullText=true`;

        // ✱
        console.log(API_url);
        fetch(API_url)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data[0].name.common);

                result.innerHTML = `
    
            <div class="col">

                <div class="col text-center">
                    <h4 class="text-light res-elmnt">${data[0].name.common}</h4>
                    <p class="text-light res-elmnt">${data[0].name.official}</p>
                </div>

                <div class="col text-center">
                    <img src="${data[0].flags.svg}" class="img-fluid w-50 res-elmnt">
                </div>

            </div>

            <hr class="text-light mt-3 mb-3 w-50 mx-auto">

            <div class="row">

                <div class="col">
                    <p class="text-light mb-0 res-elmnt">✱ Capital: ${data[0].capital}</p>
                    <p class="text-light mb-0 res-elmnt">✱ Population: ${formatPopulation(data[0].population)}</p>
                    <p class="text-light mb-0 res-elmnt">✱ Continent: ${data[0].continents}</p>
                </div>

                <div class="col">
                    <p class="text-light mb-0 res-elmnt">✱ Codes: ${data[0].cca2} | ${data[0].ccn3}</p>
                    <p class="text-light mb-0 res-elmnt">✱ Currency: ${data[0].currencies[Object.keys(data[0].currencies)].name} | ${data[0].currencies[Object.keys(data[0].currencies)].symbol}</p>
                    <p class="text-light mb-0 res-elmnt">✱ Timezone: UTC +01:00</p>
                </div>

            </div>

            <hr class="text-light mt-3 mb-3 w-50 mx-auto">

                <div class="row">

                <div class="col text-center">
                    <p class="text-light mb-0 res-elmnt">✱ Language(s): ${Object.values(data[0].languages).toString().split(",").join(" | ")}</p>
                    <p class="text-light mb-0 res-elmnt">✱ Borders: ${Object.values(data[0].borders).toString().split(",").join(" | ")}</p>
                </div>

            </div>

            <hr class="text-light mt-3 mb-3 w-50 mx-auto">

            <div class="row">

                <div class="col text-center">
                    <p class="text-light mb-0">✱ Coat Of Arms:</p>
                    <img src="${data[0].coatOfArms.svg}" class="img-fluid w-25 res-elmnt" alt="Coat Of Arms not found">
                </div>

            </div>

            <hr class="text-light mt-3 mb-3 w-50 mx-auto">

            <div class="row text-center">

                <div class="col">
                    <a href="${data[0].maps.googleMaps}" class="btn btn-maps res-elmnt" target="_blank"><i class="bi bi-box-arrow-up-right"></i>
                        Maps</a>
                </div>

                <div class="col">
                    <a href="${data[0].maps.openStreetMaps}" class="btn btn-streets res-elmnt" target="_blank"><i class="bi bi-box-arrow-up-right"></i>
                        Streets</a>
                </div>

            </div>
        
            `;
            })
            .catch(() => {

                result.innerHTML = `<h5 class="text-center mt-5 text-danger res-elmnt" id="tip-text">:( Country not found. Please double check the spelling!</h5>`;

            });
    }
});

// this function will format the population number
function formatPopulation(population) {

    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

// this to add an event listener for the Enter key press event on the input field
country_input.addEventListener("keyup", function (event) {

    // check if the Enter key (key code 13) is pressed
    if (event.keyCode === 13) {

        // trigger a click event on the submit button
        search_btn.click();
    }
});