/* eslint no-use-before-define:0 */
const _ = require('lodash');
const config = require('../config');
const querystring = require('querystring');
// const HttpProxyAgent = require('http-proxy-agent');

const pricingUrl = config.skyscannerApi + 'apiservices/pricing/v1.0';

const maxRetries = 3;
const maxPollTime = 15 * 1000;
const pollDelay = 1000;

let cachedData = {};

/**
  Rough implementation of live pricing api client, as per
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingList
*/

class LivePricing {

  constructor(searchParams) {
    this.searchParams = searchParams;
  }

  get livePricing() {
    return {
      api: {
        createSession: (params) => {
          return fetch(pricingUrl + `?apikey=${config.apiKey}`, {
            method: 'POST',
            body: this.sessionParams(params),
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            // uncomment if you'd like to use a development proxy (e.g. Charles or Fiddler)
            // agent: new HttpProxyAgent({
            //   host: 'localhost',
            //   port: '8888'
            // })
          })
        },
        pollSession: (creds) => {
          return fetch(pricingUrl + `/${creds.sessionKey}?apiKey=${config.apiKey}` +
            `&pageIndex=0&pageSize=${this.searchParams.pageSize}`, {
              method: 'GET'
              // uncomment if you'd like to use a development proxy (e.g. Charles or Fiddler)
              // agent: new HttpProxyAgent({
              //   host: 'localhost',
              //   port: '8888'
              // })
            })
        }
      }
    }
  };

  createSession(params) {
    console.log('creating session...');

    return new Promise((resolve, reject) => {
      this.livePricing.api.createSession(params)
        .then((response) => {
          if (response.status !== 201) {
            console.error(response.status, 'something went wrong...')
            return response.json()
              .then(console.error);
          } else {
            // session created
            _.delay(() => {
              resolve({
                location: response.headers.get('location'),
                response: response.json()
              });
            }, pollDelay);
          }

        })
        .catch(reject);
    });
  }

  startPolling(session) {
    const location = session.location;
    const sessionKey = location.substring(location.lastIndexOf('/') + 1);

    console.log('session created.');

    return new Promise((resolve, reject) => {
      // encapsulation of polling state to pass around
      const pollState = {
        creds: { sessionKey: sessionKey },
        finished: false,
        onFinished: resolve,
        onError: reject,
        timedOut: false,
        tries: 0
      };

      pollState.success = _.partial(this.pollSuccess, pollState);
      pollState.error = _.partial(this.pollError, pollState);

      pollState.repoll = () => {
        _.delay(() => {
          this.poll(pollState);
        }, pollDelay);
      };

      // overall timeout - don't wait too long for complete results
      setTimeout(() => {
        pollState.timedOut = true;
      }, maxPollTime);

      this.poll(pollState);
    });
  }

  poll(state) {
    if (state.finished) {
      return;
    }

    // auto-repoll if nothing happens for a while
    const backupTimer = setTimeout(() => {
      state.repoll();
    }, pollDelay * 3);

    console.log('polling...')

    this.livePricing.api.pollSession(state.creds)
      .then((response) => {
        clearTimeout(backupTimer);

        if (response.status === 304) {
          return cachedData;
        }
        return response.json();
      })
      .then((data) => {
        cachedData = data;
        state.success(data);
      })
      .catch(state.err);
  }

  pollSuccess(state, data) {
    if (state.finished) {
      return;
    }
    if (data.Status === 'UpdatesComplete' || state.timedOut) {
      console.log('polling complete');
      state.finished = true;
      return state.onFinished(data);
    }
    state.repoll();
  }

  // Not implemented: error handling by response code
  pollError(state, err) {
    state.tries++;
    if (!state.timedOut && state.tries < maxRetries) {
      return state.repoll();
    }
    state.onError(err);
  }

  sessionParams(query) {
    return querystring.stringify({
      apiKey: config.apiKey,
      adults: query.adults,
      cabinclass: query.class,
      country: 'UK',
      currency: 'GBP',
      destinationplace: query.toPlace,
      inbounddate: query.toDate,
      locale: 'en-GB',
      locationschema: 'Sky',
      originplace: query.fromPlace,
      outbounddate: query.fromDate
    });
  }

  search() {
    return new Promise((resolve, reject) => {
      this.createSession(this.searchParams)
        .then((session) => {
          return this.startPolling(session)
        })
        .then(resolve)
        .catch(reject);
    });
  };
}

module.exports = LivePricing;
