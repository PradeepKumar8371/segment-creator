import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import React, { useState } from 'react';
import './App.css';
import Modal from './components/Modal';
import { Option } from './components/SchemaDropdown';


function App() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false)
  const schemaOptions = [
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ];

  const handleSaveSegment = (segment: any) => {
    const dataToSend = {
      segment_name: segment?.segmentName,
      schema: schemaOptions.filter((option) => segment?.schemaList?.some((schema: Option) => schema.value === option.value)),
    };

    const webhookUrl = 'https://webhook.site/';
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        setOpenToast(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  return (
    <div className="App">
      <div className="header">
        <ArrowBackIosIcon sx={{ color: 'white', margin: '20px' }} /><h3>View Audience</h3>
      </div>
      <Button variant="outlined" style={{ textTransform: "capitalize", margin: '20px 80px' }} onClick={() => toggleDrawer(true)}>Save Segment</Button>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Modal
          schemaOptions={schemaOptions}
          onSave={handleSaveSegment}
          onClose={() => toggleDrawer(false)}
        />
      </Drawer>
      <Snackbar open={openToast} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          "Segment saved successfully"
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
