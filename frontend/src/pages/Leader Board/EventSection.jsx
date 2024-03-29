import React, { useEffect, useState } from 'react'
import { Button, Grid, IconButton, Paper, Stack, Typography } from '@mui/material'

import TeamSection from '../../components/Sections/TeamSection'
import MatchSection from '../../components/Sections/MatchSection'
import WinnerSection from '../../components/Sections/WinnerSection'

export default function EventSection({ event }) {

    const [selectedMenu, setSelectedMenu] = useState('Winners')

    const menuChangeHandler = (menuItem) => {
        setSelectedMenu(menuItem)
    }

    return (
        <Stack py={2}>
            <Grid container spacing={1} sx={{ justifyContent: 'center', width: 1, p: 1 }} >
                {
                    ['Winners', 'Teams', 'Matches'].map((name) => {
                        const isSelected = selectedMenu === name
                        return (
                            <Grid key={name} item xs={4}>
                                <Button
                                    size='large'
                                    fullWidth
                                    variant={isSelected ? 'contained' : 'outlined'}
                                    onClick={() => menuChangeHandler(name)}
                                >
                                    <Typography variant='body1' fontWeight={700} sx={{ opacity: 0.8, color: isSelected ? 'white' : 'red' }} >
                                        {name}
                                    </Typography>
                                </Button>
                            </Grid>
                        )
                    })
                }
            </Grid>
            {selectedMenu === 'Teams' && <TeamSection params={{ event }} sx={{ p: 0, pt: 1 }} hide={{ event: true }} />}
            {selectedMenu === 'Matches' && <MatchSection params={{ event }} sx={{ p: 0, pt: 2 }} hide={{ event: true }} />}
            {selectedMenu === 'Winners' && <WinnerSection params={{ event }} sx={{ p: 0, pt: 2 }} />}
        </Stack >
    )
}
