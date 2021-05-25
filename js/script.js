{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const setAllTasksDone = () => {
        for (const [index, task] of tasks.entries()) {
            if (!task.done) {
                toggleTaskDone(index);
            }
        }
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const toggleHideDoneTasksButton = document.querySelector(".js-hideDoneTasks");

        if (toggleHideDoneTasksButton) {
            toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
        }

        const completeAllTasksButton = document.querySelector(".js-completeAllTasks");

        if (completeAllTasksButton) {
            completeAllTasksButton.addEventListener("click", setAllTasksDone);
        }
    };

    const setFocus = (input) => {
        input.focus();
    };

    const clearInputField = (input) => {
        input.value = "";
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li class="list__item${task.done & hideDoneTasks ? " list__item--hidden" : ""}">
            <button class="list__button list__button--toggleDone js-toggleDone">
                ${task.done ? "&#x2714;" : ""}
            </button>
            <span class="list__content${task.done ? " list__content--done" : ""}">
                ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">&#128465;</button>
        </li>
        `;

        const tasksElement = document.querySelector(".js-list");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons__button js-hideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button 
            class="buttons__button js-completeAllTasks"
            ${tasks.every(({ done }) => done) ? " disabled" : ""}
        >
            Ukończ wszystkie
        </button>
        `;
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask");
        setFocus(inputElement);
        const newTaskContent = inputElement.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
        clearInputField(inputElement);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}