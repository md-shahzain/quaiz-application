const userForm=document.getElementById("user-form");
const instructionBox=document.getElementById("instruction-box");
const quizBox=document.getElementById("quiz-box");
const resultBox=document.getElementById("result-box");

let userName,userEmail,userRoll,userInst;

// Get user info
document.getElementById("continue-btn").onclick=()=>{
  userName=document.getElementById("name").value;
  userEmail=document.getElementById("email").value;
  userRoll=document.getElementById("roll").value;
  userInst=document.getElementById("institute").value;

  if(userName=="" || userEmail=="" || userRoll=="" || userInst==""){
    alert("Please fill all fields!");
    return;
  }

  userForm.classList.remove("active");
  instructionBox.classList.add("active");
};

// Start quiz
document.getElementById("start-btn").onclick=()=>{
  instructionBox.classList.remove("active");
  quizBox.classList.add("active");
  startQuiz();
};

// 20 Questions (Different)
let questions=[
{q:"HTML stands for?",o:["Hyper Text Markup Language","Home Tool Markup","Hyperlinks Markup","None"],a:0},
{q:"CSS stands for?",o:["Cascading Style Sheet","Computer Style System","Creative Style Sheet","None"],a:0},
{q:"Which tag for paragraph?",o:["<p>","<h1>","<br>","<div>"],a:0},
{q:"JS stands for?",o:["JavaScript","Just Script","Java System","None"],a:0},
{q:"Which CSS property changes text color?",o:["color","font-color","text-style","bgcolor"],a:0},
{q:"HTML is?",o:["Markup Language","Programming Language","Database","None"],a:0},
{q:"CSS used for?",o:["Design","Database","Logic","Network"],a:0},
{q:"console.log() belongs to?",o:["JavaScript","PHP","Python","SQL"],a:0},
{q:"Bootstrap made for?",o:["UI Design","Database","Backend","OS"],a:0},
{q:"Which tag for large heading?",o:["h1","h6","p","big"],a:0},
{q:"Which stores multiple values?",o:["Array","String","Number","Boolean"],a:0},
{q:"Which for loop exists in JS?",o:["for","foreach","forin","All"],a:3},
{q:"CSS file extension?",o:[".css",".html",".js",".txt"],a:0},
{q:"JS file extension?",o:[".js",".java",".jsx",".jss"],a:0},
{q:"Which used to style page?",o:["CSS","SQL","MongoDB","PHP"],a:0},
{q:"HTML lists?",o:["ul/ol","table","form","script"],a:0},
{q:"Center text in CSS?",o:["text-align:center","align:center","margin:auto","center"],a:0},
{q:"Which tag for link?",o:["a","link","href","goto"],a:0},
{q:"Prompt() used for?",o:["User input","Display","Console","Style"],a:0},
{q:"Default JS output in browser?",o:["Console","Screen","File","Alert"],a:0},
];

let index=0,correct=0,wrong=0,timer;

function startQuiz(){ loadQuestion(); }

function loadQuestion(){
  document.getElementById("next-btn").disabled=true;
  let q=questions[index];
  document.getElementById("question-text").innerText=`${index+1}. ${q.q}`;
  let opt="";
  q.o.forEach((o,i)=> opt+=`<div class='option' onclick='selectOption(${i})'>${o}</div>`);
  document.getElementById("options").innerHTML=opt;
  startTimer();
}

function selectOption(sel){
  let opts=document.querySelectorAll('.option');
  opts.forEach(o=>o.style.pointerEvents="none");
  let ans=questions[index].a;
  if(sel===ans){correct++;opts[sel].classList.add("correct");}
  else{wrong++;opts[sel].classList.add("wrong");opts[ans].classList.add("correct");}
  document.getElementById("next-btn").disabled=false;
}

document.getElementById("next-btn").onclick=()=>{
  clearInterval(timer);
  index++;
  if(index<questions.length) loadQuestion();
  else finishQuiz();
};

function startTimer(){
  let t=60;
  document.getElementById("time").innerText=t+"s";
  timer=setInterval(()=>{
    t--;
    document.getElementById("time").innerText=t+"s";
    if(t<=0){
      clearInterval(timer);
      index++; 
      if(index<questions.length) loadQuestion();
      else finishQuiz();
    }
  },1000);
}

function finishQuiz(){
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  // Show user info
  document.getElementById("r_name").innerText=userName;
  document.getElementById("r_email").innerText=userEmail;
  document.getElementById("r_roll").innerText=userRoll;
  document.getElementById("r_inst").innerText=userInst;

  document.getElementById("correct").innerText=correct;
  document.getElementById("wrong").innerText=wrong;
  let p=(correct/questions.length)*100;
  document.getElementById("percent").innerText=p.toFixed(0);
  document.getElementById("final-status").innerText=p>=60?"Pass ✅":"Fail ❌";
}
