import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { PropsSalonPage } from "./MatchingSearch";

export const AccordionApp = ({ userData }: PropsSalonPage) => {
  return (
    <div>
      {userData.aboutSalonInfo.map((acc, index) => (
        <div key={index}>
          {acc.accordion.map((info, infoIndex) => (
            <div key={infoIndex}>
              <Accordion key={infoIndex}>
                <AccordionSummary
                  aria-controls={`panel${infoIndex}-content`}
                  id={`panel${infoIndex}-header`}
                >
                  <Typography>Payment & cancellation policy</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{info.paymentolicy}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  aria-controls={`panel${infoIndex}-content`}
                  id={`panel${infoIndex}-header`}
                >
                  <Typography>Brands used</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{info.brandsUsed}</Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
