/* eslint-disable jsx-a11y/accessible-emoji */
import 'typeface-montserrat'
import 'typeface-eb-garamond'
import { randomNormal } from 'd3-random'
import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Grid,
  Fade,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  duration,
} from '@material-ui/core/styles'
import pin1 from '../images/pin1.svg'
import pin2 from '../images/pin2.svg'
import pin3 from '../images/pin3.svg'

const hFonts = {
  fontFamily: "'EB Garamond', 'Helvetica', 'Arial', sans-serif",
}
const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
    useNextVariants: true,
    h1: hFonts,
    h2: hFonts,
    h3: hFonts,
    h4: hFonts,
    h5: hFonts,
    h6: hFonts,
    subtitle1: hFonts,
  },
  palette: {
    primary: { main: '#0A3A69' },
    secondary: { main: '#616161' },
    text: { primary: '#424242' },
  },
  shape: {
    borderRadius: 8,
  },
})

const useStyles = makeStyles({
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(359deg)',
    },
  },
  '@keyframes rotationReverse': {
    from: {
      transform: 'rotate(359deg)',
    },
    to: {
      transform: 'rotate(0deg)',
    },
  },
  title: {
    marginTop: 40,
    marginBottom: 40,
    borderTop: '6px solid #C1242B',
    borderBottom: '6px solid #C1242B',
    borderRadius: 2,
  },
  titleContainer: {
    padding: '0 4px',
  },
  titleFont: {
    fontWeight: 600,
  },
  titleFontLink: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  dotLeft: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 18,
    background: '#89251e',
  },
  dotRight: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 18,
    background: '#89251e',
  },
  subtitle: {},
  subtitleFont: {},
  textBox: {
    marginTop: 44,
    marginBottom: 44,
  },
  sliderContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  slider: {},
  smallSliderLabel: {
    minWidth: 100,
    marginBottom: 20,
  },
  sliderLabel: {
    minWidth: 100,
    marginBottom: 20,
  },
  fadeContainer: {
    height: 180,
  },
  nameContainer: {
    display: 'flex',
    marginTop: -10,
    marginBottom: 10,
    padding: '8px 40px',
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: 8,
  },
  buttonGroup: {
    marginBottom: 20,
  },
  minWidthButton: {
    padding: '6px 4px',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 8,
    minWidth: 140,
  },
  pinGroup: {},
  pin: {
    margin: '0 10px',
  },
  linkGroup: {
    marginTop: '30px',
  },
  linkFont: {
    fontSize: '8px',
    textDecoration: 'none',
  },
  gear1: {
    animation: '$rotation 3.5s infinite linear',
    marginTop: -30,
    marginLeft: 20,
    marginRight: -16,
    width: 70,
    height: 70,
  },
  gear2: {
    animation: '$rotationReverse 5s infinite linear',
    width: 100,
    height: 100,
  },
})

// hook for tracking the previous value of a stateful variable
const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const normalDist1 = randomNormal(0.15, 0.05)
const normalDist2 = randomNormal(0.5, 0.15)

const getRandomDelay = (dist) => {
  return Math.max(500, Math.floor(dist() * 10000))
}

const IndexPage = () => {
  const classes = useStyles()
  const [step, setStep] = useState(0)
  const prevStep = usePrevious(step)
  const [name, setName] = useState('')
  const [workingText, setWorkingText] = useState('Working...')
  const [political, setPolitical] = useState(0)

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePoliticalChange = (e, value) => {
    setPolitical(value)
  }

  const handleReset = () => {
    setName('')
    setPolitical(0)
    setStep(0)
  }

  const handleBack = () => {
    if (step === 0) {
      return
    }
    setStep(step - 1)
    setTimeout(() => setStep(step - 2))
  }

  const handleNext = () => {
    if (step === 4) {
      handleReset()
      return
    }
    setStep(step + 1)
    const delay = getRandomDelay(step === 0 ? normalDist1 : normalDist2)
    if (step === 2 && delay > 1000) {
      setTimeout(() => setWorkingText('Almost done...'), delay - 1000)
      setTimeout(() => setWorkingText('Working...'), delay)
    }
    setTimeout(() => setStep(step + 2), delay)
  }

  const get1600Name = () => {
    const names = name.split(/\s+/)
    return `I6OO${names[0]}`
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: 'hidden' }}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={3}
        >
          <Grid className={classes.title}>
            <Grid
              className={classes.titleContainer}
              container
              direction='row'
              alignItems='center'
            >
              <div className={classes.dotLeft}></div>
              <Typography
                className={classes.titleFont}
                variant='h2'
                align='center'
              >
                <a href='/' className={classes.titleFontLink}>
                  I6OO&#8239;PENN.ME
                </a>
              </Typography>
              <div className={classes.dotRight}></div>
            </Grid>
          </Grid>
          <Grid container className={classes.fadeContainer}>
            <Fade
              in={step === 0}
              timeout={{
                enter: prevStep > 0 ? 0 : duration.enteringScreen,
                exit: 0,
              }}
              mountOnEnter
              unmountOnExit
            >
              <Grid
                item
                container
                direction='row'
                justify='center'
                alignItems='center'
                xs={12}
              >
                <Grid
                  className={classes.textBox}
                  item
                  xs={10}
                  sm={8}
                  md={6}
                  lg={5}
                >
                  <TextField
                    fullWidth
                    color='secondary'
                    type='text'
                    variant='outlined'
                    value={name}
                    onChange={handleNameChange}
                  />
                  <Typography
                    style={{ textAlign: 'center', marginTop: 10 }}
                    variant='body2'
                  >
                    What's your name?
                  </Typography>
                </Grid>
              </Grid>
            </Fade>
            <Fade
              in={step === 2}
              timeout={{
                enter: prevStep > 2 ? 0 : duration.enteringScreen,
                exit: 0,
              }}
              mountOnEnter
              unmountOnExit
            >
              <>
                <Grid
                  className={classes.sliderContainer}
                  item
                  xs={12}
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                  spacing={5}
                >
                  <Grid item>
                    <Typography
                      className={classes.smallSliderLabel}
                      variant='h5'
                      align='right'
                    >
                      ⚖️
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    direction='column'
                    alignItems='center'
                    className={classes.slider}
                    item
                    xs={5}
                    md={4}
                    xl={3}
                  >
                    <Slider
                      defaultValue={0}
                      step={1}
                      marks
                      min={0}
                      max={4}
                      value={political}
                      onChange={handlePoliticalChange}
                    />
                    <Typography variant='body2' style={{ marginTop: 4 }}>
                      How political are you?
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      className={classes.sliderLabel}
                      variant='h5'
                      align='center'
                    >
                      ⚖️🇺🇸🗳🏛
                    </Typography>
                  </Grid>
                </Grid>
              </>
            </Fade>
            <Fade
              in={step === 4}
              timeout={{
                enter: prevStep > 4 ? 0 : duration.enteringScreen,
                exit: 0,
              }}
              mountOnEnter
              unmountOnExit
            >
              <Grid
                item
                container
                direction='column'
                justify='center'
                alignItems='center'
                xs={12}
              >
                <Grid
                  container
                  item
                  direction='column'
                  alignItems='center'
                  justify='center'
                  className={classes.textBox}
                  xs={12}
                  sm={8}
                  md={6}
                  lg={5}
                >
                  <div className={classes.nameContainer}>
                    <Typography variant='h3'>{get1600Name()}</Typography>
                  </div>
                  <Typography variant='body2'>Your 1600 Penn name</Typography>
                </Grid>
              </Grid>
            </Fade>
            <Fade
              in={step % 2 === 1}
              timeout={{ enter: duration.enteringScreen, exit: 0 }}
              mountOnEnter
              unmountOnExit
            >
              <Grid container item direction='row' xs={12}>
                <Grid
                  container
                  item
                  xs={12}
                  justify='center'
                  alignContent='center'
                >
                  <img
                    className={classes.gear1}
                    src={pin2}
                    alt='spinning gear 2'
                  />
                  <img
                    className={classes.gear2}
                    src={pin1}
                    alt='spinning gear 1'
                  />
                </Grid>
                <Grid container item xs={12} justify='center'>
                  <Typography variant='body2' style={{ marginTop: -16 }}>
                    {workingText}
                  </Typography>
                </Grid>
              </Grid>
            </Fade>
          </Grid>
          <Grid
            className={classes.buttonGroup}
            item
            container
            direction='row'
            justify='center'
            spacing={5}
          >
            <Button
              className={classes.minWidthButton}
              size='large'
              color='secondary'
              variant='contained'
              disabled={step % 2 === 1 || step === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className={classes.minWidthButton}
              size='large'
              color='primary'
              variant='contained'
              disabled={step % 2 === 1 || (step === 0 && name === '')}
              onClick={handleNext}
            >
              {step === 4 ? 'Start over' : 'Next'}
            </Button>
          </Grid>
          <Fade
            in={step === 4}
            timeout={{ enter: duration.enteringScreen, exit: 0 }}
            mountOnEnter
            unmountOnExit
          >
            <Grid
              className={classes.pinGroup}
              container
              item
              direction='row'
              alignContent='center'
              justify='center'
              xs={12}
            >
              <img className={classes.pin} src={pin1} alt='pin 1' />
              <img className={classes.pin} src={pin2} alt='pin 2' />
              <img className={classes.pin} src={pin3} alt='pin 3' />
            </Grid>
          </Fade>
          <Grid
            className={classes.linkGroup}
            item
            xs={10}
            md={8}
            lg={6}
            container
            direction='row'
            justify='flex-end'
          >
            <Typography
              className={classes.linkFont}
              variant='body1'
              color='primary'
              align='right'
            >
              <span>
                Questions? Watch the{' '}
                <a
                  className={classes.linkFont}
                  href='https://twitter.com/GLucasTalkShow'
                >
                  George Lucas Talk Show
                </a>
              </span>
              <br />
              <a
                className={classes.linkFont}
                href='https://github.com/mstubna/1600penn.me'
              >
                Source
              </a>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage
