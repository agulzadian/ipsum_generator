var base = "Lorem ;ipsum dolor; sit amet, ; consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.  Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.";
// var base = "Lorem ipsum dolor sit Amet";

base = base.replace(/\,/g,"");// the /x/g means the effect is applied to all
base = base.replace( /\./g ,"");// instances, not just the first encounter,
base = base.replace(/\;/g,"");// the \ makes sure the effect of the dot, comma etc. are negated
base = base.replace(/  /g," ");
base = base.replace(/\"/g, "");

var lorem = base; //base is trimmed
var loremArray = lorem.split(" "); //text is turned into an array in order to be able to select x amount of words
var loremArrayUsed;//need a seperate array because the way I used slice() in the generate function alters the original lorenArray
var button = document.querySelector("#generate-button");
button.formAction = "#";// to cancel out the annoying reloading of the page on enter
var numbWordInput = document.querySelector("#number-of-words");
numbWordInput.autofocus = true;
var outputArea = document.querySelector("#output-area");
var numbWord;
var displayLorem;//the actual string that gets shown

//=============================== USER INPUT ======================//


function generate(){
  numbWord = numbWordInput.value;//numb of words is selected
  loremArrayUsed = loremArray.slice(0,numbWord);// amount of words is actually processed

  //----select paragraph length

  for (i = 0; i < numbWord; i++){

    if(i % 100 == 0 && i != 0){
      loremArrayUsed.splice(i, 0, "\n\n");//add a break
    }
  }

  displayLorem = loremArrayUsed.join(" ");//text is made back into a string for displaying
  displayLorem = displayLorem.replace(/\n\n /g,"\n\n");//delete space before punctuation
  displayLorem = displayLorem.replace(/ \,/g,",");//delete space before punctuation
  displayLorem = displayLorem.replace(/ \./g,".");
  console.log(displayLorem);
}

button.addEventListener("click", generate);




// function setParLength(length) {// has a bug: only breaks after the first length of words, need to make it breaks every length of words (so every 50 words), can do this using modulo
//   length = 50; // set to user input field
//   loremArray.splice(length, 0, "\n\n");//add a break
// }

// be able to select number of words OR number of characters --> can be done in two ways:
// 1: be able to select char OR words for the same input field
// 2: make two input fields and have one of them inactive/greyed oud if the other one is focused

// need to fix bug with the form action thing -> first time you hit enter it clears everything again and only then works
