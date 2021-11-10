import { Pane, Button } from 'evergreen-ui'

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  errors,
  handleSubmit,
  postData,
  setPostData,
  isLoading,
  withSkip,
}) => {
  const onSubmit = (data) => {
    setPostData({ ...postData, [currentStep]: data })
    nextStep()
  }

  return (
    <Pane className='d-flex justify-content-between'>
      <Pane>
        {currentStep > 1 && (
          <Button
            onClick={(e) => {
              e.preventDefault()
              previousStep()
            }}
          >
            Kembali
          </Button>
        )}
      </Pane>
      <Pane>
        {withSkip && (
          <Button
            appearance='minimal'
            onClick={(e) => {
              e.preventDefault()
              nextStep()
            }}
          >
            Lewati
          </Button>
        )}

        {currentStep < totalSteps && (
          <Button
            appearance='primary'
            marginLeft={5}
            onClick={(e) => {
              e.preventDefault()
              handleSubmit(onSubmit)()
            }}
          >
            Selanjutnya
          </Button>
        )}
        {currentStep == totalSteps && (
          <Button
            appearance='primary'
            marginLeft={5}
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            isLoading={isLoading}
          >
            Submit
          </Button>
        )}
      </Pane>
    </Pane>
  )
}

export default Stats
