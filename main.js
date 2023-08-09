window.addEventListener('load', () => {
    //switch statement

    const personalisation = document.getElementById('switch');

    let day;

    switch (new Date().getDay()) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;

    }

    personalisation.innerHTML = "Hi there, happy " + day + "!";

    // task form
    const form = document.querySelector('#task-form');
    const input = document.querySelector('#task-input');
    const list_el = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = capitalise(input.value);

        if (!task) {
            alert("Please add a task");
            return;
        }

         //capitalise first letter
         function capitalise(str) {
            return str[0].toUpperCase() + str.slice(1);
        }

        //create element
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        list_el.appendChild(task_el);

        //content
        const content_el = document.createElement('div');
        content_el.classList.add('content');

        task_el.appendChild(content_el);

        const input_el = document.createElement('input');
        input_el.classList.add('text');
        input_el.type = 'text';
        input_el.value = task;
        input_el.setAttribute('readonly', 'readonly');

        content_el.appendChild(input_el);

        //counter
        const counter_el = document.createElement('div');
        counter_el.classList.add('counter');

        task_el.appendChild(counter_el);

        const time_el = document.createElement('div');
        time_el.classList.add('time');
        time_el.innerText = "00:00:00";

        counter_el.appendChild(time_el);

        const controls_el = document.createElement('div');
        controls_el.classList.add('controls');
        counter_el.appendChild(controls_el);

        //add buttons elements to controls
        const start_btn = document.createElement('button');
        start_btn.classList.add('start');
        start_btn.innerText = "Start"

        const stop_btn = document.createElement('button');
        stop_btn.classList.add('stop');
        stop_btn.innerText = "Stop"

        const reset_btn = document.createElement('button');
        reset_btn.classList.add('reset');
        reset_btn.innerText = "Reset"

        controls_el.appendChild(start_btn);
        controls_el.appendChild(stop_btn);
        controls_el.appendChild(reset_btn);

        //actions
        const actions_el = document.createElement('div');
        actions_el.classList.add('actions');
        task_el.appendChild(actions_el);

        //add actions buttons
        const edit_btn = document.createElement('button');
        edit_btn.classList.add('edit');
        edit_btn.innerText = "Edit Task";

        const delete_btn = document.createElement('button');
        delete_btn.classList.add('delete');
        delete_btn.innerText = "Delete Task";

        actions_el.appendChild(edit_btn);
        actions_el.appendChild(delete_btn)

        //input value
        input.value = "";

        //counter
        let seconds = 0;
        let interval = null;

        start_btn.addEventListener('click', start);
        stop_btn.addEventListener('click', stop);
        reset_btn.addEventListener('click', reset);

        //counter functions
        function timer() {
            seconds++;

            let hrs = Math.floor(seconds / 3600);
            let mins = Math.floor((seconds - (hrs * 3600)) / 60);
            let secs = seconds % 60;

            if (secs < 10) secs = '0' + secs;
            if (mins < 10) mins = '0' + mins;
            if (hrs < 10) hrs = '0' + hrs;

            time_el.innerText = `${hrs}:${mins}:${secs}`;
        }

        function start() {
            if (interval) {
                return;
            }

            interval = setInterval(timer, 1000);
        }

        function stop() {
            clearInterval(interval);
            interval = null;
        }

        function reset() {
            stop();
            seconds = 0;
            time_el.innerText = "00:00:00"
        }

        //edit

        edit_btn.addEventListener('click', () => {
            if (edit_btn.innerText.toLowerCase() == 'edit task') {
                input_el.removeAttribute('readonly');
                input_el.focus();
                edit_btn.innerText = "Save";
            } else {
                input_el.setAttribute('readonly', 'readonly');
                edit_btn.innerText = "Edit Task";
            }
        })

        //delete

        delete_btn.addEventListener('click', () => {
            list_el.removeChild(task_el);
        })
    })
})
