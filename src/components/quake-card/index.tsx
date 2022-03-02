import {
  BoxProps,
  LinkBox,
  LinkOverlay,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { InfoCard } from "@components/info-card";
import { QuakeStats } from "@components/quake-stats";
import { EarthquakeData } from "@features/quake-list/types";

interface QuakeCardProps extends BoxProps {
  quake: EarthquakeData;
}

const QuakeCard: React.FC<QuakeCardProps> = ({ quake, ...rest }) => {
  return (
    <LinkBox>
      <InfoCard
        {...rest}
        heading={quake.properties.title}
        description={<QuakeStats quake={quake} />}
      />
      <LinkOverlay href={quake.properties.url} isExternal />
    </LinkBox>
  );
};

const QuakeCardSkeleton: React.FC = () => (
  <InfoCard
    w="100%"
    heading={<Skeleton mb={2} d="block" h="25px" />}
    description={
      <>
        <SkeletonText noOfLines={2} spacing={3} mb={4} />
        <Skeleton h="30px" />
      </>
    }
  />
);

export { QuakeCard, QuakeCardSkeleton };
