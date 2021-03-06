const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('todo-add');
const todoList = document.getElementById('todolist');
const inputCount = document.getElementById('input-count');
const inputTotal=document.getElementById('total');
const inputTotalDone=document.getElementById("total-done");





let tempStorage = getTodosFromLocalStorage();
tempStorage === null ? tempStorage = [] : tempStorage;
setTodosToLocalStorage(tempStorage);

addButton.addEventListener('click', handleAddTodoItem);
todoList.addEventListener('click', handleItemClick);
todoInput.addEventListener('keydown', handleInputCount);

function handleInputCount(event) {
    const count = event.target.value.length;

    if (count === 0) {
       inputCount.innerText = '';
        return;
        
    }
  

    inputCount.innerText = 'Count: ' + count;
}

function handleItemClick(event) {
    let tempStorage = getTodosFromLocalStorage();
    const itemId = parseInt(event.target.closest('li').dataset.todoid);
    if (event.target.dataset.action === 'remove') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) { 
           
      
        itemId !== tempStorage[i].id ? newStorageArray.push(tempStorage[i]): newStorageArray;

        setTodosToLocalStorage(newStorageArray);

        event.target.closest('li').remove();

        let total=event.target.value++;
        inputTotal.innerText='total:'+total;


        let count=  event.target.value.length;
        inputTotalDone.innerText="total-done:"+ (count===total);
          
         
         
        }
    }
    if (event.target.dataset.action === 'status') {
        let newStorageArray = [];
        for (let i = 0; i < tempStorage.length; i++) {
        
    itemId === tempStorage[i].id? tempStorage[i].status =!tempStorage[i].status:newStorageArray;
         newStorageArray.push(tempStorage[i]);
         setTodosToLocalStorage(newStorageArray)}
     
        event.target.closest('li').classList.toggle('complete');
} }


for (let i = 0; i < tempStorage.length; i++) {
    renderTodoItem(tempStorage[i].text, tempStorage[i].status, tempStorage[i].id);
}

function handleAddTodoItem() {
    let tempStorage = getTodosFromLocalStorage();
    let id = tempStorage.length;

    tempStorage.push({
        id: id,
        text: todoInput.value,
        status: false,
    })
    setTodosToLocalStorage(tempStorage);
    renderTodoItem(todoInput.value, false, id);
    todoInput.value = '';
    inputCount.innerText = '';
    
    
}

function renderTodoItem(text, status, id) {
    const listItem = document.createElement('li');
    const listItemRemoveBtn = document.createElement('button');
    const listCheckboxStatus = document.createElement('input');
    const listTextSpan = document.createElement('span');
    listItem.classList.add('todolist__item');
    listItemRemoveBtn.innerText = 'x';
    listItemRemoveBtn.setAttribute('data-action', 'remove');
    listTextSpan.innerText = text;
    listCheckboxStatus.type = 'checkbox';
    listCheckboxStatus.checked = status;
    if (status) {
        listItem.classList.add('complete');
    }
    listCheckboxStatus.setAttribute('data-action', 'status')

    listItem.append(listCheckboxStatus)
    listItem.append(listTextSpan)
    listItem.append(listItemRemoveBtn)
    listItem.setAttribute('data-todoid', id);
    todoList.append(listItem);
    todoList.prepend (inputTotal);
    todoList.append(inputTotalDone)
   

    
     let total=id;
    inputTotal.innerText='total:'+total;
   
  
   
    let count=  event.target.value.length;
    inputTotalDone.innerText="total-done:"+(id===count);
    
     
    }

  

// Helper functions 
function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'))
}
function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
}

 
