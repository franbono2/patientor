import { Box, Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../../types";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Hospital = ({ entry, diagnoses } : { entry: HospitalEntry, diagnoses: Diagnosis[] }) => {

  const cardStyle = {
    p: 2,
    border: '1px solid black',
    borderRadius: 2,
    margin: 1 
  };

  return (
    <Box component="section" sx={cardStyle}>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
        {entry.date} <LocalHospitalIcon style={{ fontSize: 20 }} /> <br />
        {entry.description} <br />
        {entry.discharge.date} <br /> 
        {entry.discharge.criteria} <br />
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

export default Hospital;