import { Box, Badge, Progress } from "@chakra-ui/react";
import { Label } from "@components/label";
import { EarthquakeData } from "@features/quake-list/types";

interface QuakeStatsProps {
  quake: EarthquakeData;
}

const QuakeStats: React.FC<QuakeStatsProps> = ({ quake }) => (
  <Box>
    <Box mb={2} minH="48px">
      {quake.id && <Badge mr={1}>Id: {quake.id}</Badge>}
      {quake.properties.code && (
        <Badge mr={1}>Code: {quake.properties.code}</Badge>
      )}
      {quake.properties.type && (
        <Badge mr={1}>Type: {quake.properties.type}</Badge>
      )}
      {quake.properties.gap && <Badge>Gap: {quake.properties.gap}</Badge>}
    </Box>
    <Box mb={2}>
      <Label>Magnitude ({quake.properties.mag})</Label>
      <Progress size="sm" value={quake.properties.mag * 10} />
    </Box>
  </Box>
);

export { QuakeStats };
