import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { IconButton, Input, Td, Tr, useToast } from "@chakra-ui/react";
import { useState } from "react";

function QuoteItem({ quote, onDelete, onEdit }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentQuote, setCurrentQuote] = useState({ ...quote });
    const toast = useToast();

    const showToast = (title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 5000,
            isClosable: true,
        });
    };

    const handleChange = (event, key) => {
        const updatedQuote = { ...currentQuote };
        updatedQuote[key] = event.target.value;
        setCurrentQuote(updatedQuote);
    };

    return (
        <Tr
            _hover={{
                color: "teal.400",
            }}>
            <Td>
                {isEditMode ? (
                    <Input
                        value={currentQuote.author}
                        variant="filled"
                        onChange={(event) => handleChange(event, "author")}
                    />
                ) : (
                    currentQuote.author
                )}
            </Td>
            <Td>
                {isEditMode ? (
                    <Input
                        value={currentQuote.text}
                        variant="filled"
                        onChange={(event) => handleChange(event, "text")}
                    />
                ) : (
                    currentQuote.text
                )}
            </Td>
            <Td>{new Date(quote.create_date).toLocaleDateString()}</Td>
            <Td>
                <IconButton
                    variant="ghost"
                    aria-label="Edit quote"
                    icon={isEditMode ? <CheckIcon /> : <EditIcon />}
                    onClick={() => {
                        if (isEditMode) {
                            if (!currentQuote.author || !currentQuote.text) {
                                return showToast(
                                    "An error occurred",
                                    "Both author and quote fields must not be empty",
                                    "error"
                                );
                            }
                            onEdit(currentQuote);
                        }
                        setIsEditMode(!isEditMode);
                    }}
                />
            </Td>
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
}

export default QuoteItem;
