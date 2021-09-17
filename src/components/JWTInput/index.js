import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";

import { VpnKeyRounded } from "@mui/icons-material";
import axios from "axios";
import React from "react";

const API_ROOT = "https://cimbraien.id/nutech/api";
class JWTInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accesscode: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ accesscode: e.target.value });
  }

  handleAccessCode = async () => {
    try {
      const data = await axios.post(API_ROOT + "/access", {
        accesscode: this.state.accesscode,
      });
      console.log(data.data.jwtToken);
    } catch (err) {
      console.log(err.response.data.ErrorMessage);
    }
  };

  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              marginTop: "20px",
            }}
          >
            <Grid item>
              <TextField
                label="Access Code"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKeyRounded />
                    </InputAdornment>
                  ),
                }}
                onChange={this.onChange}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={this.handleAccessCode}>
                Get token
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default JWTInput;
