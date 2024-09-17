import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import { Typography } from "@mui/material";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';


const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const params = useParams();

  useEffect(() => {
    const fetchPatientById = async (id: string) => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    const id = params.patientId as string;
    void fetchPatientById(id);
  }, [params.patientId]);

  if (patient === undefined) {
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
      default:
        return <TransgenderIcon style={{ fontSize: 30 }} />;
        
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: "0.5em", marginTop: "1em" }}>
            {patient.name} { genderIcon(patient.gender) }
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation}
      </Typography>
    </div>
  );
};

export default PatientPage;