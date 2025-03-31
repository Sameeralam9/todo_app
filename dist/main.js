const todoInput = document.querySelector("#todoInput");
const deadline = document.querySelector("#deadline");
const addBtn = document.querySelector("#AddBtn");
const menuBtn = document.querySelector("#menu");
const menubar = document.querySelector("#menuBar");
const upcoming = document.querySelector("#upcoming");
const overdueTodos = document.querySelector("#overdue");
const todaysTodo = document.querySelector("#today");
const compeletedTodo = document.querySelector("#completed");
const todoHolder = document.querySelector("#todoHolder");

const todosArray = JSON.parse(localStorage.getItem("todos")) || [];
function saveToLocalStorege() {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

/////////////////////////////////// Add Todo Function ///////////////////////////////////////////

function addTodo() {
  if (todoInput.value === "") {
    alert("Todo Input Fied Should Not Be Empty");
    return;
  }
  const { newDate, upComingDateVal } = date();

  const todoObj = {
    id: crypto.randomUUID(),
    todo: todoInput.value,
    completed: false,
    date: {
      todaysDate: newDate,
      deadline: upComingDateVal,
      completed: undefined,
    },
  };
  todosArray.unshift(todoObj);
  todoInput.value = "";
  deadline.value = "";
  saveToLocalStorege();
  const newTodo = todo(todoObj);
  todoHolder.insertBefore(newTodo, todoHolder.firstChild);

}

//////////////////////////////////////////edit Section/////////////////////////////////////////////////
function edit(e) {
  const { id, holder } = findId(e);
  if (!id) return;
  const txt = holder.querySelector("span");
  editVal(holder, txt, id);
}

function editVal(holder, txt, id) {
  const editDiv = document.createElement("div");
  const input = document.createElement("input");
  input.className =
    "bg-blue-50 outline-0 p-2 md:w-80  w-60 border border-blue-200 rounded-2xl text-center";
  input.value = txt.innerText;
  const updateBtn = document.createElement("button");
  updateBtn.className =
    "bg-blue-500 p-2 w-35 text-white mt-4 font-bold rounded-2xl cursor-pointer";
  updateBtn.innerText = "Update";
  updateBtn.addEventListener("click", () =>
    saveChanges(id, holder, input.value)
  );
  editDiv.appendChild(input);
  editDiv.appendChild(updateBtn);
  holder.innerHTML = "";
  holder.appendChild(editDiv);
}
function saveChanges(id, holder, newVal) {
  const index = todosArray.findIndex((val) => val.id === id);
  if (!newVal.trim()) {
    alert("Input Field Should Not Be Empty");
    return;
  }
  todosArray[index].todo = newVal;
  saveToLocalStorege();
  holder.innerHTML = "";
  const updatedVal = todo(todosArray[index]);
  todoHolder.replaceChild(updatedVal, holder);
}
////////////////////////////////////////// date usage//////////////////////////////////////////////
function date() {
  const date = new Date();
  const newDate = date.toLocaleString().split(",")[0];
  const upComingDate =
    deadline.value === "" ? "" : new Date(`${deadline.value}`);
  const upComingDateVal = upComingDate.toLocaleString().split(",")[0];

  return { newDate, upComingDateVal };
}

//////////////////////////////////////Today Section ///////////////////////////////////////////////
function today() {
  const { newDate } = date();
  const allTodaysTodo = todosArray.filter(
    (val) =>
      val.date.todaysDate === newDate &&
      val.completed === false &&
      (val.date.deadline === newDate || val.date.deadline === "")
  );
  todoHolder.innerHTML = "";
  saveToLocalStorege();
  allTodaysTodo.forEach((val) => {
    const newTodo = todo(val);
    todoHolder.appendChild(newTodo);
  });
}

////////////////////////////////////// Upcoming Section ///////////////////////////////////////////

function upcomingTodos() {
  todoHolder.innerHTML = "";
  const { newDate } = date();
  const comingTodo = todosArray.filter((val) => {
    return (
      val.date.deadline !== newDate &&
      val.date.deadline !== "" &&
      val.completed === false
    );
  });
  comingTodo.forEach((val) => {
    const newTodo = todo(val);
    todoHolder.appendChild(newTodo);
  });
}

///////////////////////////////////////// Overdue Section ///////////////////////////////////////////////////

function Overdue() {
  todoHolder.innerHTML = "";
  const overTodos = todosArray.filter((val) => {
    return val.date.deadline !== "" && val.date.deadline < val.date.todaysDate;
  });
  overTodos.forEach((val) => {
    const newTodo = todo(val);
    todoHolder.appendChild(newTodo);
  });
}

///////////////////////////////////complete  Section/////////////////////////////////////////////////////////

function checkboxCompleted(e, checkbox) {
  const { newDate } = date();
  const { id, holder } = findId(e);
  if (checkbox.checked) {
    todosArray.map((val) => {
      if (val.id === id) {
        val.completed = true;
        val.date.completed = newDate;
      }
    });
    saveToLocalStorege();
    holder.remove();
  }
}

function completedTodos() {
  const completed = todosArray.filter((val) => val.completed === true);
  todoHolder.innerHTML = "";
  completed.forEach((val) => {
    const newTodo = todo(val);

    todoHolder.appendChild(newTodo);
  });
}

///////////////////////////////delete function/////////////////////////////////////////////
function del(e) {
  const { id, holder } = findId(e);
  let index = todosArray.findIndex((val) => val.id === id);
  todosArray.splice(index, 1);
  saveToLocalStorege();
  holder.remove();
}
///////////////////finding id with event deligation//////////////////////////
function findId(e) {
  const id = e.target.closest("[data=todos]")?.id;
  const holder = e.target.closest("[data=todos]");
  return { id, holder };
}

// /////////////////////////initial Load///////////////////////////////

function initial() {
  todosArray.forEach((val) => {
    if (val.completed !== true) {
      const newTodo = todo(val);
      todoHolder.appendChild(newTodo);
    }
  });
}
initial();
//////////////// event Listeners ///////////////////////

addBtn.addEventListener("click", addTodo);
todaysTodo.addEventListener("click", today);
upcoming.addEventListener("click", upcomingTodos);
overdueTodos.addEventListener("click", Overdue);
compeletedTodo.addEventListener("click", completedTodos);

////////////////////////////// UI Generation////////////////////////////////////////////////////////
menuBtn.addEventListener("click", (e) => {
  e.target.closest("#menu");
  menubar.classList.toggle("translate-x-0");
});

function todo(val) {
  const outer = document.createElement("div");
  outer.className =
    "border border-gray-300 pl-2 pr-2 md:pl-6 md:pr-8 rounded-3xl mb-2.5";
  outer.setAttribute("id", val.id);
  outer.setAttribute("data", "todos");
  const inner = document.createElement("div");
  inner.setAttribute("id", "mainholder");
  inner.className = "flex justify-between item-center pl-4 pr-4 pt-4 pb-4";

  const textHolder = document.createElement("span");
  textHolder.setAttribute("id", "todoVal");
  textHolder.textContent = val.todo;
  textHolder.className = "font-bold tracking-widest subpixel-antialiased";
  const btnHolder = document.createElement("div");
  btnHolder.className = "flex gap-3";

  if (val.completed !== true) {
    const editBtn = document.createElement("button");
    const editImg = document.createElement("img");
    editImg.setAttribute("src", "./logos/draw.png");
    editImg.className = "w-4 cursor-pointer md:w-5";
    editBtn.appendChild(editImg);
    editBtn.addEventListener("click", (e) => edit(e));
    btnHolder.appendChild(editBtn);
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = " cursor-pointer";
    checkbox.addEventListener("change", (e) => checkboxCompleted(e, checkbox));
    inner.appendChild(checkbox);
  }

  const delBtn = document.createElement("button");
  const delImg = document.createElement("img");
  delImg.setAttribute("src", "./logos/trash.png");
  delImg.className = "w-4 cursor-pointer md:w-5";
  delBtn.addEventListener("click", (e) => del(e));
  delBtn.appendChild(delImg);

  btnHolder.appendChild(delBtn);

  inner.appendChild(textHolder);
  inner.appendChild(btnHolder);
  outer.appendChild(inner);
  /////////////////////// has to be fixed date//////////////
  // if (val.date.deadline !== "") {
  //   const dateHolder = document.createElement("span");
  //   dateHolder.className = "text-sm text-gray-600 italic pl-20 p-0 m-0";
  //   inner.className = "flex justify-between item-center pl-4 pr-4 pt-4 pb-0";
  //   dateHolder.innerText = val.date.deadline;
  //   outer.appendChild(dateHolder);
  // }

  return outer;
}

// just need to build edit functinality and seacrch and refine the ui
//
