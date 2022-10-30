const proxyServer =
  process.env.PROXY_SERVER ||
  ' https://cpcyqroq25awppsotsqmjsaybi.appsync-api.eu-west-1.amazonaws.com/graphql ';


export const verify2fa = async (userId: string, code: string) => {
  const res = await fetch(proxyServer, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'da2-pg2z5surgjfmtlg7jcwnpn77he',
    },
    body: JSON.stringify({
      query: `
        query {
          checkSecret(
            userId: "${userId}",
            totp: "${code}",
            checkAndSign: false'
        )
        }
    `,
    }),
  }).then((r) => r.json());

  return res;
};
