import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { HStack, IconButton, Input, Text } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextClick: () => void;
  handlePrevClick: () => void;
  handlePageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextClick,
  handlePageInputChange,
  handlePrevClick,
  isDisabled,
}) => {
  return (
    <HStack justifyContent="space-between">
      <IconButton
        isDisabled={isDisabled || currentPage === 1 || totalPages === 0}
        onClick={() => handlePrevClick()}
        data-testid="pagination-prev-button"
        icon={<ArrowBackIcon />}
        aria-label="Previous Page"
      />
      <HStack data-testid="pagination-text">
        <Text>Page </Text>
        <Input
          value={currentPage}
          type="number"
          size="xs"
          w="50px"
          onChange={(e) => handlePageInputChange(e)}
          data-testid="pagination-input"
          isDisabled={isDisabled || totalPages === 0}
        />
        <Text> of {totalPages}</Text>
      </HStack>
      <IconButton
        isDisabled={
          isDisabled || currentPage === totalPages || totalPages === 0
        }
        onClick={() => handleNextClick()}
        data-testid="pagination-next-button"
        icon={<ArrowForwardIcon />}
        aria-label="Next Page"
      />
    </HStack>
  );
};

export { Pagination, PaginationProps };
