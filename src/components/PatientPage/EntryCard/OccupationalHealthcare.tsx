import { Box, Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from '@mui/icons-material/Work';
const OccupationalHealthcare = ({ entry, diagnoses } : { entry: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {

  const cardStyle = {
    p: 2,
    border: '1px solid black',
    borderRadius: 2,
    margin: 1 
  };

  return (
    <Box component="section" sx={cardStyle}>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
        {entry.date} <WorkIcon style={{ fontSize: 20 }} /> {entry.employerName} <br />
        {entry.description} <br />
        diagnose by {entry.specialist}
      </Typography>
      {entry.diagnosisCodes && !entry.diagnosisCodes.includes('') && (
        <ul>
          {
            entry.diagnosisCodes.map((code) => (
              <Typography key={code} component="li" variant="body1" style={{ marginBottom: "0.25em"}}>
                {code} {diagnoses.find(d => d.code === code)?.name}
              </Typography>
            ))
          }
        </ul>
      )}
    </Box>
  );
};

export default OccupationalHealthcare;