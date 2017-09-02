var base = "Lorem ;ipsum dolor; sit amet, ; consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.  Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.";
// var base = "Lorem ipsum dolor sit Amet";

// actually all below stuff could be replaced with the "is not a word" metacharacter (\W)
// base = base.replace(/\,/g,"");// the /x/g means the effect is applied to all
// base = base.replace( /\./g ,"");// instances, not just the first encounter,
// base = base.replace(/\;/g,"");// the \ makes sure the effect of the dot, comma etc. are negated
// base = base.replace(/\"/g, "");
base = base.toLowerCase();
base = base.replace(/[^\w\s]/g,"") //regex here selects everything that is not a word (\w) or a space (\s)
base = base.replace(/  /g," ");

var loremArray = base.split(" "); //text is turned into an array in order to be able to select x amount of words and punctuation at random intervals
var loremArray;//need a seperate array because the way I used slice() in the generate function alters the original lorenArray
var button = document.querySelector("#generate-button");
button.formAction = "#";// to cancel out the annoying reloading of the page on enter
var numbWordInput = document.querySelector("#number-of-words");
numbWordInput.autofocus = true;
var parLengthInput = document.querySelector("#words-per-paragraph")
parLengthInput.defaultValue = 100;
var outputArea = document.querySelector("#output-area");
var numbWord;
var displayLorem;//the actual string that gets shown
var parLength;
var ranPeriod = 10;
var periodCounter = 0;
var ranComma = 6;
var commaCounter = 0;

//=============================== GENERATION ======================//

function generate(){
  numbWord = numbWordInput.value;//numb of words is selected

  while (numbWord > loremArray.length){    //max word count limit fix
    loremArray = loremArray.concat(loremArray.slice(0,numbWord - loremArray.length));
  }


  loremArray = loremArray.slice(0,numbWord);// amount of words is actually processed

  parLength = parLengthInput.value;   //----select paragraph length


  for (i = 0; i < numbWord; i++){
    periodCounter ++;
    commaCounter ++;

    if(i % parLength == 0 && i != 0 && i < loremArray.length){
      loremArray.splice(i, 0, "\.\n\n");//add a break
      loremArray[i+1] = loremArray[i+1].charAt(0).toUpperCase() + loremArray[i+1].slice(1, loremArray[i+1].length);
    }

    if (periodCounter == ranPeriod){
      loremArray.splice(i, 0, "\.");//add a period and one line below: add capital letter after period
      loremArray[i+1] = loremArray[i+1].charAt(0).toUpperCase() + loremArray[i+1].slice(1, loremArray[i+1].length);
      periodCounter = 0;
      ranPeriod =  Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    }

    if (commaCounter == ranComma){
      loremArray.splice(i, 0, "\,");//add a comma and one line below: add capital letter after period
      commaCounter = 0;
      ranComma =  Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    }
  }

  loremArray.push(".");//adds the final period after the generated copy, not sure why specifically that period was missing tho
  displayLorem = loremArray.join(" ");//text is made back into a string for displaying
  displayLorem = displayLorem.replace(/\n\n /g,"\n\n");//delete space before punctuation
  displayLorem = displayLorem.replace(/ \,/g,",");//delete space before comma
  displayLorem = displayLorem.replace(/ \./g,".");//delete space before period
  displayLorem = displayLorem.replace(/\,\./g,".");//delete comma if there's a period after a comma (sometimes happens because of the randomness of comma and period insertion)
  displayLorem = displayLorem.replace(/\.\,/g,".");//same as above but in reverse order
  displayLorem = displayLorem.replace(/\. \,/g,".");

  // console.log(JSON.stringify(displayLorem));// testing out the stringify command
  outputArea.innerHTML = displayLorem;

}

button.addEventListener("click", generate);

// be able to select number of words OR number of characters --> can be done in two ways:
// 1: be able to select char OR words for the same input field
// 2: make two input fields and have one of them inactive/greyed oud if the other one is focused

// need to fix bug with the form action thing -> first time you hit enter it clears everything again and only then works
// need to fix bug where something strange happens if you generate for a second time
