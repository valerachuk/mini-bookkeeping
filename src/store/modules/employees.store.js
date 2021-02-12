import { pool } from '@/services/mysql.service';

export default {
  namespaced: true,
  state: {
    items: [],
    fields: []
  },
  mutations: {
    SET_ITEMS (state, items) {
      state.items = items;
    },
    SET_FIELDS (state, fields) {
      state.fields = fields;
    }
  },
  actions: {
    create (_, formValues) {
      pool.query('sql', []);
    },
    load ({ commit }) {
      pool.query('SELECT * FROM employees')
        .then(([result, fields]) => {
          commit('SET_ITEMS', result);
          commit('SET_FIELDS', fields.map(x => x.name));
        });
    },
    update (_, formValues) {
      pool.query('sql', []);
    },
    delete (_, id) {
      pool.query('DELETE FROM employees WHERE Id=?', [id]);
    }
  }
};
