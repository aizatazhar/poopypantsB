import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, Container } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <Container maxW="container.xl" py={16} px={{ base: 8, md: 16 }}>
                <App />
            </Container>
        </ChakraProvider>
    </React.StrictMode>
);
