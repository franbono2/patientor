import { Box, Button, Checkbox, FormControl, Grid, Input, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../../types";

interface Props {
  addEntry: (entry: EntryWithoutId) => Promise<void>;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareForm = ({ addEntry, diagnoses } : Props) => {
  const initialState: EntryWithoutId = {
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [''],
    type: "OccupationalHealthcare",
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
  };
  const [formData, setFormData] = useState(initialState);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSickLeaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      sickLeave: {
        ...formData.sickLeave || { startDate: '', endDate: '' },
        [name]: value,
      },
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
    formData.diagnosisCodes = diagnosisCodes;
    if (formData.sickLeave?.startDate === '' || formData.sickLeave?.endDate === '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sickLeave, ...rest } = formData;
      addEntry(rest);
    } else {
      addEntry(formData);
    }
    console.log('Form Data:', formData);
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    setFormData(initialState);
  };

  return (
    <Box component="form" sx={formStyle} onSubmit={handleSubmit}>
      <Typography variant="subtitle1" style={{ marginBottom: "0.5em", marginTop: "1em", textAlign: "center" }}>
            New OccupationalHealthcareEntry
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
      <TextField
        id="employerName"
        name="employerName"
        value={formData.employerName}
        onChange={handleChange}
        label="EmployerName"
        variant="standard" 
        required
        fullWidth
        />
        <Box sx={{display: "flex",
          gap: 2
        }}>
          <Input
          id="StartDate"
          name="startDate"
          type="date"
          value={formData.sickLeave?.startDate}
          onChange={handleSickLeaveChange}
          placeholder="Start Date"
          required
          fullWidth
          />
          <Input
          id="EndDate"
          name="endDate"
          type="date"
          value={formData.sickLeave?.endDate}
          onChange={handleSickLeaveChange}
          placeholder="End Date"
          required
          fullWidth
          />
        </Box>
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

export default OccupationalHealthcareForm;