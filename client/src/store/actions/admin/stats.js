import axios from "axios";
import createConfig from '../../helpers/api-auth';


export default {
    async fetchStoreStatsAdmin(context) {
      try {
        if (!context.state.adminStoreStats) {
          const res = await axios.get('/api/v1/admin/stats', createConfig());
          if (res.data.stats) {
            context.commit('SET_ADMIN_STORE_STATS', res.data.stats);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
}