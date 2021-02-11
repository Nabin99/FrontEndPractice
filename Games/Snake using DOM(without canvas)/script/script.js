let moveDir="R";
let inputDir="R";
function moveDown(){
  inputDir="D";
}
function moveUp(){
  inputDir="U";
}
function moveRight(){
  inputDir="R";
}
function moveLeft(){
  inputDir="L";
}
//score variables 
let score=0,maxScore=0;
//snake body position object
function Pos(x,y){
  this.xPos=x;
  this.yPos=y;
}
//snake body position object array
let sBodyPos=[];
sBodyPos[0]=new Pos(20,0);
sBodyPos[1]=new Pos(10,0);
sBodyPos[2]=new Pos(0,0);
//snake food
let snakeBody = document.getElementsByClassName("snakebody");
  
for(let i=0;i<snakeBody.length;i++){
  snakeBody[i].style.left=sBodyPos[i].xPos+"px";
  snakeBody[i].style.top=sBodyPos[i].yPos+"px";
}
let startGame= (function(){
  
  let food=document.getElementById("snakefood");
  let snakeFood={xPos:0,yPos:0};

  function randomFood(){
  snakeFood.xPos=Math.floor(Math.random()*35)*10;
  snakeFood.yPos=Math.floor(Math.random()*35)*10;
  food.style.left=snakeFood.xPos+"px";
  food.style.top=snakeFood.yPos+"px";
  food.style.visibility="visible";
}
 randomFood();

 
 

  return function(id){
    if(!(moveDir==="R"&&inputDir==="L"||moveDir==="L"&&inputDir==="R") && !(moveDir==="U"&&inputDir==="D"||moveDir==="D"&&inputDir==="U")){
      moveDir=inputDir;
    }
    for(let i=1;i<sBodyPos.length;i++){
      if(sBodyPos[0].xPos===sBodyPos[i].xPos&&sBodyPos[0].yPos===sBodyPos[i].yPos){
        clearInterval(id);
        document.getElementById("final_score").innerHTML="score:" + score.toString().padStart(5,0) + "\nmaxscore:" + maxScore.toString().padStart(5,0);
        document.getElementById("game_end").style.visibility = "visible"; 
      }
    }
    switch (moveDir){
      case "R":
        if (sBodyPos[0].xPos == (350-10)) {
          clearInterval(id);
          document.getElementById("final_score").innerHTML="score:" + score.toString().padStart(5,0) + "\nmaxscore:" + maxScore.toString().padStart(5,0);
          document.getElementById("game_end").style.visibility = "visible";
        } else {
    
          for(let i=sBodyPos.length-1;i>0;i--){
            sBodyPos[i].xPos=sBodyPos[i-1].xPos;
            sBodyPos[i].yPos=sBodyPos[i-1].yPos;
          }
          sBodyPos[0].xPos+=10; 
          for(let i=0;i<snakeBody.length;i++){
          snakeBody[i].style.left=sBodyPos[i].xPos+"px";
          snakeBody[i].style.top=sBodyPos[i].yPos+"px";}
          
        }
        break;
      case "U":
        if (sBodyPos[0].yPos == 0) {
          clearInterval(id);
          document.getElementById("final_score").innerHTML="score:" + score.toString().padStart(5,0) + "\nmaxscore:" + maxScore.toString().padStart(5,0);
          document.getElementById("game_end").style.visibility = "visible";
        } else {
           
          for(let i=sBodyPos.length-1;i>0;i--){
            sBodyPos[i].xPos=sBodyPos[i-1].xPos;
            sBodyPos[i].yPos=sBodyPos[i-1].yPos;
          }
          sBodyPos[0].yPos-=10;
          for(let i=0;i<snakeBody.length;i++){
            snakeBody[i].style.left=sBodyPos[i].xPos+"px";
            snakeBody[i].style.top=sBodyPos[i].yPos+"px";}
        }

        break;
      case "L":
        if (sBodyPos[0].xPos == 0) {
          clearInterval(id);
          document.getElementById("final_score").innerHTML="score:" + score.toString().padStart(5,0) + "\nmaxscore:" + maxScore.toString().padStart(5,0);
          document.getElementById("game_end").style.visibility = "visible";
        } else {
          
          for(let i=sBodyPos.length-1;i>0;i--){
            sBodyPos[i].xPos=sBodyPos[i-1].xPos;
            sBodyPos[i].yPos=sBodyPos[i-1].yPos;
          }
          sBodyPos[0].xPos-=10; 
          for(let i=0;i<snakeBody.length;i++){
            snakeBody[i].style.left=sBodyPos[i].xPos+"px";
            snakeBody[i].style.top=sBodyPos[i].yPos+"px";}
        }
        break;  
       case "D":
        if (sBodyPos[0].yPos == (350-10)) {
          clearInterval(id);
          document.getElementById("final_score").innerHTML="score:" + score.toString().padStart(5,0) + "\nmaxscore:" + maxScore.toString().padStart(5,0);
          document.getElementById("game_end").style.visibility = "visible";
        } else {
          
          for(let i=sBodyPos.length-1;i>0;i--){
            sBodyPos[i].xPos=sBodyPos[i-1].xPos;
            sBodyPos[i].yPos=sBodyPos[i-1].yPos;

          }
          sBodyPos[0].yPos+=10; 
          for(let i=0;i<snakeBody.length;i++){
            snakeBody[i].style.left=sBodyPos[i].xPos+"px";
            snakeBody[i].style.top=sBodyPos[i].yPos+"px";}
        }
        
        break;
    }
      if(sBodyPos[0].xPos===snakeFood.xPos&&sBodyPos[0].yPos===snakeFood.yPos){
        randomFood();
        score+=100;

        let temp = document.createElement("div");
        temp.className="snakebody";
        document.getElementById("game_window").appendChild(temp);
        sBodyPos[sBodyPos.length]=new Pos(sBodyPos[sBodyPos.length-1].xPos,sBodyPos[sBodyPos.length-1].yPos);
        snakeBody = document.getElementsByClassName("snakebody");
        snakeBody[snakeBody.length-1].style.left=sBodyPos[sBodyPos.length-1].xPos + "px";
        snakeBody[snakeBody.length-1].style.top=sBodyPos[sBodyPos.length-1].yPos + "px";

        if(score>maxScore){
          maxScore=score;
        }
        document.getElementById("score").innerHTML=score.toString().padStart(5,0);
        document.getElementById("maxscore").innerHTML=maxScore.toString().padStart(5,0);
       
      }

  }



 })();
 
 function start(){
  document.getElementById("game_start").style.visibility = "hidden";
   let id=setInterval(run,100);
   function run(){startGame(id);}
 }
 function restart(){
  document.getElementById("game_end").style.visibility = "hidden";
  score=0;
  document.getElementById("score").innerHTML=score.toString().padStart(5,0);
  moveDir="R";
  inputDir="R";
sBodyPos=null;
sBodyPos=[];
sBodyPos[0]=new Pos(20,0);
sBodyPos[1]=new Pos(10,0);
sBodyPos[2]=new Pos(0,0);
for(let i=snakeBody.length-1;i>2;i--){
  snakeBody[i].remove();
}

for(let i=0;i<sBodyPos.length;i++){
  snakeBody[i].style.left=sBodyPos[i].xPos+"px";
  snakeBody[i].style.top=sBodyPos[i].yPos+"px";
}
  let id=setInterval(run,100);
  function run(){startGame(id);}
 }
 
 
