const span = document.querySelector('.wrapper > span');
const ready = document.querySelector('button');
const global_screen_width = 1920;
const test = true;

function calculate_time_difference(next_time) {
    var current_time = new Date().getTime();
    var parts = next_time.split(':');
    var hours = parseInt(parts[0]);
    var minutes = parseInt(parts[1]);

    var next_time_date = new Date();
    next_time_date.setHours(hours);
    next_time_date.setMinutes(minutes);
    next_time_date.setSeconds(0);

    var next_time_milliseconds = next_time_date.getTime();

    var difference = next_time_milliseconds - current_time;
    
    return difference;
}

ready.addEventListener("click", () => {
    ready.textContent = 'Waiting for others...'
    let computer_number = document.querySelector('input.computer-number').value;
    let time = document.querySelector('input.time').value;
    let text = document.querySelector('textarea').value;

    span.style.opacity = '0';
    if(text !== "" || text != undefined) {
        span.textContent = text;
    }
    let next_time = calculate_time_difference(time);
    if(test) {next_time = 0}
    setTimeout(() => {
        span.style.opacity = '1';

        let x = (computer_number - 1) * - global_screen_width;
        let speed = 500;

        animate_text(span, x, speed)

    }, next_time);
})

function move_span(span, amount) {
    span.style.left = `${amount}px`;
}

function animate_text(span, x, speed) {
    setInterval(() => {
        move_span(span, x-=speed)
    }, 500);
}