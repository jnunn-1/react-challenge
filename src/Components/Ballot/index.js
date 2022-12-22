import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { generateBallotData } from "../../data";
import Category from "../Category";
import Modal from "../Modal";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0D2436",
      paper: "#0D2436",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          color: "#FFFFFF",
          "&:hover": { color: "#CCCCCC", background: "#34AC9C" },
          background: "#009B86",
        },
      },
    },
  },
});

export default function Ballot() {
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [userSelections, setUserSelections] = useState({});
  useEffect(() => {
    function fetchData() {
      // Data is hard coded, but in case of api call it here!
      const res = generateBallotData();
      setData(res.items.slice(0, 5));
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* <CameraIcon sx={{ mr: 2 }} /> */}
          <Typography variant="h6" color="inherit" noWrap>
            Playboy Awards 2021
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Playboy Awards 2021
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Select your favourite nominees—you can select one at a time. You
              will see a <strong>Submit Button</strong> at the end of page,
              submit and see your results in the <strong> Modal</strong>.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((category) => (
              <Category
                key={category.id}
                category={category}
                selectedNominee={userSelections[category.id]}
                setUserSelections={setUserSelections}
              />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Button
          variant="contained"
          size="large"
          onClick={() => setOpen(true)}
          disabled={Object.keys(userSelections).length < 5}
        >
          Submit BALLOT
        </Button>
      </Box>
      {/* End footer */}
      <Modal
        open={open}
        setOpen={setOpen}
        userSelections={userSelections}
        setUserSelections={setUserSelections}
      />
    </ThemeProvider>
  );
}
