import "@/App.scss";
import { Stack } from "@chakra-ui/react";
import { AppBar } from "@components/app-bar";
import { TitleBadge } from "@components/title-badge";
import { ToggleColorMode } from "@components/toggle-color-mode";
import { FilterBar } from "@features/filter-bar";
import { getMagTypeData } from "@features/filter-bar/filterSlice";
import { PaginationContainer } from "@features/pagination";
import { QuakeList } from "@features/quake-list";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMagTypeData());
  }, [dispatch]);

  return (
    <div className="App">
      <AppBar
        leftSide={<TitleBadge title="Quake Find" />}
        rightSide={<ToggleColorMode />}
      />
      <Stack my={10} spacing={3} px={4} mx="auto" maxW="825px">
        <FilterBar />
        <PaginationContainer />
        <QuakeList />
        <PaginationContainer />
      </Stack>
    </div>
  );
}

export default App;
