const proxyServer =
  process.env.PROXY_SERVER ||
  ' https://cpcyqroq25awppsotsqmjsaybi.appsync-api.eu-west-1.amazonaws.com/graphql ';

export const generate2fa = async (address: string) => {
  try {
    const res = await fetch(proxyServer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'da2-pg2z5surgjfmtlg7jcwnpn77he',
      },
      body: JSON.stringify({
        query: `
        query {
          getSecretById(userId: "${address}") {
            secret,
            iExecPubKey
          }
        }
    `,
      }),
    }).then((r) => r.json());

    return res
  } catch (e) {
    console.error(e);
    throw new Error('An error occured while sending TOTP');
  }
};
