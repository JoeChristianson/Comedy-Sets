let setString = localStorage.getItem("set");

let setArray = [];
let jokeNumber = 0;
let guessArray = [];
const allLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let nextLetter = "A";
let correctStreak = 0;
let colorArray = ["blue","red","orange","pink","yellow","cyan","green","purple","magenta"]
make();

function guess(x){
    var guessed = guessArray[x];
    if (guessed == nextLetter){
        correctStreak++;
        nextJoke();
    }
    else{

        correctStreak = 0;
        alert("The next joke was " + setArray[jokeNumber +1]);
            for (let index = 0; index < 4; index++) {
                previousJoke();
                
            }
            
    }

}

function nextJoke(){
    if (jokeNumber<(setArray.length-1)){
    jokeNumber++;
}
    else {
        jokeNumber = 0;
    }
    if (setArray[jokeNumber] === ""){
        document.getElementById("joke").innerHTML = "End of Set";    
    }
    else {
    document.getElementById("joke").innerHTML = setArray[jokeNumber];
    assignButtons();
    }
}

function previousJoke(){
    if (jokeNumber != 0){
    jokeNumber--;}
    document.getElementById("joke").innerHTML = setArray[jokeNumber];
    assignButtons();

}

function setList(){
    setString = document.getElementById("set-list").value;
    localStorage.setItem("set",setString);
    make();
}

function assignButtons(){
    if (jokeNumber + 1 < setArray.length){
    nextLetter = setArray[jokeNumber+1][0];
    }
    else {
        nextLetter = setArray[0][0];
    }
    guessArray = randomizeArray();
for(i=0; i < 9;i++){
document.getElementById("button"+i).innerHTML = guessArray[i];
}
// assignButtonColors();
}

function randomizeArray() {
    randomArray = [];
    allLettersRandomizer = allLetters;
    moveItem(nextLetter,allLettersRandomizer,randomArray);
    allLettersRandomizer = removeItem(allLettersRandomizer,nextLetter);
    nextPick = Math.floor(Math.random() * allLettersRandomizer.length);

    for (i = 0;i<8;i++){
        nextPickNumber = Math.floor(Math.random() * allLettersRandomizer.length);
        nextPick = allLettersRandomizer[nextPickNumber];
        allLettersRandomizer = removeItem(allLettersRandomizer,nextPick);
        moveItem(nextPick,allLettersRandomizer,randomArray);

    }
    return shuffle(randomArray);


}

function moveItem(item,fromArray,toArray){
    toArray.push(item);
}

function removeItem(arr, item){
    return arr.filter(f => f !== item);
   }


//    This shuffles the buttons
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function assignButtonColors(){

    for(i=0; i < 9;i++){
        document.getElementById("button"+i).style.backgroundColor = colorArray[i];
    }

}

function make(){
    setArray = setString.split(",");
    document.getElementById("joke").textContent = setArray[0];
    document.getElementById("set-list").value = "";
    assignButtons();
}