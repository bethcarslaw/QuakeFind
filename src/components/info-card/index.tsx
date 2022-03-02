import { Box, BoxProps, Heading } from "@chakra-ui/react";
import { Card } from "@components/card";

interface InfoCardProps extends BoxProps {
  heading: React.ReactNode;
  description: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({
  heading,
  description,
  ...rest
}) => {
  return (
    <Card {...rest}>
      <Heading
        size="sm"
        mb={2}
        width="100%"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {heading}
      </Heading>
      <Box>{description}</Box>
    </Card>
  );
};

export { InfoCard, InfoCardProps };
