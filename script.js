const input = document.querySelector("#todo-input");
const button = document.querySelector("#add-button");
const toDos = document.querySelector(".todo-list");

let storedToDos = localStorage.getItem("toDos");
let parsedToDos = JSON.parse(storedToDos);

let toDosArray = [];

if (storedToDos) {
  toDosArray = parsedToDos;
}

button.addEventListener("click", () => {
  if (input.value !== "") {
    const isDuplicate = toDosArray.includes(input.value);

    if (isDuplicate) {
      alert("This task has already been recorded!");
      input.value = "";
    } else {
      toDosArray.push(input.value);
      localStorage.setItem("toDos", JSON.stringify(toDosArray));

      addToDos();

      input.value = "";
    }
  }
});

addToDos();

function addToDos() {
  storedToDos = localStorage.getItem("toDos");
  parsedToDos = JSON.parse(storedToDos);

  if (storedToDos) {
    toDos.innerHTML = "";

    for (let index = 0; index < parsedToDos.length; index++) {
      const container = document.createElement("div");

      const par = document.createElement("p");
      par.textContent = parsedToDos[index];
      container.appendChild(par);

      const button = document.createElement("button");
      button.textContent = "delete";
      button.setAttribute("data-index", index);
      container.appendChild(button);

      toDos.appendChild(container);

      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        toDosArray.splice(index, 1);

        localStorage.setItem("toDos", JSON.stringify(toDosArray));

        toDos.removeChild(container);
      });
    }
  }
}
