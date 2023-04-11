let elForm = elSelector(`.js-form`);
let elInput = elSelector(`.js-input`, elForm);
let elList = elSelector(`.js-list`);
let alTodoTemlate = elSelector(`.todo-template`).content;
let elCount = elSelector(`.count`);

let data = JSON.parse(localStorage.getItem(`allTodo`));
console.log(data);
let allTodo = data ? data : [];


let onCompleted = (id, isCompleted) => {
  allTodo.forEach((todo) => {
    if (todo.id === id) {
      todo.isCompleted = isCompleted;
    }
  });
  console.log(allTodo);
  localStorage.setItem(`allTodo`, JSON.stringify(allTodo));
  onRender(allTodo);
};

let onDelete = (id) => {
  let arr = [];

  allTodo.forEach((todo) => {
    if (todo.id !== id) {
      arr.push(todo);

      console.log(todo);
    }
  });
  allTodo = arr;
  onRender(arr);
  localStorage.setItem(`allTodo`, JSON.stringify(arr));
};

let onEdit = (id) => {
  allTodo.forEach((todo) => {
    if (todo.id === id) {
      let aditedText = prompt(` Edit todo`, todo.text);
      todo.text = aditedText;
    }
  });

  onRender(allTodo);
  localStorage.setItem(`allTodo`, JSON.stringify(allTodo));
};

let onRender = (arr) => {
  elList.innerHTML = null;
  elCount.textContent = arr.length;

  arr.forEach((item) => {
    let elTodo = alTodoTemlate.cloneNode(true);
    let elLi = elTodo.querySelector(`.todo`);
    let elText = elTodo.querySelector(`.todo-text`);
    let btnEdit = elTodo.querySelector(`.btn-edit`);
    let btnDelete = elTodo.querySelector(`.btn-delete`);
    let elCheckbox = elTodo.querySelector(`.todo-check`);

    if (item.isCompleted) {
      elText.classList.add(`text-decoration-line-through`);
    }

    elCheckbox.checked = item.isCompleted;
    elText.textContent = item.text;

    elLi.dataset.id = item.id;

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
    id: allTodo.at(0) ? allTodo.at(0)?.id + 1 : 1,
    text: inputValue,
    isCompleted: false,
  };

  allTodo.unshift(newTodo);
  onRender(allTodo);
  localStorage.setItem(`allTodo`, JSON.stringify(allTodo));

  elInput.value = null;
  elInput.focus();
};

let eventDelegation = (evt) => {
  let parentElement = evt.target.closest(`.todo`);
  let elid = parentElement.dataset.id - 0;
  if (evt.target.matches(`.btn-delete`)) {
    onDelete(elid);
  } else if (evt.target.matches(`.btn-edit`)) {
    onEdit(elid);
  } else if (evt.target.matches(`.todo-check`)) {
    onCompleted(elid, evt.target.checked);
  }
};

onRender(allTodo);
elForm.addEventListener(`submit`, onSubmit);
elList.addEventListener(`click`, eventDelegation);
