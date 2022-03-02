import { Pagination } from "@components/pagination";
import {
  selectMagTypeFilter,
  selectMinMagnitudeFilter,
  selectMaxMagnitudeFilter,
  selectOffsetFilter,
  selectLimitFilter,
  offsetUpdatedByAmount,
} from "@features/filter-bar/filterSlice";
import { useHttpRequest } from "@hooks/useHttpRequest";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CountResponse } from "./types";

const PaginationContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const magTypeFilter = useAppSelector(selectMagTypeFilter);
  const minMagnitudeFilter = useAppSelector(selectMinMagnitudeFilter);
  const maxMagnitudeFilter = useAppSelector(selectMaxMagnitudeFilter);
  const offsetFilter = useAppSelector(selectOffsetFilter);
  const limitFilter = useAppSelector(selectLimitFilter);
  const [current, setCurrent] = useState<string>("1");
  const { data, loading } = useHttpRequest<CountResponse>(
    {
      url: "https://earthquake.usgs.gov/fdsnws/event/1/count",
      params: {
        format: "geojson",
        magtype: magTypeFilter,
        minmagnitude: minMagnitudeFilter,
        maxmagnitude: maxMagnitudeFilter,
        offset: offsetFilter,
      },
    },
    [magTypeFilter, minMagnitudeFilter, maxMagnitudeFilter]
  );

  const totalPages = useMemo(
    () => (data && Math.ceil(data!.count / limitFilter)) || 0,
    [data, limitFilter]
  );

  useEffect(() => {
    const parseNum = parseInt(current);

    if (isNaN(parseNum)) return;

    if (data && parseNum > 0 && parseNum < totalPages) {
      const offset = parseNum * limitFilter - limitFilter + 1;
      dispatch(offsetUpdatedByAmount(offset));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const handlePageClick = (type: "NEXT" | "PREV") => {
    let c = parseInt(current);
    c = type === "NEXT" ? c + 1 : c - 1;
    setCurrent(c.toString());
  };

  return (
    <Pagination
      currentPage={current}
      totalPages={totalPages.toString()}
      handlePrevClick={() => handlePageClick("PREV")}
      handleNextClick={() => handlePageClick("NEXT")}
      handlePageInputChange={(e) => setCurrent(e.target.value)}
      isDisabled={loading}
    />
  );
};

export { PaginationContainer };
