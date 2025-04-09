import React from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled, keyframes } from "@mui/system";
import backgroundImage from "../../assets/b.jpg"; // Ensure correct image path

// Border Animation Keyframes
const borderAnimation = keyframes`
  0% { border-image-source: linear-gradient(0deg, #ff0000, #00ff00, #0000ff); }   /* Red, Green, Blue */
  25% { border-image-source: linear-gradient(90deg, #00ff00, #0000ff, #ff0000); } /* Green, Blue, Red */
  50% { border-image-source: linear-gradient(180deg, #0000ff, #ff0000, #00ff00); } /* Blue, Red, Green */
  75% { border-image-source: linear-gradient(270deg, #ff0000, #00ff00, #0000ff); } /* Back to Red */
  100% { border-image-source: linear-gradient(360deg, #00ff00, #0000ff, #ff0000); } /* Full Cycle */
`;


// Styled Components
const Background = styled(Box)({
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    top: 0,
    left: 0,
});

const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.2)",
    zIndex: 1,
});

const GlassBox = styled(Box)({
    position: "relative",
    zIndex: 2,
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    maxWidth: "700px",
    width: "80%",
    height: "250px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    border: "4px solid transparent",
    borderImageSlice: 1,
    animation: `${borderAnimation} 3s linear infinite`,
    boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.6)",
});

const Title = styled(Typography)({
    color: "#222",
    fontWeight: "bold",
    marginBottom: "10px",
});

const Subtitle = styled(Typography)({
    color: "#444",
    opacity: 0.9,
    marginBottom: "20px",
});

const ButtonContainer = styled(Box)({
    display: "flex",
    gap: "20px",
    justifyContent: "center",
});

const StyledButton = styled(Button)({
    padding: "10px 25px",
    fontSize: "1rem",
    borderRadius: "25px",
    textTransform: "none",
    fontWeight: "bold",
    transition: "all 0.3s ease-in-out",
    backgroundColor: "white",
    color: "#333",
    border: "2px solid white",
    "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.7)",
    },
});

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Background style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Overlay />
            <GlassBox>
                <Container maxWidth="md">
                    <Title variant="h4">Employee Management System</Title>
                    <Subtitle variant="body1">
                        Manage your workforce with efficiency and ease!
                    </Subtitle>
                    <ButtonContainer>
                        <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
                        <StyledButton onClick={() => navigate("/register")}>Register</StyledButton>
                    </ButtonContainer>
                </Container>
            </GlassBox>
        </Background>
    );
};

export default LandingPage;
