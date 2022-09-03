import { DeleteIcon } from "@chakra-ui/icons";
import {
    Button,
    Heading,
    IconButton,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axiosInstance from "./lib/axiosInstance";

function App() {
    const [quotes, setQuotes] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        getQuotes();
    }, []);

    const getQuotes = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/api/quotes");
            setQuotes(response.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const onDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/quotes/${id}`);
            toast({
                title: response.data.message,
                description: `Deleted the quote "${response.data.data.text}" by ${response.data.data.author}`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            getQuotes();
        } catch (error) {
            console.error(error);
        }
    };

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
                                        <Td>
                                            <IconButton
                                                variant="ghost"
                                                aria-label="Delete quote"
                                                icon={<DeleteIcon />}
                                                onClick={() => onDelete(quote._id)}
                                            />
                                        </Td>
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
