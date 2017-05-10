/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS } from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
      console.log("I am in getRepos")
      const socket = new WebSocket("ws://" + '127.0.0.1:8000' + "/chat/");
      console.log("I am starting socket")
      socket.onmessage = (e) => {
            console.log(e.data);
      }
      console.log("I have attached onmessage")
            //yield put(reposLoaded([e.data], '')
      socket.onopen = function() {
        console.log("want to subscribe")
            socket.send("subscribe");
      }
      // Call onopen directly if socket is already open
      if (socket.readyState == WebSocket.OPEN) socket.onopen();
  /*try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
  */
}

/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_REPOS, getRepos);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
