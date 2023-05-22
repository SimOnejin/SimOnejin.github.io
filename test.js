let string1 = "안녕하세요";
let string2 = "반갑습니다";
let greeting = `${string1} ${string2}`;
console.log(greeting);

let product = { name: "book", price: "42$" };
let message = `product ${product.name}의 price는 ${product.price}`;

let value1 = 1;
let value2 = 2;
let boolValue = false;
var operator1 = `곱셈값은 ${value1 * value2} 입니다.`;
var operator2 = `불린값은 ${boolValue ? "참" : "거짓"} 입니다.`;
console.log(operator1)
console.log(operator2)

//문제
let cart = { name : '도서', amount : '15', price : '300'};
let getTotal = `${cart.amount * cart.price}`;
let myCart = `장바구니에 ${cart.name} 가 있습니다. 총 금액은 ${getTotal} 입니다.`;
console.log(myCart)