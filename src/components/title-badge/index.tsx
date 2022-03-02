import { Heading, Link } from "@chakra-ui/react";

interface TitleBadgeProps {
  title: string;
}

const TitleBadge: React.FC<TitleBadgeProps> = ({ title }) => (
  <Heading as="h1" size="md" textTransform="uppercase" letterSpacing={5}>
    <Link href="#" _hover={{ opacity: 0.75, textDecoration: "none" }}>
      {title}
    </Link>
  </Heading>
);

export { TitleBadge, TitleBadgeProps };
