import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const getValidationError = () => {
        agent.TestErrors.getValidationError()
            .then(() => console.log("No validation error"))
            .catch(error =>
                setValidationErrors(error));
    }

    return (
        <Container>
            <Typography gutterBottom variant="h2">Errors for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>400</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>401</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get404Error().catch(error => console.log(error))}>404</Button>
                <Button variant="contained" onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>500</Button>
                <Button variant="contained" onClick={getValidationError}>Validation error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>Validation error</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>{error}</ListItem>
                        ))}
                    </List>
                </Alert>}
        </Container>

    )
}