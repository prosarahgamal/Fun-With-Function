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

/**
 * Write a repeat function that takes a generator 
 * and calls it until it returns undefined.
 * 
 * const array = [];
 * repeat(collect(fromTo(0, 4), array));
 * log(array);    // 0, 1, 2, 3
 */

 const repeat = function(gen){
     while(gen() !== undefined);
 }

 /**
  * Write a map function that takes an array and a unary function, 
  * and returns an array containing the result of passing each element 
  * to the unary function. Use the repeat function.
  * 
  * map([2, 1, 0], inc1)    // [3, 2, 1]
  */

  const map = function(arr, fun){
      const newArr = [];
      arr.forEach(element => {
          newArr.push(fun(element));
      });
      return newArr;
  }
 
/**
 * Write a reduce function that takes an array and a binary function, 
 * and returns a single value. Use the repeat function.
 * 
 * reduce([], add)           // undefined
 * reduce([2], add)          // 2
 * reduce([2, 1, 0], add)    // 3
 */

const reduce = function (arr, fun) {
    const ele = modefiedElement(arr);
    let accumlator;
    repeat(function () {
        const val = ele();
        if (val !== undefined) {
            accumlator = accumlator === undefined
                ? val
                : fun(accumlator, val);
        }
        return val
    });
    return accumlator;
}

/**
 * Make a function gensymf that makes a function 
 * that generates  unique symbols.
 * 
 * const geng = gensymf("G"), genh = gensymf("H");
 * geng()      // "G1"
 * genh()      // "H1"
 * geng()      // "G2"
 * genh()      // "H2"
 */

 const gensymf = function(s){
     const gen = from(1);
     return function(){
         return `${s}${gen()}`;
     }
 }

 /**
  * Write a function gensymff that takes a unary function 
  * and a seed and returns a gensymf.
  * 
  * const gensymf = gensymff(inc, 0),
  * geng = gensymf("G"),
  * genh = gensymf("H"); 
  * geng()      // "G1"
  * genh()      // "H1"
  * geng()      // "G2"
  * genh()      // "H2"
  */

  const gensymff = function(unary, seed){
      return function(s){
          let start = seed;
          return function(){
              return `${s}${unary(start)}`;
          }
      }
  }

/**
 * Make a function fibonaccif that returns a generator 
 * that will return the next fibonacci number.
 * 
 * const fib = fibonaccif(0, 1);
 * fib()    // 0
 * fib()    // 1
 * fib()    // 1
 * fib()    // 2
 * fib()    // 3
 * fib()    // 5
 */

const fibonaccif = function(first, second){
    return function(){
        // delay the function so it gets the first two numbers
        const next = first;
        first = second;
        second += next;
        return next;
    }
}

/**
 * Write a counter function that returns an object containing two functions 
 * that implement an up/down counter, hiding the counter.
 * 
 * const object = counter(10), up = object.up, down = object.down;
 * up()     // 11
 * down()   // 10
 * down()   // 9
 * up()     // 10
 */

 const counter = function(c){
     return {
         up : function(){
             c += 1;
             return c;
         },
         down : function(){
             c -= 1;
             return c;
         }
     }
 }

/**
 * this one is like limit but instead of using counter, use revoke function
 * 
 * Make a revocable function that takes a binary function, 
 * and returns an object containing an invoke function 
 * that can invoke the binary function, 
 * and a revoke function that disables the invoke function.
 * 
 * const rev = revocable(add), add_rev = rev.invoke;
 * add_rev(3, 4);    // 7
 * rev.revoke();
 * add_rev(5, 7);    // undefined
 */

const revocable = function(fun){
    return {
        invoke : function(...args){
            return fun(...args);
        },
        revoke : function(){
            fun = limit(fun, 0);
        }
    }
}
 
 /**
  * Write a function m that takes a value and an optional source string 
  * and returns them in an object.
  * 
  * JSON.stringify(m(1)) // {"value": 1, "source": "1"}
  * JSON.stringify(m(Math.PI, "pi")) // {"value": 3.14159…, "source": "pi"}
  */
 const m = function(val, src=undefined){
     return{
         value : val,
         source : (src === undefined) ? val : src
     }
 }

/**
 * Write a function addm that takes two m objects 
 * and returns an m object.
 * 
 * JSON.stringify(addm(m(3), m(4))) // {"value": 7, "source": "(3+4)"}
 * JSON.stringify(addm(m(1), m(Math.PI, "pi"))) // {"value": 4.14159…, "source": "(1+pi)"}
 */

 const addm = function(m1, m2){
     return m(
         m1.value + m2.value,
         `(${m1.source}+${m2.source})`)
 }

/**
 * MONAD
 * Write a function liftm that takes a binary function and a string 
 * and returns a function that acts on m objects.
 * 
 * const addm = liftm(add, "+");
 * JSON.stringify(addm(m(3), m(4))) // {"value": 7, "source": "(3+4)"}
 * JSON.stringify(liftm(mul, "*")(m(3), m(4))) // {"value": 12, "source": "(3*4)"}
 */
 
 const liftm = function(binary, s){
     return function(x, y){
         return m(binary(x.value, y.value), `(${x.source}${s}${y.source})`);
     }
 }

/**
 * Modify function liftm 
 * so that the functions it produces can accept arguments 
 * that are either numbers or m objects.
 * 
 * const addm = liftm(add, "+");
 * JSON.stringify(addm(3, 4)) // {"value": 7, "source": "(3+4)"}
 */

 const modefiedLiftm = function(binary, s){
     return function(x, y){
         if (typeof x === 'number') {
             x = m(x);
         }
         if (typeof y === 'number') {
             y = m(y);
         }
         return m(binary(x.value, y.value), `(${x.source}${s}${y.source})`);
     }
 }

 /**
  * Write a function exp 
  * that evaluates simple array expressions.
  * 
  * const sae = [mul, 5, 11];
  * exp(sae)    // 55
  * exp(42)     // 42
  */

  const exp = function(arr){
      if (!Array.isArray(arr)) {
          return arr;
      }
      return arr[0](...arr.slice(1));
  }

  /**
   * Modify exp to evaluate nested array expressions.
   * 
   * const nae = [Math.sqrt, [add, [square, 3], [square, 4]]];
   * exp(nae)    // 5
   */

const modefiedExp = function(arr){
    return (Array.isArray(arr)) 
    ? arr[0](modefiedExp(arr[1]), modefiedExp(arr[2])) 
    : arr;
}

/**
 * retursion: a function returns itself
 * 
 * Write a function addg 
 * that adds from many invocations, 
 * until it sees an empty invocation.
 * 
 * addg()             // undefined
 * addg(2)()          // 2
 * addg(2)(7)()       // 9
 * addg(3)(0)(4)()    // 7
 * addg(1)(2)(4)(8)() // 15
 */

const addg = function(first){
    if(first === undefined) return undefined;
    return function retursion(val){
        if (val === undefined) {
            return first;
        }
        first += val;
        return retursion;
    }
}
