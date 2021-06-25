import Router from 'next/router';

export default function redirect (res, target) {
  if (res) {
    // server
    // 303:"see other"
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    Router.push(target);
  }
};