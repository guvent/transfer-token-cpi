### Transfer CPI Token Learn...

#### Project setup..

```
anchor check
```

#### Unit test on devnet

```
anchor build

anchor test

or

anchor run test -- --skip-local-valitador
```

---

#### Modified project environment (localnet to devnet)

* ./Anchor.toml

```
[programs.devnet] <- changed .localnet to .devnet
```
```
cluster = "devnet" <- changed localnet to devnet
```

* ./programs/transfer-token-cpi/Cargo.toml

```
[dependencies]
anchor-lang = "0.29.0"
anchor-spl = "0.29.0" <- added this line..
```

---

#### Test Result 1

* Program ID: 8eMr4GobsfuPfJAq2eqpBz5uAZuHkx77RFSHiYJWWSpU

```
Finished release [optimized] target(s) in 0.31s

warning: the following packages contain code that will be rejected by a future version of Rust: libc v0.2.150
note: to see what the problems were, use the option `--future-incompat-report`, or run `cargo report future-incompatibilities --id 6`
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/<username>/.config/solana/id.json
Deploying program "transfer_token_cpi"...
Program path: /Users/<username>/RustroverProjects/transfer-token-cpi/target/deploy/transfer_token_cpi.so...

Program Id: 8eMr4GobsfuPfJAq2eqpBz5uAZuHkx77RFSHiYJWWSpU

Deploy success

Found a 'test' script in the Anchor.toml. Running it as a test suite!

Running test suite: "/Users/<username>/RustroverProjects/transfer-token-cpi/Anchor.toml"

yarn run v1.22.19
warning package.json: No license field
$ /Users/<username>/RustroverProjects/transfer-token-cpi/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  token-cpi
token balance {
  context: { apiVersion: '1.16.18', slot: 256358515 },
  value: { amount: '2000000', decimals: 6, uiAmount: 2, uiAmountString: '2' }
}
    ✔ setup mints and token accounts (1849ms)
sender token bal {
  context: { apiVersion: '1.16.18', slot: 256358516 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
receiver token bal {
  context: { apiVersion: '1.16.18', slot: 256358516 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
    ✔ transfer tokens (421ms)


  2 passing (2s)

✨  Done in 3.55s.
```

#### Test Result 2

* Program ID: 8eMr4GobsfuPfJAq2eqpBz5uAZuHkx77RFSHiYJWWSpU

```
Finished release [optimized] target(s) in 0.38s

warning: the following packages contain code that will be rejected by a future version of Rust: libc v0.2.150
note: to see what the problems were, use the option `--future-incompat-report`, or run `cargo report future-incompatibilities --id 7`
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/<username>/.config/solana/id.json
Deploying program "transfer_token_cpi"...
Program path: /Users/<username>/RustroverProjects/transfer-token-cpi/target/deploy/transfer_token_cpi.so...

Program Id: 8eMr4GobsfuPfJAq2eqpBz5uAZuHkx77RFSHiYJWWSpU

Deploy success

Found a 'test' script in the Anchor.toml. Running it as a test suite!

Running test suite: "/Users/<username>/RustroverProjects/transfer-token-cpi/Anchor.toml"

yarn run v1.22.19
warning package.json: No license field
$ /Users/<username>/RustroverProjects/transfer-token-cpi/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  token-cpi
token balance {
  context: { apiVersion: '1.16.18', slot: 256361221 },
  value: { amount: '2000000', decimals: 6, uiAmount: 2, uiAmountString: '2' }
}
    ✔ setup mints and token accounts (2489ms)
sender token bal {
  context: { apiVersion: '1.16.18', slot: 256361223 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
receiver token bal {
  context: { apiVersion: '1.16.18', slot: 256361223 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
    ✔ transfer tokens (807ms)


  2 passing (3s)

✨  Done in 4.61s.

```

### Burn Test Result

```
Deploying cluster: https://api.devnet.solana.com
Upgrade authority: /Users/<username>/.config/solana/id.json
Deploying program "transfer_token_cpi"...
Program path: /Users/<username>/RustroverProjects/transfer-token-cpi/target/deploy/transfer_token_cpi.so...
Blockhash expired. 4 retries remaining
Program Id: 8eMr4GobsfuPfJAq2eqpBz5uAZuHkx77RFSHiYJWWSpU

Deploy success

Found a 'test' script in the Anchor.toml. Running it as a test suite!

Running test suite: "/Users/<username>/RustroverProjects/transfer-token-cpi/Anchor.toml"

yarn run v1.22.19
warning package.json: No license field
$ /Users/<username>/RustroverProjects/transfer-token-cpi/node_modules/.bin/ts-mocha -p ./tsconfig.json -t 1000000 'tests/**/*.ts'


  token-cpi
token balance {
  context: { apiVersion: '1.16.18', slot: 256811294 },
  value: { amount: '2000000', decimals: 6, uiAmount: 2, uiAmountString: '2' }
}
    ✔ setup mints and token accounts (1986ms)
sender token bal {
  context: { apiVersion: '1.16.18', slot: 256811295 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
receiver token bal {
  context: { apiVersion: '1.16.18', slot: 256811295 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
    ✔ transfer tokens (416ms)
sender token bal {
  context: { apiVersion: '1.16.18', slot: 256811296 },
  value: { amount: '0', decimals: 6, uiAmount: 0, uiAmountString: '0' }
}
receiver token bal {
  context: { apiVersion: '1.16.18', slot: 256811296 },
  value: { amount: '1000000', decimals: 6, uiAmount: 1, uiAmountString: '1' }
}
    ✔ burn tokens (374ms)


  3 passing (3s)

✨  Done in 4.05s.

```

Good luck :)
