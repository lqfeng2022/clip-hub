import { Heading } from '@chakra-ui/react';
import { ClipQuery } from '../App';
import useGenres from '../hooks/useGenres';
import useLanguages from '../hooks/useLanguages';

interface Props {
  clipQuery: ClipQuery;
}

const ClipHeading = ({ clipQuery }: Props) => {
  const {data: genres} = useGenres();
  const genre = genres?.results.find(
    (g) => g.id == clipQuery.genreId
  )

  const {data: languages} = useLanguages();
  const language = languages?.results.find(
    (l) => l.id == clipQuery.languageId
  )

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