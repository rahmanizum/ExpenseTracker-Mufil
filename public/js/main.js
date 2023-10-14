const namePlaceholder = document.querySelector('#namePlaceholder');
const lupdatePlaceholder = document.querySelector('#lupdatePlaceholder');
const expensePlaceholder = document.querySelector('#expensePlaceholder');
const totalPlaceholder = document.querySelector('#totalPlaceholder');

const myForm = document.querySelector('#myForm')
const category = myForm.querySelector('#category');
const pmethod = myForm.querySelector('#pmethod');
const amount = myForm.querySelector('#amount');
const date = myForm.querySelector('#date');
const submitbtn = myForm.querySelector('#submitbtn');
const successDiv = myForm.querySelector('#successDiv');
submitbtn.addEventListener('click',addExpense);
expensePlaceholder.addEventListener('click',deleteExpense);
let authenticatedAxios;
authentication();
function showOutput(response){
    expensePlaceholder.innerHTML = "";
    let totPrice = 0;
if(response.data.length>0){
    response.data.forEach((ele,index)=>{
        totPrice+=Number(ele.amount);
        const tr = document.createElement('tr');
        const html = 
        `<td>${index+1}</td>
        <td>${ele.category}</td>
        <td>${ele.pmethod}</td>
        <td> &#8377; ${ele.amount}</td>
        <td class="text-nowrap">${ele.date}</td>
        <td>
            <button class="btn btn-outline-danger delbtn" id="${ele.id}">
                Delete
            </button>
        </td>
        `;
        tr.innerHTML+=html;
        expensePlaceholder.appendChild(tr);

    })
    totalPlaceholder.innerHTML=`&#8377;${totPrice}`;
    const lastData = response.data[response.data.length-1];
    lupdatePlaceholder.innerHTML = lastData.date;
}

}
function clearFields(){
    category.value='';
    pmethod.value='';
    amount.value='';
    date.value='';
}
function authentication(){
    const tokenData = JSON.parse(localStorage.getItem('token'));
if(tokenData){
    const { token, name } = tokenData
    authenticatedAxios = axios.create({
        headers: {
          'Authorization': `${token}`,
          'userName':`Mufil`
        }
      });
      namePlaceholder.innerHTML=name;
}
else{
    window.location.href = "http://192.168.29.221:6565";
}
}

async function addExpense(e){
    if (e.target && e.target.classList.contains("submit") && myForm.checkValidity()){
        e.preventDefault();
        try {
            const data = {
                category:category.value,
                pmethod : pmethod.value ,
                amount : Number (amount.value),
                date:date.value
            }
            const response = await authenticatedAxios.post(`http://192.168.29.221:6565/expenses/addexpense`, data);
            successDiv.classList.remove('d-none');
            successDiv.classList.add('d-block');
            setTimeout(() => {
                successDiv.classList.remove('d-block');
                successDiv.classList.add('d-none');
                clearFields();
                refresh();
            }, 1500);
            
        } catch (error) {
            console.log(error);
        }
    }

}
async function deleteExpense(e){
    if (e.target && e.target.classList.contains("delbtn")){
        try {
            e.preventDefault();
            const dID = e.target.id;
            const response = await authenticatedAxios.delete(`http://192.168.29.221:6565/expenses/delete/${dID}`);
            setTimeout(() => {
                refresh();        
            }, 1000);
            alert(response.data.message);    
            
        } catch (error) {
            alert(error.response.data.message);
            refresh(); 
        }



    }
}

async function refresh(){
    try {
        const response = await authenticatedAxios.get(`http://192.168.29.221:6565/expenses/getexpenses`);
        showOutput(response);
        
    } catch (error) {
        if (error.response && error.response.status === 401){
        alert(error.response.data.message);
        window.location.href = "http://192.168.29.221:6565/home";   
        } else{
            alert ("Something went wrong");
            window.location.href = "http://192.168.29.221:6565/home"; 
        }
    }
}
refresh();
