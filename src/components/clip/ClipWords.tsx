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
  Highlight,
} from '@chakra-ui/react'
import Expression from '../../entities/Expression'
import CollapseText from '../CollapseText'

interface Props {
  data: Expression[]
}
const ClipWords = ({ data }: Props) => (
  <Box py={3}>
    <Heading size='sm' pb={2} color='gray.500'>
      Words
    </Heading>
    <CollapseText limit={190}>
      <TableContainer pb={2}>
        <Table colorScheme='teal' size='custom'>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th isNumeric>word</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((exp, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td whiteSpace='normal'>
                  <Highlight 
                    query={exp.title}
                    styles={{ px: '1', py: '0.3', bg: 'gray.300', fontWeight: 'light' }}
                  >
                    {exp.word}
                  </Highlight>
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