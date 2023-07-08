const en = {
    greeting: 'Hello,',
    name: 'Name',
    birthday: 'Birthday',

    buttonChangeInformation: 'Change information',

    errors: {
        errorNameMessage: {
            theUsernameMustBeAtLeastCharactersLong:'The username must be at least 2 characters long.',
            theUsernameShouldOnlyContainLatinLettersCyrillicLetters:'The username should only contain Latin letters, Cyrillic letters, spaces, or hyphens.',
            theUsernameMustBeNoMoreThanCharacters:'The username must be no more than 30 characters.',
        },
        errorBirthdayMessage: {
            theDateMustBeFilledIn: 'The date must be filled in.',
        }
    }, 
}

const rus = {
    greeting: 'Привет,',
    name: 'Имя',
    birthday: 'Дата рождения',

    buttonChangeInformation: 'Изменить информацию',

    errors: {
        errorNameMessage: {
            theUsernameMustBeAtLeastCharactersLong:'В имени должно быть не менее 2 символов',
            theUsernameShouldOnlyContainLatinLettersCyrillicLetters:'Имя пользователя должно содержать только латинские буквы, кириллические буквы, пробелы или дефисы.',
            theUsernameMustBeNoMoreThanCharacters:'Имя не должно превышать 30 символов',
        },
        errorBirthdayMessage: {
            theDateMustBeFilledIn: 'Поле должно быть заполнено',
        }
    }, 
}

const hebrew = {
    greeting: ',שלום',
    name: 'שם',
    birthday: 'יומולדת',

    buttonChangeInformation: 'שינוי מידע',

    errors: {
        errorNameMessage: {
            theUsernameMustBeAtLeastCharactersLong:'שם המשתמש חייב להיות באורך של לפחות 2 תווים',
            theUsernameShouldOnlyContainLatinLettersCyrillicLetters:'שם המשתמש צריך להכיל רק אותיות לטיניות, אותיות קיריליות, רווחים או מקפים',
            theUsernameMustBeNoMoreThanCharacters:'שם המשתמש צריך להיות בעל לא יותר מ-30 תווים',
        },
        errorBirthdayMessage: {
            theDateMustBeFilledIn: 'התאריך חייב להיות מולא',
        }
    }, 
}

const choose = { en, rus, hebrew };

export default choose;