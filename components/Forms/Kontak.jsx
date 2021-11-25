import { useForm } from 'react-hook-form'
import { TextInputField, Pane } from 'evergreen-ui'
import Stats from '@components/Stats'
const Kontak = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  return (
    <form>
      <TextInputField
        isInvalid={errors.name ? true : false}
        validationMessage={errors.name && 'Harus di isi!'}
        label='Nama *'
        placeholder='Nama'
        id='name'
        {...register('name', { required: true })}
      />
      <TextInputField
        label='Alamat'
        placeholder='Alamat'
        id='address'
        {...register('address')}
      />
      <Pane className='row'>
        <Pane className='col-6'>
          <TextInputField
            isInvalid={errors.email ? true : false}
            validationMessage={errors.email && errors.email.message}
            label='Email'
            type='email'
            placeholder='Email'
            id='email'
            {...register('email', {
              validate: (value) =>
                value.includes('@') || 'Masukkan email yang valid!',
            })}
          />
        </Pane>
        <Pane className='col-6'>
          <TextInputField
            isInvalid={errors.phone ? true : false}
            validationMessage={errors.phone && 'Harus di isi!'}
            label='Nomor Telepon *'
            placeholder='Nomor Telepon'
            id='phone'
            {...register('phone', { required: true })}
          />
        </Pane>
      </Pane>
      <Stats
        step={2}
        {...props}
        postData={props.postData}
        setPostData={props.setPostData}
        withSkip={false}
        errors={errors}
        handleSubmit={handleSubmit}
      />
    </form>
  )
}

export default Kontak
