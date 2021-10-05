import React from 'react'
import Box from '@material-ui/core/Box';

export const HowPlay = (props) => {
    return (
        <Box component="div" p={10} >
            Règle du jeu:

            Cliquer sur start et un compteur de 60 secondes se lancera.
            <br/>
            Vous devez répondre si un acteur joue dans un film par vrai ou faux.
            <br/>

            Si vous répondez mal la partie prend fin.
            <br/>

            Bon chance 
        </Box>
    )
}

export default HowPlay
