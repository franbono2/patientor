import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import HealthCheck from "./EntryCard/HealthCheck";
import Hospital from "./EntryCard/Hospital";
import OccupationalHealthcare from "./EntryCard/OccupationalHealthcare";


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
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

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            {patient.name} { genderIcon(patient.gender) }
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation} <br />
      </Typography>
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