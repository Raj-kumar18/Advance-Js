# **Throttling vs. Debouncing – Difference Samjho!** 🚀

Dono **throttling** aur **debouncing** ka use **performance optimize** karne ke liye hota hai, jab koi function **baar-baar trigger** ho raha ho jaise **scrolling, typing, resizing**.

---

## **1️⃣ Throttling 🕒 (Function Execution Ko Limit Karta Hai)**
Throttling ensure karta hai ki **function sirf ek fixed interval ke baad execute ho**, chahe event kitni bhi baar trigger ho.

### **🔹 Kab Use Kare?**
✅ **Scrolling** (Lazy loading images, infinite scrolling)  
✅ **Window Resize** (Bar-bar calculations na ho)  
✅ **Button Clicks** (Multiple clicks avoid karne ke liye)  

### **🔹 Example: Scroll Event Optimization**
```javascript
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      func(...args);
      lastCall = now;
    }
  };
}

// Example usage
const logScroll = () => console.log("Scroll event fired!");

window.addEventListener("scroll", throttle(logScroll, 1000)); // 1 second me sirf ek baar chalega
```

### **🔹 Samajhne ka easy tareeka:**
Agar tum **throttling use kar rahe ho**, toh function **har 1 second me ek baar execute hoga**, chahe tum **100 baar scroll karo**!

✅ **Consistent execution hota rahega**  
❌ **Kuch events skip ho sakte hain** agar wo time limit ke andar ho.

---

## **2️⃣ Debouncing ⏳ (Function Ko Delay Karta Hai)**
Debouncing ensure karta hai ki **function tabhi execute ho jab user kuch time tak ruk jaye**.

### **🔹 Kab Use Kare?**
✅ **Search Bars** (User typing kare, aur result tab aaye jab typing ruk jaye)  
✅ **Auto-Save Forms** (User type kare, aur data tabhi save ho jab vo ruk jaye)  
✅ **Window Resize** (Tabhi chale jab resize stop ho)  

### **🔹 Example: Search Input Optimization**
```javascript
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// Example usage
const searchHandler = (event) => console.log("Searching:", event.target.value);

const optimizedSearch = debounce(searchHandler, 500);

document.getElementById("search").addEventListener("input", optimizedSearch);
```

### **🔹 Samajhne ka easy tareeka:**
Agar tum **debouncing use kar rahe ho**, toh **jab tak user type kar raha hai function nahi chalega**, sirf **last me chalega jab wo ruk jaye**!

✅ **Unnecessary function calls avoid hoti hain**  
❌ **Thoda delay ho sakta hai, jo UX me dikkat de sakta hai**  

---

## **Throttling vs. Debouncing – Kab Kya Use Kare?** 🚀
✅ **Agar tumhe ek function ko regularly chalana hai** (e.g., **scroll event optimization**) toh **Throttling** use karo.  
✅ **Agar tumhe ek function sirf last action hone ke baad chalana hai** (e.g., **search box typing optimization**) toh **Debouncing** use karo.  

Dono techniques **performance boost** karne aur **unnecessary function calls hatane** ke liye use hoti hain! 🚀😃  

Agar koi aur confusion ho toh batao! 😃🔥






---------------------------------------------------------------------------------------

# **Closures in JavaScript – Samjho Aasaan Tarike Se!** 🚀  

## **🔹 Closure Kya Hai?**  
Closure ek **function ke andar function** hota hai jo **apne parent function ke variables ko yaad rakhta hai**, chahe parent function execute ho chuka ho!  

## **🔹 Simple Example**  
```javascript
function outerFunction() {
  let count = 0; // Yeh variable closure ke andar save rahega

  return function innerFunction() {
    count++; // Parent function ka variable use kar raha hai
    console.log(`Count: ${count}`);
  };
}

const counter = outerFunction(); // outerFunction execute ho chuka hai
counter(); // Count: 1
counter(); // Count: 2
counter(); // Count: 3
```
🔹 **Yahan `innerFunction` ek closure ban gaya hai** jo `count` variable ko yaad rakhta hai!  

---

## **📌 Closure Ke Uses**  

### ✅ **1. Data Hiding (Encapsulation)**  
Closures ka use **private variables** banane ke liye hota hai jo **bahar access nahi ho sakte**.  

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit: function (amount) {
      balance += amount;
      console.log(`Deposited: ${amount}, New Balance: ${balance}`);
    },
    withdraw: function (amount) {
      if (amount > balance) {
        console.log("Insufficient balance!");
      } else {
        balance -= amount;
        console.log(`Withdrawn: ${amount}, Remaining Balance: ${balance}`);
      }
    },
    getBalance: function () {
      console.log(`Balance: ${balance}`);
    }
  };
}

const myAccount = createBankAccount(1000);
myAccount.deposit(500);   // Deposited: 500, New Balance: 1500
myAccount.withdraw(200);  // Withdrawn: 200, Remaining Balance: 1300
myAccount.getBalance();   // Balance: 1300
```
🔹 **Yahan `balance` variable directly access nahi ho sakta, sirf closure ke through hi modify ho sakta hai!**  

---

### ✅ **2. Function Factory (Multiple Closures)**  
```javascript
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
```
🔹 **Yahan `double` aur `triple` alag-alag closures hain jo `factor` variable ko yaad rakhte hain!**  

---

### ✅ **3. Event Listeners (Memory Retention)**  
```javascript
function attachEvent() {
  let count = 0;
  document.getElementById("clickMe").addEventListener("click", function () {
    count++;
    console.log(`Button clicked ${count} times`);
  });
}

attachEvent();
```
🔹 **Yahan `count` closure ke andar retain ho raha hai, aur har click ke baad update ho raha hai!**  

---

## **🚀 Real-World Examples in React.js and Node.js**  

### ✅ **1. React.js - Custom Hook using Closures**  
```javascript
import { useState } from "react";

function useCounter(initialValue) {
  let [count, setCount] = useState(initialValue);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  return { count, increment, decrement };
}

export default function CounterComponent() {
  const counter = useCounter(0);

  return (
    <div>
      <h1>Count: {counter.count}</h1>
      <button onClick={counter.increment}>+</button>
      <button onClick={counter.decrement}>-</button>
    </div>
  );
}
```
🔹 **Yahan `useCounter` ek closure hai jo `count` variable ko yaad rakhta hai, aur `increment` aur `decrement` usko modify karte hain!**  

---

### ✅ **2. Node.js - Middleware using Closures**  
```javascript
function rateLimiter(limit) {
  let requestCounts = {};

  return function (req, res, next) {
    const userIP = req.ip;
    requestCounts[userIP] = (requestCounts[userIP] || 0) + 1;

    if (requestCounts[userIP] > limit) {
      return res.status(429).send("Too many requests");
    }
    next();
  };
}

const express = require("express");
const app = express();

app.use(rateLimiter(5)); // Maximum 5 requests allowed

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```
🔹 **Yahan `rateLimiter` closure hai jo `requestCounts` variable ko retain karta hai, aur ek IP ke requests count karta hai!**  

---

## **🚀 Closure Ke Fayde**  
✅ **Memory Optimization:** Parent function ka execution khatam hone ke baad bhi data yaad rehta hai.  
✅ **Data Privacy:** Private variables create kar sakte hain jo bahar se directly access nahi ho sakte.  
✅ **Function Reusability:** Ek baar likhne ke baad alag-alag values ke saath use kar sakte hain.  

---

## **📌 Conclusion**  
**Closure ek powerful concept hai jo JavaScript me functions ko zyada flexible aur efficient banata hai!**  
Agar koi aur confusion ho toh batao! 😃🔥

# 🚀 Lexical Scope in JavaScript

## 📌 Definition  
Lexical scope ka matlab hai ki **JavaScript me ek function apne surrounding (parent) scope ke variables ko access kar sakta hai**, lekin **parent function child function ke variables ko access nahi kar sakta**.  

**"Lexical" ka matlab hota hai "where it is written"**, yani **ek function ka scope us jagah pe define hota hai jahan wo likha gaya hai, na ki jahan se usko call kiya jata hai.**  

---

## 🔹 Example of Lexical Scope
```javascript
function outerFunction() {
  let outerVar = "I am from outer function";

  function innerFunction() {
    console.log(outerVar); // ✅ Accessing outer function's variable
  }

  innerFunction();
}

outerFunction();
// Output: "I am from outer function"
```
### ✅ Explanation:
1. `innerFunction()` **apne parent function (`outerFunction`) ke variable** `outerVar` ko access kar sakta hai.  
2. But `outerFunction` **`innerFunction` ke variables ko access nahi kar sakta**.  

---

## 🔹 Nested Function Example
```javascript
function grandParent() {
  let grandParentVar = "I am from grandparent";

  function parent() {
    let parentVar = "I am from parent";

    function child() {
      console.log(grandParentVar); // ✅ Access allowed
      console.log(parentVar); // ✅ Access allowed
    }

    child();
  }

  parent();
}

grandParent();
```
### ✅ Explanation:
1. `child()` function **`parent()` ke variable `parentVar` ko access kar sakta hai**.
2. `child()` function **`grandParent()` ke variable `grandParentVar` ko bhi access kar sakta hai**.
3. **Lexical scope top to bottom work karta hai, lekin bottom to top nahi!**  

---

## 🔹 Real-World Example in React.js (Lexical Scope + Closures)
```javascript
import React, { useState } from "react";

function Counter() {
  let counterName = "Click Counter"; // ✅ Lexical scope variable

  const [count, setCount] = useState(0);

  function increment() {
    console.log(counterName); // ✅ Accessible due to lexical scope
    setCount(count + 1);
  }

  return (
    <div>
      <h2>{counterName}: {count}</h2>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;
```
### ✅ Explanation
1. **Function `increment()` `counterName` ko access kar sakta hai** kyunki lexical scope allow karta hai.  
2. **React ka `useState` lexical scope ke through function ko update karne ki permission deta hai.**  

---

## 🔹 Real-World Example in Node.js
```javascript
function createRateLimiter(limit) {
  let requestCounts = {}; // ✅ Lexical Scope Variable

  return function (req, res, next) {
    const userIP = req.ip;
    requestCounts[userIP] = (requestCounts[userIP] || 0) + 1;

    if (requestCounts[userIP] > limit) {
      return res.status(429).send("Too many requests");
    }

    console.log("Requests:", requestCounts); // ✅ Accessible due to lexical scope
    next();
  };
}

const express = require("express");
const app = express();

app.use(createRateLimiter(5));

app.get("/", (req, res) => res.send("Hello, World!"));

app.listen(3000, () => console.log("Server running on port 3000"));
```
### ✅ Explanation
1. **`requestCounts` ek lexical scope variable hai**, jo middleware ke andar accessible hai but function ke bahar nahi.  
2. **Closure create ho raha hai jo `requestCounts` ko retain karega**.  

---

## 🔹 Key Points About Lexical Scope
✅ **Inner functions apne parent functions ke variables ko access kar sakte hain.**  
✅ **Parent function inner function ke variables ko access nahi kar sakta.**  
✅ **Lexical scope sirf function likhne ke time pe decide hota hai, na ki execution ke time pe.**  
✅ **Closures lexical scope ka ek powerful use case hai.**  



--------------------------------------------------------------------------------------------------------


**************

# **JavaScript: call(), apply(), and bind() - Explained with Real-World Examples**

## **Introduction**
In JavaScript, functions are objects, and we can control their execution context (`this`) using:

- **`call()`** → Immediately calls the function with a specified `this` value.
- **`apply()`** → Same as `call()`, but arguments are passed as an array.
- **`bind()`** → Returns a new function with `this` bound to a specific object, without executing it immediately.

---

## **Real-World Analogy: Driver and Car** 🚗

Imagine a **driver** who can drive any **car**, but each car doesn’t have its own `drive` function. We will borrow the `drive` function from `driver` using `call`, `apply`, and `bind`.

```js
const driver = {
    name: "Man Raj",
    drive: function(speed) {
        console.log(`${this.name} is driving at ${speed} km/h`);
    }
};

const car = { name: "Tesla" };
```

---

## **1. `call()` – Immediate Execution**
```js
driver.drive.call(car, 80);
```
**Output:**
```
Tesla is driving at 80 km/h
```
### **Syntax:**
```js
functionName.call(thisValue, arg1, arg2, ...);
```
- **Executes the function immediately**
- `thisValue` is the object to be used as `this`
- Arguments are passed **individually**

---

## **2. `apply()` – Immediate Execution with Array Arguments**
```js
driver.drive.apply(car, [100]);
```
**Output:**
```
Tesla is driving at 100 km/h
```
### **Syntax:**
```js
functionName.apply(thisValue, [arg1, arg2, ...]);
```
- Same as `call()`, but **arguments are passed as an array**
- Useful when arguments are stored in an array

Example with dynamic values:
```js
const speeds = [120];
driver.drive.apply(car, speeds);
```

---

## **3. `bind()` – Returns a New Function**
```js
const driveTesla = driver.drive.bind(car, 90);
driveTesla(); // Executing later
```
**Output:**
```
Tesla is driving at 90 km/h
```
### **Syntax:**
```js
const newFunction = functionName.bind(thisValue, arg1, arg2, ...);
```
- **Does not execute the function immediately**
- **Returns a new function** with `this` bound to `thisValue`
- Can be executed later

---

## **Key Differences**

| Method  | Execution | Arguments Passing | Returns |
|---------|-----------|------------------|---------|
| `call()`  | Immediately | Individually | `undefined` |
| `apply()` | Immediately | As an array | `undefined` |
| `bind()`  | Later (when called) | Individually | New function |

---

## **Practical Use Cases**

### **1. Function Borrowing**
```js
const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

function greet() {
    console.log(`Hello, I am ${this.name}`);
}

greet.call(person1); // Hello, I am Alice
greet.call(person2); // Hello, I am Bob
```

### **2. Using `bind()` in Event Listeners**
```js
class ButtonHandler {
    constructor() {
        this.count = 0;
    }

    increment() {
        this.count++;
        console.log("Count: ", this.count);
    }
}

const handler = new ButtonHandler();
const button = document.querySelector("button");
button.addEventListener("click", handler.increment.bind(handler));
```
👉 Without `bind()`, `this` would refer to the button element instead of `handler`.

### **3. Using `bind()` for Partial Functions (Currying)**
```js
function multiply(a, b) {
    return a * b;
}

const double = multiply.bind(null, 2);
console.log(double(5)); // 10 (2 * 5)
```

---

## **Conclusion**

| Method  | When to Use |
|---------|------------|
| `call()`  | When you need to call a function immediately with a different `this` context. |
| `apply()` | When you need to call a function immediately with arguments in an array. |
| `bind()`  | When you need to create a new function with a fixed `this` value for later execution. |

📌 **`call` and `apply` execute immediately, while `bind` returns a function for later use.**

---



---------------------------------------------------



# **Function Currying in JavaScript** 🚀  

## **📌 What is Currying?**  
Currying ek technique hai jisme **ek function multiple arguments lene ke bajaye ek argument lekar ek naya function return karta hai** jo next argument leta hai, aur yeh process tab tak chalta hai jab tak saare arguments mil na jayein.  

### **Simple Terms:**  
- Normal function → `sum(2,3,5) = 10`  
- Curried function → `sum(2)(3)(5) = 10`  

---

## **🔹 Why Use Currying?**  
✅ **Code Reusability** – Ek hi function ko multiple scenarios me use kar sakte ho.  
✅ **Better Readability** – Complex function calls ko simple aur modular banata hai.  
✅ **Functional Programming** – Yeh concept functional programming me kaafi useful hota hai.  

---

## **🔹 Example 1: Normal Function vs. Curried Function**  

### **👉 Normal Function**  
```js
function add(a, b, c) {
    return a + b + c;
}

console.log(add(2, 3, 5)); // Output: 10
```

### **👉 Curried Function**  
```js
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

console.log(add(2)(3)(5)); // Output: 10
```
👉 Har baar ek argument lekar ek **naya function return** hota hai, jab tak saare arguments mil na jayein.  

---

## **🔹 Example 2: Using Arrow Functions** 🚀  
```js
const multiply = a => b => c => a * b * c;

console.log(multiply(2)(3)(4)); // Output: 24
```
🔹 Yeh concise syntax me likhne ka tareeka hai jo readability ko improve karta hai.  

---

## **🔹 Example 3: Currying in Real-World Scenario**  

### **👉 1. Custom Greeting Function**  
```js
function greet(greeting) {
    return function (name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = greet("Hello");
console.log(sayHello("Man Raj"));  // Output: Hello, Man Raj!
console.log(sayHello("Rahul"));    // Output: Hello, Rahul!
```
✅ Ek **generic greeting function** ban gaya jo kisi bhi name ke saath use ho sakta hai.  

---

### **👉 2. Filtering with Currying**  
```js
const filterArray = filter => array => array.filter(filter);

const isEven = num => num % 2 === 0;
const evenNumbers = filterArray(isEven);

console.log(evenNumbers([1, 2, 3, 4, 5, 6])); // Output: [2, 4, 6]
```
✅ Yeh **functional programming** ka ek powerful use case hai!  

---

## **🔹 Converting Normal Function to Curried Function**  
Agar ek normal function hai to usko currying me convert karne ke liye ek utility function bana sakte ho.  

```js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return (...nextArgs) => curried(...args, ...nextArgs);
        }
    };
}

// Normal function
function sum(a, b, c) {
    return a + b + c;
}

// Currying function
const curriedSum = curry(sum);

console.log(curriedSum(2)(3)(5)); // Output: 10
console.log(curriedSum(2, 3)(5)); // Output: 10
console.log(curriedSum(2)(3, 5)); // Output: 10
```
✅ **Dynamic arguments handle kar sakta hai** – Chahe ek-ek karke do ya ek sath!  

---

## **🔹 Conclusion**  
| Feature  | Normal Function | Curried Function |
|----------|----------------|------------------|
| **Syntax** | `sum(2, 3, 5)` | `sum(2)(3)(5)` |
| **Reusability** | Limited | High |
| **Readability** | Sometimes complex | More readable for specific use cases |
| **Functional Programming** | ❌ | ✅ Used in FP concepts |

📌 **Currying ka main benefit yeh hai ki tum functions ko easily reuse aur customize kar sakte ho without modifying original logic!**  

---

## **🔥 Summary**  
✅ **Currying ek function programming technique hai jisme ek function ek argument leta hai aur ek naya function return karta hai.**  
✅ **Real-world uses:** Event handlers, API customization, filtering, logging functions, etc.  
✅ **JS me arrow functions aur closures ka use karke concise aur powerful currying functions bana sakte ho!**  



------------------------------------------------------------------------------------------------------

# Event Bubbling vs Event Capturing in JavaScript

## 🔥 What is Event Propagation?
When an event occurs on a webpage, it propagates (travels) through the **DOM tree** in two phases:
1. **Event Capturing (Top to Bottom)**: Event moves from **parent to child**.
2. **Event Bubbling (Bottom to Top) [Default]**: Event moves from **child to parent**.

---

## 🟢 Example: Event Bubbling (Default Behavior)
Event bubbling means that when a child element is clicked, the event first triggers on the child and then propagates **upwards to parent elements**.

### **📝 Code (HTML + JavaScript)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Bubbling Example</title>
    <style>
        #parent {
            padding: 20px;
            background-color: lightblue;
        }
        #child {
            padding: 10px;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <div id="parent">
        Parent
        <button id="child">Click Me</button>
    </div>

    <script>
        document.getElementById("parent").addEventListener("click", function() {
            console.log("Parent Clicked!");
        });

        document.getElementById("child").addEventListener("click", function() {
            console.log("Child Clicked!");
        });
    </script>
</body>
</html>
```

### **🔹 Output (Clicking the Button)**
```
Child Clicked!
Parent Clicked!
```
📌 **Explanation:**
- The button (`#child`) is clicked first.
- The event bubbles **upward** and triggers the parent (`#parent`).

🛑 **Stopping Event Bubbling**
```javascript
  document.getElementById("child").addEventListener("click", function(event) {
      console.log("Child Clicked!");
      event.stopPropagation(); // Stops event bubbling
  });
```
### **🔹 Output after `stopPropagation()`**
```
Child Clicked!
```
📌 Now the parent click event **does not trigger**.

---

## 🔵 Example: Event Capturing (Top to Bottom)
Event capturing means that the event **first triggers on the parent** and then moves **downward to the child**.

### **📝 Code (HTML + JavaScript)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Capturing Example</title>
    <style>
        #parent {
            padding: 20px;
            background-color: lightblue;
        }
        #child {
            padding: 10px;
            background-color: lightcoral;
        }
    </style>
</head>
<body>
    <div id="parent">
        Parent
        <button id="child">Click Me</button>
    </div>

    <script>
        document.getElementById("parent").addEventListener("click", function() {
            console.log("Parent Clicked!");
        }, true); // 🔥 Enabling capturing mode

        document.getElementById("child").addEventListener("click", function() {
            console.log("Child Clicked!");
        }, true);
    </script>
</body>
</html>
```

### **🔹 Output (Clicking the Button)**
```
Parent Clicked!
Child Clicked!
```
📌 **Explanation:**
- The **parent element is triggered first**, then the child event executes.
- This happens because **we set `{capture: true}`** in `addEventListener()`.

---

## 🔥 Event Bubbling vs Event Capturing: Quick Comparison
| Feature            | Event Bubbling (Default) | Event Capturing |
|--------------------|------------------------|----------------|
| **Flow Direction** | Bottom → Top (Child → Parent) | Top → Bottom (Parent → Child) |
| **Default Behavior?** | ✅ Yes | ❌ No (Manually Enable) |
| **Enable Method** | `addEventListener("event", fn)` | `addEventListener("event", fn, true)` |
| **Stop Propagation?** | ✅ `event.stopPropagation()` | ✅ `event.stopPropagation()` |
| **Common Usage?** | ✅ Very Common | ❌ Rarely Used |

---

## **🎯 Conclusion**
- **Event Bubbling (Default)**: Child → Parent (Trigger from the innermost element).
- **Event Capturing**: Parent → Child (Trigger from the outermost element first).
- **Use `event.stopPropagation()`** to stop event bubbling or capturing.
- **Most developers use Event Bubbling**, unless there is a specific need for Event Capturing.

🚀 **MERN stack projects me bhi event bubbling important hota hai**, jaise ki **event delegation (click events on dynamic elements)**.

# **Real-World Use Case: Event Bubbling in a Job Portal**

## **📌 Problem Statement**
In a job portal, we have multiple job listings, and each listing has an **Apply Now** button. If we add an event listener to each button separately, it can slow down the page due to unnecessary event bindings.

## **💡 Solution: Event Delegation (Using Event Bubbling)**
Instead of adding event listeners to **every Apply Now button**, we add **one event listener to the parent container**. When a button is clicked, the event **bubbles up** to the parent, where we handle the event efficiently.

---

## **👨‍💻 Code Example: Job Portal (Using Event Bubbling for Delegation)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Delegation Example</title>
    <style>
        .job-list {
            width: 300px;
            padding: 10px;
            border: 2px solid #000;
            margin: 10px;
        }
        .apply-btn {
            background: green;
            color: white;
            border: none;
            padding: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h2>Available Jobs</h2>
    <div id="job-container">
        <div class="job-list">
            <h3>Software Engineer</h3>
            <button class="apply-btn">Apply Now</button>
        </div>
        <div class="job-list">
            <h3>Frontend Developer</h3>
            <button class="apply-btn">Apply Now</button>
        </div>
        <div class="job-list">
            <h3>Data Analyst</h3>
            <button class="apply-btn">Apply Now</button>
        </div>
    </div>

    <script>
        document.getElementById("job-container").addEventListener("click", function(event) {
            if (event.target.classList.contains("apply-btn")) {
                let jobTitle = event.target.parentElement.querySelector("h3").textContent;
                alert("You applied for: " + jobTitle);
            }
        });
    </script>
</body>
</html>
```

---

## **📝 How it Works?**
1. **Instead of adding listeners on every button**, we add **one listener on the `#job-container`**.
2. When **any button is clicked**, the event bubbles **upwards** to `#job-container`.
3. **Using `event.target`**, we check if the clicked element is an **Apply Now button**.
4. **We extract the job title dynamically** from the clicked button's parent.
5. **Performance optimized** ✅: Only **one event listener** is used, no matter how many jobs are added.

---

## **🔹 Event Capturing Example (Less Common Use Case)**
Sometimes, we may want to **intercept clicks before they reach child elements**. We use **Event Capturing** for such cases:

```javascript
  document.getElementById("job-container").addEventListener("click", function() {
      console.log("Parent Intercepted Click!");
  }, true);  // 🔥 Enabling capturing mode
```

### **🔹 How Capturing Works?**
1. When you click **Apply Now**, the event first triggers on `#job-container` (Top → Bottom).
2. This is useful for **security features, analytics, or ad blockers**.

---

## **🎯 Key Takeaways**
| Feature            | Event Bubbling (Default) | Event Capturing |
|--------------------|------------------------|----------------|
| **Flow Direction** | Bottom → Top (Child → Parent) | Top → Bottom (Parent → Child) |
| **Default Behavior?** | ✅ Yes | ❌ No (Manually Enable) |
| **Performance** | ✅ Optimized (Fewer Listeners) | ❌ Less Common |
| **Usage** | ✅ Forms, Buttons, Dynamic Lists | ❌ Security, Analytics |
| **Example Use Case** | Job Portals, E-commerce Carts | Ad Blockers, Logging |

---

## **🚀 Conclusion**
- **Event Bubbling is super useful for Event Delegation** and **improves performance**.
- **Real-world applications**: Job portals, e-commerce carts, notifications, and tracking systems.
- **Use Event Capturing when you need to intercept events before children get them.**

📌 **MERN stack me bhi yeh bahut useful hai** jaise ki **dynamic elements pe click handling** (job list, cart items, notifications). 




------------------------------------------------------------------------------------------------------------------

# **🔥 Higher-Order Functions (HOF) in JavaScript** 🚀

## **📌 What is a Higher-Order Function?**
A **higher-order function** (HOF) is a function that **takes another function as an argument OR returns a function**.  
HOFs help in writing **clean, reusable, and optimized code** in JavaScript.

---

## **📝 Example 1: Using `map()`, `filter()`, and `reduce()` (Built-in HOFs)**
JavaScript me **map, filter, reduce** bhi **higher-order functions** hote hain. Yeh **ek function ko as a parameter accept karte hain!**

```javascript
const numbers = [1, 2, 3, 4, 5];

// ✅ map() - Modify each element
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// ✅ filter() - Filter elements based on condition
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// ✅ reduce() - Perform operations on the array
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15
```

---

## **📝 Example 2: Creating a Custom Higher-Order Function**
Ek function **dusre function ko return kar raha hai**, toh yeh bhi **higher-order function** hai.

```javascript
function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const double = multiplier(2);
console.log(double(5)); // Output: 10

const triple = multiplier(3);
console.log(triple(5)); // Output: 15
```
📌 **Yahan `multiplier(2)` ek function return karta hai jo kisi bhi number ko 2 se multiply karega.**

---

## **📝 Example 3: Higher-Order Function in Real-World (Middleware in Express.js)**
Agar tum **MERN stack** use kar rahe ho, toh **middleware functions** bhi higher-order functions hote hain.

```javascript
const express = require("express");
const app = express();

// Higher-Order Function - Middleware
const logger = (req, res, next) => {
    console.log(`Request received at ${new Date().toISOString()}`);
    next(); // Call the next middleware
};

app.use(logger); // Using the HOF middleware

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.listen(3000, () => console.log("Server running on port 3000"));
```
📌 **Yahan `logger` ek HOF hai jo `next()` call karta hai, taki agla function execute ho sake.**

---

## **🎯 Why Use Higher-Order Functions?**
✅ **Code Reusability** - Ek bar likho, multiple places me use karo.  
✅ **Functional Programming** - Code ko modular aur readable banata hai.  
✅ **Asynchronous Handling** - Callbacks aur Promises me useful hai.  
✅ **Performance Optimization** - `map()`, `filter()`, `reduce()` se efficient code likh sakte hain.  

MERN projects me **middleware, async operations, and functional programming me HOFs kaafi useful hote hain!** 🚀🔥  

---------------------------------------------------

# **🔥 `reduce()` in JavaScript** 🚀  

## **📌 What is `reduce()`?**  
`reduce()` ek **higher-order function** hai jo array ke elements ko **ek single value me convert** karta hai. Yeh ek **callback function accept karta hai** jo **accumulator (previous result)** aur **current value** ko process karta hai.  

---

## **📝 Syntax of `reduce()`**
```javascript
array.reduce((accumulator, currentValue, index, array) => {
    // operation
}, initialValue);
```
- `accumulator` → Pehle iteration ka result store karta hai.  
- `currentValue` → Current element jo process ho raha hai.  
- `index` (optional) → Current element ka index.  
- `array` (optional) → Original array.  
- `initialValue` → Accumulator ka initial value (optional, but recommended).  

---

## **📝 Example 1: Sum of Array Elements**
```javascript
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // Output: 15
```
📌 **Yahan `acc` pehle `0` se start hota hai, phir har element ka sum karta hai.**

---

## **📝 Example 2: Finding Maximum Value**
```javascript
const numbers = [10, 5, 8, 20, 3];

const max = numbers.reduce((acc, num) => (num > acc ? num : acc), numbers[0]);
console.log(max); // Output: 20
```
📌 **Yahan har element ko check kar rahe hain ki wo max hai ya nahi.**

---

## **📝 Example 3: Count Occurrences of Elements**
```javascript
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const fruitCount = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log(fruitCount);
// Output: { apple: 3, banana: 2, orange: 1 }
```
📌 **Yahan ek object bana rahe hain jo har fruit ka count store karega.**

---

## **📝 Example 4: Grouping Data (Real-World)**
Maan lo tum ek **job portal** bana rahe ho, aur tumhe **jobs ko category-wise group karna hai**.

```javascript
const jobs = [
    { title: "Frontend Developer", category: "Web Development" },
    { title: "Backend Developer", category: "Web Development" },
    { title: "Data Analyst", category: "Data Science" },
    { title: "ML Engineer", category: "Data Science" }
];

const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.category]) {
        acc[job.category] = [];
    }
    acc[job.category].push(job.title);
    return acc;
}, {});

console.log(groupedJobs);
/* Output:
{
  "Web Development": ["Frontend Developer", "Backend Developer"],
  "Data Science": ["Data Analyst", "ML Engineer"]
}
*/
```
📌 **Yahan hum jobs ko unki category ke according group kar rahe hain.**

---

## **🎯 Why Use `reduce()`?**
✅ **Array ko single value me transform karne ke liye best hai**  
✅ **Code readability improve karta hai**  
✅ **Complex operations jaise counting, grouping, aur summing me useful hai**  
✅ **Functional programming approach ko follow karta hai**  



