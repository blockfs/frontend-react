/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_BLOCKS, LOAD_BLOCKS_SUCCESS, LOAD_FILES } from 'containers/App/constants';
import { blocksLoaded, blocksLoadingError, filesLoaded, filesLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getBlocks() {
      console.log("I am in getBlocks")
      const socket = new WebSocket("ws://" + '127.0.0.1:8000' + "/chat/");
      console.log("I am starting socket")
      socket.onmessage = (e) => {
            console.log('RECEIVED BLOCKS IN GETBLOCKS');
            put(blocksLoaded(e.data));
      }
      console.log("I have attached onmessage");
            //yield put(reposLoaded([e.data], '')
      socket.onopen = function() {
        console.log("want to subscribe");
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

export function* setBlocks(blocks){
  //
}

export function* getFiles(){

  const username = yield select(makeSelectUsername());
  const requestURL = `http://127.0.0.1:8000/blockfs/rpc/`;
  try {
      let options =
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+btoa('root:blockseer')
          },
          body: JSON.stringify({
            cmd: 'ls',
            params: {path: '/'},
          })
        }
      const result = yield call(request, requestURL, options);
      const files = result.result

      // use rpc end point to get detailed info of the file
      for (var i = 0; i < files.length; i++) {
        if (files[i].type == 'd'){
          continue
        }
        options.body = JSON.stringify({
          cmd: 'read',
          params: {path: files[i].name},
        })
        let response = yield call(request, requestURL, options)
        files[i].info = response.result
      }
      // console.log('getFiles OK: ', files)
      yield put(filesLoaded(files));
    } catch (err) {
      // console.log("getFiles ERR: ", err)
      yield put(filesLoadingError(err));
    }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* blockchainData() {
  // Watches for LOAD_BLOCKS actions and calls getBlocks when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeEvery(LOAD_FILES, getFiles);

  // const watcher = yield takeEvery(LOAD_BLOCKS_SUCCESS, setBlocks);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  blockchainData,
];
