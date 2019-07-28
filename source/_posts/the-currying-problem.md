---
title: The currying problem
featured_image: js-currying.png
date: 2019-07-21 22:15:16
tags:
  - JavaScript
  - Currying
  - Recursion
---
As part of a challenge at [Codewars][1] I was asked to create a function that adds numbers together when called in succession and it would return a value of type `number`.

```javascript
add(4) // 4
add(1)(8)(2) // 11
add(4)(1)(1)(9) // 15
// And so on
```

<!-- more -->

Also we should be able to save the reference to use it later. Let's assume any number being passed as parameter will be a valid JavaScript number.

```javascript
const addTwo = add(2);
addTwo // 2
addTwo(3) // 5
addTwo(3)(5) // 10
```

The solution is quite simple but it might not be easy to find, you need to know about *currying*, *recursion*, and one of the most loved/hated feature of JavaScript: the lack of restrictions, that you can redefine any object's property, including the built-in ones.

## Currying

*(From [Wikipedia][4]) In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument.*

Let's say we have this function that takes two parameters and returns the sum of them.

```javascript
function add(x, y) {
  return x + y;
}

add(1, 2) // 3
```

The same function can be expressed in a different way applying currying.

```javascript
function add(x) {
  return function(y) {
    return x + y;
  }
}

add(1)(2) // 3
```

But still this is defined to take just two parameters, in order to solve the problem we need to be able to accept any amount of parameters and still return the sum of them all.

## Recursion

By creating a currying function that calls itself we will be able to pass as many parameters as needed.

```javascript
function add(n) {
  return function(x) {
    return add(n + x);
  }
}

add(1)(4)(8) // [object Function]
```

There's still one issue to solve though, the returned value should be of type `number` and right now it's returning a `Function` object.

## Solution

Here is where the JavaScript's [inheritance and the prototype chain][3] comes into play.

All objects inherit the properties [`valueOf`][5] and [`toString`][6] which are the ones in charge of displaying the value of that object when it's used. There's no restriction when it comes to overwriting these properties so we could enhance the function to be able to return the correct type when finished.

```javascript
const add = (n) => {
  let curry = function(x) { return add(n + x) };
  curry.valueOf = curry.toString = () => n;
  return curry;
};

const x = add(1)(3)(3); // 7
const y = x(3)(4); // 14
const z = y(x)(9); // 30
x + y + z // 51
```

Changing built-in properties of JavaScript is not recommended but it is completely possible as you can see. Also note that the `curry` function is not defined as an arrow function, that's because they don't have the `prototype` to inherit from.

[1]: https://www.codewars.com
[2]: https://en.wikipedia.org/wiki/Currying
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[4]: https://en.wikipedia.org/wiki/Currying
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
