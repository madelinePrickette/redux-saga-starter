//generator function:
function* test() {
    console.log('hello world!');

    yield [1,2,3]; // yield gives back like a return but pauses

    console.log('continuing');

    yield 'woot!' // gives back woot! and THEN PAUSES

    console.log('next!'); // when called again, this is the first thing we would see

    yield true;






    return 5;
}
// have to call it in a special way 
// runs top to bottom until it hits a return then stops
// return still stops everything
// yield is like return but it pauses

let goDogGo = test(); // making an instance and goDogGo is our engine
let goCatGo = test(); 

console.log(goDogGo.next()); // this is how to trigger it to continue on. will log 'hello world!' and yield [1, 2, 3]
// wont have to write next, redux saga does this for us 

console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next());
console.log(goDogGo.next()); // returns an object and when that function is done, it will return undefined and done: true.
console.log(goDogGo.next());
console.log(goDogGo.next());

console.log(goCatGo.next()); // this is back to the beginning so you will see only an object with value [1,2,3] done: false

// you will see each console.log as an object it will tell you what it returns and if it is done in that object.
// you will see the return kills the function, and yield will pause

// since goDogGo and goCatGo are different, they keep track of their own progress throughout the function.