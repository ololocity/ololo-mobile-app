export default {
  onboardingScreen: {
    skip: 'Пропустить',
    next: 'Далее',
    start: 'Начать',
    slides: {
      events: {
        title: 'Посещай классные ивенты',
        subTitle: 'Смотри афишу и записывайся на мероприятия в ololohaus'
      },
      networking: {
        title: 'Знакомься с людьми',
        subTitle:
          'Быстро и легко обменивайся контактами с посетителями мероприятий'
      },
      feedback: {
        title: 'Оставляй фидбек',
        subTitle:
          'Ставь оценки мероприятиям, пиши нам, помогай нам стать лучше!'
      }
    }
  },
  authScreen: {
    title: 'Введите e-mail',
    subTitle: 'Чтобы зарегистрироваться на мероприятие',
    emailInputLabel: 'E-mail',
    logIn: 'Войти',
    fbAuth: 'Войти с помощью Facebook',
    next: 'Далее'
  },
  authNameScreen: {
    title: 'Введите имя',
    subTitle: 'Чтобы посетителям мероприятий было легче с вами знакомиться',
    nameInputLabel: 'Имя',
    subscribeText: 'Быть в курсе акций и мероприятий',
    finish: 'Завершить'
  },
  eventFeed: {
    now: 'Сегодня',
    futureEvents: 'Скоро',
    allEvents: 'Мероприятия',

    listError: 'Не удалось загрузить мероприятия. Попробуйте еще раз',
    emptyList: 'В данный момент нет запланированных мероприятий',

    signUp: 'Пойду',
    signedUp: 'Иду'
  },
  eventFeedback: {
    rateButton: {
      label: 'Оцените мероприятие'
    },

    form: {
      callToAction: 'Оцените мероприятие',

      commentPlaceholder: 'Оставить комментарий',
      commentLabel: 'Комментарий',

      negativeDetails: {
        title: 'Что не понравилось?',

        event: 'Доклад',
        speaker: 'Спикер',
        venue: 'Помещение',
        organization: 'Организация',
        price: 'Цена'
      },

      submit: 'Отправить',
      noShow: 'Я не смог прийти'
    },

    successTitle: 'Спасибо!',
    successDescription: 'Ваш отзыв очень важен для нас'
  },
  userNav: {
    logOut: {
      title: 'Выход',
      message: 'Вы действительно хотите выйти?'
    }
  },
  networking: {
    actionButton: 'Познакомиться',

    cardTab: {
      name: 'Визитка',

      description: 'Отсканируй код, чтобы познакомиться'
    },
    scannerTab: {
      name: 'Сканер',

      description: 'Наведите на QR-код, чтобы познакомиться'
    }
  }
}
