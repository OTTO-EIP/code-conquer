import React, { useState } from 'react';
import fox from '../assets/fox.svg';
import fox2 from '../assets/fox2.png';
import { IconButton, Tooltip, Dialog, DialogContent, DialogActions, Button, Grid, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsMmaIcon from '@mui/icons-material/SportsMma';

interface Character {
    name: string;
    status: string;
    health: number;
    attack: number;
    src: string;
}

const characters: Character[] = [
    { name: 'Yumi', status: 'In Base', health: 100, attack: 20, src: fox },
    { name: 'Laure', status: 'Wood cutting', health: 90, attack: 25, src: fox },
    { name: 'Pablo', status: 'Mining', health: 80, attack: 30, src: fox },
];

const CharacterDisplay: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

    const handleClickOpen = (character: Character) => {
        setSelectedCharacter(character);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCharacter(null);
    };

    return (
        <div>
            <ul className="flex flex-col items-center space-y-4">
                {characters.map((character) => (
                    <li key={character.name} className="flex w-full rounded-lg items-center bg-light-grey p-2 shadow-md border border-green">
                        <img src={character.src} className="w-10 h-10" />
                        <div className="flex text-sm font-semibold h-full w-full justify-between items-center ml-4">
                            <span>{character.name}</span>
                            <div className="flex items-center ml-2">
                                <Tooltip title="Add Script">
                                    <IconButton size="medium" className="ml-2">
                                        <AddCircleOutlineIcon fontSize="small" style={{ color: '#27c906' }}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title={`Status: ${character.status}`}>
                                    <IconButton size="medium" className="ml-2" onClick={() => handleClickOpen(character)}>
                                        <InfoIcon fontSize="small" style={{ color: '#27c906' }}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <img src={fox} alt="character" className="w-16 h-16" />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{selectedCharacter?.name}</Typography>
                            <Typography variant="body2">Status: {selectedCharacter?.status}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center" style={{ marginTop: '16px' }}>
                        <Grid item>
                            <FavoriteIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2"><strong>{selectedCharacter?.health}</strong>  HP</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center" style={{ marginTop: '8px' }}>
                        <Grid item>
                            <SportsMmaIcon />
                        </Grid>
                        <Grid item>
                            <Typography variant="body2"><strong>{selectedCharacter?.attack}</strong>  Attack damage</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        style={{ color: '#27c906' }} // Changer la couleur du texte et du fond
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CharacterDisplay;
