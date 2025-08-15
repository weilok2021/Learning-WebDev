var id = 'test-app';

test('Test Update update(0) returns 0 (current state)', function(assert) {
  var result = update(0);
  assert.equal(result, 0);
});

test('Test Update increment: update(1, "inc") returns 2', function(assert) {
  var result = update(1, "inc");
  assert.equal(result, 2);
});

test('Test Update decrement: update(3, "dec") returns 2', function(assert) {
  var result = update(1, "dec");
  assert.equal(result, 0);
});

test('Test negative state: update(-9, "inc") returns -8', function(assert) {
  var result = update(-9, "inc");
  assert.equal(result, -8);
});

test('mount({model: 9, update: update, view: view}, "'
  + id +'") sets initial state to 9', function(assert) {
  mount(9, update, view, id);
  var state = document.getElementById(id)
    .querySelector(".count").textContent;
  assert.equal(state, 9);
});

test('empty("test-app") should clear DOM in root node', function(assert) {
  empty(document.getElementById(id));
  mount(7, update, view, id);
  empty(document.getElementById(id));
  var result = document.getElementById(id).innerHtml
  assert.equal(result, undefined);
});

test('click on "+" button to re-render state (increment model by 1)',
function(assert) {
  mount(7, update, view, id);
  document.getElementById(id).querySelector(".inc").click();
  var state = document.getElementById(id).querySelector(".count").textContent;
  assert.equal(state, 8); // model was incremented successfully
  empty(document.getElementById(id));
});

test("update will return 0 when action is 'reset'", function(assert) {
  mount(9, update, view, id);
  let result = update(9, reset);
  assert.equal(result, 0);
  empty(document.getElementById(id));

});

test("state will be 0 when reset button being clicked", function(assert) {
  mount(11, update, view, id);
  let root = document.getElementById(id);
  assert.equal(root.querySelector(".count").textContent, 11) // counter is 11 for now

  root.querySelector(".reset").click() // click the reset button!  
  result = root.querySelector(".count").textContent;
  assert.equal(result, 0); // counter became 0 now
  empty(root);
});