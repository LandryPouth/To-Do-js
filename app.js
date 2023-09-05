const btn = document.querySelector('.btn');
const input = document.querySelector('#input');
const container = document.querySelector('.container');
const error = document.querySelector('.message');
let localData = []; 

const newData = JSON.parse(localStorage.getItem('toDo')) || [];

error.textContent = 'Que voulez vous faire??😶';

// lancer la fonction au click sur le bouton
btn.addEventListener('click', ()=> {
    if (input.value === '') {
        error.textContent = 'Désolé, vous devez entrer une tâche...😑';
        error.style.color = 'red';
    } else {
        setItems();
    }
})

// avoir les elts du local storage
function getItems() {
    if (newData.length > 0) {
        for(let i = 0; i < newData.length; i++) {
            //Create element
            let newLi = document.createElement('li');
            let label = document.createElement('label');
            let check = document.createElement('input');
            let exit = document.createElement('span');
            exit.textContent = '❌';

            if (newData[i].status) {
                check.setAttribute('type', 'checkbox');
                check.setAttribute('checked', 'true');
            } else {
                check.setAttribute('type', 'checkbox');
            }
            newLi.append(check, label, exit);
            container.append(newLi);

            label.textContent = newData[i].name;
            input.value = "";
        }
        deleteEl();
        statusChanger();
    }
}

function deleteEl() {
    let deleteBtn = document.querySelectorAll('span');
    deleteBtn.forEach((db, i) => {
        db.addEventListener('click', ()=> {deleteItem(i)});
    })
}

function deleteItem(i) {
    newData.splice(i, 1);
    localStorage.setItem('toDo', JSON.stringify(newData));
    location.reload();
}

function statusChanger() {
    let checkBtn = document.querySelectorAll('input');
    checkBtn.forEach((el, i) => {
        el.addEventListener('change', ()=> {
            changeObjectStatus(i);
            // checkObjectStatus(el, i);
        });
    })
}

function changeObjectStatus(i) {
    newData[i].status = !newData[i].status;
    localStorage.setItem('toDo', JSON.stringify(newData));
}

// function checkObjectStatus(el, i) {
//     if(newData[i].status == true) {
//         el.checked = true;
//     } else {
//         el.checked = false;
//     }
// }

//  ajouter au local storage
function setItems() {
    let localData = newData;
    let objData = {
        name : input.value.trim(),
        status : false,
        id : newId(),
    }
    localData.push(objData);
    localStorage.setItem('toDo', JSON.stringify(localData));
    location.reload()
}

function newId() {
    let random = Math.random() * 100;
    if(random === random) {
        return random
    }
}