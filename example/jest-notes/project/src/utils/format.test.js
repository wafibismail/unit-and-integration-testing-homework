import { formatCurrentBugs } from "utils/format.js";
import { formatBugsPerSecond } from "utils/format.js";

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

describe("formatCurrentBugs", () => {
  it("should return 'No auto fixing.' if bps is zero", () => {
    expect(formatBugsPerSecond(0)).toBe("No auto fixing.");
  });

  it("should return 'Fixing 1 bug per second.' if bps is one", () => {
    expect(formatBugsPerSecond(1)).toBe("Fixing 1 bug per second.");
  });

  it("should return 'Fixing 2 bugs per second.' if bps is two", () => {
    /* this has been made redundant by the following one */
    expect(formatBugsPerSecond(2)).toBe("Fixing 2 bugs per second.");
  });

  it("should return relevant message when bps is more than one", () => {
    expect(formatBugsPerSecond(2)).toBe("Fixing 2 bugs per second.");
    expect(formatBugsPerSecond(512)).toBe("Fixing 512 bugs per second.");
    expect(formatBugsPerSecond(9999)).toBe("Fixing 9999 bugs per second.");
  });

  it("should throw an error if a negative value is passed", () => {
    expect(() => formatBugsPerSecond(-1)).toThrow(
      "Must supply non-negative value"
    );
  });
});
