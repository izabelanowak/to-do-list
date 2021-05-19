{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const setFocus = (input) => {
        input.focus();
    };

    const clearInputField = (input) => {
        input.value = "";
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="list__button list__button--toggleDone js-toggleDone">
                    ${task.done ? "&#x2714;" : " "}
                </button>
                <span class="list__content
                     ${task.done ? " list__content--done\"" : "\""}
                >
                    ${task.content}
                </span>
                <button class="list__button list__button--remove js-remove">&#128465;</button>
            </li>
            `;
        }

        document.querySelector(".js-list").innerHTML = htmlString;

        bindEvents();
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