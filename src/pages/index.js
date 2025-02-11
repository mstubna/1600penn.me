/* eslint-disable jsx-a11y/accessible-emoji */
import 'typeface-montserrat'
import 'typeface-eb-garamond'
import { randomNormal } from 'd3-random'
import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
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
  responsiveFontSizes,
  ThemeProvider,
  duration,
} from '@material-ui/core/styles'
import { gear1, gear2, pin1, pin2, pin3, pin4 } from '../images'

const hFonts = {
  fontFamily: "'EB Garamond', 'Helvetica', 'Arial', sans-serif",
}
let theme = createMuiTheme({
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

theme = responsiveFontSizes(theme)

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
    background: '#C1242B',
  },
  dotRight: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginLeft: 18,
    background: '#C1242B',
  },
  subtitle: {
    marginTop: -34,
    marginBottom: 20,
  },
  subtitleFont: {
    color: theme.palette.primary.main,
  },
  textBox: {
    marginTop: 44,
    marginBottom: 44,
  },
  sliderContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  slider: {},
  sliderMark: {
    fontSize: 14,
    [theme.breakpoints.up('sm')]: {
      fontSize: 20,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 24,
    },
  },
  fadeContainer: {
    minHeight: 240,
  },
  nameContainer: {
    display: 'flex',
    marginBottom: 10,
    color: theme.palette.primary.main,
    borderRadius: 8,
  },
  name: {
    fontWeight: 600,
  },
  buttonGroup: {
    marginBottom: 20,
  },
  backButton: {
    padding: '4px 4px',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 8,
    width: 120,
  },
  nextButton: {
    padding: '4px 4px',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 8,
    width: 180,
  },
  pinGroup: {},
  pin: {
    width: 100,
    height: 100,
    margin: '0 10px 10px 10px',
  },
  linkGroup: {
    marginTop: '30px',
  },
  linkFont: {
    fontSize: 10,
    [theme.breakpoints.up('sm')]: {
      fontSize: 12,
    },
  },
  link: {
    textDecoration: 'underline',
    color: theme.palette.primary.main,
  },
  gear1: {
    animation: '$rotation 3.5s infinite linear',
    marginTop: -10,
    marginLeft: 20,
    marginRight: -16,
    width: 70,
    height: 70,
  },
  gear2: {
    animation: '$rotationReverse 5s infinite linear',
    marginTop: 20,
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
const normalDist2 = randomNormal(0.35, 0.15)

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
      <Helmet>
        <title>1600Penn.me</title>
        <meta property='og:title' content='1600Penn.me' />
        <meta property='og:description' content='1600 Penn name generator' />
        <meta property='og:image' content={pin1} />
        <meta property='og:url' content='https://1600penn.me' />
        <meta name='twitter:title' content='1600Penn.me' />
        <meta name='twitter:description' content='1600 Penn name generator' />
        <meta name='twitter:image' content={pin1} />
        <meta name='twitter:card' content={pin1} />
      </Helmet>
      <div style={{ overflow: 'hidden' }}>
        <Grid
          container
          direction='column'
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
          <Grid className={classes.subtitle}>
            <Typography variant='body1' className={classes.subtitleFont}>
              1600 Penn-isize me!
            </Typography>
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
                  <Typography
                    style={{ textAlign: 'center', marginBottom: 10 }}
                    variant='body2'
                    color='primary'
                  >
                    What's your name?
                  </Typography>
                  <TextField
                    fullWidth
                    color='primary'
                    type='text'
                    variant='outlined'
                    value={name}
                    onChange={handleNameChange}
                  />
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
              <Grid
                item
                container
                xs={12}
                direction='row'
                justify='center'
                alignItems='center'
              >
                <Grid
                  className={classes.sliderContainer}
                  item
                  xs={9}
                  sm={7}
                  md={6}
                  lg={4}
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <Typography
                    variant='body2'
                    color='primary'
                    style={{ marginBottom: 16 }}
                  >
                    How political are you?
                  </Typography>
                  <Slider
                    classes={{ markLabel: classes.sliderMark }}
                    defaultValue={0}
                    step={1}
                    marks={[
                      { value: 0, label: '' },
                      { value: 1, label: '⚖️' },
                      { value: 2, label: '⚖️🗳' },
                      { value: 3, label: '⚖️🗳🏛' },
                      { value: 4, label: '⚖️🗳🏛🇺🇸' },
                    ]}
                    min={0}
                    max={4}
                    value={political}
                    onChange={handlePoliticalChange}
                  />
                </Grid>
              </Grid>
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
                direction='row'
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
                  <Typography
                    style={{ marginBottom: 10 }}
                    variant='body2'
                    color='primary'
                  >
                    Your 1600 Penn name is
                  </Typography>
                  <div className={classes.nameContainer}>
                    <Typography className={classes.name} variant='h2'>
                      {get1600Name()}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Fade>
            <Fade
              in={step % 2 === 1}
              timeout={{ enter: duration.enteringScreen, exit: 0 }}
              mountOnEnter
              unmountOnExit
            >
              <Grid
                container
                item
                direction='row'
                alignItems='flex-start'
                xs={12}
                style={{ marginTop: 20 }}
              >
                <Grid container item xs={12} justify='center' spacing={0}>
                  <Typography variant='body2' color='primary'>
                    {workingText}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justify='center'
                  alignContent='center'
                  style={{ marginTop: -40 }}
                  spacing={0}
                >
                  <img
                    className={classes.gear1}
                    src={gear2}
                    alt='spinning gear 1'
                  />
                  <img
                    className={classes.gear2}
                    src={gear1}
                    alt='spinning gear 2'
                  />
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
              className={classes.backButton}
              size='large'
              color='secondary'
              variant='text'
              disabled={step % 2 === 1 || step === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className={classes.nextButton}
              size='large'
              color='primary'
              variant='text'
              disabled={step % 2 === 1 || (step === 0 && name === '')}
              onClick={handleNext}
            >
              {step === 4 ? 'Start over' : 'Next'}
            </Button>
          </Grid>
          <Fade
            in={step === 4}
            timeout={{ enter: 7 * duration.enteringScreen, exit: 0 }}
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
              <img className={classes.pin} src={pin4} alt='pin 4' />
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
                  className={classes.link}
                  href='https://twitter.com/GLucasTalkShow'
                >
                  George Lucas Talk Show
                </a>
              </span>
              <br />
              <span>
                <a className={classes.link} href='https://arliss.me'>
                  Arliss.me
                </a>
              </span>
              <br />
              <span>
                <a
                  className={classes.link}
                  href='https://github.com/mstubna/1600penn.me'
                >
                  Source
                </a>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}

export default IndexPage
