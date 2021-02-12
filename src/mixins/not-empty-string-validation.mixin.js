export default {

  data: () => ({
    notEmpty: str => !!str.trim() || 'This field should not be empty'
  })

};
