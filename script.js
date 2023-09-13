//an empty array to store  task data
let list = [];

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const categoryInput = document.getElementById("category");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");
    const filterCategory = document.getElementById("filterCategory");
    //to add task
    addBtn.addEventListener("click", addTask);
    filterCategory.addEventListener("change", filterTasks);

    function addTask() {
        const taskText = taskInput.value;
        const category = categoryInput.value;
        
        // to remove spaces 
        if (taskText.trim() === "") {
            return;
        }

        // creating a li element which will be added to the ul in html
        const taskItem = document.createElement("li");
        // given a class name
        taskItem.className = "task";

        // setting its atribute so that when we filter it helps us to filter
        taskItem.setAttribute("data-category", category);

        // defining values inside the li element created
        taskItem.innerHTML = `
            <span id="kg">${taskText}</span>
            <span class="task-buttons">
                <button class="complete-btn">Complete</button>
                <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i>  </button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </span>
        `;

        
     
        // adding li to ul 
    
        
        taskList.appendChild(taskItem);
        list.push(taskText)

        //local storage
        localStorage.setItem("data",list)
        taskInput.value = "";

        // delete button for deletion
        const deleteBtn = taskItem.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => taskItem.remove());

        // complete button for completion
        const completeBtn = taskItem.querySelector(".complete-btn");
        completeBtn.addEventListener("click", () => taskItem.classList.toggle("completed"));
        //edit  button to edit the task
        const editBtn = taskItem.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            const taskSpan = taskItem.querySelector("span:first-child");
            const newText = prompt("Edit task:", taskSpan.textContent);
            if (newText !== null) {
                taskSpan.textContent = newText;
            }
        });
    }

    function filterTasks() {
        const selectedCategory = filterCategory.value;
        const taskItems = taskList.getElementsByClassName("task");


        // iterating on all the tasks and checking if the filter category matches with the list category
        for (const taskItem of taskItems) {
            const category = taskItem.getAttribute("data-category");
            if (selectedCategory === "All" || selectedCategory === category) {
                taskItem.style.display = "flex";
            } else {
                taskItem.style.display = "none";
            }
        }
    }
});
