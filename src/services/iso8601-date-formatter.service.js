export default {

  formatDate (date) {
    function twoSignsFormatter (num) {
      return num >= 10 ? num : `0${num}`;
    }

    return `${date.getFullYear()}-${twoSignsFormatter(date.getMonth() + 1)}-${twoSignsFormatter(date.getDate())}`;
  }

};
