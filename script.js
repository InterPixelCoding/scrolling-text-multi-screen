const span = document.querySelector('.wrapper > span');
const ready = document.querySelector('.ready');
const rgb = document.querySelector('.rgb');
const close_menu = document.querySelector('.close');
let global_screen_width = 1920;
const dual_monitor_testing = 'translate(-2050px, 166px);';
const test = true;

function toggle_class_on_click(button, target, class_name) {
    button.addEventListener("click", () => {target.classList.toggle(class_name)})
}

toggle_class_on_click(rgb, span, "rgb")

close_menu.addEventListener("click", () => {
    const menu_items = document.querySelectorAll('.absolute-controls > *:not(:last-child)');
    menu_items.forEach(item => {
        item.classList.toggle('hidden')
        if(item.classList.contains('hidden')) {
            item.style.transform = 'translateY(-10vh)';
        } else {
            item.style.transform = 'translateY(0vh)';
        }
    })
})

function calculate_time_difference(next_time) {
    // Get the current time from the World Time API
    return fetch('https://worldtimeapi.org/api/ip')
        .then(response => response.json())
        .then(data => {
            // Extract the current time from the response
            var current_time = new Date(data.datetime);

            // Parse the next_time string to get hours and minutes
            var parts = next_time.split(':');
            var hours = parseInt(parts[0]);
            var minutes = parseInt(parts[1]);

            // Create a new Date object with the next time and today's date
            var next_time_date = new Date();
            next_time_date.setHours(hours);
            next_time_date.setMinutes(minutes);
            next_time_date.setSeconds(0);

            // Calculate the difference in milliseconds
            var difference = next_time_date.getTime() - current_time.getTime();

            return difference;
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
}

ready.addEventListener("click", () => {
    ready.textContent = 'Waiting for others...'
    let computer_number = document.querySelector('input.computer-number').value;
    let time = document.querySelector('input.time').value;
    let text = document.querySelector('textarea').value;

    span.style.opacity = '0';

    console.log(text)

    if(text !== "Default") {
        span.textContent = text;
    }

    calculate_time_difference(time)
        .then(next_time => {
            console.log(next_time)
            if(test) {next_time = 0}
            setTimeout(() => {
                span.style.opacity = '1';

                let x = (computer_number - 1) * - global_screen_width;
                let speed = 500;

                animate_text(span, x, speed)

            }, next_time);
        })
})

function move_span(span, amount) {
    span.style.transform = `translateX(${amount}px)`;
}

function animate_text(span, x, speed) {
    setInterval(() => {
        move_span(span, x-=speed)
    }, 500);
}

const adjust = document.querySelector('button.adjust-position');

adjust.addEventListener("click", () => {
    adjust.classList.toggle("adjusting");
    if(adjust.classList.contains("adjusting")) {
        adjust.textContent = 'Adjusting... (Press ENTER to Save)';
    } else {
        adjust.textContent = 'Text Adjustment Saved';
    }
});

document.querySelector('span.adjust-text').addEventListener('mousedown', handle_mouse_down);
document.addEventListener('keydown', handle_key_down);

let is_adjusting = false;
let initial_x = 0;
let initial_y = 0;
let initial_top = 0;
let initial_left = 0;

function handle_mouse_down(event) {
    if (!adjust.classList.contains('adjusting')) return;
    is_adjusting = true;
    initial_x = event.clientX;
    initial_y = event.clientY;
    const span = document.querySelector('span.adjust-text');
    initial_top = span.offsetTop;
    initial_left = span.offsetLeft;
}

function handle_mouse_move(event) {
    if (!is_adjusting) return;
    const span = document.querySelector('span.adjust-text');
    const offset_x = event.clientX - initial_x;
    const offset_y = event.clientY - initial_y;
    span.style.top = `${initial_top + offset_y}px`;
    span.style.left = `${initial_left + offset_x}px`;
}

function handle_mouse_up() {
    if (!is_adjusting) return;
    is_adjusting = false;
}

function handle_key_down(event) {
    if (event.key === 'Enter') {
        if (is_adjusting) {
            const span = document.querySelector('span.adjust-text');
            adjust.classList.remove("adjusting");
            adjust.textContent = 'Text Adjustment Saved';
        }
    }
}

document.addEventListener('mousemove', handle_mouse_move);
document.addEventListener('mouseup', handle_mouse_up);





