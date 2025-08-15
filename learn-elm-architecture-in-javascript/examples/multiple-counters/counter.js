// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter
var Res = 'reset';                   // reset counter: git.io/v9KJk

function createAction(type, index) {
  return {type, index};
}

function update(model, action) {     // Update function takes the current state
  const new_counters = [...model.counters];
  if (action) {
    switch(action.type) {                   // and an action (String) runs a switch
      case Inc:
        new_counters[action.index] += 1;
        break;
      case Dec:
        new_counters[action.index] -= 1;
        break;
      case Res: // use ES6 Array.fill to create a new array with values set to 0:
        new_counters[action.index] = 0;
        break;
      default: return model; // if action not defined, return curent state.
    }
  }
  return {...model, counters: new_counters};
    // return new_model;
}

function view(signal, model, root) {
  empty(root); // clear root element before re-rendering the App (DOM).
  model.counters.map(function(counter, index) {
    return createContainer(index, [                // wrap DOM nodes in an "container"
      createButton('+', signal, createAction(Inc, index)),    // append index to action
      createDiv('count', counter),       // create div w/ count as text
      createButton('-', signal, createAction(Dec, index)),    // decrement counter
      createButton('Reset', signal, createAction(Res, index)) // reset counter
    ]);
  }).forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+
}

// Mount Function receives all MUV and mounts the app in the "root" DOM Element
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {   // signal function takes action
    return function callback() {     // and returns callback
      model = update(model, action); // update model according to action
      view(signal, model, root);     // subsequent re-rendering
    };
  };
  view(signal, model, root);         // render initial model (once)
}

// The following are "Helper" Functions which each "Do ONLY One Thing" and are
// used in the "View" function to render the Model (State) to the Browser DOM:

// empty the contents of a given DOM element "node" (before re-rendering)
function empty(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
} // Inspired by: stackoverflow.com/a/3955238/1148249

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
function createContainer(index, elements) {
  var con = document.createElement('section');
  con.id = index;
  con.className = 'counter';
  elements.forEach(function(el) { con.appendChild(el) });
  return con;
}

function createButton(text, signal, action) {
  var button = document.createElement('button');
  button.textContent = text;
  button.className = action.type;                   // use action as CSS class
  button.id =   button.id = `${action.type}-${action.index}`;  // Better ID
  button.onclick = signal(action);             // onclick tells how to process
  return button;                               // return the DOM node(s)
} // how to create a button in JavaScript: stackoverflow.com/a/8650996/1148249

function createDiv(divid, text) {
  var div = document.createElement('div');
  div.id = divid;
  div.className = divid;
  if(text !== undefined) { // if text is passed in render it in a "Text Node"
    div.textContent = text;
  }
  return div;
}
