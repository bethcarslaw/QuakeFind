import { Pagination } from "@components/pagination";
import {
  selectMagTypeFilter,
  selectMinMagnitudeFilter,
  selectMaxMagnitudeFilter,
  selectOffsetFilter,
  selectLimitFilter,
  offsetIncremented,
  offsetDecremented,
  offsetUpdatedByAmount,
} from "@features/filter-bar/filterSlice";
import { useHttpRequest } from "@hooks/useHttpRequest";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CountResponse } from "./types";

const PaginationContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const magTypeFilter = useAppSelector(selectMagTypeFilter);
  const minMagnitudeFilter = useAppSelector(selectMinMagnitudeFilter);
  const maxMagnitudeFilter = useAppSelector(selectMaxMagnitudeFilter);
  const offsetFilter = useAppSelector(selectOffsetFilter);
  const limitFilter = useAppSelector(selectLimitFilter);
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
  const currentPage = useMemo(
    () =>
      data && offsetFilter > data!.count
        ? 0
        : Math.floor(offsetFilter / limitFilter + 1) || 0,
    [data, offsetFilter, limitFilter]
  );
  const totalPages = useMemo(
    () => (data && Math.ceil(data!.count / limitFilter)) || 0,
    [data, limitFilter]
  );

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;

    const page = parseInt(e.target.value);

    if (page > 0 && page <= totalPages!) {
      const offset = page * limitFilter - limitFilter + 1;

      dispatch(offsetUpdatedByAmount(offset));
    }
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePrevClick={() => dispatch(offsetDecremented())}
      handleNextClick={() => dispatch(offsetIncremented())}
      handlePageInputChange={(e) => handlePageInputChange(e)}
      isDisabled={loading}
    />
  );
};

export { PaginationContainer };
