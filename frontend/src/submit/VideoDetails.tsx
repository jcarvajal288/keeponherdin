import {Button, Paper, Stack, TextField} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import UndoIcon from '@mui/icons-material/Undo';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import {Tournament} from "../tournaments/TournamentTable";

export type VideoDetailsProps = {
    setFormStep: (nextStep: string) => void
    setTournament: (tournament: Tournament) => void
}

type FormData = {
    title: string;
    channel: string;
    date: string;
}

export const VideoDetails = ({setFormStep, setTournament}: VideoDetailsProps) => {

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    const notOnlyWhitespace = /.*\S.*/

    const handleStartOver = () => {
        setFormStep("Enter Link")
    }

    const videoDetailsSchema = yup
        .object({
            title: yup
                .string()
                .matches(notOnlyWhitespace, "required")
                .required('required'),
            channel: yup
                .string()
                .matches(notOnlyWhitespace, "required")
                .required('required'),
            date: yup
                .string()
                .matches(dateRegex, 'must be in the form YYYY-MM-DD')
                .required('required'),
    })

    const { handleSubmit, formState, control } = useForm<FormData>({
        resolver: yupResolver(videoDetailsSchema),
        mode: 'onChange',
        shouldFocusError: true,
        defaultValues: {
            title: '',
            channel: '',
            date: ''
        }
    })

    const submitForm = (formData: FormData) => {
        const validatedFormData = videoDetailsSchema.cast(formData, { assert: true })

        const videoData: Tournament = {
            id: -1,
            title: (validatedFormData.title as string).trim(),
            tournament_organizer: (validatedFormData.channel as string).trim(),
            date: new Date(Date.parse(validatedFormData.date!)),
            game_version: "3.0"
        }
        setTournament(videoData)
        setFormStep("Timestamps")
    }

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Stack
                direction='column'
            >
                <Paper
                    sx={{
                        padding: '20px'
                    }}
                >
                    <Controller
                        control={control}
                        name='title'
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <TextField
                                    {...field}
                                    id='titleField'
                                    label='Title'
                                    helperText={error?.message}
                                    error={!!error}
                                    variant='standard'
                                    fullWidth
                                />
                            )
                        }}
                    />
                    <Controller
                        control={control}
                        name='channel'
                        render={({ field, fieldState: { error } }) => {
                            return (
                                <TextField
                                    {...field}
                                    id='channelField'
                                    label='Channel'
                                    variant='standard'
                                    helperText={error?.message}
                                    error={!!error}
                                    fullWidth
                                    sx={{
                                        paddingTop: '5px'
                                    }}
                                />
                            )
                        }}
                    />
                    <Stack
                        direction='row'
                        alignItems='end'
                        sx={{
                            paddingTop: '5px'
                        }}
                    >
                        <EventIcon
                            color='action'
                            sx={{
                                paddingRight: '5px'
                            }}
                        />
                        <Controller
                            control={control}
                            name='date'
                            render={({ field, fieldState: { error } }) => {
                                return (
                                    <TextField
                                        {...field}
                                        id='dateField'
                                        label='Date'
                                        variant='standard'
                                        fullWidth
                                        helperText={error?.message}
                                        error={!!error}
                                    />
                                )
                            }}
                        />
                    </Stack>
                </Paper>
                <Stack
                    direction='row'
                    sx={{
                        paddingTop: '20px'
                    }}
                >
                    <Button
                        variant='contained'
                        startIcon={<UndoIcon/>}
                        onClick={handleStartOver}
                        sx={{
                            marginRight: '10px'
                        }}
                    >
                        Start Over
                    </Button>
                    <Button
                        variant='contained'
                        startIcon={<ArrowRightAltIcon/>}
                        type='submit'
                        disabled={!formState.isValid}
                    >
                        Next
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
}