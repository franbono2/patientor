import { Box, Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheck = ({ entry, diagnoses } : { entry: HealthCheckEntry, diagnoses: Diagnosis[] }) => {

  const cardStyle = {
    p: 2,
    border: '1px solid black',
    borderRadius: 2,
    margin: 1 
  };

  const healthCheckColor = (rating: HealthCheckRating) => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return {color: 'red'};
      case HealthCheckRating.HighRisk:
        return {color: 'orange'};
      case HealthCheckRating.LowRisk:
        return {color: 'yellow'};
      case HealthCheckRating.Healthy:
        return {color: 'green'};
    }
  };

  return (
    <Box component="section" sx={cardStyle}>
      <Typography variant="body1" style={{ marginBottom: "0.5em"}}>
        {entry.date} <MedicalInformationIcon style={{ fontSize: 20 }} /> <br />
        {entry.description} <br />
        <FavoriteIcon style={healthCheckColor(entry.healthCheckRating)} /> <br />
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

export default HealthCheck;