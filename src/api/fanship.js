/* eslint-disable no-empty */
import moment from 'moment';

function unpack(res) {
  return res.data.data;
}

function packToken(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

export default function initializeFanshipApi({ axios, getTokenSilently }) {
  async function fetchUserState() {
    const token = await getTokenSilently();
    const { state } = await axios
      .get('/profile/state', packToken(token))
      .then(unpack);
    return state;
  }

  return {
    /**
     * Search books with pagination
     * @param {object} params {searchString, page, itemsPerPage, filters}
     */
    async fetchBooks(params) {
      return axios.get('/browse/books', { params }).then(unpack);
    },

    /**
     * Get books by profile ID (with recommend link)
     * @param {object} params {searchString, page, itemsPerPage, filters}
     */
    async fetchBooksByProfileId(id) {
      return axios.get(`/books/by-profile/${id}`).then(unpack);
    },

    /**
     * Fetch a single book by id
     * @param {string} id
     */
    fetchBook(id) {
      return axios.get(`/browse/books/${id}`).then(unpack);
    },

    async isBookRecommended(bookId) {
      let auth = null;
      try {
        const token = await getTokenSilently();
        auth = packToken(token);
      } catch (err) {}
      return axios
        .get(`/browse/books/${bookId}/is_recommended`, auth)
        .then(unpack);
    },

    /**
     * Fetch all book categories
     */
    fetchCategories() {
      return axios.get('/browse/categories').then(unpack);
    },

    /**
     * Fetch all the countries we support
     */
    fetchCountries() {
      return axios.get('/countries').then(unpack);
    },

    /**
     * Fetch all authors
     */
    fetchAuthors() {
      return axios.get('/browse/authors').then(unpack);
    },

    /**
     * Fetch all publishers
     */
    fetchPublishers() {
      return axios.get('/browse/publishers').then(unpack);
    },

    /**
     * @param {int} authorId
     */
    async fetchAuthorDetails(authorId) {
      return axios.get(`/browse/authors/${authorId}`).then(unpack);
    },

    /**
     * Fetch orders for the current users (userId found in token)
     */
    async fetchOrders() {
      const token = await getTokenSilently();
      return axios.get('/fans/orders', packToken(token)).then(unpack);
    },

    /**
     * Fetch a single order by it's ID
     * @param {int} orderId
     */
    async fetchOrdersById(orderId) {
      const token = await getTokenSilently();
      return axios
        .get(`/fans/orders/${orderId}`, packToken(token))
        .then(unpack);
    },

    /**
     * Fetch payment history for current user
     */
    async fetchPaymentHistory() {
      const token = await getTokenSilently();
      return axios
        .get('/creators/payment_history', packToken(token))
        .then(unpack);
    },

    /**
     * Fetch a single order by its ID
     * @param {int} orderId
     */
    async fetchOrderById(orderId) {
      const token = await getTokenSilently();
      return axios
        .get(`/fans/orders/${orderId}`, packToken(token))
        .then(unpack);
    },

    /**
     * Create a new recommondation
     * @param {int} bookId
     */
    async createRecomendation(bookId) {
      const token = await getTokenSilently();
      const body = { bookId };
      return axios
        .put('/fans/recommendations', body, packToken(token))
        .then(unpack);
    },

    async createRecommendationHit(recId, recHitId) {
      let auth = null;
      try {
        const token = await getTokenSilently();
        auth = packToken(token);
      } catch (err) {}
      const body = { recId, recHitId };
      return axios.post('/recommendation_hits', body, auth).then(unpack);
    },

    async fetchReceivedRecommendations() {
      const token = await getTokenSilently();
      return axios
        .get('/fans/recommendation_hits', packToken(token))
        .then(unpack);
    },

    /**
     * Fetch all profiles for a creator
     */
    async fetchCreatorProfiles() {
      const token = await getTokenSilently();
      return axios.get(`/creator-profiles`, packToken(token)).then(unpack);
    },

    /**
     * Fetch an individual profile for the current user
     * @param {string} id
     */
    async fetchCreatorProfile(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/creator-profiles/${id}`, packToken(token))
        .then(unpack);
    },

    /**
     * Request to update a creator profile
     * @param {object} profile
     */
    async updateProfile(profile) {
      const token = await getTokenSilently();
      const body = { ...profile };
      return axios
        .put(`/creator-profiles/${profile.id}`, body, packToken(token))
        .then(unpack);
    },

    /**
     * Request to update a creator profile
     * @param {object} profile
     */
    async updateFanProfile(form) {
      const token = await getTokenSilently();
      const body = { profile: { form } };
      return axios.put('/profile', body, packToken(token)).then(unpack);
    },

    /**
     * Request to create a creator profile
     * @param {object} profile
     */
    async createCreatorProfile(profile) {
      const token = await getTokenSilently();
      const body = { ...profile };
      return axios
        .post(`/creator-profiles`, body, packToken(token))
        .then(unpack);
    },

    /**
     * Search profile for admin
     * @param {object} profile
     */
    async fetchProfilesForAdmin(searchTerm) {
      const token = await getTokenSilently();
      return axios
        .get(
          `/admin/creator-profiles?searchTerm=${searchTerm}`,
          packToken(token),
        )
        .then(unpack);
    },

    /**
     * Request an individual profile request
     * @param {string} id
     */
    async fetchBookProfile(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/book-contributors/${id}`, packToken(token))
        .then(unpack);
    },

    /**
     * Create a new request for book access
     * @param {object} request
     */
    async createBookProfileRequest(request) {
      const token = await getTokenSilently();
      const body = { ...request };
      return axios
        .post(`/book-contributors`, body, packToken(token))
        .then(unpack);
    },

    /**
     * Admin endpoint to fetch profile requests
     * @param {string} status (PENDING, APPROVED, REJECTED, ALL)
     */
    async fetchAdminBookProfileRequests(status) {
      const token = await getTokenSilently();
      return axios
        .get(`/admin/book-contributors?status=${status}`, packToken(token))
        .then(unpack);
    },

    /**
     * Approve or reject a profile request
     * @param {int} profileId
     * @param {int} bookId
     * @param {int} alId
     * @param {string} status APPROVED or REJECT
     * @param {string} comment
     */
    async adminUpdateProfileRequestStatus(
      profileId,
      bookId,
      alId,
      status,
      comment,
    ) {
      const token = await getTokenSilently();
      const body = { profileId, bookId, alId, status, comment };
      return axios
        .put(`/admin/book-contributors`, body, packToken(token))
        .then(unpack);
    },

    /**
     * Create a profile match, auto approved
     * @param {int} profileId
     * @param {int} bookId
     * @param {string} alId
     */
    async adminAddProfileToBook({ profileId, bookId, alId }) {
      const token = await getTokenSilently();
      const body = { profileId, bookId, alId };
      return axios
        .post(`/admin/book-contributors`, body, packToken(token))
        .then(unpack);
    },

    /**
     * Old profile endpoint, should really be my account
     * @param {Object} profile
     */
    async createProfile(profile) {
      const token = await getTokenSilently();
      return axios.put('/profile', { profile }, packToken(token)).then(unpack);
    },

    async resendVerificationEmail() {
      const token = await getTokenSilently();
      return axios
        .post('/profile/resend_verification', {}, packToken(token))
        .then(unpack);
    },

    async fetchMyRecommendations() {
      const token = await getTokenSilently();
      return axios.get('/fans/recommendations', packToken(token)).then(unpack);
    },

    async createReport({ type, startDate, endDate }) {
      const token = await getTokenSilently();
      return axios
        .get('/admin/platform_reports', {
          params: {
            type,
            startDate: moment(startDate).unix(),
            endDate: moment(endDate).unix(),
          },
          ...packToken(token),
        })
        .then(unpack);
    },

    async fetchAdminAnalytics() {
      const token = await getTokenSilently();
      return axios.get(`/admin/analytics`, packToken(token)).then(unpack);
    },

    async fetchCharities() {
      const token = await getTokenSilently();
      return axios.get('/admin/charities', packToken(token)).then(unpack);
    },

    async fetchCharity(id) {
      const token = await getTokenSilently();
      return axios.get(`/admin/charities/${id}`, packToken(token)).then(unpack);
    },

    async fetchForUserCharities() {
      const token = await getTokenSilently();
      return axios.get('/browse/charities', packToken(token)).then(unpack);
    },

    async createNewCharity(charity) {
      const token = await getTokenSilently();
      return axios
        .post('/admin/charities', charity, packToken(token))
        .then(unpack);
    },

    async updateCharity(userId, charity) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/charities/${userId}`, charity, packToken(token))
        .then(unpack);
    },

    /* Promo codes */
    async applyPromoCode(promoCode) {
      const token = await getTokenSilently();
      return axios
        .post(`/promo_codes`, { code: promoCode }, packToken(token))
        .then(unpack);
    },

    async fetchPromoCodes() {
      const token = await getTokenSilently();
      return axios.get('/admin/promo_codes', packToken(token)).then(unpack);
    },

    async fetchPromoCode(code) {
      const token = await getTokenSilently();
      return axios
        .get(`/admin/promo_codes/${code}`, packToken(token))
        .then(unpack);
    },

    async createNewPromoCode(promoCode) {
      const token = await getTokenSilently();
      return axios
        .post('/admin/promo_codes', promoCode, packToken(token))
        .then(unpack);
    },

    async updatePromoCode(promoCode) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/promo_codes/${promoCode.id}`, promoCode, packToken(token))
        .then(unpack);
    },

    async donateUserCharity(userId, donationValue) {
      const token = await getTokenSilently();
      return axios
        .post(`/fans/donations/${userId}`, { donationValue }, packToken(token))
        .then(unpack);
    },

    async fetchCreatorBooks(
      page,
      limit,
      orderBy,
      direction,
      searchTerm,
      filter,
    ) {
      const token = await getTokenSilently();
      return axios
        .get(
          `/creators/books?page=${page}&itemsPerPage=${limit}&orderBy=${orderBy}&direction=${direction}&searchTerm=${searchTerm}&filter=${filter}`,
          packToken(token),
        )
        .then(unpack);
    },

    /**
     * Fetch all profiles for a creator
     */
    async fetchBooksByMatchingProfile(
      page,
      limit,
      orderBy,
      direction,
      searchTerm,
      filter,
    ) {
      const token = await getTokenSilently();
      return axios
        .get(
          `/book-contributors?page=${page}&itemsPerPage=${limit}&orderBy=${orderBy}&direction=${direction}&searchTerm=${searchTerm}&filter=${filter}`,
          packToken(token),
        )
        .then(unpack);
    },

    async fetchAdminBook(id) {
      const token = await getTokenSilently();
      return axios.get(`/admin/books/${id}`, packToken(token)).then(unpack);
    },

    async fetchOneCreatorBook(id) {
      const token = await getTokenSilently();
      return axios.get(`/creators/books/${id}`, packToken(token)).then(unpack);
    },

    async createBook(payload, skipCheck) {
      const token = await getTokenSilently();
      let api = '/creators/books';
      api = skipCheck ? `${api}?skipCheck=yes` : api;
      return axios({
        method: 'post',
        url: api,
        data: payload,
        ...packToken(token),
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
      });
    },

    async checkBooks(isbn) {
      const token = await getTokenSilently();
      return axios
        .get(`/browse/checkbooks?${isbn}`, packToken(token))
        .then(unpack);
    },

    async updateBook(id, book, skipCheck) {
      const token = await getTokenSilently();
      let api = `/creators/books/${id}`;
      api = skipCheck ? `${api}?skipCheck=yes` : api;
      return axios.patch(api, { book }, packToken(token)).then(unpack);
    },

    async createRoyaltyContract(bookId, royaltyContract) {
      const token = await getTokenSilently();
      return axios
        .post(
          `/creators/books/${bookId}/royalty_contract`,
          { royaltyContract },
          packToken(token),
        )
        .then(unpack);
    },

    async fetchRoyaltyContract(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/creators/royalty_contract/${id}`, packToken(token))
        .then(unpack);
    },

    async fetchRoyaltyContractForBook(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/creators/books/${id}/royalty_contract`, packToken(token))
        .then(unpack);
    },

    async fetchRoyaltyShares() {
      const token = await getTokenSilently();
      return axios
        .get('/creators/royalty_shares', packToken(token))
        .then(unpack);
    },

    async fetchCreatorsForSearch() {
      const token = await getTokenSilently();
      return axios.get('/creators', packToken(token)).then(unpack);
    },

    async fetchRightholdersForSearch(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/creators/books/${id}/rightholders`, packToken(token))
        .then(unpack);
    },

    async updateRoyaltyShare(id, status) {
      const token = await getTokenSilently();
      return axios
        .put(`/creators/royalty_shares/${id}`, { status }, packToken(token))
        .then(unpack);
    },

    async enableBookForSale(id) {
      const token = await getTokenSilently();
      return axios
        .put(`/creators/books/${id}/enable`, {}, packToken(token))
        .then(unpack);
    },

    async disableBookForSale(id) {
      const token = await getTokenSilently();
      return axios
        .put(`/creators/books/${id}/disable`, {}, packToken(token))
        .then(unpack);
    },

    async fetchProfile() {
      const token = await getTokenSilently();
      return axios.get('/profile', packToken(token)).then(unpack);
    },

    async setNotificationsEnabled(notificationsEnabled) {
      const token = await getTokenSilently();
      return axios
        .put(
          `/profile/notifications_enabled`,
          { notificationsEnabled },
          packToken(token),
        )
        .then(unpack);
    },

    // Don't use, this will time out
    async fetchAdminAllUsers() {
      const token = await getTokenSilently();
      return axios.get('/admin/users', packToken(token)).then(unpack);
    },

    async fetchAdminAllUsersAdmins() {
      const token = await getTokenSilently();
      return axios.get('/admin/users/admins', packToken(token)).then(unpack);
    },

    async fetchAdminAllUsersFans() {
      const token = await getTokenSilently();
      return axios.get('/admin/users/fans', packToken(token)).then(unpack);
    },

    async requestAdminRoles() {
      const token = await getTokenSilently();
      return axios
        .put('/profile/admin_request', {}, packToken(token))
        .then(unpack);
    },

    async fetchAdminRequests() {
      const token = await getTokenSilently();
      return axios
        .get('/admin/users/admin_requests', packToken(token))
        .then(unpack);
    },

    async updateUserVerification(id, isVerified) {
      const token = await getTokenSilently();
      return axios
        .put(
          `/admin/users/${id}/verification`,
          { isVerified },
          packToken(token),
        )
        .then(unpack);
    },

    async updateUserOnboarded() {
      const token = await getTokenSilently();
      return axios.put(`/profile/onboarded`, {}, packToken(token)).then(unpack);
    },

    async updateUserSuspension(id, isSuspended) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/users/${id}/suspension`, { isSuspended }, packToken(token))
        .then(unpack);
    },

    async upsertAdminRoles(id, role) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/users/${id}/admin`, { role }, packToken(token))
        .then(unpack);
    },

    async fetchAdminDashboard() {
      const token = await getTokenSilently();
      return axios.get('/admin/dashboard', packToken(token)).then(unpack);
    },

    // Endpoints related to the Creator Dashboard
    async fetchCreatorDashboard() {
      const token = await getTokenSilently();
      return axios.get('/creators/dashboard', packToken(token)).then(unpack);
    },

    async fetchCreatorDashboardBooksByTitle(title) {
      const token = await getTokenSilently();
      return axios
        .get(
          `/creators/dashboard/books/bytitle?query=${title}`,
          packToken(token),
        )
        .then(unpack);
    },

    async fetchCreatorDashboardBooksByType(type, page, itemsPerPage, keyword) {
      const token = await getTokenSilently();
      return axios
        .get(
          `/creators/dashboard/books/bytype/${type}?page=${page +
            1}&itemsPerPage=${itemsPerPage}&query=${keyword}`,
          packToken(token),
        )
        .then(unpack);
    },

    async fetchCreatorDashboardAnalytics(id) {
      const token = await getTokenSilently();
      if (id)
        return axios
          .get(`/creators/analytics/${id}`, packToken(token))
          .then(unpack);

      return axios.get(`/creators/analytics/`, packToken(token)).then(unpack);
    },

    async uploadKyc(kyc) {
      const token = await getTokenSilently();
      return axios
        .post('/creators/kyc', { kyc }, packToken(token))
        .then(unpack);
    },

    async fetchKycForOrg() {
      const token = await getTokenSilently();
      return axios.get('/creators/kyc', packToken(token)).then(unpack);
    },

    // remove /kyc
    async fetchKyc() {
      const token = await getTokenSilently();
      return axios.get('/admin/rightholders', packToken(token)).then(unpack);
    },

    async fetchRightHolder(id) {
      const token = await getTokenSilently();
      return axios
        .get(`/admin/rightholder/${id}`, packToken(token))
        .then(unpack);
    },

    async fetchFans() {
      const token = await getTokenSilently();
      return axios.get('/admin/fans', packToken(token)).then(unpack);
    },

    async updateKyc(id, status) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/kyc/${id}`, { status }, packToken(token))
        .then(unpack);
    },

    async updateLimitedAccess(accessToken) {
      const token = await getTokenSilently();
      const body = { token: accessToken };
      return axios
        .post('/profile/access-token', body, packToken(token))
        .then(unpack);
    },

    async updateFanStatus(id, isSuspended) {
      const token = await getTokenSilently();
      return axios
        .put(`/admin/users/${id}/suspension`, { isSuspended }, packToken(token))
        .then(unpack);
    },

    async fetchTreeViewForCreator(bookId) {
      const token = await getTokenSilently();
      return axios
        .get(`/creators/books/${bookId}/tree_view`, packToken(token))
        .then(unpack);
    },

    async fetchTreeViewForFan(recId) {
      const token = await getTokenSilently();
      return axios
        .get(`/fans/recommendations/${recId}/tree_view`, packToken(token))
        .then(unpack);
    },

    async fetchMyRatingForBook(bookId) {
      const token = await getTokenSilently();
      return axios
        .get(`/fans/books/${bookId}/rating`, packToken(token))
        .then(unpack);
    },

    async updateBookRatings(bookId, rating) {
      const token = await getTokenSilently();
      const body = { rating };
      return axios
        .put(`/fans/books/${bookId}/ratings`, body, packToken(token))
        .then(unpack);
    },

    async usernameAvailable(username) {
      const token = await getTokenSilently();
      return axios
        .get('/profile/username_available', {
          params: {
            username,
          },
          ...packToken(token),
        })
        .then(unpack);
    },

    async deactivateAccount(isSuspended) {
      const token = await getTokenSilently();
      return axios
        .post(
          '/profile/deactivate',
          {
            isSuspended,
          },
          packToken(token),
        )
        .then(unpack);
    },

    async devPurgeUserState(userId) {
      const token = await getTokenSilently();
      const body = {};
      if (userId) body.userId = userId;
      return axios
        .post('/admin/purge_user_state', body, packToken(token))
        .then(unpack);
    },

    async verifyCreatorPlaid(publicToken, accountId) {
      const token = await getTokenSilently();
      return axios
        .put('/creators/plaid', { publicToken, accountId }, packToken(token))
        .then(unpack);
    },

    fetchUserState,

    async fetchCartState() {
      return fetchUserState();
    },

    async setCartState(newState) {
      const token = await getTokenSilently();

      const oldState = await fetchUserState();
      const state = Object.assign({}, oldState, newState);

      return axios
        .put('/profile/state', { state }, packToken(token))
        .then(unpack);
    },

    async generateDiscountCode(bookId) {
      const token = await getTokenSilently();
      const body = { bookId };
      return axios.post('/fans/discounts', body, packToken(token)).then(unpack);
    },

    async fetchCreatorAnalytics(bookId) {
      const token = await getTokenSilently();
      return axios
        .get(`/creators/analytics/${bookId}`, packToken(token))
        .then(unpack);
    },

    async fetchPaymentInfo() {
      const token = await getTokenSilently();
      return axios.get('/creators/payment_info', packToken(token)).then(unpack);
    },

    async setPaymentInfo(info) {
      const token = await getTokenSilently();
      return axios
        .put('/creators/payment_info', info, packToken(token))
        .then(unpack);
    },

    async fetchWithdrawals() {
      const token = await getTokenSilently();
      return axios.get('/creators/withdrawals', packToken(token)).then(unpack);
    },

    async createPaymentRecord(payload) {
      const token = await getTokenSilently();
      return axios
        .post('/admin/payment', payload, packToken(token))
        .then(unpack);
    },

    async fetchBalancesAdmin() {
      const token = await getTokenSilently();
      return axios.get('/admin/balances', packToken(token)).then(unpack);
    },

    async fetchPaymentHistoryAdmin() {
      const token = await getTokenSilently();
      return axios.get('/admin/payment_history', packToken(token)).then(unpack);
    },
  };
}
