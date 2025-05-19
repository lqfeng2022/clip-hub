import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';


const ClipCardSkeleton = () => {
  return (
    <Card bg='gray.800'>
      <Skeleton height='200px'>
        <CardBody>
          <SkeletonText />
        </CardBody>
      </Skeleton>
    </Card>
  );
};

export default ClipCardSkeleton;
