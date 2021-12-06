import { useState } from 'react'
import {
  Pane,
  Card,
  ManuallyEnteredDataIcon,
  Heading,
  ArrowRightIcon,
  UserIcon,
  MediaIcon,
} from 'evergreen-ui'
import RadioPengelola from './RadioPengelola'

const StepNav = ({ activeStep, checked, setChecked }) => {
  return (
    <>
      <Pane
        className='d-flex justify-content-center align-items-center gap-2'
        marginBottom={25}
      >
        <Pane
          width={150}
          paddingY={16}
          backgroundColor='#52BD94'
          borderRadius={5}
          borderColor='#c1c4d6'
          textAlign='center'
          className={activeStep == 1 ? 'd-block' : 'd-none d-md-block'}
        >
          <ManuallyEnteredDataIcon color='#F9FAFC' size={30} />
          <Heading color='#F9FAFC'>Detail</Heading>
        </Pane>
        <Pane
          width={150}
          paddingY={16}
          backgroundColor={activeStep >= 2 ? '#52BD94' : '#EDEFF5'}
          borderRadius={5}
          borderColor='#c1c4d6'
          textAlign='center'
          className={activeStep == 2 ? 'd-block' : 'd-none d-md-block'}
        >
          <MediaIcon
            color={activeStep >= 2 ? '#F9FAFC' : '#696f8c'}
            size={30}
          />
          <Heading color={activeStep >= 2 ? '#F9FAFC' : '#696f8c'}>
            Kontak
          </Heading>
        </Pane>
        <Pane
          width={150}
          paddingY={16}
          backgroundColor={activeStep >= 3 ? '#52BD94' : '#EDEFF5'}
          borderRadius={5}
          borderColor='#c1c4d6'
          textAlign='center'
          className={activeStep == 3 ? 'd-block' : 'd-none d-md-block'}
        >
          <MediaIcon
            color={activeStep >= 3 ? '#F9FAFC' : '#696f8c'}
            size={30}
          />
          <Heading color={activeStep >= 3 ? '#F9FAFC' : '#696f8c'}>
            Media
          </Heading>
        </Pane>
        <Pane
          width={150}
          paddingY={16}
          backgroundColor={activeStep >= 4 ? '#52BD94' : '#EDEFF5'}
          borderRadius={5}
          borderColor='#c1c4d6'
          textAlign='center'
          className={activeStep == 3 ? 'd-block' : 'd-none d-md-block'}
        >
          <UserIcon color={activeStep >= 4 ? '#F9FAFC' : '#696f8c'} size={30} />
          <Heading color={activeStep >= 4 ? '#F9FAFC' : '#696f8c'}>
            Pengelola
          </Heading>
        </Pane>
      </Pane>
    </>
  )
}

export default StepNav
