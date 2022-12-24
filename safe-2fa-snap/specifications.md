## iExec 2fa specifications

### 2fa setup flow

1. User calls the setup method of the iExec app
   - The app generates a random 16 bytes secret to encrypt the user's secrets
   - The app generates a private key
   - The app generates a random 6-digit code
   - The app stores user's secrets and returns the 6-digit code and the public key
2. UI shows the generated QR code representing the next string: `otpauth://totp/De2FA?secret=${secret}&issuer=${issuer}`
3. User scans the QR code with the authenticator app to add the secret
4. User enters the 6-digit code from the authenticator app generated from the secret
5. UI calls Metamask to sign the transaction to create a new Safe contract with 2 addresses:
   - The first address is the user's address
   - The second address is the address of the private key generated in step 1


### 2fa verification flow
1. User goes to the dApp to execute a transaction
2. Metamask shows the confirmation page with the input field for the 6-digit code
3. User enters the 6-digit code from the authenticator app
4. Metamask creates a Safe transaction, signs it with the user's private key
5. Metamask calls the iExec app to verify the code
   - The app decrypts the user's secrets from IPFS using the secret generated in step 1 (setup flow)
   - The app generates a new 6-digit code from the secret (using the same TOTP algorithm as the authenticator app, with a time variable)
   - The app compares the generated code with the code from the user
   - If the codes are equal, the app signs the pending Safe transaction
