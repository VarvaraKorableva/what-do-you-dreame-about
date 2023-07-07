const en = {
    addANewDatePopapName: 'Add a new date',
    createButton: 'Create',
    errors: {
        errorNameMessage: {
            theNameOfEventFieldMustBeFilledIn:'The name of event field must be filled in.',
            theNameOfEventMusBeAtLeastCharactersLong:'The name of event must be at least 2 characters long.',
            theNameOfEventMustBeNoMoreThanCharacters:'The name of event must be no more than 20 characters.',
        },
        errorDateMessage: {
            theDateMustBeFilledIn: 'The date must be filled in.',
        },
        errorDescriptionMessage: {
            theDateMustNotExceedCharacters:'The date must not exceed 25 characters.',
        },
    }
}

const rus = {
    addANewDatePopapName: 'Добавить новую дату',
    createButton: 'Создать',
    errors: {
        errorNameMessage: {
            theNameOfEventFieldMustBeFilledIn:'Поле должно быть заполнено',
            theNameOfEventMusBeAtLeastCharactersLong:'Длина названия должна быть не менее 2 символов',
            theNameOfEventMustBeNoMoreThanCharacters:'Поле не должно быть более 20 символов',
        },
        errorDateMessage: {
            theDateMustBeFilledIn: 'Поле должно быть заполнено',
        },
        errorDescriptionMessage: {
            theDateMustNotExceedCharacters:'Поле не может превышать 25 символов',
        },
    }
}

const hebrew = {
    addANewDatePopapName: 'הוסף תאריך חדש',
    createButton: 'צור',
    errors: {
        errorNameMessage: {
            theNameOfEventFieldMustBeFilledIn:'שדה חייב להיות מלא',
            theNameOfEventMusBeAtLeastCharactersLong:'השדה לא יכול להכיל יותר מ-20 תווים',
            theNameOfEventMustBeNoMoreThanCharacters:'אורך השם חייב להיות לפחות 2 תווים',
        },
        errorDateMessage: {
            theDateMustBeFilledIn: 'שדה חייב להיות מלא',
        },
        errorDescriptionMessage: {
            theDateMustNotExceedCharacters:'השדה לא יכול להכיל יותר מ-25 תווים',
        },
    } 
}

const choose = { en, rus, hebrew };

export default choose;