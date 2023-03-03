//reducers.js
const setLanguage = language => {
  let messages = {};
  switch (language) {
    case 'hi':
      messages = Object.assign(messages, require(`../i18n/hi.json`));
      break;
    default:
    case 'en':
      messages = Object.assign(messages, require(`../i18n/en.json`));
      break;
  }
  return messages;
};

const initialState = {
  locale: 'hi',
  messages: setLanguage('hi')
};

export function intlData(state = initialState, action) {
// const intlData = (state = initialState, action) => {
  if (action === undefined) return state;
  switch (action.type) {
    case 'UPDATE_LANGUAGE':
      return {
        locale: action.language,
        messages: setLanguage(action.language)
      };
    default:
      return state;
  }
};
// export default intlData;