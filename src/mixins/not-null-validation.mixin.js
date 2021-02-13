export default {

  data: () => ({
    notNull: value => value != null || 'This field should not be empty'
  })

};
