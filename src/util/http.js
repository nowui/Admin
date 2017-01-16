import fetch from 'dva/fetch';
import {message} from 'antd';

import constant from '../constant/constant';
import database from '../util/database';

const operation = (promise) => {
  let hasCanceled_ = false;
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });
  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export default function http(config) {
  const request = operation(fetch('http://localhost:8080/' + config.url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Token': database.getToken(),
      'Platform': 'WEB',
      'Version': '1.0.0'
    },
    method: 'POST',
    body: JSON.stringify(config.data)
  }));

  return {
    post() {
      request.promise.then(function (response) {
        if (response.status !== 200) {
          return;
        }
        response.json().then(function (json) {
          if (json.code == 200) {
            config.success(json);
          } else if (json.code == 404) {
            message.error('找不到该接口');
          } else {
            message.error(json.message);
          }

          config.complete();
        })
      }).catch(function (error) {
        message.error(constant.error);

        config.complete();
      });

      return request;
    },
    cancel() {
      request.cancel();
    },
  };
}
