#### Examples:

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

utils/format.js (Dependency in Code1)
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