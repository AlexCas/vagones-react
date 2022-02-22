import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import "./App.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
  p: 4,
};

const mapStyles = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  styles: [
    {
      featureType: "all",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

export class MapContainer extends Component {
  state = {
    open: false,
    wagons: [
      {
        lat: -1.2892580897448473,
        lng: 36.822881575393666,
      },
      {
        lat: -1.2891132871206812,
        lng: 36.82319271163939,
      },
    ],
  };

  onMarkerClick(props, marker, e) {
    console.log({
      lat: marker.position.lat(),
      lng: marker.position.lng(),
    });
  }

  addMarker() {
    const _wagons = this.state.wagons;
    _wagons.push({
      lat: -1.2884,
      lng: 36.8233,
    });

    this.setState({
      wagon: _wagons,
      open: false
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1 className="title">GBX</h1>
        </div>
        <div className="button" onClick={() => this.openModal()}>
          <span className="icon">+</span>
        </div>
        <Map
          google={this.props.google}
          zoom={18}
          zoomControl={false}
          style={mapStyles}
          streetViewControl={false}
          fullscreenControl={false}
          initialCenter={{
            lat: -1.2884,
            lng: 36.8233,
          }}
          defaultOptions={defaultOptions}
        >
          {this.state.wagons.map((wagon) => {
            return (
              <Marker
                title={"The marker`s title will appear as a tooltip."}
                name={"Test"}
                draggable={true}
                onDragend={this.onMarkerClick}
                position={{ lat: wagon.lat, lng: wagon.lng }}
                icon={{
                  url: "https://images.vexels.com/media/users/3/158516/isolated/preview/d8fa6c5c700485a86f7385c84244dc05-silueta-de-tren-electrico.png",
                  anchor: new this.props.google.maps.Point(32, 32),
                  scaledSize: new this.props.google.maps.Size(64, 64),
                }}
              />
            );
          })}
        </Map>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Nuevo Vagon
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <Button variant="contained" onClick={() => this.addMarker()}>
                Aceptar
              </Button>
              <Button variant="outlined" onClick={() => this.handleClose()}>
                Cerrar
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsKb5HBKqeZP4ETjtB1I_nFQw1EsvKdHM",
})(MapContainer);
