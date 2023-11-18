let title =document.getElementById('title') ; 
let price =document.getElementById('price') ; 
let taxes =document.getElementById('taxes') ; 
let ads =document.getElementById('ads') ; 
let discount =document.getElementById('discount') ; 
let total =document.getElementById('total') ; 
let count =document.getElementById('count') ; 
let category =document.getElementById('category') ; 
let submit =document.getElementById('submit') ; 
let mode  = 'create' ;
let temp ;
let search =document.getElementById('search') ; 
let searchtitle =document.getElementById('searchtitle') ; 
let searchcategory =document.getElementById('searchcategory') ; 
let searchMode = 'title' ; 


function  getTOtal(){
    if(price.value !=' '){
        let result = (+price.value +  +taxes.value +  +ads.value)-  +discount.value ; 
        total.innerHTML = result ;
        total.style.background = '#040' ; 
    }
    else{
        total.innerHTML = '' ;
        total.style.background = '#a01010'
    }
}

let dataPro ;
if (localStorage.product !=null ) {
    dataPro = JSON.parse( localStorage.product);
}else{
    dataPro=[];
}

submit.addEventListener('click', function(){
    let nwePro= {
        title:title.value.toLowerCase() , 
        price:price.value  ,
        taxes:taxes.value  ,
        ads:ads.value  ,
        discount:discount.value  ,
        total:total.innerHTML ,
        count:count.value , 
        category:category.value.toLowerCase() , 
    }
    if(title.value != '' && price.value !='' && category.value !='' &&  nwePro.count < 101 ){
        if (mode === 'create') {
            if (nwePro.count > 1) {
            for (let e = 0; e < nwePro.count ; e++) {
                dataPro.push(nwePro);
            }
            }
            else{
                dataPro.push(nwePro);
            }
        }else{
            dataPro[temp] = nwePro; 
            mode = 'create' ;
            submit.innerHTML = 'Create' ; 
            count.style.display = 'block' ;
        }
        clearData(); 
    }


    

    localStorage.setItem('product', JSON.stringify(dataPro)) ;
    // clearData(); 
    showData() ; 
    height() ; 
    // console.log(dataPro)
})


function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
    discount.value = '';
}

function showData(){
    getTOtal() ;
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
    ` ; 
        // console.log(table)
    }
    document.getElementById('tbody').innerHTML = table ; 
    let deleteAll = document.getElementById('deleteAll')
    if (dataPro.length > 0 ) {
        deleteAll.innerHTML = `
        <button onclick="delAll()" id="delete">Delete All (${dataPro.length})</button>
        `
    }else{
        deleteAll.innerHTML = '' ; 
    }
}
showData()


function deleteData(i){
    dataPro.splice(i , 1) ; 
    localStorage.product = JSON.stringify(dataPro) ; 
    showData() ; 
    height()
}

function delAll(){
    localStorage.clear();
    dataPro.splice(0) ;
    showData();
    height()
}

function height() {
    if (dataPro.length <= 8 || dataPro.length < 0 ) {
        document.body.style.height = '100vh';
    } else {
        document.body.style.height = 'max-content';
    }
}

height(); 


function updateData(i){
    title.value = dataPro[i].title ; 
    price.value = dataPro[i].price ; 
    taxes.value = dataPro[i].taxes ; 
    ads.value = dataPro[i].ads ; 
    discount.value = dataPro[i].discount ; 
    getTOtal();
    count.style.display = 'none' ;
    category.value = dataPro[i].category ;
    submit.innerHTML = 'Update' ;
    mode  = 'update' ; 
    temp =  i ; 
    scroll({
        top:0 , behavior:"smooth"
    });
}

function getSearchMode(id){
    if (id === 'searchtitle') {
        searchMode = 'title' ; 
    }else{
        searchMode = 'category';
    } 
    search.placeholder = 'Search By '+ searchMode ;
    search.focus();
    search.value = '' ;
    height(); 
    showData();
}

function searchData(value){
    let table = '' ;
    for(let i=0; i < dataPro.length ; i++){
    if (searchMode === 'title') {
                if (dataPro[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                    </tr>
                ` ; 
                }
            }
            else{
                    if (dataPro[i].category.includes(value.toLowerCase())) {
                        table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">Update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                        </tr>
                    ` ; 
                    }
    }}
    height(); 
    document.getElementById('tbody').innerHTML = table ; 
}

// Clear all data in the local storage
// localStorage.clear();