import { Pane, Text } from 'evergreen-ui'
const RadioPengelola = ({ checked, setChecked }) => {
  const toggleCheck = () => {
    setChecked(!checked)
  }

  return (
    <>
      <Pane>
        <input
          type='radio'
          className='btn-check'
          name='sw-pengelola'
          id='sw-l'
          autoComplete='off'
          checked={!checked}
          onChange={toggleCheck}
        />
        <label htmlFor='sw-l'>
          <Pane
            cursor='pointer'
            backgroundColor={checked ? '#EDEFF5' : '#52BD94'}
            paddingX={20}
            borderRadius={8}
          >
            <Text color={checked ? '#696f8c' : '#F9FAFC'}>Pengelola Baru</Text>
          </Pane>
        </label>
      </Pane>
      <Pane>
        <input
          type='radio'
          className='btn-check'
          name='sw-pengelola'
          id='sw-r'
          autoComplete='off'
          checked={checked}
          onChange={toggleCheck}
        />
        <label htmlFor='sw-r'>
          <Pane
            cursor='pointer'
            backgroundColor={checked ? '#52BD94' : '#EDEFF5'}
            paddingX={20}
            borderRadius={8}
          >
            <Text color={checked ? '#F9FAFC' : '#696f8c'}>
              Pengelola Terdaftar
            </Text>
          </Pane>
        </label>
      </Pane>
    </>
  )
}

export default RadioPengelola
