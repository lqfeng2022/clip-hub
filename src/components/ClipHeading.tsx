import { Heading } from '@chakra-ui/react';
import { ClipQuery } from '../App';
import useGenre from '../hooks/useGenre';
import useLanguage from '../hooks/useLanguage';

interface Props {
  clipQuery: ClipQuery;
}

const ClipHeading = ({ clipQuery }: Props) => {
  const genre = useGenre(clipQuery.genreId);
  const language = useLanguage(clipQuery.languageId);

  // Clips
  // Japanese Clips
  // TV Series Clips
  // Japanese TV Series Clips
  const heading = `${language?.title || ''} ${genre?.title || ''} Clips `;

  return (
    <Heading as='h1' marginY={5} fontSize='5xl'>
      {heading}
    </Heading>
  );
};

export default ClipHeading;