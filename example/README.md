Tests examples:
```javascript
//status.js
import React from "react";
import { formatCurrentBugs, formatBugsPerSecond } from "utils/format";
const Status = ({ bugs, bps }) => {
  return (
    <section>
      <h2>{formatCurrentBugs(bugs)}</h2>
      <h3>{formatBugsPerSecond(bps)}</h3>
    </section>
  );
};
export default Status;

//status.test.js
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