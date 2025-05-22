import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  limit: number;
  children: string;
}

const ExpandableText = ({ limit, children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const summary = expanded 
    ? children 
    : children.substring(0, limit) + '...';

  if (!children) return null;
  if (children.length <= limit) return <Text>{children}</Text>;

  return (
    <>
      <Text whiteSpace='pre-wrap' mt={2} color='gray.300'>
        {summary}
      </Text>
      <Button
        size='xs'
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Show More'}
      </Button>
    </>
  );
};

export default ExpandableText;