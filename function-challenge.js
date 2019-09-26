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
