/**
 * Write three binary functions, add, sub and mul
 * that take two numbers and return their sum,
 * difference and product
 * 
 * add(3, 4) // 7
 * sub(3, 4) // -1
 * mul(3, 4) // 12
 */
const add = function (x, y) {
    return x + y;
}

const sub = function (x, y) {
    return x + y;
}

const mul = function (x, y) {
    return x * y;
}

const identityf = function (x) {
    return function () {
        return x;
    }
}

/**
 * Write a function identityf that takes
 * an argument and returns a function that
 * returns that argument.
 * 
 * const three = identityf(3);
 * three(); // 3
 */

const addf = function (first) {
    return function (second) {
        return first + second;
    }
}

/**
 * Write a function liftf that takes a binary function, 
 * and makes it callable with two invocations
 * 
 * const addf = liftf(add);
 * addf(3)(4)  // 7
 * liftf(mul)(5)(6) // 30
 */
const liftf = function (binary) {
    return function (first) {
        return function (second) {
            return binary(first, second);
        }
    }
}

/**
 * Write a function curry that takes a binary function
 * and an argument, and returns a function that takes
 * a second argument.
 * 
 * const add3 = curry(add, 3);
 * add3(4) // 7
 * curry(mul, 5)(6) // 30
 */
const curry = function (binary, x) {
    return liftf(binary)(x);
}

/**
 * Without writing any new functions
 * show three ways to create the inc function.
 * 
 * const inc = _ _ _ ;
 * inc(5) // 6
 * inc(inc(5)) // 7
 */

const inc1 = addf(1);
const inc2 = liftf(add)(1);
const inc3 = curry(add, 1);

/**
 * Write a function twice that takes a binary function 
 * and returns a unary function that passes its arguments
 * to the binary function twice.
 * 
 * add(11, 11) // 22
 * const doubl = twice(add);
 * double(11); // 22
 * const square = twice(mul)
 * square(11) // 121
 */

const twice = function (binary) {
    return function (x) {
        return binary(x, x);
    }
}

/**
 * Write reverse, a function that reverses the arguments
 * of a binary function.
 * 
 * const bus = reverse(sub);
 * bus(3, 2);
 */

const reverse = function (binary) {
    return function (x, y) {
        return binary(y, x);
    }
}

/**
 * Write a function composeu that takes two unary functions 
 * and returns a unary function that calls them both.
 * 
 * composeu(doubl, square)(5)    // 100
 */

const composeu = function (fun1, fun2) {
    return function (x) {
        return fun2(fun1(x));
    }
}

/**
 * Write a function composeb that takes two binary functions 
 * and returns a function that calls them both.
 * 
 * composeb(add, mul)(2, 3, 7)    // 35
 */

const composeb = function (fun1, fun2) {
    return function (x, y, z) {
        return fun2(fun1(x, y), z);
    }
}

/**
 * Write a limit function that allows a binary function
 * to be called a limited number of times.
 *
 * const add_ltd = limit(add, 1);
 * add_ltd(3, 4)    // 7
 * add_ltd(3, 5)    // undefined
 */

const limit = function (fun, times) {
    return function (...args) {
        if (times >= 1) {
            times -= 1;
            return fun(...args);
        }
        return undefined;
    }
}

/**
 * Write a from function that produces a generator 
 * that will produce a series of values.
 * 
 * const index = from(0);
 * index()    // 0
 * index()    // 1
 * index()    // 2
 */

const from = function (start) {
    return function () {
        const currentVal = start;
        start += 1;
        return currentVal;
    }
}

/**
 * Write a to function that takes a generator and an end value, 
 * and returns a generator that will produce numbers up to that limit.
 * 
 * const index = to(from(1), 3);
 * index()    // 1
 * index()    // 2
 * index()    // undefined
 */

const to = function (generator, end) {
    return function () {
        const currentVal = generator();
        if (currentVal < end) return currentVal;
        return undefined;
    }
}

/**
 * Write a fromTo function that produces a generator 
 * that will produce values in a range.
 * 
 * const index = fromTo(0, 3);
 * index()    // 0
 * index()    // 1
 * index()    // 2
 * index()    // undefined
 */

const fromTo = function (start, end) {
    return to(from(start), end);
}

/**
 * Write an element function that takes an array and a generator 
 * and returns a generator that will produce elements from the array.
 * 
 * const ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));
 * ele()    // 'b'
 * ele()    // 'c'
 * ele()    // undefined
 */

const element = function (arr, gen) {
    return function () {
        const index = gen()
        if (index !== undefined) {
            return arr[index];
        }
    }
}

/**
 * Modify the element function so that the generator argument is optional. 
 * If a generator is not provided, then each of the elements of the array will be produced.
 * 
 * const ele = element(['a', 'b', 'c', 'd']);
 * ele()    // 'a'
 * ele()    // 'b'
 * ele()    // 'c'
 * ele()    // 'd'
 * ele()    // undefined
 */

const modefiedElement = function(arr, gen=null){
    gen = gen || fromTo(0, arr.length);
    return function () {
       const index = gen()
       if (index !== undefined) {
           return arr[index];
       }
   }
}

/**
* Write a collect function that takes a generator and an array 
* and produces a function that will collect the results in the array
* 
* const array = [], col = collect(fromTo(0, 2), array);
* col()    // 0
* col()    // 1
* col()    // undefined
* array    // [0, 1]
*/

const collect = function(gen, arr){
   return function(){
       const val = gen();
       if(val !== undefined){
           arr.push(val);
           return val;
       }
   }
}

/**
* Write a filter function that takes a generator and a predicate 
* and produces a generator that produces only the values approved by the predicate.
* 
* const fil = filter(fromTo(0, 5), function third(value) {return (value % 3) === 0;});
* fil()    // 0
* fil()    // 3
* fil()    // undefined
*/

const filter = function(gen, predicate){
   return function recur(){
       const currentVal = gen();
       if(currentVal === undefined || predicate(currentVal)){
           return currentVal;
       }
       return recur();
   }
}

/**
* Write a concat function that takes two generators 
* and produces a generator that combines the sequences.
* 
* const con = concat(fromTo(0, 3),fromTo(0,2));
* con()    // 0
* con()    // 1
* con()    // 2
* con()    // 0
* con()    // 1
* con()    // undefined
*/

const concat = function(gen1, gen2){
    let currentGen = gen1;
    return function(){
        const currentVal = currentGen();
        if(currentVal !== undefined){
            return currentVal;
        }
        currentGen = gen2;
        return currentGen();
    }
}
