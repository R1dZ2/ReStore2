import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Container component={Paper} style={{ height: 400 }}>
            <Typography gutterBottom variant="h3">Not Found</Typography>
            <Divider />
            <Button fullWidth
                component={Link}
                to="/catalog">
                Go to Catalog
            </Button>
        </Container>
    )
}