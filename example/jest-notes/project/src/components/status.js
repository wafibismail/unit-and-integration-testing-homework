import React from "react";
import { formatCurrentBugs, formatBugsPerSecond } from "utils/format";

const Status = ({ bugs = 0, bps = 0}) => {
  return (
    <section>
      <h2>{formatCurrentBugs(bugs)}</h2>
      <h3>{formatBugsPerSecond(bps)}</h3>
    </section>
  );
};

export default Status;
