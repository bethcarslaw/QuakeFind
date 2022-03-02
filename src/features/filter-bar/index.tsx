import {
  Button,
  FormControl,
  Stack,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { Label } from "../../components/label";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { filtersUpdated, selectMagTypes } from "./filterSlice";

const FilterBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [magRange, setSelectedMagRange] = useState<number[]>([0, 10]);
  const [magType, setSelectedMagType] = useState<string>("");
  const magTypes = useAppSelector(selectMagTypes);

  const handleSubmit = () => {
    dispatch(
      filtersUpdated({
        magType,
        magnitude: {
          min: magRange[0],
          max: magRange[1] === 10 ? "" : magRange[1],
        },
      })
    );
  };

  return (
    <Stack
      direction={["column", "column", "row"]}
      alignItems="center"
      borderRadius={10}
      bg={bgColor}
      px={5}
      py={3}
    >
      <Label flex={1}>Filters</Label>
      <Stack
        flex={5}
        spacing={[3, 3, 10]}
        direction={["column", "column", "row"]}
        alignItems="center"
        w={["100%", "100%", "auto"]}
      >
        <FormControl>
          <Label>Mag Type</Label>
          <Select
            size="sm"
            onChange={(e) => setSelectedMagType(e.target.value)}
          >
            <option value="">Select Mag Type</option>
            {magTypes.length > 0 &&
              magTypes.map((magType) => (
                <option key={magType} value={magType}>
                  {magType}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl>
          <Label>
            Magnitude ({magRange[0]} -{" "}
            {magRange[1] >= 10 ? `${magRange[1]}+` : magRange[1]})
          </Label>
          <RangeSlider
            defaultValue={[0, 10]}
            min={0}
            max={10}
            step={0.1}
            onChange={(e) => setSelectedMagRange(e)}
          >
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </FormControl>

        <Button
          onClick={() => handleSubmit()}
          data-testid="submit-filter"
          px={8}
          w={["100%", "100%", "auto"]}
        >
          <Label>go</Label>
        </Button>
      </Stack>
    </Stack>
  );
};

export { FilterBar };
