import {
    Button,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";

function App() {
    const quotes = [
        { author: "Lao Tzu", text: "Nuke everyone.", created_date: "3 September 2022" },
        { author: "Gandhi", text: "These hoes ain't loyal.", created_date: "3 September 2022" },
    ];

    return (
        <VStack spacing={8}>
            <Heading>Lovely Quotes</Heading>

            <TableContainer w="full">
                <Table variant="striped" colorScheme="green">
                    <Thead>
                        <Tr>
                            <Th>Author</Th>
                            <Th>Quote</Th>
                            <Th>Date added</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {quotes.map((quote) => {
                            return (
                                <Tr>
                                    <Td>{quote.author}</Td>
                                    <Td>{quote.text}</Td>
                                    <Td>{quote.created_date}</Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            <Button align="end" colorScheme="green">
                Add a quote
            </Button>
        </VStack>
    );
}

export default App;
