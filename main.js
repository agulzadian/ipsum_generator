var base = "Lorem ;ipsum dolor; sit amet, ; consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.  Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.";

// var base = "Lorem ipsum dolor sit Amet";

base = base.replace(/\,/g,"");
base = base.replace( /\./g ,"");
base = base.replace(/\;/g,"");
base = base.replace(/  /g," ");
base = base.replace(/\"/g, "");

var lorem = base; //base is trimmed

var loremArray = lorem.split(" "); //text is turned into an array in order to be able to select x amount of words

//=============================== USER INPUT ======================//

//----select number of words
var numbWord = 10;

if (numbWord > loremArray.length){ //adds words to the array if there aren't enought words in lorem
  loremArray = loremArray.concat(loremArray.slice(0,numbWord - loremArray.length));
}

//----select paragraph length
var parLength = 6;

loremArray.splice(parLength, 0, "\n");

loremArray = loremArray.slice(0,numbWord);// amount of words is selected

//==================================================================//

var displayLorem = loremArray.join(" ");//text is made back into a string for displaying

console.log(displayLorem);

// be able to select number of words OR number of characters --> can be done in two ways:
// 1: be able to select char OR words for the same input field
// 2: make two input fields and have one of them inactive/greyed oud if the other one is focused









// var test = ["lol", "wtf", "omg"];
//
// test = test.concat(test.slice(0,2));
//
// console.log(test);
