import {
    Button,
    Heading,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import useFetchData from "./hooks/useFetchData";

function App() {
    const { response: quotes, isLoading } = useFetchData("");

    return (
        <VStack spacing={8}>
            <Heading>Lovely Quotes</Heading>

            {isLoading && <Spinner color="green.500" emptyColor="green.100" size="lg" />}
            {!isLoading && (
                <TableContainer w="full" maxH="xl" overflowY="scroll">
                    <Table variant="striped" colorScheme="green">
                        <Thead>
                            <Tr>
                                <Th>Author</Th>
                                <Th>Quote</Th>
                                <Th>Date added</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {quotes.data.map((quote) => {
                                return (
                                    <Tr key={quote._id}>
                                        <Td>{quote.author}</Td>
                                        <Td>{quote.text}</Td>
                                        <Td>{new Date(quote.create_date).toLocaleDateString()}</Td>
                                        <Td>Delete</Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}

            <Button align="end" colorScheme="green">
                Add a quote
            </Button>
        </VStack>
    );
}

export default App;
