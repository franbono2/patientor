import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { EntryWithoutId } from "../../../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => Promise<void>;
}

const HospitalForm = ({ addEntry } : Props) => {
  const initialState: EntryWithoutId = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [''],
    type: "Hospital",
    discharge: {
      date: "",
      criteria: ""
    },
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDischargeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      discharge: {
        ...formData.discharge,
        [name]: value,
      },
    });
  };

  const handleDiagnosisCodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const diagnosisCodes = value.split(',').flat().map(code => code.trim());
    setFormData({
      ...formData,
      diagnosisCodes: diagnosisCodes,
    });
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxWidth: 400,
    margin: '0 auto',
    padding: 3,
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: 2,
    marginTop: 3
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    addEntry(formData);
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(initialState);
  };

  return (
    <Box component="form" sx={formStyle} onSubmit={handleSubmit}>
      <Typography variant="subtitle1" style={{ marginBottom: "0.5em", marginTop: "1em", textAlign: "center" }}>
            New HospitalEntry
      </Typography>
      <TextField 
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        label="Description"
        variant="standard"
        required
        fullWidth
      />
      <TextField
        id="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        label="Date"
        variant="standard" 
        required
        fullWidth
        />
      <TextField
        id="specialist"
        name="specialist"
        value={formData.specialist}
        onChange={handleChange}
        label="Specialist"
        variant="standard" 
        required
        fullWidth
        />
        <Box sx={{display: "flex",
          gap: 2
        }}>
          <TextField
          id="dischargeDate"
          name="date"
          value={formData.discharge.date}
          onChange={handleDischargeChange}
          label="Date"
          variant="standard" 
          required
          fullWidth
          />
          <TextField
          id="dischargeCriteria"
          name="criteria"
          value={formData.discharge.criteria}
          onChange={handleDischargeChange}
          label="Criteria"
          variant="standard" 
          required
          fullWidth
          />
        </Box>
      <TextField
        id="diagnosisCodes"
        name="diagnosisCodes"
        value={formData.diagnosisCodes}
        onChange={handleDiagnosisCodesChange}
        label="Diagnosis codes"
        variant="standard" 
        fullWidth
        />
      <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left", backgroundColor: "red" }}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
    </Box>
  );
};

export default HospitalForm;