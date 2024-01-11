module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    
    format_date: (date) => {
      
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
       
        new Date(date).getFullYear()
      }`;
    },
  };
  

const Handlebars = require('handlebars');

Handlebars.registerHelper('is_my_page', (currentPageUserId, loggedInUserId) => {
  return currentPageUserId === loggedInUserId;
});
