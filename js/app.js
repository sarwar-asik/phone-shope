console.log('Hi from app.js');

const loadPhone = async(searchField) =>{

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    const res = await fetch(url);
    const data =  await res.json();
    displayPhone(data.data);
};

const displayPhone = phones =>{
// console.log(phone);
const phoneContainer = document.getElementById('phone-container');
phoneContainer.innerHTML ='';

// show all///
if(phones.length > 10){
    phones = phones.slice(0,10);
    const showAll = document.getElementById("show-all");
    showAll.classList.remove('d-none');
    showAll.classList.add('d-none');
}


// display 29 phone////
// "no-found-message"
const noPhone = document.getElementById("no-found-message");

if(phones.length === 0){
noPhone.classList.remove('d-none');
}
else{
    noPhone.classList.add('d-none');
} 

phones.forEach(phone => {
    console.log(phone);
const phoneDiv = document.createElement('div');
phoneDiv.classList.add('col','p-5','rounded-lg');
phoneDiv.innerHTML = `
<div class="card">
                        <img src="${phone.image}" class="card-img-top py-3 px-2" alt="...">
                        <div class="card-body">
                          <h3 class="card-title">${phone.brand}</h3>
                          <h4> ${phone.phone_name}</h4>

                          <p class="card-text">Slug: ${phone.slug}</p>
                        </div>
                      </div>
`;
phoneContainer.appendChild(phoneDiv)
});
toggleSpiner(false);
}
// search button click //////
document.getElementById('btn-search').addEventListener('click',function(){
// start loader ////
toggleSpiner(true);
const searchField = document.getElementById("search-field");
const searchText = searchField.value;
searchField.value = '';
loadPhone(searchText)

})
 
const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

// loadPhone()
