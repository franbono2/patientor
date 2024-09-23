import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HealthCheck from "./EntryCard/HealthCheck";
import Hospital from "./EntryCard/Hospital";
import OccupationalHealthcare from "./EntryCard/OccupationalHealthcare";
import HealthCheckForm from "./EntryCard/HealthCheckForm";
import { AxiosError } from "axios";
import Notification from "../Notification";
import HospitalForm from "./EntryCard/HospitalForm";
import OccupationalHealthcareForm from "./EntryCard/OccupationalHealthcareForm";


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const params = useParams();

  useEffect(() => {
    const fetchPatientById = async (id: string) => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    const id = params.patientId as string;
    void fetchPatientById(id);
    void fetchDiagnoses();
  }, [params.patientId]);

  if (patient === null) {
    return (
      <>
        <h1>Patient Not Found</h1>
      </>
    );
  }

  const genderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon style={{ fontSize: 30 }} />;
      case Gender.Female:
        return <FemaleIcon style={{ fontSize: 30 }} />;
      case Gender.Other:
        return <TransgenderIcon style={{ fontSize: 30 }} />;
    }
  };

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital key={entry.id} entry={entry} diagnoses={diagnoses}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare key={entry.id} entry={entry} diagnoses={diagnoses}/>;
      case "HealthCheck":
        return <HealthCheck key={entry.id} entry={entry} diagnoses={diagnoses}/>;
    }
  };

  const addEntry = async (entry: EntryWithoutId) => {
    try {
      const id = params.patientId as string;
      const addedEntry = await patientService.addEntry(id, entry);
      const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(addedEntry)
      };
      setPatient(updatedPatient);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.replace('Something went wrong. Error: ', '');
        setNotifyMessage(errorMessage);
        setNotify(true);
        setTimeout(() => {
          setNotifyMessage('');
          setNotify(false);
        }, 5000);
        console.log(errorMessage);
      }
      console.error(error);
    }
  };

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    const option = event.target.value;
    setSelectedOption(option);
  };

  const EntryForm = () => {
    switch (selectedOption) {
      case "Hospital":
        return <HospitalForm addEntry={addEntry} diagnoses={diagnoses}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareForm addEntry={addEntry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheckForm addEntry={addEntry} diagnoses={diagnoses} />;
      default:
        break;
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            {patient.name} { genderIcon(patient.gender) }
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation} <br />
      </Typography>
      <Notification open={notify} message={notifyMessage} />
      <FormControl fullWidth>
        <InputLabel id="select-label">Select Entry Type</InputLabel>
          <Select
            labelId="select-label"
            value={selectedOption}
            onChange={handleOptionChange}
            label="Choose Type"
            fullWidth
          >
            <MenuItem value="HealthCheck">HealthCheck</MenuItem>
            <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
      </FormControl> 
      {EntryForm()}
      <Typography variant="h5" style={{ marginBottom: "0.5em"}}>
        entries
      </Typography>
      {patient.entries.map((entry => (
        EntryDetails(entry)
      )))}
    </div>
  );
};

export default PatientPage;