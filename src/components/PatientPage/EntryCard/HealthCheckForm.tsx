import { Box, Button, Checkbox, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => Promise<void>;
  diagnoses: Diagnosis[];
}

const HealthCheckForm = ({ addEntry, diagnoses } : Props) => {
  const initialState: EntryWithoutId = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [''],
    type: "HealthCheck",
    healthCheckRating: HealthCheckRating.Healthy,
  };
  const [formData, setFormData] = useState(initialState);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const handleDiagnosisCodesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const diagnosisCodes = value.split(',').flat().map(code => code.trim());
  //   setFormData({
  //     ...formData,
  //     diagnosisCodes: diagnosisCodes,
  //   });
  // };

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<typeof healthCheckRating>) => {
    setHealthCheckRating(event.target.value as HealthCheckRating);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
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
    formData.healthCheckRating = healthCheckRating as HealthCheckRating;
    formData.diagnosisCodes = diagnosisCodes;
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
            New HealthCheckEntry
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
      <Input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
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
      <FormControl fullWidth>
        <InputLabel id="healthCheck-label">HealthCheck Rating</InputLabel>
        <Select
          labelId="healthCheck-label"
          value={healthCheckRating}
          onChange={handleHealthCheckRatingChange}
          label="HealthCheckRating"
          required
        >
          {Object.values(HealthCheckRating)
          .filter((key) => isNaN(Number(key)))
          .map((value) => (
            <MenuItem key={value} value={HealthCheckRating[value as keyof typeof HealthCheckRating]}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="diagnosisCodesLabel">Diagnosis Codes</InputLabel>
        <Select
          labelId="diagnosisCodesLabel"
          id="diagnosisCheckbox"
          multiple
          value={diagnosisCodes}
          onChange={handleDiagnosisCodesChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {
            diagnoses.map((diagnose) => (
              <MenuItem key={diagnose.code} value={diagnose.code}>
                <Checkbox checked={diagnosisCodes.includes(diagnose.code)}/>
                <ListItemText primary={diagnose.code} />
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
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

export default HealthCheckForm;