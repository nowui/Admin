import fetch from 'dva/fetch';
import {message} from 'antd';

import constant from '../constant/constant';

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
      'Token': 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE0ODE5OTE3MjIsImV4cCI6MTQ4MzAzMDk1MSwiYXV0aG9yaXphdGlvbl9pZCI6ImY0YmE2Y2IzMjc2MzRiN2VhMjBmMDMzMjljNWQ3MDhjIiwidXNlcl9pZCI6IjAwZTYwMGEwYTdkZTRkMTU4MDk4ZTU0OTgyNjA4NTk4In0.IB2q8Ii6QBSIpvnNFkliDxPLhEwwp1WxAxPcmasMGVh2le8vlgakakrianr4xOZ1u7LeTVzGdWzI6CJ5kcrajg',
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
