const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const btnPopUp = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const txt1 = document.getElementById('tbuser');
const btn1 = document.getElementById('btn1');
const out1 = document.getElementById('output1')

function fun1(){
	out1.innerHTML = txt1.value;

}

btn1.addEventListener('click', fun1)


btnPopUp.addEventListener('click', ()=> {
	wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', ()=> {
	wrapper.classList.remove('active-popup');
})
