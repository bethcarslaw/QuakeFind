import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { QuakeCard, QuakeCardSkeleton } from "@components/quake-card";
import {
  selectLimitFilter,
  selectMagTypeFilter,
  selectMaxMagnitudeFilter,
  selectMinMagnitudeFilter,
  selectOffsetFilter,
} from "@features/filter-bar/filterSlice";
import { useHttpRequest } from "@hooks/useHttpRequest";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { GetEarthquakeData } from "./api";
import { EarthquakeResponse } from "./types";

const QuakeList: React.FC = () => {
  const magTypeFilter = useAppSelector(selectMagTypeFilter);
  const minMagnitudeFilter = useAppSelector(selectMinMagnitudeFilter);
  const maxMagnitudeFilter = useAppSelector(selectMaxMagnitudeFilter);
  const limitFilter = useAppSelector(selectLimitFilter);
  const offsetFilter = useAppSelector(selectOffsetFilter);
  const { data, error, loading } = useHttpRequest<EarthquakeResponse>(
    {
      url: GetEarthquakeData(),
      params: {
        format: "geojson",
        limit: limitFilter,
        magtype: magTypeFilter,
        minmagnitude: minMagnitudeFilter,
        maxmagnitude: maxMagnitudeFilter,
        offset: offsetFilter,
      },
    },
    [magTypeFilter, minMagnitudeFilter, maxMagnitudeFilter, offsetFilter]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  return (
    <Box>
      {error && "An error occurred fetching results."}
      {!loading && !error && data && data.features.length < 1 && (
        <Box w="100%" textAlign="center">
          No results found
        </Box>
      )}
      <Center>
        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={2} w="100%">
          {loading &&
            [...Array(limitFilter)].map((a) => (
              <GridItem>
                <QuakeCardSkeleton />
              </GridItem>
            ))}
          {data &&
            data.features.map((quake) => (
              <GridItem overflow="hidden">
                <QuakeCard flex={1} quake={quake} />
              </GridItem>
            ))}
        </Grid>
      </Center>
    </Box>
  );
};

export { QuakeList };
