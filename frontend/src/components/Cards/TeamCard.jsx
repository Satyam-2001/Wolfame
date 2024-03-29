import React from 'react'
import { Avatar, Grid, Paper, Stack, Typography, Link } from '@mui/material'
import Tilt from 'react-parallax-tilt';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import residenceList from '../../data/residence'
import eventsList from '../../data/events'
import chroma from 'chroma-js';

function ValueCard({ label, children, value }) {
  return (
    <Stack>
      <Typography variant='body2'>
        {label}
      </Typography>
      {children || (<Typography variant='h5' fontWeight={700} sx={{ color: 'inherit' }} >
        {value}
      </Typography>)}
    </Stack>
  )
}

export default function TeamCard({ team, ...props }) {

  const { name, residence, event, _id } = team

  const residenceData = residenceList.find(({ name }) => name === residence)
  const eventData = eventsList.find(({ label }) => label === event)


  return (
    <Grid item xs={12} {...props} >
      <Paper elevation={8} sx={{ ":hover": { transform: 'scaleY(1.03) scaleX(1.03)' }, bgcolor: chroma(residenceData?.color).alpha(0.7).hex(), borderStyle: 'solid', borderWidth: '1px' }}>
        <Grid container p={1} sx={{display: 'flex', alignItems: 'center'}}>
          <Grid item xs={5}>
            <Link href={`/teams/${_id}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
              <Stack direction='row' gap={2} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <Avatar src={residenceData?.image} variant="rounded" sx={{ width: 56, height: 56, display: { xs: 'none', md: 'block' } }} />
                <ValueCard label='Team Name' >
                  <Stack direction='row' gap={1}>
                    <Typography variant='h5' fontWeight={700} sx={{ color: 'inherit' }} >
                      {name}
                    </Typography>
                    {team?.approved && <CheckCircleIcon color='primary' />}
                  </Stack>
                </ValueCard>
              </Stack>
            </Link>
          </Grid>
          <Grid item xs={4} lg={2}>
            <Link href={`/residence/${residence?.replaceAll(' ', '')}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
              <ValueCard label='Residence' value={residence} />
            </Link>
          </Grid>
          <Grid item xs={3} >
            <Link href={`/leaderboard/${event?.replaceAll(' ', '')}`} sx={{ textDecoration: 'none', color: 'white', ':hover': { color: 'red' } }}>
              <ValueCard label='Event' value={event} />
            </Link>
          </Grid>
          <Grid item md={2} lg={2}>
            <Avatar src={eventData?.image} variant="rounded" sx={{ width: 56, height: 56, display: { xs: 'none', lg: 'block' }, mr: 1 }} />
          </Grid>
        </Grid>
      </Paper >
    </Grid>
  )
}
