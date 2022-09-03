import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import QuoteItem from "./components/QuoteItem";
import axiosInstance from "./lib/axiosInstance";

function App() {
    const [quotes, setQuotes] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [quoteToAdd, setQuoteToAdd] = useState({ author: "", text: "" });

    useEffect(() => {
        getQuotes();
    }, []);

    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
        });
    };

    const getQuotes = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/api/quotes");
            response.data.data.sort().reverse();
            setQuotes(response.data);
        } catch (error) {
            showToast("An error occurred", error.toString(), "error");
        }
        setIsLoading(false);
    };

    const onDelete = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/quotes/${id}`);
            showToast(
                response.data.message,
                `Deleted the quote "${response.data.data.text}" by ${response.data.data.author}`,
                "success"
            );
            getQuotes();
        } catch (error) {
            showToast("An error occurred", error.toString(), "error");
        }
    };

    const onEdit = async (quote) => {
        try {
            const response = await axiosInstance.put(`/api/quotes/${quote._id}`, quote);
            showToast(
                response.data.message,
                `Updated the quote "${response.data.data.text}" by ${response.data.data.author}`,
                "success"
            );
            getQuotes();
        } catch (error) {
            showToast("An error occurred", error.toString(), "error");
        }
    };

    const addQuote = async () => {
        try {
            if (!quoteToAdd.author || !quoteToAdd.text) {
                return showToast(
                    "An error occurred",
                    "Both author and quote fields must not be empty",
                    "error"
                );
            }

            const response = await axiosInstance.post(`/api/quotes`, quoteToAdd);
            showToast(
                response.data.message,
                `Created the quote "${response.data.data.text}" by ${response.data.data.author}`,
                "success"
            );
            setQuoteToAdd({ author: "", text: "" });
            onClose();
            getQuotes();
        } catch (error) {
            showToast("An error occurred", error.toString(), "error");
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
                                <Th>Edit</Th>
                                <Th>Delete</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {quotes.data.map((quote) => {
                                return (
                                    <QuoteItem
                                        key={quote._id}
                                        quote={quote}
                                        onDelete={onDelete}
                                        onEdit={onEdit}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
            <Button colorScheme="green" onClick={onOpen}>
                Add a quote
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new Quote</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Author</FormLabel>
                            <Input
                                onChange={(event) => {
                                    quoteToAdd.author = event.target.value;
                                }}
                            />
                        </FormControl>

                        <FormControl isRequired pt={4}>
                            <FormLabel>Quote</FormLabel>
                            <Input
                                onChange={(event) => {
                                    quoteToAdd.text = event.target.value;
                                }}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="green" onClick={addQuote}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    );
}

export default App;
