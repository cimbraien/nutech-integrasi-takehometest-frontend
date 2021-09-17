import { CssBaseline } from "@mui/material";
import "./App.css";
import JWTInput from "./components/JWTInput";
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
      </main>
    </>
  );
}

export default App;
