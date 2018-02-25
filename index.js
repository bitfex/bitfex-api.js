import fetch from 'node-fetch'

const host = 'https://bitfex.trade'

const request = (url, method = 'GET', body = undefined, headers = {}) => (
  fetch(host + url,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      } else {
        throw new Error(response.statusText || response.status)
      }
    })
)

const requestJSON = (url, method = 'GET', body = undefined, headers = {}) => (
  fetch(host + url,
    {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }
      if (response.status >= 400 && response.status < 500) {
        return response.json()
      }
      throw new Error(response.statusText || response.status)
    })
)

const jwtRequest = (token, url, method = 'GET', body = undefined) => request(url, method, body, { 'Authorization': `Bearer ${token}` })

const Api = {
  showNotice: (show, hide, delay = 5000) => show() && setTimeout(_ => { hide() }, delay),
  auth: ({ email, password }) => request('/auth', 'POST', { auth: { email, password } }),
  authMfa: ({ authToken, otp }) => request('/auth2fa', 'POST', { auth: { auth_token: authToken, otp } }),
  signUp: ({ email, password, username }) => requestJSON('/sign-up', 'POST', { user: { email, password, username } }),
  resetPassword: ({ email }) => request('/auth', 'PATCH', { auth: { email } }),
  loadHistory: ({ token }) => jwtRequest(token, '/api/v1/history'),
  loadCompletedOrders: ({ token, page, pair }) => jwtRequest(token, `/api/v1/orders/completed?page=${page}&pair=${pair}`),
  depositCode: ({ token, currency }) => jwtRequest(token, '/api/v1/deposit/new', 'POST', { deposit: { currency } }),
  withdraw: ({ token, currency, amount, to }) => jwtRequest(token, '/api/v1/withdrawal', 'POST', { withdraw: { currency, amount, to } }),
  orders: pair => request('/api/v1/orders' + (pair ? `?pair=${pair}` : '')),
  ordersMy: ({ token }) => jwtRequest(token, '/api/v1/orders/my'),
  chart: pair => request(`/api/v1/charts/${pair}`),
  charts: _ => request('/api/v1/charts'),
  volume: _ => request('/api/v1/volume'),
  updateUserData: ({ token }) => jwtRequest(token, '/api/v1/user'),
  getMfaProvisionUrl: ({ token }) => jwtRequest(token, '/api/v1/two_factor/new'),
  checkMfaCode: ({ token, code }) => jwtRequest(token, '/api/v1/two_factor', 'POST', { code }),
  disableMfa: ({ token }) => jwtRequest(token, '/api/v1/two_factor', 'DELETE', {}),
  deposit: ({ token, currency, amount }) => jwtRequest(token, '/api/v1/deposit', 'POST', { deposit: { currency, amount } }),
  chatLoad: _ => request('/api/v1/chat'),
  chatSend: ({ token, text }) => jwtRequest(token, '/api/v1/chat', 'POST', { text }),
  placeOrder: ({ token, pair, operation, amount, price }) => jwtRequest(token, '/api/v1/orders', 'POST', { order: { pair, operation, amount, price } }),
  cancelOrder: ({ token, id }) => jwtRequest(token, `/api/v1/orders/${id}`, 'DELETE', {}),
  dashboard: ({ token }) => jwtRequest(token, '/api/v1/dashboard'),
  checkUsersCount: ({ token, scope }) => jwtRequest(token, '/api/v1/mails/' + scope),
  sendMail: ({ token, scope, subject, content }) => jwtRequest(token, '/api/v1/mails?id=' + scope, 'POST', { subject, content }),
  reset: ({ password, passwordConfirmation, token }) => request('/reset', 'PATCH', { token, password, password_confirmation: passwordConfirmation }),
  createTradeApiKey: ({ token }) => jwtRequest(token, '/api/v1/trade_api_keys', 'POST'),
  leaders: _ => request('/api/v1/leaders'),
  roadmap: ({ token }) => token ? jwtRequest(token, '/api/v1/roadmap') : request('/api/v1/roadmap'),
  createRoadmapItem: ({ token, title, description }) => jwtRequest(token, '/api/v1/roadmap', 'POST', { title, description }),
  roadmapComments: ({ id }) => request(`/api/v1/roadmap/${id}/comments`),
  createRoadmapComment: ({ token, id, comment }) => jwtRequest(token, `/api/v1/roadmap/${id}/comments`, 'POST', { comment }),
  roadmapVote: ({ token, id }) => jwtRequest(token, `/api/v1/roadmap/${id}/votes`, 'POST')
}

export default Api
