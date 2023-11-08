import * as anchor from "@coral-xyz/anchor";
import {Program} from "@coral-xyz/anchor";
import { TransferTokenCpi } from "../target/types/transfer_token_cpi";
import {Keypair, Transaction, SystemProgram} from "@solana/web3.js";

import {
    Token,
    TOKEN_PROGRAM_ID,
    MintLayout,
    AccountLayout,
} from "@solana/spl-token";

describe("token-cpi", async () => {
    anchor.setProvider(anchor.AnchorProvider.env());

    // Prepare program with contract (programs/src/lib.rs: transfer_token_cpi)
    const program = anchor.workspace.TransferTokenCpi as Program<TransferTokenCpi>;

    // set wallet with provider account...
    const providerPublicKey = program.provider.publicKey;

    // generate accounts for mint, sender, and receiver...
    const mint = Keypair.generate();
    const sender_token = Keypair.generate();
    const receiver = Keypair.generate();
    const receiver_token =Keypair.generate();

    it("setup mints and token accounts", async () => {
        /****** Tokens Mint *******/
        const mint_account = SystemProgram.createAccount({
            fromPubkey: providerPublicKey,
            newAccountPubkey: mint.publicKey,
            space: MintLayout.span,
            lamports: await Token.getMinBalanceRentForExemptMint(
                program.provider.connection
            ),
            programId: TOKEN_PROGRAM_ID
        });

        let create_mint_tx = new Transaction().add(
            mint_account,
            Token.createInitMintInstruction(
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                6, // decimals
                providerPublicKey, // mint authority
                providerPublicKey // freeze authority (if you don't need it, you can set `null`)
            )
        );

        await program.provider.sendAndConfirm(create_mint_tx, [mint]);
        /****** Tokens Mint *******/

        /**************************/

        /****** Send Tokens *******/
        const sender_account = SystemProgram.createAccount({
            fromPubkey: providerPublicKey,
            newAccountPubkey: sender_token.publicKey,
            space: AccountLayout.span,
            lamports: await Token.getMinBalanceRentForExemptAccount(
                program.provider.connection
            ),
            programId: TOKEN_PROGRAM_ID,
        });

        let create_sender_tx = new Transaction().add(
            sender_account,
            Token.createInitAccountInstruction(
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                sender_token.publicKey,
                providerPublicKey
            )
        );

        await program.provider.sendAndConfirm(create_sender_tx, [sender_token]);
        /****** Send Tokens *******/

        /**************************/

        /****** Receive Tokens *******/
        const receiver_account = SystemProgram.createAccount({
            fromPubkey: providerPublicKey,
            newAccountPubkey: receiver_token.publicKey,
            space: AccountLayout.span,
            lamports: await Token.getMinBalanceRentForExemptAccount(
                program.provider.connection
            ),
            programId: TOKEN_PROGRAM_ID
        });

        let create_receiver_tx = new Transaction().add(
            receiver_account,
            Token.createInitAccountInstruction(
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                receiver_token.publicKey,
                receiver.publicKey
            )
        );

        await program.provider.sendAndConfirm(create_receiver_tx, [receiver_token]);
        /****** Receive Tokens *******/

        /**************************/

        /****** Mint Token With Sender *******/
        let mint_tokens_tx = new Transaction().add(
            Token.createMintToInstruction(
                TOKEN_PROGRAM_ID,
                mint.publicKey,
                sender_token.publicKey,
                providerPublicKey,
                [], // multiSingers (if need..)
                2e6, // amount, if your decimals is 8, you mint 10^8 for 1 token.
            )
        );

        await program.provider.sendAndConfirm(mint_tokens_tx);

        console.log(
            "token balance", await program.provider.connection.getTokenAccountBalance(
                sender_token.publicKey
            )
        );
        /****** Mint Token With Sender *******/
    });

    it( "transfer tokens", async () => {

        // create account for transfer (sender_token -> receiver_token)
        const account = {
            sender: providerPublicKey,
            senderToken: sender_token.publicKey,
            receiverToken: receiver_token.publicKey,
            mint: mint.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID
        };

        // transfer tokens to account....
        await program.methods
            .transfer(new anchor.BN(1e6))
            .accounts(account)
            .rpc();

        // result outputs....
        console.log(
            "sender token bal", await program.provider.connection.getTokenAccountBalance(
                sender_token.publicKey
            )
        )

        console.log(
            "receiver token bal", await program.provider.connection.getTokenAccountBalance(
                receiver_token.publicKey
            )
        )
    });

    it("burn tokens", async () => {

        // Error: failed to send transaction:
        //    Transaction simulation failed:
        //       Error processing Instruction 0:
        //          Cross-program invocation with unauthorized signer or writable account
        // Solve:
        //    If use this prop on test change MintCtx on lib.rs as;
        // #[account(mut)] <- put this annotation cause use mint account.
        // pub mint: Account<'info, Mint>, // as mint

        // create account for transfer (sender_token -> receiver_token)
        const account = {
            sender: providerPublicKey,
            senderToken: sender_token.publicKey,
            mint: mint.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID
        };


        // transfer tokens to account....
        await program.methods
            .burn(new anchor.BN(1e6))
            .accounts(account)
            .rpc();

        // result outputs....
        console.log(
            "sender token bal", await program.provider.connection.getTokenAccountBalance(
                sender_token.publicKey
            )
        )

        console.log(
            "receiver token bal", await program.provider.connection.getTokenAccountBalance(
                receiver_token.publicKey
            )
        )
    })
});
