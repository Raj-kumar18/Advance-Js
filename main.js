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


function clickHandler(color){
    return function(){
        document.body.style.backgroundColor = `${color}`;
    }
}

document.getElementById("orange").onclick = clickHandler('orange');
document.getElementById("green").onclick = clickHandler('green');