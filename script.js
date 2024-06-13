let displayPasswordLength=document.querySelector('.displayPasswordLength');
let slider=document.querySelector('.slider');
let checkBoxes=document.querySelectorAll('.checkBoxes');
let displayPassworBtn=document.querySelector('.displayPassworBtn');
let copyBtn=document.querySelector('.copyBtn');
let displayPasswordInput=document.querySelector('.displayPasswordInput');
let indicatorBtn=document.querySelector('.indicatorBtn');
let copySucess=document.querySelector('.copySucess');
let copyFail=document.querySelector('.copyFail');
let passGenerateFail=document.querySelector('.passGenerateFail');

const symbols= '`~!@#$%^&*()-_=+[]\{}|:;",./<>?';

let password='';
displayPasswordInput.innerHTML=password;

let passwordLength=10;
slider.value=10;
displayPasswordLength.innerHTML=10;

let count=1;



const progress1 = (passwordLength / slider.max) * 100;
slider.style.background = `linear-gradient(to right, #f50 ${progress1}%, #ccc ${progress1}%)`;



function handleSlider(){
    displayPasswordLength.innerHTML=slider.value;
    passwordLength=slider.value;
    const progress = (passwordLength / slider.max) * 100;
    slider.style.background = `linear-gradient(to right, #f50 ${progress}%, #ccc ${progress}%)`;
}
slider.addEventListener('input',handleSlider);


checkBoxes[0].checked=true;
checkBoxes[1].checked=false;
checkBoxes[2].checked=false;
checkBoxes[3].checked=false;


checkBoxes.forEach((checkBox)=>{
    checkBox.addEventListener('change',()=>{
        if(checkBox.checked==true){
            count++;
            console.log(count);
        }else{
            count--;
            console.log(count);
        }

        if(count>passwordLength){
            slider.value=count
            displayPasswordLength.innerHTML=slider.value
        }


        if(count==0){
            return;
        }
        if(count==1){
            indicatorBtn.setAttribute('style','background-color: red');
        }
        if(count==2){
            indicatorBtn.setAttribute('style','background-color: orangered');
        }
        if(count==3){
            indicatorBtn.setAttribute('style','background-color: yellow');
        }
        if(count==4){
            indicatorBtn.setAttribute('style','background-color: rgb(10, 254, 10)');
        }


    });
});



async function copyContent(){
    if(displayPasswordInput.innerHTML!=''){
        try{
            await navigator.clipboard.writeText(displayPasswordInput.innerHTML);
            copySucess.classList.add('display_show');
        }
        catch(e){
        }
        setTimeout(()=>{
            copySucess.classList.remove('display_show');
        },1000);
    }else{
        copyFail.classList.add('display_show');
        setTimeout(()=>{
            copyFail.classList.remove('display_show');
        },1000);
    }
}


copyBtn.addEventListener('click',copyContent);

function getRandIndex(min,max){
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandUpperCase(){
    return String.fromCharCode(getRandIndex(65,91));
}

function getRandLowerCase(){
    return String.fromCharCode(getRandIndex(97,123));
}

function getRandNumbers(){
    return (getRandIndex(0,10));
}

function getRandSymbols(){
    return symbols.charAt(getRandIndex(0,symbols.length+1));
}



displayPassworBtn.addEventListener('click',()=>{

    password='';

    if(count==0){
        passGenerateFail.classList.add('display_show');
        setTimeout(()=>{
            passGenerateFail.classList.remove('display_show');
        },1000);
    }

    let funcArr=[];

    if(checkBoxes[0].checked==true){
        funcArr.push(getRandUpperCase);
    }
    if(checkBoxes[1].checked==true){
        funcArr.push(getRandLowerCase);
    }
    if(checkBoxes[2].checked==true){
        funcArr.push(getRandNumbers);
    }
    if(checkBoxes[3].checked==true){
        funcArr.push(getRandSymbols);
    }

    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndx=getRandIndex(0,funcArr.length);
        password+=funcArr[randIndx]();
    }
    
    var password = password.split('').sort(function(){return 0.5-Math.random()}).join('');
    displayPasswordInput.innerHTML=password
});