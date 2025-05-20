import { Heading } from "@chakra-ui/react";
import { ClipQuery } from "../App";

interface Props {
  clipQuery: ClipQuery;
}

const ClipHeading = ({ clipQuery }: Props) => {
  // Clips
  // Japanese Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const heading = `${clipQuery.language?.title || ""} ${
    clipQuery.genre?.title || ""
  } Clips `;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default ClipHeading;