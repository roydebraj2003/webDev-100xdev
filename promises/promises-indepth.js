function afterThen(){
    console.log('after .then')
}
//the promise class new Promise(), takes arguement as a function whose first arguement is also a function (resolve())

const setTimeoutPromise =()=>{
    return new Promise(promiseFirstArg);
}
function promiseFirstArg(resolve){
    resolve() //the callback at .then() will be called only when the resolve() function is called!!!!
    console.log(resolve)
}
setTimeoutPromise().then(afterThen)
