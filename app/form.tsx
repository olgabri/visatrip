'use client'

import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { countries } from './countries'
import { Fields, formSchema } from './schema'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const Form = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<Fields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sex: 'male',
      relationshipStatus: 'married'
    }
  })
  const onSubmit: SubmitHandler<Fields> = data => console.log(data)
  console.log(watch())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                    <Box {...props} key={option.id} component='li'>
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
                    type='email'
                    placeholder='адрес электронной почты'
                    error={!!errors.email?.message}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Имя'
                    placeholder='Латиницей как в паспорте'
                    error={!!errors.firstName?.message}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='lastName'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Фамилия'
                    placeholder='Латиницей как в паспорте'
                    error={!!errors.lastName?.message}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='phone'
                control={control}
                render={({ field: {onChange, ...rest} }) => (
                  <TextField
                    {...rest}
                    fullWidth
                    type='number'
                    label='Телефон'
                    onChange={e => onChange(Number(e.target.value))}
                    placeholder='Мобильный телефон с кодом страны'
                    error={!!errors.phone?.message}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='sex'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id='sex-select-label'>Пол</InputLabel>
                    <Select
                      {...field}
                      labelId='sex-select-label'
                    >
                      <MenuItem value='male'>Мужской</MenuItem>
                      <MenuItem value='female'>Женский</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='relationshipStatus'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id='relationshipStatus-select-label'>Семейное положение</InputLabel>
                    <Select
                      {...field}
                      labelId='relationshipStatus-select-label'
                    >
                      <MenuItem value='single'>Холост/не замужем</MenuItem>
                      <MenuItem value='married'>Женат/замужем</MenuItem>
                      <MenuItem value='unmarried'>Гражданский брак</MenuItem>
                      <MenuItem value='divorced'>Разведён(а)</MenuItem>
                      <MenuItem value='widowed'>Вдовец/вдова</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='address'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Адрес проживания'
                    placeholder='Название улицы и номер дома, квартиры'
                    error={!!errors.address?.message}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='city'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Населённый пункт'
                    placeholder='Город, посёлок, деревня'
                    error={!!errors.city?.message}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='region'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Область/регион'
                    error={!!errors.region?.message}
                    helperText={errors.region?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='countryAddress'
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
                        label='Страна проживания'
                        error={!!errors.countryAddress?.message}
                        helperText={errors.countryAddress?.message}
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id} component='li'>
                        {option.label}
                      </Box>
                    )}          
                  />)}
              />
            </Box>

            <Box mt='10px'>
              <Typography variant='body2'>
                Как долго вы проживаете по этому адресу?
              </Typography>
            </Box>

            <Box display='flex' gap='10px' mt='5px'>
              <Controller
                name='timeUnit'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id='timeUnit-select-label'>Единицы времени</InputLabel>
                    <Select
                      {...field}
                      labelId='timeUnit-select-label'
                    >
                      <MenuItem value='years'>Годы</MenuItem>
                      <MenuItem value='months'>Месяцы</MenuItem>
                      <MenuItem value='weeks'>Недели</MenuItem>
                      <MenuItem value='days'>Дни</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name='timeAddress'
                control={control}
                render={({ field: {onChange, ...rest} }) => (
                  <TextField
                    {...rest}
                    fullWidth
                    label='Количество'
                    type='number'
                    onChange={e => onChange(Number(e.target.value))}
                    error={!!errors.timeAddress?.message}
                    helperText={errors.timeAddress?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='ownershipStatus'
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel id='ownershipStatus-select-label'>На каком основании вы проживаете по этому адресу?</InputLabel>
                    <Select
                      {...field}
                      labelId='ownershipStatus-select-label'
                    >
                      <MenuItem value='owner'>Собственник</MenuItem>
                      <MenuItem value='rent'>Аренда</MenuItem>
                      <MenuItem value='other'>Живу с родственниками</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='passportNumber'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Номер паспорта'
                    placeholder='Паспорт на визу латиницей'
                    error={!!errors.passportNumber?.message}
                    helperText={errors.passportNumber?.message}
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='passportIssueAuthority'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Место выдачи паспорта'
                    placeholder='Населённый пункт'
                    error={!!errors.passportIssueAuthority?.message}
                    helperText={errors.passportIssueAuthority?.message}
                  />
                )}
              />
            </Box>

            <Box display='flex' gap='10px' mt='10px'>
              <Controller
                name='passportIssueDate'
                control={control}
                render={({field}) => (
                  <DatePicker
                    {...field}
                    sx={{flex: '1'}}
                    label='Дата выдачи паспорта'
                    format='DD.MM.YYYY'
                  />
                )}
              />
              <Controller
                name='passportExpiryDate'
                control={control}
                render={({field}) => (
                  <DatePicker
                    {...field}
                    sx={{flex: '1'}}
                    label='Дата окончания паспорта'
                    format='DD.MM.YYYY'
                  />
                )}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='citizenship'
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
                        label='Страна проживания'
                        error={!!errors.citizenship?.message}
                        helperText={errors.citizenship?.message}
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box {...props} key={option.id} component='li'>
                        {option.label}
                      </Box>
                    )}          
                  />)}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='countryOfBirth'
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    freeSolo
                    disablePortal
                    options={countries.map(({label}) => label)}
                    onChange={(_, data) => field.onChange(data)}
                    onBlur={(e) => field.onChange((e.target as HTMLInputElement).value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Страна рождения'
                        error={!!errors.countryOfBirth?.message}
                        helperText={errors.countryOfBirth?.message}
                      />
                    )}     
                  />)}
              />
            </Box>

            <Box mt='10px'>
              <Controller
                name='placeOfBirth'
                control={control}
                render={({field}) => (
                  <TextField
                    {...field}
                    fullWidth
                    label='Место рождения'
                    placeholder='Населённый пункт'
                    error={!!errors.placeOfBirth?.message}
                    helperText={errors.placeOfBirth?.message}
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
    </LocalizationProvider>
  )
}
