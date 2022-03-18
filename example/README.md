## Examples:

Main parts/examples went through in the video

### Integration test:
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

### Unit test:
For the above helper functions i.e. grammar logic, their tests are in another file. <br>
<br>
utils/format.test.js
```javascript
import { formatCurrentBugs } from "utils/format.js";

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
});
```