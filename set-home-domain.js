var StellarSdk = require("stellar-sdk");
var server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

// Keys for issuing account
var issuingKeys = StellarSdk.Keypair.fromSecret(
  "SCPOGNL7VR4D6KR2MSB5XUM7WUYPLHQ5R7K46G5JG5U63WG2WCCNDPCZ"
);

server
  .loadAccount(issuingKeys.publicKey())
  .then(function (issuer) {
    var transaction = new StellarSdk.TransactionBuilder(issuer, {
      fee: 100,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.setOptions({
          homeDomain: "issue-an-asset.vercel.com",
        })
      )
      // setTimeout is required for a transaction
      .setTimeout(100)
      .build();
    transaction.sign(issuingKeys);
    return server.submitTransaction(transaction);
  })
  .then(console.log)
  .catch(function (error) {
    console.error("Error!", error);
  });
