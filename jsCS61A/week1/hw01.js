function a_plus_abs_b(a, b) {
  //Return a+abs(b), but without calling abs.
  let f;
  if (b < 0) {
    f = (a, b) => a + -1 * b;
  }
  else {
    f = (a, b) => a + b;
  }
  return f(a, b);
}

function hailstone(n) {
  // Print the hailstone sequence starting at n and return its length
  // Pick a positive integer n as the start.
  // If n is even, divide it by 2.
  // If n is odd, multiply it by 3 and add 1.
  // Continue this process until n is 1.
  let length = 0;
  while (true) {
    length++;
    console.log(n);
    if (n == 1) {
      return length;
    }
    if (n % 2 == 0) {
      n /= 2;
    }
    else {
      n = n * 3 + 1;
    }
  }
}

// higher order functions

// Write a function called product that returns the product of the first n terms of a sequence. 
// Specifically, product takes in an integer n and term, a single-argument function that determines a sequence. 
// (That is, term(i) gives the ith term of the sequence.) product(n, term) should return term(1) * ... * term(n).
function product(n, term) {
  let pd = term(1);
  for (let i = 2; i <= n; i++) {
    pd *= term(i);
  }
  return pd;
}

// function make_repeater(f, n) {
//   function repeat(time) {
//     // recursive solution
//     if (time === 1) {
//       return f(n);
//     }
//     return make_repeater(f, f(n))(time - 1);
//   } 
//   return repeat; 
// }

function make_repeater(f, n) {
  function repeat(x) {
    // base case
    if (n === 1) {
      return f(x);
    }
    // recursive solution
    // call f(repeat(x)) while decrement n by 1 recursively
    return f(make_repeater(f, n - 1)(x));
  } 
  return repeat; 
}

// iterative solution

// function make_repeater_iterative(f, n) {
//   function repeat(x) {
//     let result = f(x);
//     while (n > 1) {
//       result = f(result);
//       n--;
//     }
//     return result
//   }
//   return repeat;
// }

function triple(n) {
  return n*3;
}

console.log(make_repeater(triple, 5)(1));

// const add_three = make_repeater(n => n+1, 3);
// console.log(add_three(5));


module.exports = {
  a_plus_abs_b,
  hailstone,
  product, 
  make_repeater
};
// console.log(a_plus_abs_b(2, 3));
// console.log(a_plus_abs_b(2, -3));
// console.log(a_plus_abs_b(-1, 4));
// console.log(a_plus_abs_b(-1, -4));
