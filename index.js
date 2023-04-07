let elForm = elSelector(`.js-form`);
let elInput = elSelector(`.js-input`, elForm);
let elList = elSelector(`.js-list`);
let alTodoTemlate = elSelector(`.todo-template`).content;
let elCount = elSelector(`.count`)

let data = JSON.parse(localStorage.getItem(`allTodo`));
console.log(data);


let allTodo =   data ? data : [];

let onDelete = (evt) => {
  let arr = [];
  allTodo.forEach((todo) => {
    if (todo.id !== evt.target.dataset.id - 0) {
      arr.push(todo);

      console.log(todo);
    }
  });
  allTodo = arr;
  onRender(arr);
  localStorage.setItem(`allTodo` , JSON.stringify(arr))
};

let onEdit = (evt) => {
  allTodo.forEach((todo)=> {

    if (todo.id===evt.target.dataset.id -0 ) {
      let aditedText=prompt(` Edit todo` , todo.text)
      todo.text = aditedText
      
    }

  })
  console.log(evt.target.dataset.id -0 );
   onRender(allTodo);
    localStorage.setItem(`allTodo`, JSON.stringify(allTodo));
};

let onRender = (arr) => {
  elList.innerHTML = null;
  elCount.textContent= arr.length;

  arr.forEach((item) => {
    let elTodo = alTodoTemlate.cloneNode(true);
    elTodo.querySelector(`.todo-text`).textContent = item.text;
    let btnEdit = elTodo.querySelector(`.btn-edit`);
    let btnDelete = elTodo.querySelector(`.btn-delete`);

    btnDelete.dataset.id = item.id;
     btnEdit.dataset.id = item.id;
    

    btnEdit.addEventListener(`click`, onEdit);
    btnDelete.addEventListener(`click`, onDelete);

    elList.appendChild(elTodo);
  });
};

let onSubmit = (evt) => {
  evt.preventDefault();

  let inputValue = elInput.value.trim();

  if (!inputValue) {
    alert(`inpot todo`);
  }

  let newTodo = {
    id: allTodo.at(0)? allTodo.at(0)?.id + 1 : 1,
    text: inputValue,
    isCompleted: false,
  };

  allTodo.unshift(newTodo);
  onRender(allTodo);
  localStorage.setItem(`allTodo`, JSON.stringify(allTodo));

  elInput.value = null;
  elInput.focus();
};
 onRender(allTodo)

elForm.addEventListener(`submit`, onSubmit);

