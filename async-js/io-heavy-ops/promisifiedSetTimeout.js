const promisifiedSetTimeout = (todo, time) => {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          todo();
          resolve("Operation completed successfully");
        }, parseInt(time));
      } catch (err) {
        reject(err);
      }
    });
  };
  
  function todo() {
    console.log("Test for promisified setTimeout");
  }
  
  promisifiedSetTimeout(todo, "1000")
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  