# IExec 2FA transaction validator
### deployed app address: 0x0B9d561E978d8D788135575662e690DA5B6ECEa3

This is the Iexec app that validates transactions using time based 2FA.

## how to use?

### initializing Iexec env

from root directory:

```npm i -g iexec```  

```iexec init --skip-wallet```

```iexec storage init --chain bellecour```

```iexec app init``` - answer "n" to avoid replacing the iexec.json

```iexec.json``` - the most important file, Iexec app configuration for 
the successful deploy and execution. Don't look at the container name in this 
file in the repo. With this configuration you will deploy a valid
iexec app for TOTP validation with "ETHPRICE" as key

### deploy app by yourself

```iexec app deploy --chain bellecour```

```iexec app show --chain bellecour```

### now it's time to set up the authenticator

Application has 2 methods:
- setup
- signature

to setup the authenticator, you have to get a secret code for your account.
You can get it by calling:

```shell
exec app run --args "setup" --watch --chain bellecour
```

```bash
iexec app run --args "signature 234124" --watch --chain bellecour
```

to check the output:
```shell
iexec task show <taskid> --download my-app-result --chain bellecour  \
    && unzip my-app-result.zip -d my-app-result
```
