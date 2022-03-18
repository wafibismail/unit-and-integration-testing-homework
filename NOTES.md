### Helpful pieces of information from the video
##### Rules of TDD
- ONLY WRITE CODE IF A TEST FAILS
- Eliminate duplication <br>
##### Simple example of a unit test
Test code:
```javascript
//Test1
it("should add two numbers"), () => {
    expect(add(1,1)).toBe(2);
}
```
Code needed to pass the test could be:
```javascript
//Code1
function add(a,b) {
    return 2;
}
```
Though that wouldn't make sense. Better test:
```javascript
//Test2
it("should add two numbers"), () => {
    expect(add(1,1)).toBe(2);
    expect(add(2,5)).toBe(7);
    expect(add(-1,-1)).toBe(-2);
    expect(add(-2,5)).toBe(3);
}
```
Now Code1 wouldn't pass the test. This would:
```javascript
//Code2
function add(a,b) {
    return a + b;
}
```
##### What's a good test?
Think of how to break the program e.g.: <br>
QA Engineer walks into a bar
- Orders a beer.
- Orders 0 beers.
- Orders 999999999 beers.
- Orders a lizard.
- Orders -1 beers.
- Orders a sfdeljknesv. <br>
<br>
"Write of some good tests, think of some of those edge cases e.g. if we pass in the lizard or negative numbers, and we write tests that reflect that thinking, and we write good working code that we have confidence that works"

##### Red Green Refactor
Red -> Green -> Refactor -> Red -> Green -> Refactor -> Red -> Green -> Refactor-> etc... <br>
Once there's working code, go through it and eliminate duplication; make it easier to work with. <br>
Use the test we've built to confirm the code works.

##### Rules of TDD
- Only write code if a test fails
- ELIMINATE DUPLICATION <br>

##### Note about TDD
- It is not all or nothing
- Use it when it makes sense (which we have to figure out when that would be the case) <br>

##### What is Regression Testing?
- From "Regress": Progress is moving forward, Regress is moving backward. Regression testing is to confirm that our code is not moving backward in functionality, i.e. confirm that tests that have failed in the past do not fail again.

##### This leads to the recommendation: Don't know what to write tests for? Wait for a bug
Wait till we find a bug. Then we'll know what to write automated tests for, i.e. to confirm that the bug doesn't exist.
- Understand why the bug exists in the first place
- Write a test that confirms that the bug doesn't exist anymore <br>
<br>
That's regression testing; Build a test suite around it. Run the test before every commit. <br>
This is a good place to start - start writing tests for bugs founds manually

#### Using Jest
Use "it" or "test", describe what the test should test for of what the test if for:
```javascript
describe("group of tests", () => {
    it("should test something", () => {
        //conduct test
    });
});
describe("group of tests", () => {
    //prefix with x to skip the test, or test.skip if test is used instead of it
    xit("should test something", () => {
        //test not conducted
    });
}); 
```
Use matchers:
```javascript
test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
})
```
##### Jest-dom matchers
Some custom matchers are available via jest-dom to test on dom elements e.g,:
- toBeDisabled
- toBeInTheDocument
- toBeVisible
- toHaveValue
- toBeChecked <br>
<br>
etc. (minute 29:19)

##### Other tools
@Testing-library - family of testing utilities for rendering dom elements:
- /dom, if appropriate:
    - /vue
    - /angular
    - /react
- /react-hooks <br>
<br>
Some APIs:
- get, getAll, query, queryAll, find, findAll - By - Text, LabelText, PlaceHolderText, Title, AltText, DisplayValue, Role,

##### Mocking
Broken in two:
- Be able to spy on a created function, see whether it gets called
- Change the implementation of a function e.g. have axios (http) request return hardcoded data without having to make a call to api server<br>
<br>

```javascript
test("mock is not called", () => {
    const mock = jest.fn(); //create a mock function
    expect(mock).toHaveBeenCalledTimes(0);
});
//E.g. to see whether the code are calling our callbacks
```

##### Coverage
How much of the code is tested. Not as important as writing good tests <br>
E.g. 75% coverage with good tests may be better than 100% coverage