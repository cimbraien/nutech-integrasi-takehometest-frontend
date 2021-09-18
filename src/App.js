import { CssBaseline } from "@mui/material";
import "./App.css";
import JWTInput from "./components/JWTInput";
import ListBarang from "./components/ListBarang";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   codefield: {
//     alignItems: "center",
//   },
// });

function App() {
  // const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <main>
        <JWTInput />
        <ListBarang />
      </main>
    </>
  );
}

export default App;
