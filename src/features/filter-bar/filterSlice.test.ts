import filterSlice, {
  filtersUpdated,
  offsetIncremented,
  offsetDecremented,
  offsetUpdatedByAmount,
  magTypeDataUpdated,
  FilterState,
  FilterPayload,
} from "./filterSlice";

const dummyState: FilterState = {
  magType: "test",
  magnitude: { min: 0, max: 10 },
  magTypes: ["aa", "bb"],
  limit: 16,
  offset: 1,
};

describe("Filter Reducer", () => {
  it("should handle initial state", () => {
    expect(filterSlice(undefined, { type: "unknown" })).toEqual({
      magType: "",
      magnitude: { min: 0, max: "" },
      magTypes: [],
      limit: 16,
      offset: 1,
    });
  });

  it("should handle filtersUpdated", () => {
    const filterPayload: FilterPayload = {
      magType: "aa",
      magnitude: {
        min: 3,
        max: 4,
      },
    };
    const actual = filterSlice(
      { ...dummyState },
      filtersUpdated(filterPayload)
    );

    expect(actual.magType).toEqual(filterPayload.magType);
    expect(actual.magnitude).toEqual(filterPayload.magnitude);
    expect(actual.offset).toEqual(1);
  });

  it("Should handle offsetIncremented", () => {
    const actual = filterSlice({ ...dummyState }, offsetIncremented());

    expect(actual.offset).toEqual(actual.limit + 1);
  });

  it("Should handle offsetDecremented", () => {
    const actual = filterSlice({ ...dummyState }, offsetDecremented());

    expect(actual.offset).toEqual(1 - actual.limit);
  });

  it("Should handle offsetUpdatedByAmount", () => {
    const actual = filterSlice({ ...dummyState }, offsetUpdatedByAmount(50));

    expect(actual.offset).toEqual(50);
  });

  it("should handle magTypesUpdated", () => {
    const data = ["aa", "bb", "cc"];
    const actual = filterSlice({ ...dummyState }, magTypeDataUpdated(data));

    expect(actual.magTypes).toEqual(data);
  });
});
