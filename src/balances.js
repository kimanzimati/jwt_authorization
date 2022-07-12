// This is important to patch the global `fetch`
import 'isomorphic-unfetch';
import { createClient } from '@urql/core';

// Note: you need to update this to your token
const token = 'stitch_access_token';
const urqlClient = createClient({
    url: 'https://api.stitch.money/graphql',
    fetchOptions: {
        method: 'POST',
        headers: {authorization: `Bearer ${token}`},
        credentials: 'include',
        mode: 'cors'
    }
});

const getBalancesQuery = `
query GetAccountBalances {
  user {
    bankAccounts {
      currentBalance
      availableBalance
      id
      name
    }
  }
}`;

async function getBalances() {
    const result = await urqlClient.query(getBalancesQuery).toPromise();

    if (result.error) {
        console.error(`Error ${result.error}`);
        return;
    }

    return result.data;
}

getBalances().then((result) => {
    console.log(result?.user.bankAccounts);
});