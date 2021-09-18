import {
  Container,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Snackbar,
  Alert,
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
      snackbar: false,
      snackbar_msg: "",
      snackbar_severity: "success",
    };
    this.onChange = this.onChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(msg, severity) {
    this.setState({
      snackbar_msg: msg,
      snackbar_severity: severity,
      snackbar: true,
    });
  }

  handleClose(e) {
    this.setState({ snackbar: false });
  }

  onChange(e) {
    this.setState({ accesscode: e.target.value });
  }

  handleAccessCode = async () => {
    try {
      const data = await axios.post(API_ROOT + "/access", {
        accesscode: this.state.accesscode,
      });
      this.handleOpen(
        "Kode akses diterima, anda telah terautentikasi",
        "success"
      );
      localStorage.setItem("jwt_token", data.data.jwtToken);
    } catch (err) {
      this.handleOpen(err.response.data.ErrorMessage, "error");
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
        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={5000}
          onClose={this.handleClose}
        >
          <Alert severity={this.state.snackbar_severity} sx={{ width: "100%" }}>
            {this.state.snackbar_msg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default JWTInput;
