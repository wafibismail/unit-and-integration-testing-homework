# Unit And Integration Testing Homework

This is a homework assigned by my Software Engineering lecturer, who suggested several videos to choose from, though since we're free to use testing frameworks other than the ones suggested and as I have found another particular video on YouTube to be of my interest I have decided to go with it instead.

### Source

I followed guidelines in Karl Jensen's video [Unit & Integration Testing w/ Jest - August 10th 2020](https://www.youtube.com/watch?v=X5JSwL56p2A) ([Github link](https://github.com/jensen/jest-notes/)) <br>

I went with the live testing example in the video (code in example folder). Still working on it

## Examples:

Main parts/examples that were went through in the video

### Difference:
- Unit tests: Include all edge cases
- Integration tests: Include only tests necessary to confirm that a component works

### Integration Test 1:
Code1 - status.js
```javascript
import React from "react";
import { formatCurrentBugs, formatBugsPerSecond } from "utils/format";
//refer lower down for the imported modules from utils/format
const Status = ({ bugs, bps }) => {
  return (
    <section>
      <h2>{formatCurrentBugs(bugs)}</h2>
      <h3>{formatBugsPerSecond(bps)}</h3>
    </section>
  );
};
export default Status;
```

Test1 - status.test.js
```javascript
import { render } from "@testing-library/react";
import React from "react";
import Status from "components/status";
describe("Status Component", () => {
  it("should render the current status", () => {
    const { getByText } = render(<Status bugs={1} bps={1} />);

    expect(getByText("You have fixed 1 bug.")).toBeInTheDocument();
    expect(getByText("Fixing 1 bug per second.")).toBeInTheDocument();
  });
});
```

utils/format.js (Dependencies / helper functions used in Code1)
```javascript
export const formatCurrentBugs = (bugs) => {
  if (bugs < 0) {
    throw new Error("Must supply non-negative value");
  }

  if (bugs === 0) {
    return "You have not fixed any bugs.";
  }

  if (bugs === 1) {
    return "You have fixed 1 bug.";
  }

  return `You have fixed ${bugs} bugs.`;
};

export const formatBugsPerSecond = (bps) => {
  if (bps < 0) {
    throw new Error("Must supply non-negative value");
  }

  if (bps === 0) {
    return "No auto fixing.";
  }

  if (bps === 1) {
    return "Fixing 1 bug per second.";
  }

  return `Fixing ${bps} bugs per second.`;
};
```
Putting the grammar logic (bugs vs bug) somewhere outside of the component is quite nice. Shifts the responsibility where it is more appropriately suited. <br>
<br>
In fact, the test for grammar logic too is better placed separately than the main test for status.js, instead of putting it in the same file and thus crowding it.

### Unit Test 1:
For the above helper functions i.e. grammar logic, their tests are in another file. <br>
<br>

Test1B - utils/format.test.js
```javascript
import { formatCurrentBugs, formatBugsPerSecond } from "utils/format.js";

describe("formatCurrentBugs", () => {
  it("should return 'You have not fixed any bugs.' if bugs is zero", () => {
    expect(formatCurrentBugs(0)).toBe("You have not fixed any bugs.");
  });

  it("should return 'You have fixed 1 bug.' if bugs is one", () => {
    expect(formatCurrentBugs(1)).toBe("You have fixed 1 bug.");
  });

  it("should return 'You have fixed 2 bugs.' if bugs is two", () => {
    /* this has been made redundant by the following one */
    expect(formatCurrentBugs(2)).toBe("You have fixed 2 bugs.");
  });

  it("should return relevant message when bugs is more than one", () => {
    expect(formatCurrentBugs(2)).toBe("You have fixed 2 bugs.");
    expect(formatCurrentBugs(512)).toBe("You have fixed 512 bugs.");
    expect(formatCurrentBugs(9999)).toBe("You have fixed 9999 bugs.");
  });

  it("should throw an error if a negative value is passed", () => {
    expect(() => formatCurrentBugs(-1)).toThrow(
      "Must supply non-negative value"
    );
  });

  ///... and the similar corresponding tests for theformatBugsPerSecond function
});
```

All edge cases are included in the test

#### Less preferred code:

Test2 - status.test.js (alternative)
```javascript
import { render } from "@testing-library/react";
import React from "react";
import Status from "components/status";
describe("Status Component", () => {
  it("should render the current status", () => {
    const { getByText } = render(<Status bugs={1} bps={1} />);

    expect(getByText("You have fixed 1 bug.")).toBeInTheDocument();
    expect(getByText("Fixing 1 bug per second.")).toBeInTheDocument();
  });

  it("should render the current status with plural", () => {
    const { getByText } = render(<Status bugs={2} bps={2} />);

    expect(getByText("You have fixed 2 bugs.")).toBeInTheDocument();
    expect(getByText("Fixing 2 bugs per second.")).toBeInTheDocument();
  });
});
```

This crowds the test for the "Status" component. It is better to have the the test for it to only confirm that it can work as a component, while the particulars on how it works (in this case grammar) be tested in a separate file with all the edge cases, i.e. the case of Test1B.

### Unit Test 1, in depth

Some functions are made available by @testing-library/react e.g.:
```javascript
describe("Status Component", () => {
    it("should render the current status", () => {
        const { getByText, debug} = render(<Status bugs={1} bps={1} />);

        debug();
        expect(getByText("You have fixed 1 bug.")).toBeInDocument();
        expect(getByText("Fixing 1 bug per second.")).toBeInDocument();
    });
});
```
- debug() - How it looks like in the dom or what will happen will be displayed in the console
- the lines below it - test that confirms that the exact texts "You have fixed 1 bug." and "Fixing 1 bug per second." appear somewhere in the document.