const setTimeoutSync =(time)=>{
    let start = new Date();
    while(true){
        let currTime = new Date();
        if(currTime.getTime() - start.getTime() > time){
            break
        }
    }
    console.log('ok')
}
setTimeoutSync(1000)
console.log('Check')