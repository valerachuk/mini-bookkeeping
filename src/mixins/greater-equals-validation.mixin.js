export default {

  data: () => ({
    greaterEquals (min) {
      return value => +value >= min || `The value should be greater than ${min}`;
    }
  })

};
