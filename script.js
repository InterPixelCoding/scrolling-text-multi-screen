const span = document.querySelector('.wrapper > span');
const ready = document.querySelector('button');
const close_menu = document.querySelector('.close');
const global_screen_width = 1920;
const test = false;

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
    span.style.left = `${amount}px`;
}

function animate_text(span, x, speed) {
    setInterval(() => {
        move_span(span, x-=speed)
    }, 500);
}