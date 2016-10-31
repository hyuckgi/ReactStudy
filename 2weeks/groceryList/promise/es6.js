// block scope와 let

(function(){
  {
    let a = 10;
    {
      let a = 20;
      console.log(a);    // (1)         
    }
    console.log(a);      // (2)
  }
  console.log(a);        // (3)
})();

(function(){
  let sum = 0;
  for(let j = 1 ; j <= 10 ; j++){
    sum += j;
  }
  console.log(sum);     // (1)
  console.log(j);       // (2)
})();

(function(){
  if(Math.random() < 0.5) {
    let j = 0;
    console.log(j);     // (1)
  } else {
    let j = 1;
    console.log(j);     // (2)
  }
  console.log(j);       // (3)
})();

(function(){
  console.log(a);    // (1)
  let a = 2;
  console.log(a);    // (2)
})();

(function(){
  for(let j = 0; j < 5; j++){
    console.log(j);
  }
  console.log(j);  // (1)
})();

const PI = 3.141593;
PI = 3.14;         // (1)

const OBJ = {
  prop1 : 1,
  prop2 : [2, 3, 4],
  prop3 : {a: 1, b: 2}
};
Object.freeze(OBJ);
OBJ.prop1 = 3;
OBJ.prop2.push(5);
OBJ.prop3.b = 3;
console.log(OBJ);    // (1)

Object.freeze(OBJ.prop2);
OBJ.prop2.push(6);
console.log(OBJ);    // (2)