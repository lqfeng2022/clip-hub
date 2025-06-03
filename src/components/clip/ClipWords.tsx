import { 
  Box, 
  Heading, 
  Table, 
  TableContainer, 
  Tbody, 
  Td, 
  Th, 
  Thead, 
  Tr,
  Text,
} from '@chakra-ui/react'
import Expression from '../../entities/Expression'
import CollapseText from '../CollapseText'
import { Link } from 'react-router-dom'

interface Props {
  data: Expression[]
}
const ClipWords = ({ data }: Props) => (
  <Box py={3}>
    <Heading size='sm' pb={2} color='gray.500'>
      Words
    </Heading>
    <CollapseText limit={250}>
      <TableContainer pb={2}>
        <Table colorScheme='teal' size='custom'>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th>Time</Th>
              <Th isNumeric>word</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((exp, index) => (
              <Tr key={index}>
                <Td color='gray'>{index + 1}</Td>
                <Td color='gray.400'>{exp.timeline}</Td>
                <Td
                  fontWeight='bold'
                  color='gray.200'
                >
                  <Link to={`/expressions/${exp.slug}`}>
                    <Text _hover={{ color: 'yellow' }}>
                      {exp.title}
                    </Text>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </CollapseText>
  </Box>
)

export default ClipWords