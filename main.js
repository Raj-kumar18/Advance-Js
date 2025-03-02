// 1️⃣ Throttling and Debouncing

// const normalDiv = document.querySelector('.n_count');
// const throttleDiv = document.querySelector('.t_count');
// const debounceDiv = document.querySelector('.d_count');

// let normalCounter = 0;
// let throttleCounter = 0;
// let debounceCounter = 0;

// let isScrolling = true;
// const normalCount = () => {
//     normalCounter++;
//     normalDiv.innerHTML = `Normal Count: ${normalCounter}`;
// }
// const throttleCount = () => {

//     if (isScrolling === true) {

//         throttleCounter++;
//         throttleDiv.innerHTML = `Throttle Count: ${throttleCounter}`;
//         isScrolling = false; // throttle
//         setTimeout(() => {
//             isScrolling = true;
//         }, 1000);
//     }
// }

// let interval;
// const debounceCount = () => {
//     clearTimeout(interval);
//     interval = setTimeout(() => {
//         debounceCounter++;
//         debounceDiv.innerHTML = `Debounce Count: ${debounceCounter}`;
//     }, 1000);
// }
// const showCount = () => {
//     normalCount()
//     throttleCount()
//     debounceCount()
// }



// 2️⃣ Lexical scoping and Closure
// console.log('Lexical scoping and Closure');

// function outerFunction(){
//     let name = 'John';
//     function innerFunction(){
//         // let Innername = 'Bob';
//         console.log(name);
//     }

//     function innerFunction2(){
//         console.log(Innername); // ReferenceError: Innername is not defined have access only in innerFunction
//     }
//     innerFunction2();
//     innerFunction();
// }
// outerFunction();


// function clickHandler(color){
//     return function(){
//         document.body.style.backgroundColor = `${color}`;
//     }
// }

// document.getElementById("orange").onclick = clickHandler('orange');
// document.getElementById("green").onclick = clickHandler('green');
// ----------------------------------------------------------------------------------------------------------------


// 3️⃣ Call Apply Bind
// console.log('Call Apply Bind');

// const user = {
//     name: 'John',
//     age: 25,
//     showDetails: function () {
//         console.log(`Name: ${this.name} Age: ${this.age}`);
//     }

// }

// const user2 = {
//     name: 'Bob',
//     age: 30
// }

// const print = user.showDetails.bind(user2);
// print(); 


//function borrowing
// const user = {
//     fname: 'John',
//     lname: 'Doe',
//     getfullName: function (greeting, message) {
//         return `${greeting} ${this.fname} ${this.lname} ${message}`;
//     }
// }

// const user2 = {
//     fname: 'Bob',
//     lname: 'Smith'
// }

// console.log(user.getfullName.call(user2, 'Hello', 'How are you?'));
// console.log(user.getfullName.apply(user2, ['Hello', 'How are you?']));


// 4️⃣ Currying
// console.log('Currying');

// function multiply(a, b, c) {
//     return a * b * c;
// }

// const result = multiply(1, 2, 3);
// console.log(result);

// function Currying(a) {
//     return function (b) {
//         return function (c) {
//             return a * b * c;
//         }
//     }
// }

// const result2 = Currying(1)(2)(3);
// console.log(result2);


// function multiply(a,b){
//     return a*b;
// }

// const doubleIt = multiply.bind(null,2);
// console.log(doubleIt(4)); // 8

// async function fetchData(baseUrl,endpoint){
//     const response = await fetch(`${baseUrl}/${endpoint}`);
//     const data = await response.json()
//     return data
// }

// const getTodoData = fetchData.bind(null,'https://jsonplaceholder.typicode.com');
// console.log(getTodoData('/todos/'));


// const getOneTodoData = fetchData.bind(null,'https://jsonplaceholder.typicode.com');
// console.log(getOneTodoData('/todos/1'));


// class User {
//     name;

//     constructor(name) {
//         this.name = name;
//         this.printName = this.printName.bind(this);
//     }

//     printName() {
//         console.log(this.name);
//     }
// }

// const user = new User('Raj kumar');
// console.log(user)

// const btn = document.querySelector('#clickMe');
// btn.addEventListener('click', user.printName);
// btn.addEventListener('click',user.printName.bind(user));


// 5️⃣ Event Bubbling and Event Capturing
// console.log('Event Bubbling and Event Capturing');

// document.getElementById("parent").addEventListener('click',function(){
//     console.log('Parent clicked');
// })

// document.getElementById("child").addEventListener('click',function(e){

//     console.log('Child clicked');
//     e.stopPropagation()
// })

// document.getElementById("parent").addEventListener('click',function(){
//     console.log('Parent clicked');
// },true) // Enable Event Capturing

// document.getElementById("child").addEventListener('click',function(e){
//     console.log('Child clicked');
// },true) // Enable Event Capturing


// document.getElementById("job-container").addEventListener('click',function(e){
//     if(e.target.classList.contains("apply-btn")){
//         let jobTitle = e.target.parentElement.querySelector('h3').textContent;
//         alert(`You have applied for ${jobTitle}`);
//     }
// })