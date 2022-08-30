// console.log('Hi from app.js');

const loadPhone = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data =  await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones , dataLimit) =>{
// console.log(phone);
const phoneContainer = document.getElementById('phone-container');
phoneContainer.textContent ='';

//  show  all button  ///
const showAll = document.getElementById("show-all");
if(dataLimit && phones.length > 5){
    phones = phones.slice(0, 5);
    showAll.classList.remove('d-none')
}
else{
    showAll.classList.add('d-none')
}


// display 20 phone////
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
                          
                          <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Datail</button>
                          

                        </div>
                      </div>
`;
phoneContainer.appendChild(phoneDiv)
});
toggleSpiner(false);
}

/////this commmon function is for loader and show all button////
const processSearch = (dataLimit)=>{
    toggleSpiner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText,dataLimit)
    
}

// search button click //////
document.getElementById('btn-search').addEventListener('click',function(){
// start loader ////
processSearch(5)

})

// search input enter key ///
document.getElementById("search-field").addEventListener('keypress',function(e){

    if(e.key === 'Enter'){
        processSearch(5);
    }
});
 

// loading/////
const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById("loader");
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none')
    }
}



// for show all  but it is not the best way ....
document.getElementById("btn-show-all").addEventListener('click', function(){
    processSearch();
    const searchField = document.getElementById("search-field");
    searchField.value = '';
    
    })


// for datail of  phone ////

const loadPhoneDetail = async id =>{

    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

};

const displayPhoneDetails = phone =>{
console.log(phone);
const modalTittle = document.getElementById("exampleModalLabel");
modalTittle.innerText = phone.name;
const modalDetail = document.getElementById("modal-datile");
modalDetail.innerText = phone.mainFeatures.displaySize;

const modalImg = document.getElementById("modal-img");
modalImg.textContent = '';
const imgDiv = document.createElement('div');

imgDiv.innerHTML = `
<h6>Realease Date : ${phone.releaseDate ?phone.releaseDate : 'Upcoming Soon' }</h6>
<h2> Mamory:${phone.mainFeatures.memory}</h2>
<img  src="${phone.image}" alt="" sizes="" srcset="">
<p>@Contact... www.SHSmartPhoneShope.com </p>`
modalImg.appendChild(imgDiv);

};


loadPhone('a')
