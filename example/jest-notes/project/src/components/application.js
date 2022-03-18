import React, { useState, useEffect } from "react";
import { getUpgrades } from "utils/api";
import Status from "components/status";
import Bug from "components/bug";
import Upgrades, { Upgrade } from "components/upgrades";
import useBugTracker from "hooks/use-bugtracker";
import useAutoFix from "hooks/use-autofix";

const Application = () => {
  const { bugs, addBug, removeBug } = useBugTracker();
  const { bps, addBps } = useAutoFix(addBug);

  const [upgrades, setUpgrades] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    getUpgrades().then((upgrades) =>
      setUpgrades({ loading: false, data: upgrades })
    );
  }, []);

  //if (upgrades.loading) return <div>Loading</div>;

  return (
    <main>
      <Status bugs={bugs} bps={bps} />
      <Bug onClick={() => addBug(1)} />
      <Upgrades bugs={bugs} increaseBps={addBps} decreaseBugs={removeBug}>
        {upgrades.loading ? <div>Loading</div> : upgrades.data.map((upgrade) => (
          <Upgrade key={upgrade.label} {...upgrade} />
        ))}
      </Upgrades>
    </main>
  );
};

export default Application;
