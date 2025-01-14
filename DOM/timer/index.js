const button = document.querySelector('button');
const time = document.querySelector('h4');

let t = 0;

button.addEventListener('click', () => {
    setInterval(() => {
        t++;
        time.innerHTML = t;
    }, 1000);
});
