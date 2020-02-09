export default {
  onboardingScreen: {
    skip: 'Skip',
    next: 'Next',
    start: 'Start',
    slides: {
      events: {
        title: 'Attend engaging events',
        subTitle: 'Look at the schedule and sign up for the events at ololohaus'
      },
      networking: {
        title: 'Meet inspiring people',
        subTitle: 'Connect with event attendees quickly and easily'
      },
      feedback: {
        title: 'Leave feedback',
        subTitle: 'Rate events, help us to become better!'
      }
    }
  },
  authScreen: {
    title: 'Enter e-mail',
    subTitle: 'To sign up to an event',
    emailInputLabel: 'E-mail',
    logIn: 'Sign in',
    fbAuth: 'Login with Facebook',
    next: 'Next'
  },
  authNameScreen: {
    title: 'Enter your name',
    subTitle: 'To make it easier to connect with event attendees',
    nameInputLabel: 'Name',
    subscribeText: 'Stay up to date with events',
    finish: 'Finish'
  },
  eventFeed: {
    now: 'Now',
    futureEvents: 'Future Events',
    allEvents: 'Events',

    listError: "Couldn't load events. Please, try again",
    emptyList: 'There are no events at the moment',

    signUp: 'Sign up',
    signedUp: 'Going'
  },
  eventFeedback: {
    rateButton: {
      label: 'Leave feedback'
    },

    form: {
      callToAction: 'Rate the event',

      commentPlaceholder: 'Leave comment',
      commentLabel: 'Comment',

      negativeDetails: {
        title: "What exactly you didn't like",

        event: 'Event',
        speaker: 'Speaker',
        venue: 'Venue',
        organization: 'Organization',
        price: 'Price'
      },

      submit: 'Send',
      noShow: "I couldn't come"
    },

    success: {
      title: 'Thank you!',
      description: 'Your feedback is very valuable to us'
    }
  },
  userNav: {
    logOut: {
      title: 'Log Out',
      message: 'Are you sure you want to log out?'
    }
  },
  networking: {
    actionButton: 'Connect',

    cardTab: {
      name: 'Card',

      description: 'Show your card to connect'
    },
    scannerTab: {
      name: 'Scanner',

      description: 'Point the camera to QR code to connect'
    },
    activeConnection: {
      title: 'Contact added',
      addMore: 'Add one more'
    }
  }
}
