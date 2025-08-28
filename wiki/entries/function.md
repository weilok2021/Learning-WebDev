# function

# JavaScript Function

## What I've learned in this chapter
- Function is first class citizen in  javascript, so function itself would be evaluated to a value, which is the function definition itself.
- There are few ways to declare and use a function in Javascript:
	- Normal function declaration similar to other programming language like c++, c, python.
	- Function expression, an expression that will be evaluated to a function definition. Anonymous function can be used with function expression.
	- Arrow function, a more compact style of anonymous function declaration.

## Function Declaration
```javascript
	function numToWord(num) {
	    // takes number from 0 to 5, and return corresponding words.
	    const arr = ["zero", "one", "two", "three", "four", "five"];
	    let word = arr.find(function(elem) {
	         return arr.indexOf(elem) == num;   
	    });
	    return word;
    }
```

- Noticed in the function body how we use the arr.find by passing an anonymous call back function as a parameter, and arr.find will use this parameter as the criterion to search for element in the array.

Let's define a function with no parameter that print how many times it's been called. We do this by setting a counter variable before declaring this function.
``` javascript
let counter = 0;
function hello(name) {
	console.log(`Hello, ${name}!`);
	counter++;
}
```

## Function Expression
Let's reimplement the first example above using function expression(store in variable).
```javascript
//example 1: numToWords
let f = function(num) {
	const arr = ["zero", "one", "two", "three", "four", "five"];
	let word = arr.find(function(elem) {
	    return arr.indexOf(elem) == num;   
	});
	return word;
}
let word = f(5); // f(5) will return 5.
```

We use anonymous function as the function expression in this case, we can also declare the function with name of course, but it is not needed when passing/declaring the function as expression.

## Arrow Function
Now let's implement the examples again using arrow function, this is a really compact style of declaring function. From what I know now, this is really useful when passing function expression as argument into other function(higher order function) or store it as a value into variable.
```javascript
// numToWords in arrow function notation
let f = (num) => {
    const arr = ["zero", "one", "two", "three", "four", "five"];
	let word = arr.find((elem) => arr.indexOf(elem) == num);
	return word;
};
let word = f(5); // f(5) will return 5.
```

In this example, the we pass in arrow function as argument instead of function declaration into the arr.find method. We can use one liner arrow function when there is only one statement in the function body, the expression in body will automatically be intepreted as return value, so braces can also me omitted in this case.
