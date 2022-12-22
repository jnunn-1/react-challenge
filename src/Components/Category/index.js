import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export default function Category({
  category,
  setUserSelections,
  selectedNominee,
}) {
  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          pt: 5,
        }}
      >
        <Typography variant="h4">{category.title}</Typography>
      </Container>
      {category.items.map((item) => {
        const selected = item.id === selectedNominee;
        return (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: selected ? "#000011" : "",
                boxShadow: selected ? 20 : "",
                opacity: selected ? 1 : 0.65,
                "&:hover": {
                  boxShadow: 20, // theme.shadows[20]
                },
                // "&:hover": { color: "#CCCCCC", bgcolor: "#34AC9C" },
              }}
            >
              <CardMedia
                component="img"
                sx={{}}
                image={item.photoUrL}
                alt="random"
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  sx={{}}
                  size="small"
                  onClick={() =>
                    setUserSelections((prev) => ({
                      ...prev,
                      [category.id]: item.id,
                    }))
                  }
                >
                  Select
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}
