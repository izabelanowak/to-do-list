{
    let tasks = [];
    let hideDoneTasks = false;

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
    const checkAllTasksDone = (button) => {
        const allTaskDone = tasks.every(({ done }) => done === true);
        if (allTaskDone) {
            button.disabled = true;
        }

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
        const hideDoneButton = document.querySelector(".js-hideDoneTasks");

        hideDoneButton.addEventListener("click", () => {
            hideDoneTasks = !hideDoneTasks;
            render();
        });

        const completeAllTasksButton = document.querySelector(".js-completeAllTasks");
        checkAllTasksDone(completeAllTasksButton);
        completeAllTasksButton.addEventListener("click", () => {
        });
    };

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
        }

        document.querySelector(".js-list").innerHTML = tasksListHTMLContent;
    };

    const renderButtons = () => {
        let buttonsHTMLContent = "";

        buttonsHTMLContent += `
        <h2 class="section__header section__header--noBorder">Lista zadań</h2>
        <button class="section__button${+tasks.length === 0 ? " section__button--hidden" : ""} js-hideDoneTasks">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button>
        <button class="section__button${+tasks.length === 0 ? " section__button--hidden" : ""} js-completeAllTasks">
            Ukończ wszystkie
        </button>
        `;

        document.querySelector(".js-header").innerHTML = buttonsHTMLContent;
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