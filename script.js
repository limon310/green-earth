// get parent container
const categoriesContainer = document.getElementById("categories-container");
const allPlants = document.getElementById("all-plants");
const historyContainer = document.getElementById("history-container");
const plantDetailModal = document.getElementById("plants-details-modal");
const modalContainer = document.getElementById("modal-container");
let historyCard = [];
function getElement(id) {
    const element = document.getElementById(id);
    return element;
}
// load categories section
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => {
        showLoadCategories(data.categories)
    })
    .catch(err =>{
        console.log(err);
    })
}
// load categories tree by name
const loadPlantsByName = (id)=>{
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    // console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showPlantsByName(data.plants)
    })
}
// show categories plants by name
const showPlantsByName = (trees)=>{
    // console.log(trees)
    allPlants.innerHTML="";
    trees.forEach(tree =>{
        // console.log(tree)
        allPlants.innerHTML +=`
        <div  id="${tree.id}" class = "bg-white p-3 rounded-md w-auto shadow-sm">
        <img class = "rounded-lg w-[310px] h-[250px]" src="${tree.image}">
        <h1 class="text-base font-semibold mt-2 mb-2 cursor-pointer">${tree.name}</h1>
        <h4 class="line-clamp-2 text-[14px] text-gray-500 mb-4">${tree.description}</h4>
        <div class="flex justify-between items-center">
        <button class="btn rounded-full text-green-700 mb-3">${tree.category}</button>
        <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span id="tree-price">${tree.price}</span></p>
        </div>
        <button class="btn bg-[#15803D] rounded-full w-full text-base font-medium text-white add-btn">Add to Cart</button>
        </div>
        `
    })
    manageSpinner(false)
}
// show load categories
const showLoadCategories = (categories) =>{
    categoriesContainer.innerHTML = "";
    // console.log(categories)
    categories.forEach(categorie =>{
        // console.log(categorie)
        //create new div
        categoriesContainer.innerHTML +=`
        <h1 class="cursor-pointer hover:bg-green-600 hover:p-2 hover:rounded-lg hover:w-full" onclick="loadPlantsByName(${categorie.id})">${categorie.category_name}</h1>
        `
    })
    categoriesContainer.addEventListener("click", (e)=>{
        const allCategories = document.querySelectorAll("h1");
    allCategories.forEach(categorie =>{
        categorie.classList.remove("categoriesBtn");
    })
            if(e.target.tagName === "H1"){
                e.target.classList.add("categoriesBtn")
            }
        })
}

// manage spinner
const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        allPlants.classList.add("hidden")
    }
    else{
        allPlants.classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden");
    }
}


// load all plants
const loadAllPlants = () =>{
    manageSpinner(true)
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
        // console.log(data.plants)
        showAllPlants(data.plants)
    })
    .catch(err =>{
        console.log(err)
    })
}
// load plant details
const loadPlantDetails = (id) =>{
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
}
// show all plants
const showAllPlants = (plants) =>{
    // console.log(plants)
    allPlants.innerHTML="";
    plants.forEach(plant =>{
        // console.log(plant)
        allPlants.innerHTML +=`
        <div id="${plant.id}" class = "bg-white p-3 rounded-md w-auto shadow-sm">
        <img class = "rounded-lg w-[310px] h-[250px]" src="${plant.image}">
        <h1 class="text-base font-semibold mt-2 mb-2 cursor-pointer">${plant.name}</h1>
        <h4 class="line-clamp-2 text-[14px] text-gray-500 mb-4">${plant.description}</h4>
        <div class="flex justify-between items-center">
        <button class="btn rounded-full text-green-700 mb-3">${plant.category}</button>
        <p><i class="fa-solid fa-bangladeshi-taka-sign"></i><span id="tree-price">${plant.price}</span></p>
        </div>
        <button class="btn bg-[#15803D] rounded-full w-full text-base font-medium text-white add-btn">Add to Cart</button>
        </div>
        
        `
    })
    manageSpinner(false)
};
// ****** ADD TO CARD HISTORY ******
allPlants.addEventListener("click", (e) =>{
    if(e.target.innerText ==="Add to Cart"){
        const title = e.target.parentNode.children[1].innerText
        const id = e.target.parentNode.id
        const price = e.target.parentNode.children[3].children[1].children[1].innerText
        historyCard.push({
            title: title,
            price: price,
            id: id
        })
        showHistoryCard(historyCard);
    }
    if(e.target.tagName === "H1"){
        handlePlantsDetails(e)
        
    }
})
// show plants details modal
const handlePlantsDetails = (e)=>{
    const id = e.target.parentNode.id
    // console.log(id)
        fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => {
            showPlantDetailModal(data.plants)
        })
        .catch(err=>{
            console.log(err)
        })

}
// show plants details modal
const showPlantDetailModal = (modal)=>{
    // console.log(modal)
    modalContainer.innerHTML = "";
    plantDetailModal.showModal()
    modalContainer.innerHTML += `
    <div class="bg-white p-2">
    <h1 class="mb-3 text-2xl font-semibold">${modal.name}</h1>
    <img class="w-[500px] h-[250px] rounded-lg" src = "${modal.image}">
    <p class="text-lg font-semibold mt-2">Category: <spna class="text-gray-500 text-base">${modal.category}</span></p>
    <p class="text-lg font-semibold mt-2">Price: <spna class="text-gray-500 text-base">${modal.price}</span></p>
    <p class="text-lg font-semibold mt-2 line-clamp-2">Description: <spna class="text-gray-500 text-base">${modal.description}</span></p>
    </div>
    `
}

// show history card
const showHistoryCard = (histories) =>{
    // console.log(histories)
    historyContainer.innerHTML = "";
    histories.forEach(history =>{
        historyContainer.innerHTML += `
        <div class="p-3 flex justify-between items-center bg-[#F0FDF4] rounded-md">
        <div>
        <h3 class="mb-2 font-semibold">${history.title}</h3>
        <p class="text-gray-500"><span>${history.price}</span> <i class="fa-solid fa-xmark text-gray-500"></i> 1</p>
        </div>
        <div id="parent" class="flex justify-between cursor-pointer">
        <span><i id="closeBtn" onclick="handleDelete('${history.title}')" class="fa-solid fa-xmark text-gray-500"></i></span>
        </div>
        </div>
        `
    })
    
}
// handle delete
const handleDelete = (historieId) =>{
    const item = historyCard.find(data => data.title === historieId);
    const filterHistory = historyCard.filter(data => data.title !== historieId)
    historyCard = filterHistory
    showHistoryCard(historyCard)
    if(item){
        const total = document.getElementById("price").innerText;
        const totalPrice = Number(total) - Number(item.price);
        getElement("price").innerText = totalPrice;
    }
}
// price calculation
allPlants.addEventListener("click", (e) =>{
    if(e.target.className.includes("add-btn")){
    const price = e.target.parentNode.children[3].children[1].children[1].innerText
    // console.log(price)
    const total = document.getElementById("price").innerText;
    const totalPrice = Number(total) + Number(price);
    // console.log(totalPrice)
    getElement("price").innerText = totalPrice;
    }
})

loadAllPlants();
loadCategories();