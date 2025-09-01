const { a_plus_abs_b, product, make_repeater } = require("./hw01");

test("a_plus_abs_b(2, 3) returns 5", () => {
  expect(a_plus_abs_b(2, 3)).toEqual(5);
})

test("a_plus_abs_b(2, -3) returns 5", () => {
  expect(a_plus_abs_b(2, -3)).toEqual(5);
})

test("a_plus_abs_b(-1, 4) returns 3", () => {
  expect(a_plus_abs_b(-1, 4)).toEqual(3);
})

test("a_plus_abs_b(-1, -4) returns 3", () => {
  expect(a_plus_abs_b(-1, -4)).toEqual(3);
})

// product tests section
test("product(3, n => n) returns 6 as 1 * 2 * 3 = 6", () => {
  expect(product(3, n => n)).toEqual(6);
})

test("product(5, n => n) returns 120 as 1 * 2 * 3 * 4 * 5 = 120", () => {
  expect(product(5, n => n)).toEqual(120);
})

test("product(3, n => n * n) returns 36 as 1 * 4 * 9 = 36", () => {
  expect(product(3, n => n * n)).toEqual(36);
})

test("product(5, n => n * n) returns 14400 as 1 * 4 * 9 * 16 * 25 = 14400", () => {
  expect(product(5, n => n * n)).toEqual(14400);
})

test("product(3, n => n++) returns 14400 as (1+1) * (2+1) * (3+1) = 24", () => {
  expect(product(3, (n) => {return n + 1})).toEqual(24);
})

test("product(3, n => n * 3) returns 14400 as (1*3) * (2*3) * (3*3) = 162", () => {
  expect(product(3, n => n*3)).toEqual(162);
})

// make_repeater test section
test("make_repeater(n => n + 1, 3)(1) returns 4", () => {
  expect(make_repeater(n => n + 1, 3)(1)).toEqual(4);
})

test("make_repeater(n => n + 1, 3)(5) returns 8", () => {
  expect(make_repeater(n => n + 1, 3)(5)).toEqual(8);
})

test("make_repeater(triple, 5)(1) # 3 * (3 * (3 * (3 * (3 * 1)))) will returns 243", () => {
  expect(make_repeater(n => n * 3, 5)(1)).toEqual(243);
})

test("make_repeater(square, 2)(5) # square(square(5)) will returns 625", () => {
  expect(make_repeater(n => n * n, 2)(5)).toEqual(625);
})

test("make_repeater(square, 3)(5) # square(square(square(5)))", () => {
  expect(make_repeater(n => n*n, 3)(5)).toEqual(390625);
})