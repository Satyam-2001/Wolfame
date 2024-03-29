import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Stack, Grid, Typography, Paper, Avatar, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, useTheme, Button, IconButton } from '@mui/material'
import TextField from "@mui/material/TextField";
import { useFormik } from 'formik'
import axios from '../../services/axiosinstance';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import residenceList from '../../data/residence'
import eventsList from '../../data/events'

import { matchSchema } from '../../schemas/match'
import CloseIcon from '@mui/icons-material/Close';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useQuery } from '@tanstack/react-query';

import TeamSelectInput from '../../components/TeamSelectInput'

const vsImage = 'https://upload.wikimedia.org/wikipedia/commons/7/70/Street_Fighter_VS_logo.png'

export default function CreateTeamSection() {

    const initialValues = {
        time: {},
        event: '',
        teams: ['', ''],
    }

    const navigate = useNavigate()

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, setFieldValue } =
        useFormik({
            initialValues,
            validationSchema: matchSchema,
            validateOnChange: true,
            validateOnBlur: false,
            //// By disabling validation onChange and onBlur formik will validate on submit.
            onSubmit: async (values, action) => {
                const data = { ...values, time: values.time.$d }
                try {
                    await axios.post('/match/create', data)
                    navigate('../')
                }
                catch (e) {
                    console.log(e)
                    if (e.response?.status === 406) {
                        action.setErrors(e.response.data)
                    }
                }
            },
        });

    const { data: teamsList } = useQuery({
        queryKey: ['teams', values?.event],
        queryFn: () => axios.get('/team', { params: { event: values?.event } }).then(response => response.data),
        // enabled: values?.event
    })

    useEffect(() => {
        setFieldValue('teams', ['', ''])
    }, [values?.event])

    const setTeams = (newTeamsList) => {
        setFieldValue('teams', newTeamsList)
    }

    // const eventData = eventsList.find(({ label }) => label === values.event)

    return (
        <Stack p={4} mt={8} mb={6} component="form" onSubmit={handleSubmit} gap={3} px={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant='h2' fontWeight={700} sx={{ opacity: 0.6 }} >
                Create Match
            </Typography>
            <Stack gap={2}>
                <FormControl fullWidth sx={{ maxWidth: '500px' }}>
                    <InputLabel id="event-label">Event</InputLabel>
                    <Select
                        labelId='event-label'
                        id="event"
                        fullWidth
                        defaultValue={'Select Event'}
                        value={values.event}
                        label="Event"
                        name='event'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.event && touched.event}
                    >
                        {eventsList.map(({ label }) => {
                            return <MenuItem key={label} value={label}>{label}</MenuItem>
                        })}
                    </Select>
                </FormControl>
                {errors.event && touched.event && (
                    <Typography color='error'>
                        {errors.event}
                    </Typography>
                )}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker
                            label="Time"
                            value={values?.time}
                            name='time'
                            id='time'
                            onChange={(value) => setFieldValue('time', value)}
                        // onBlur={handleBlur}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </Stack>
            {errors.date && touched.date && (
                <Typography color='error'>
                    {errors.date}
                </Typography>
            )}
            <Stack direction={{ md: 'row' }} gap={2} sx={{ alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>
                <TeamSelectInput key={`${0}${values?.teams?.[0]?._id}`} index={0} selectedTeams={values.teams} teamsList={teamsList} setTeams={setTeams} />
                <img src={vsImage} style={{ height: '6rem' }} />
                <TeamSelectInput key={`${1}${values?.teams?.[0]?._id}`} index={1} selectedTeams={values.teams} teamsList={teamsList} setTeams={setTeams} />
            </Stack>
            {errors.teams && touched.teams && (
                <Typography color='error'>
                    {errors.teams}
                </Typography>
            )}
            <Stack direction='row' gap={2} width={{ xs: '100%', md: '50%' }}>
                <Button fullWidth type="submit" size='large' variant='contained'>
                    Create
                </Button>
                <Button fullWidth size='large' variant='contained' onClick={() => navigate('../')}>
                    Cancel
                </Button>
            </Stack>
        </Stack>
    )
}
