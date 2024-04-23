import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Button
} from '@mui/material';

const Information = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const InformationWindow = () => {
        return (
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <DialogTitle>Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is a simple web infographic that allows you to view your League of Legends account summary.
                        You may view how much time (in minutes) you have wasted in your last 100 games.
                        <br />
                        <br />
                        The options are split up into Calendar, Champions, and Game Roles.
                        <br />
                        Calendar shows the time spend on each month, and subsequently each day.
                        <br />
                        Champions shows the time spent on each champion.
                        <br />
                        Game Roles shows the time spent on each role.
                        <br />
                        <br />
                        The sunburst chart is a visual representation of the data.
                        Click on a segment to zoom into that part of the data.
                        Click on the center to zoom out.
                        <br />
                        <br />
                        Theoretically, I should be able to implement account lookups, but I do not have the paid version of the Riot API.
                        So I downloaded what I could off the free version (looked up my personal account data) and stored it in a JSON file.
                        This dialog box would have been an account lookup form, but instead its just an information box.
                        In addition, the data is not real-time, so it may be outdated.
                        If I could have more time to get my API application accepted, I would also look back into the yearly data.
                        <br />
                        <br />
                        Sorry for the inconvenience. I hope the smooth animations are cool though :D
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setIsOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }

    return (
        <div>
            <h1>League of Legends Account Summary</h1>
            <Button variant="contained" onClick={() => setIsOpen(true)}>More Information (PLEASE READ)</Button>
            <InformationWindow />
        </div>
    );
};

export default Information;
