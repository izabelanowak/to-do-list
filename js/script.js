{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
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
    const bindButtonsEvents = () => { };

    const setFocus = (input) => {
        input.focus();
    };

    const clearInputField = (input) => {
        input.value = "";
    };
    const renderTasks = () => {
        let tasksListHTMLContent = "";

        for (const task of tasks) {
            tasksListHTMLContent += `
        <li class="list__item">
            <button class="list__button list__button--toggleDone js-toggleDone">
                ${task.done ? "&#x2714;" : ""}
            </button>
            <span class="list__content${task.done ? " list__content--done" : ""}">
                ${task.content}
            </span>
            <button class="list__button list__button--remove js-remove">&#128465;</button>
        </li>
        `;
        }

        document.querySelector(".js-list").innerHTML = tasksListHTMLContent;
    };
    const renderButtons = () => {
        let buttonsHTMLContent = "";

        if (tasks.length > 0) {
            buttonsHTMLContent += `
        <button class="list__textButton js-hideDoneTasks">
            Ukryj ukończone
        </button>
        <button class="list__textButton js-completeAllTasks">
            Ukończ wszystkie
        </button>
        `;
            document.querySelector(".js-textButtons").innerHTML = buttonsHTMLContent;
        }


    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();

        console.log(tasks.length);
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