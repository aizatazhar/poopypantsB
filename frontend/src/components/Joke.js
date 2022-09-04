import { Box, Button, HStack, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

function Joke({ refreshQuotes }) {
    const jokesAxios = axios.create({
        baseURL: "https://v2.jokeapi.dev/joke",
    });
    const [joke, setJoke] = useState({});
    const [isLoading, setIsLoading] = useState(true);
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

    const getJoke = async () => {
        setIsLoading(true);
        const response = await jokesAxios.get("/Programming");
        setJoke(response.data);
        console.log(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        getJoke();
    }, []);

    const saveJoke = async () => {
        try {
            const response = await axiosInstance.post(`/api/quotes`, {
                author: "Joke",
                text: joke.type === "single" ? joke.joke : `${joke.setup} ${joke.delivery}`,
            });
            showToast(
                response.data.message,
                `Saved the joke "${response.data.data.text}"`,
                "success"
            );
            refreshQuotes();
        } catch (error) {
            showToast("An error occurred", error.toString(), "error");
        }
    };

    return (
        <VStack>
            {isLoading && <Spinner />}
            {!isLoading && joke.type === "single" && <Text>{joke.joke}</Text>}
            {!isLoading && joke.type === "twopart" && (
                <Box>
                    <Text>{joke.setup}</Text>
                    <Text>{joke.delivery}</Text>
                </Box>
            )}

            <HStack pt={6}>
                <Button
                    colorScheme="red"
                    variant="outline"
                    onClick={() => {
                        getJoke();
                    }}>
                    Another one.
                </Button>
                <Button
                    colorScheme="red"
                    onClick={() => {
                        saveJoke();
                    }}>
                    Save this joke
                </Button>
            </HStack>
        </VStack>
    );
}

export default Joke;
