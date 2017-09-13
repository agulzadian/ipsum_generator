var base = "Lorem ;ipsum dolor; sit amet, ; consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.  Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.";
var loremArray = base.split(" "); //text is turned into an array in order to be able to select x amount of words and punctuation at random intervals
var generateButton = document.querySelector("#generate-button");
var copyButton = document.querySelector(".copy-button");
var numbWordInput = document.querySelector("#number-of-words");
var parLengthInput = document.querySelector("#words-per-paragraph")
var outputArea = document.querySelector("#output-area");
var numbWord;
var displayLorem;//the actual string that gets shown
var parLength;
var ranPeriod = 10;
var periodCounter = 0;
var ranComma = 6;
var commaCounter = 0;
var scrollheight;

//====== setup =================//
base = base.toLowerCase();
base = base.replace(/[^\w\s]/g,"") //regex here selects everything that is not a word (\w) or a space (\s)
base = base.replace(/  /g," ");

numbWordInput.autofocus = true;
numbWordInput.defaultValue = 250;
parLengthInput.defaultValue = 250;
//====== aux functions =========//
function capitalize(i){
  loremArray[i] = loremArray[i].charAt(0).toUpperCase() + loremArray[i].slice(1, loremArray[i].length);
}

function randomize(){
  return Math.floor(Math.random() * (15 - 5 + 1)) + 5;
}

function cleanUpDisplayLorem(original, replacement){
  displayLorem = displayLorem.replace(original,replacement);
}

function reset(){
  periodCounter = 0;
  commaCounter = 0;
  numbWord = numbWordInput.value;//numb of words is selected
  loremArray = base.split(" ");
  ranPeriod = randomize();
  ranComma = randomize();
  while (numbWord > loremArray.length){    //max word count limit fix
    loremArray = loremArray.concat(loremArray.slice(0,numbWord - loremArray.length));
  }
  loremArray = loremArray.slice(0,numbWord);// final amount of words is processed
  parLength = parLengthInput.value;//set paragraph length
}

function copy(){
  var clipboard = new Clipboard('.copy-button');
  console.log('yep');
}


//================== GENERATION ===============//
function generate(){
  reset();

  for (i = 0; i < numbWord; i++){ //cut up the paragraph into set paragraph length
    if(i % parLength == 0 && i != 0 && i < loremArray.length){
      loremArray.splice(i, 0, ".</br></br>");//add a break
      capitalize(i+1);
    }
  }

  for (var i = 0; i < numbWord; i++) {
    periodCounter ++;
    commaCounter ++;

    if (periodCounter == ranPeriod){
      loremArray.splice(i, 0, ".");//add a period and capitalize letter after period
      capitalize(i+1);
      periodCounter = 0;
      ranPeriod =  randomize();
    }

    if (commaCounter == ranComma){
      loremArray.splice(i, 0, ",");//add a comma
      commaCounter = 0;
      ranComma =  randomize();
    }
  }

  capitalize(0);//capitalize the very first word
  loremArray.push(".");//adds the final period after the generated copy, not sure why specifically that period was missing tho

  displayLorem = loremArray.join(" ");//text is made back into a string for displaying
  cleanUpDisplayLorem(/ \,/g,",");//delete space before comma
  cleanUpDisplayLorem(/ \./g,".");//delete space before period
  cleanUpDisplayLorem(/\,\./g,".");//delete comma if there's a period after a comma
  cleanUpDisplayLorem(/\.\,/g,".");//same as above but in reverse order
  cleanUpDisplayLorem(/\.\./g,".");//delete double periods
  cleanUpDisplayLorem(/\,\,/g,",");//delete double commas
  cleanUpDisplayLorem(/<\/br>\./g, "</br>");//prevent period from appearing before first word of new par
  cleanUpDisplayLorem(/<\/br>\,/g, "</br>");//prevent comma from appearing before first word of new par

  outputArea.value = displayLorem;
  outputArea.style.height = outputArea.scrollHeight + 'px';

  console.log(outputArea.scrollHeight);

  copyButton.style.display = "inline-block";
}



generateButton.addEventListener("click", generate);

// be able to select number of words OR number of characters --> can be done in two ways:
// 1: be able to select char OR words for the same input field
// 2: make two input fields and have one of them inactive/greyed oud if the other one is focused
