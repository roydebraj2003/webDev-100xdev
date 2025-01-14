setTimeout(()=>{
    console.log('after 1sec')
    setTimeout(()=>{
        console.log('after 3sec')
        setTimeout(()=>{
            console.log('after 5sec')
        }, 5000)
    }, 3000)
}, 1000)