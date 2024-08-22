// const { concat } = require("lodash");


const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300,1500],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
let currUser;


const createUserName=function(acc){
    acc.forEach(element => {
        element.username=element.owner.toLowerCase().split(' ').reduce((acc,str)=>acc+str[0],'');
    });
}
createUserName(accounts);

const displayRow=function(accountArr){
    console.log(accountArr)
    containerMovements.innerHTML='';
    accountArr.forEach((ele,ind)=>{
        const type=ele>0?'deposit':'withdrawal';
        const html=`<div class="movements__row">
        <div class="movements__type movements__type--${type}">${ind+1} ${type}</div>
        <div class="movements__value">${ele} €</div>
      </div>`
      containerMovements.insertAdjacentHTML('afterbegin',html);

    })
}
const calcSumaary=function(account){
    labelSumIn.textContent=account.movements.filter((ele)=>ele>0).reduce((acc,curr)=>acc+curr,0);
    labelSumOut.textContent=account.movements.filter((ele)=>ele<0).reduce((acc,curr)=>acc+curr,0)
    labelSumInterest.textContent=account.movements.filter((curr) => curr > 0).reduce((acc, curr) => acc += (curr * account.interestRate) / 100, 0);
}
btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    const uN=inputLoginUsername.value;
    const pN=inputLoginPin.value;

    currUser=accounts.find(ele=>ele.username===uN);
    if(currUser?.pin===Number(pN)){
        containerApp.style.opacity=1;

        displayRow(currUser.movements)
        calcSumaary(currUser);

    }
})

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();
  const ToTrns=inputTransferTo.value;
  const amo=Number(inputTransferAmount.value);

  inputTransferTo.value='';
  inputTransferAmount.value='';

  currUser.movements.push(-amo);
  console.log(typeof ToTrns,typeof accounts[account1.username])
  const ele=accounts.find((ele)=>ele.username===ToTrns);
  console.log(ele);
  ele.movements.push(amo);
  displayRow(currUser.movements);

})































// const display_movement = function (movement,sort=false) {
//   containerMovements.innerHTML=''
//   const movz=sort?movement.slice().sort((a,b)=>a-b):movement
//   movz.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal'
//     const html = `
//         <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
//           <div class="movements__value">${mov}</div>
//         </div>
//         `;
//     containerMovements.insertAdjacentHTML('afterbegin', html)
//   })
// }


// //for creating userID
// //add a new username property in our account
// const create_user_name = acc => {
//   acc.forEach(function (user) {
//     user.username = user.owner.toLowerCase().split(' ').reduce((acc, curr) => acc + curr[0], '')
//   })

// }
// create_user_name(accounts)

// //calculating balance
// const calc_print_balance = function (user) {
//   const movement=user.movements;
//   const balance = movement.reduce((acc, curr) => acc + curr, 0)
//   labelBalance.innerHTML = `${balance} €`;
//   user.balance=balance;
// }


// const calcDisplaySummary = (mov_object) => {
//   const movement=mov_object.movements;
//   const income = movement.filter((curr) => curr > 0).reduce((acc, curr) => acc + curr, 0);
//   const income_out = movement.filter((curr) => curr < 0).reduce((acc, curr) => acc + curr, 0);
//   const income_tax = movement.filter((curr) => curr > 0).reduce((acc, curr) => acc += (curr * mov_object.interestRate) / 100, 0);
//   labelSumIn.textContent = income
//   labelSumOut.textContent = Math.abs(income_out)
//   labelSumInterest.textContent = income_tax;
// }

// const updateUI=(currUser)=>{
//   display_movement(currUser.movements)
//   //display balance
//   calc_print_balance(currUser)
//   //display summary
//   calcDisplaySummary(currUser)
// }
// //event listeners
// let currUser;
// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault();
//   currUser=accounts.find(mov=>mov.username===inputLoginUsername.value)
//   if(currUser?.pin==Number(inputLoginPin.value)){
//   //display welcome message
//     labelWelcome.innerHTML=`welcome ${currUser.owner.split(' ')[0]}`
//     //opacity set to 100
//     containerApp.style.opacity=100;
//     //display movements
//     updateUI(currUser)

//     //input field be empty
//     inputLoginUsername.value=''
//     inputLoginPin.value=''
//     let count=300,min,sec,change;
//     let Interval=setInterval(function(){
//       count--;
//       min=Math.trunc(count/60);
//       sec=count-(min*60);
//       if(sec<10){
//         change="0"+sec;
//       }
//       labelTimer.textContent=`${min}:${sec>=10?sec:change}`
//       if(count==0){
//         clearInterval(Interval);
//         containerApp.style.opacity=0

//       }
//     },1000);
//   }
// })


// btnTransfer.addEventListener('click',function(e){
//   e.preventDefault();
//   const amount=Number(inputTransferAmount.value);
//   const id=accounts.find(acc=>acc.username===inputTransferTo.value);
//   //cleaing values
//   inputTransferAmount.value=''
//   inputTransferTo.value=''
//   if(amount>0 && amount<=currUser.balance && id?.username!==currUser.username){
//   currUser.movements.push(-amount)
//   id.movements.push(amount);
//   updateUI(currUser)
// }
// })

// btnLoan.addEventListener('click',function(e){
//   e.preventDefault();
//   const amount=Number(inputLoanAmount.value);
//   console.log(amount,typeof amount)
//   if(amount>0 && currUser.movements.some(curr=>curr>=(amount*10)/100)){
//     //push loan amlount
//     console.log(amount,typeof amount)
//     currUser.movements.push(amount);
//     //update ui
//     updateUI(currUser)
//   }
//   inputLoanAmount.value='';

// })


// btnClose.addEventListener('click',function(e){
//   e.preventDefault()
//   if(currUser.username===inputCloseUsername.value && currUser.pin===Number(inputClosePin.value)){

//   const delete_in=accounts.findIndex(i=>i.username===currUser.username)
//   accounts.splice(delete_in,1);

//   //delete ui
//   containerApp.style.opacity=0;
// }
// inputCloseUsername.value=''
//   inputClosePin.value=''
// })

// let sort=false;
// btnSort.addEventListener('click',function(e){
//   e.preventDefault()
  
//   display_movement(currUser.movements,!sort);
//   sort=!sort;
  
// })

// const new_a=accounts.map(acc=>acc.movements)
// let res=0;
// new_a.forEach(function(curr){
//     res+=curr.reduce((acc,curr_v)=>acc+curr_v,0);
// })
// console.log(res)






















