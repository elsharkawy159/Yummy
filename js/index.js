// Aside
    $(".loading-screen").fadeOut(400)
var menuState = 0;
document.querySelector("#opener").addEventListener("click", ()=>{

        if(menuState === 0){
        menuState = 1;
        $("aside").css("left","0px");
        $(".open-close-icon").addClass("close fa-x")
        $(".open-close-icon").removeClass("fa-align-justify")
        $(".link").css("top","0px")
        $(".footer").css("right","0px")

    }
    else {
        menuState = 0;
        $("aside").css("left","-250px");
        $(".open-close-icon").removeClass("close fa-x")
        $(".open-close-icon").addClass("fa-align-justify")
        $(".link").css("top","200px")
        $(".footer").css("right","250px")
    }
})

function closeSide() {
        menuState = 0;
        $("aside").css("left","-250px");
        $(".open-close-icon").removeClass("close fa-x")
        $(".open-close-icon").addClass("fa-align-justify")
        $(".link").css("top","200px")
        $(".footer").css("right","250px")
}

//Page
let row = document.querySelector(".container .row");
///////
var searchinput = document.querySelector(".searchinput")
function getSearch() {
    row.innerHTML = `<div class="col-md-6">
            <input oninput="searchByName(this.value)" type="text" class="form-control searchinput searchName" placeholder="Search By Name">
            </div>
        <div class="col-md-6">
            <input oninput="searchByLetter(this.value)" type="text" maxlength="1" class="form-control searchinput searchFirstLetter" placeholder="Search By First Letter">
            </div>
            <div class="searchPage row gy-4 gx-4"></div>`
        
}
async function searchByName(nameValue) {
    if (nameValue == "") {
        document.querySelector(".searchPage").innerHTML = ""
        $(".loading-screen").fadeOut(400)
    } else {
    $(".loading-screen").fadeIn(400)
    var meal = []
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameValue}`)
    response = await response.json()
    for (let m = 0; m < response.meals.length; m++) {
        meal += `
        <div onclick="getMealDetails('${response.meals[m].idMeal}')" class="col-md-3 me-auto ms-auto d-flex justify-content-center">
            <div class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.meals[m].strMealThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex justify-content-center align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.meals[m].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    document.querySelector(".searchPage").innerHTML = meal
    }
}
async function searchByLetter(letterValue) {
    if (letterValue == "") {
        document.querySelector(".searchPage").innerHTML = ""
        $(".loading-screen").fadeOut(400)
    } else {
        $(".loading-screen").fadeIn(400)
    var meal = []
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterValue}`)
    response = await response.json()
    for (let m = 0; m < response.meals.length; m++) {
        meal += `
        <div onclick="getMealDetails('${response.meals[m].idMeal}')" class="col-md-3 me-auto ms-auto d-flex justify-content-center">
            <div class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.meals[m].strMealThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex justify-content-center align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.meals[m].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    document.querySelector(".searchPage").innerHTML = meal
    }
}

async function getCategories() {
    var categArr = []
    $(".loading-screen").fadeIn(400)
    row.innerHTML = ""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    for (let c = 0; c < response.categories.length; c++) {
        categArr += `
        <div class="col-md-3 d-flex justify-content-center">
            <div onclick="categoryitem('${response.categories[c].strCategory}')" class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.categories[c].strCategoryThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex flex-column align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.categories[c].strCategory}</h3>
                    <p>${response.categories[c].strCategoryDescription.split(/\s+/).slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>`
        
    }
    $(".loading-screen").fadeOut(400)
    row.innerHTML = categArr;
    
    
}
async function categoryitem(category){
    $(".loading-screen").fadeIn(400)
    var meal = []
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    for (let m = 0; m < response.meals.length; m++) {
        meal += `
        <div onclick="getMealDetails('${response.meals[m].idMeal}')" class="col-md-3 me-auto ms-auto d-flex justify-content-center">
            <div class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.meals[m].strMealThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex justify-content-center align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.meals[m].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    row.innerHTML = meal
}



async function getAreas() {
    var areaArr = [];
    $(".loading-screen").fadeIn(400)
    row.innerHTML = ''
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    response = await response.json()
    for (let a = 0; a < response.meals.length; a++) {
        areaArr += `
        <div onclick="areaItem('${response.meals[a].strArea}')" class="item areas col-md-3 d-flex align-items-center flex-column">
            <i class="fa-solid fa-house-laptop fa-4x text-light"></i>
            <h2 class="text-white mt-1">${response.meals[a].strArea}</h2>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    row.innerHTML = areaArr
}
async function areaItem(area){
    $(".loading-screen").fadeIn(400)
    var meal = []
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()
    for (let m = 0; m < response.meals.length; m++) {
        meal += `
        <div onclick="getMealDetails('${response.meals[m].idMeal}')" class="col-md-3 me-auto ms-auto d-flex justify-content-center">
            <div class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.meals[m].strMealThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex justify-content-center align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.meals[m].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    row.innerHTML = meal
}



async function ingredients() {
    var ingredientsArr = [];
    $(".loading-screen").fadeIn(400)
    row.innerHTML = ''
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    response = await response.json()
    for (let i = 0; i < 20; i++) {
        ingredientsArr += `
        <div onclick="ingredientItem('${response.meals[i].strIngredient}')" class="ingredients item col-md-3 text-center text-light">
            <i class="fa-solid fa-drumstick-bite fa-4x text-light mb-2"></i>
            <h3>${response.meals[i].strIngredient}</h3>
            <p>${response.meals[i].strDescription.split(/\s+/).slice(0, 20).join(" ")}</p>
        </div>`
    }
        $(".loading-screen").fadeOut(400)
        row.innerHTML = ingredientsArr

}
async function ingredientItem(ingredient){
    $(".loading-screen").fadeIn(400)
    var meal = []
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    response = await response.json()
    for (let m = 0; m < response.meals.length; m++) {
        meal += `
        <div onclick="getMealDetails('${response.meals[m].idMeal}')" class="col-md-3 me-auto ms-auto me-auto ms-auto d-flex justify-content-center">
            <div class="item position-relative rounded-4 overflow-hidden">
                <img class="img-fluid rounded-3" src="${response.meals[m].strMealThumb}" alt="">
                <div class="layer position-absolute rounded-3 d-flex justify-content-center align-items-center text-center p-1 pt-3">
                    <h3 class="fw-bold">${response.meals[m].strMeal}</h3>
                </div>
            </div>
        </div>`
    }
    $(".loading-screen").fadeOut(400)
    row.innerHTML = meal
}

async function getMealDetails(id) {
    $(".loading-screen").fadeIn(400)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    response = await response.json()
        row.innerHTML =
        `
            <div class="col-md-4 text-light">
                <img class="img-fluid rounded-3" src="${response.meals[0].strMealThumb}" alt="meal">
                <h2 class="text-center mt-2">${response.meals[0].strMeal}</h2>
            </div>
            <div class="col-md-8 text-light">
                <h3>Instructions</h3>
                <p>${response.meals[0].strInstructions}</p>
                <h3>Area : ${response.meals[0].strArea}</h3>
                <h3>Category : ${response.meals[0].strCategory}</h3>
                <h3>Recipes :<ul class="recipes">
                    <li class="alert alert-info">${response.meals[0].strIngredient1}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient2}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient3}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient4}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient5}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient6}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient7}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient8}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient9}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient10}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient11}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient12}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient13}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient14}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient15}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient16}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient17}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient18}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient19}</li>
                    <li class="alert alert-info">${response.meals[0].strIngredient20}</li>
                </ul>
                    
                </h3>
                <h3>Tags : 
                <div class="btns d-inline">
                <a class="btn btn-success" href="${response.meals[0].strSource}" target="_blank">Source</a>
                <a class="btn btn-danger" href="${response.meals[0].strYoutube}" target="_blank">Youtube</a>
                </div>
                </h3>
            </div>
        `
            $(".loading-screen").fadeOut(400)
    }
var submitBtn = document.querySelector(".submitBtn")
function getContactUs() {
    row.innerHTML = `        
                <div class="contactUs row position-absolute top-50 start-50 translate-middle w-75 gy-4 gx-4">
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="text" class="form-control nameInput" placeholder="Enter Your Name">
                        <p class="nameAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Special characters and numbers not allowed</p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="text" class="form-control emailInput" placeholder="Enter Your Email">
                        <p class="emailAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Email not valid *exemple@yyy.zzz</p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="text" class="form-control phoneInput" placeholder="Enter Your Phone">
                        <p class="phoneAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Enter valid Phone Number</p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="text" class="form-control ageInput" placeholder="Enter Your Age">
                        <p class="ageAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Enter valid age</p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="password" class="form-control passwordInput" placeholder="Enter Your Password">
                        <p class="passwordAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                    </div>
                    <div class="col-md-6">
                        <input onkeyup="inputsValidation()" type="password" class="form-control repasswordInput" placeholder="Confirm Password">
                        <p class="repasswordAlert p-3 text-center text-light bg-danger rounded-3 mt-1 d-none" style="--bs-bg-opacity: .5;">Enter valid repassword</p>
                    </div>
                    <button onclick="inputsValidation()" disabled
                        class="submitBtn col-md-2 m-auto mt-5 btn btn-outline-danger">Submit</button>
                </div>`



    document.querySelector(".nameInput").addEventListener("input", () => {
        nameInputTouched = true
    })

    document.querySelector(".emailInput").addEventListener("input", () => {
        emailInputTouched = true
    })

    document.querySelector(".phoneInput").addEventListener("input", () => {
        phoneInputTouched = true
    })

    document.querySelector(".ageInput").addEventListener("input", () => {
        ageInputTouched = true
    })

    document.querySelector(".passwordInput").addEventListener("input", () => {
        passwordInputTouched = true
    })

    document.querySelector(".repasswordInput").addEventListener("input", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.querySelector(".nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.querySelector(".nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.querySelector(".emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector(".emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.querySelector(".phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector(".phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.querySelector(".ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector(".ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.querySelector(".passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector(".passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.querySelector(".repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.querySelector(".repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
    console.log(nameValidation());
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.querySelector(".nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.querySelector(".emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector(".phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.querySelector(".ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.querySelector(".passwordInput").value))
}

function repasswordValidation() {
    return document.querySelector(".repasswordInput").value == document.getElementById(".passwordInput").value
}