console.log('start')

function todo () {
    console.log('after 1 sec')
}
setTimeout(()=>{
    todo();
}, 1000)
let c;
for(let i = 0; i< 1000000000; i++){
     c = c + i
}

console.log('end')
//start -> end -> after 1sec because the thread wasnt free and the todo function was off-loaded