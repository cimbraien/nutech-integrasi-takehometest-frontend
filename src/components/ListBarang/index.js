import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CardActionArea,
  CardActions,
  Button,
  Snackbar,
  Alert,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { AddCircle, Edit, HighlightOff } from "@mui/icons-material";
import { Box } from "@mui/system";
import FormData from "form-data";

const API_ROOT = "https://cimbraien.id/nutech/api";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "1px solid #000",
};

class ListBarang extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barangList: [],

      snackbar: false,
      snackbar_msg: "",
      snackbar_severity: "success",

      createModal: false,
      nama: "",
      hargaBeli: "",
      hargaJual: "",
      stok: "",
      file: "",
    };

    this.fetchData = this.fetchData.bind(this);
    this.fetchData(1);

    this.handleOpenSnackbar = this.handleOpenSnackbar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);

    this.createModalOpen = this.createModalOpen.bind(this);
    this.createModalClose = this.createModalClose.bind(this);
    this.createModalChange = this.createModalChange.bind(this);
    this.createModalFile = this.createModalFile.bind(this);
  }

  handleOpenSnackbar(msg, severity) {
    this.setState({
      snackbar_msg: msg,
      snackbar_severity: severity,
      snackbar: true,
    });
  }

  handleCloseSnackbar(e) {
    this.setState({ snackbar: false });
  }

  createModalOpen() {
    this.setState({
      createModal: true,
    });
  }

  createModalClose(e) {
    this.setState({ createModal: false });
  }

  createModalChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  createModalFile(e) {
    this.setState({ file: e.target.files[0] });
  }

  createModalSend = async () => {
    try {
      const payload = new FormData();
      payload.append("nama", this.state.nama);
      payload.append("hargaBeli", this.state.hargaBeli);
      payload.append("hargaJual", this.state.hargaJual);
      payload.append("stok", this.state.stok);
      payload.append("foto", this.state.file);

      await axios.post(API_ROOT + "/barang", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.jwt_token,
        },
      });
      this.handleOpenSnackbar("Barang telah dibuat", "success");
      this.fetchData(1);
      this.createModalClose();
    } catch (err) {
      this.handleOpenSnackbar(err.response.data.ErrorMessage, "error");
    }
  };

  deleteBarang = async (id) => {
    try {
      await axios.delete(API_ROOT + "/barang/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.jwt_token,
        },
      });

      this.handleOpenSnackbar("Barang telah dihapus", "success");
      this.fetchData(1);
    } catch (err) {
      this.handleOpenSnackbar(err.response.data.ErrorMessage, "error");
    }
  };

  async fetchData(page) {
    const data = await axios.get(API_ROOT + "/barang?limit=9&page=" + page);
    this.setState({ barangList: data.data.data });
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
          <Button variant="outlined" onClick={this.createModalOpen}>
            <AddCircle />
            Tambah barang
          </Button>
          <Grid container spacing={4} sx={{ marginTop: "5px" }}>
            {this.state.barangList.map((barang) => (
              <Grid item xs={4}>
                <Card variant="outlined">
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={API_ROOT + barang.foto}
                      onError={(e) => {
                        e.target.src = "placeholder.jpg";
                      }}
                      name={barang.id}
                      alt="foto barang"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {barang.nama}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Harga beli: ${barang.hargaBeli || "-"}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Harga jual: ${barang.hargaJual || "-"}`}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {`Stok: ${barang.stok || "-"}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button>
                      <Edit />
                    </Button>
                    <Button onClick={() => this.deleteBarang(barang.id)}>
                      <HighlightOff />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Modal open={this.state.createModal} onClose={this.createModalClose}>
          <Box sx={{ ...modalStyle, width: "500px", backgroundColor: "white" }}>
            <Grid container spacing={2} sx={{ margin: "20px" }}>
              <Grid item>
                <Grid container justify="space-between" spacing={8}>
                  <Grid item>
                    <Typography
                      variant="h6"
                      display="inline"
                      sx={{ marginRight: "5px" }}
                    >
                      Nama barang
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="nama"
                      label="Nama barang"
                      variant="outlined"
                      sx={{ marginRight: "5px" }}
                      onChange={this.createModalChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-between" spacing={12}>
                  <Grid item>
                    <Typography variant="h6" display="inline" width="100px">
                      Harga beli
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="hargaBeli"
                      label="Harga beli"
                      variant="outlined"
                      sx={{ marginRight: "5px" }}
                      onChange={this.createModalChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-between" spacing={12}>
                  <Grid item>
                    <Typography variant="h6" display="inline" width="100px">
                      Harga jual
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="hargaJual"
                      label="Harga jual"
                      variant="outlined"
                      sx={{ marginRight: "5px" }}
                      onChange={this.createModalChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-between" spacing={18}>
                  <Grid item>
                    <Typography variant="h6" display="inline" width="100px">
                      Stok
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      name="stok"
                      label="Stok"
                      variant="outlined"
                      sx={{ marginRight: "5px" }}
                      onChange={this.createModalChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container justify="space-between" spacing={10}>
                  <Grid item>
                    <Typography variant="h6" display="inline" width="100px">
                      Foto barang
                    </Typography>
                  </Grid>
                  <Grid item>
                    <input type="file" onChange={this.createModalFile} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={this.createModalSend}>
                  <AddCircle />
                  Tambah barang
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>

        <Snackbar
          open={this.state.snackbar}
          autoHideDuration={5000}
          onClose={this.handleCloseSnackbar}
        >
          <Alert severity={this.state.snackbar_severity} sx={{ width: "100%" }}>
            {this.state.snackbar_msg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ListBarang;
