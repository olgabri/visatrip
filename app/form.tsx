'use client'

import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { countries } from './countries'
import { Fields, formSchema } from './schema'

export const Form = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<Fields>({
    resolver: zodResolver(formSchema)
  })
  const onSubmit: SubmitHandler<Fields> = data => console.log(data)
  console.log(watch());

  return (
    <Box p='20px'>
      <Typography component='h1' variant='h5'>
        Опросник на визу в Великобританию
      </Typography>

      <Box mt='20px'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='countryVac'
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                disablePortal
                options={countries}
                getOptionLabel={(option) => option.label}
                onChange={(_, data) => field.onChange(data?.id)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Страна подачи в визовый центр'
                    error={!!errors.countryVac?.message}
                    helperText={errors.countryVac?.message}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    {option.label}
                  </Box>
                )}          
              />)}
          />


          <Box mt='10px'>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label='Email'
                  placeholder='адрес электронной почты'
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            
          </Box>

          <Box mt='10px'>
            <Button type='submit'>
              Отправить ответы
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
