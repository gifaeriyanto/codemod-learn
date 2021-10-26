const sayHi = (name) =>
  new Promise(function (resolve, reject) {
    if (!name) {
      reject(new Error("No name"));
    }
    resolve(`Hi ${name}`);
  });

sayHi("foo").then(function (res) {
  console.log(res);
});
