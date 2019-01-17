export const general_faq = [
    {
        question: "Q. How to register?",
        type: 0, //normal
        answer: [
            "A. You can register an account with us using the Registration from at the top-right corner of our website. Simply put in your valid e-mail address, make up a password and confirm it. Then check your email inbox for an email confirmation."
        ]
    },
    {
        question: "Q. How many accounts can I have?",
        type: 0, //normal
        answer: [
            "A. We allow you only 1 account per individual. Please don't create multiple account as it might cause their deactivation."
        ]
    },
    {
        question: "Q. I can't register , why?",
        type: 0, //normal
        answer: [
            "A. We recommend using a trustworthy email: gmail, yahoo etc. Temporary email services are not allowed. Also make sure your password meets the requirements."
        ]
    },
    {
        question: "Q. I don't receive confirmation emails from you, can you help?",
        type: 0, //normal
        answer: [
            "A. Please check all incoming, junk, spam folders of your email client and make sure our email address is not added to the black list of your mailer."
        ]
    },
    {
        question: "Q. How to delete my account?",
        type: 0, //normal
        answer: [
            "A. You can do it by sending an official email request at info@bitplay.club"
        ]
    },
    {
        question: "Q. What do I need to do to take part in your lottery?",
        type: 0, //normal
        answer: [
            "A. All you need to do is register an account, add funds to your account balance. fill out the ticket with some numbers and buy it. That's it."
        ]
    },
    {
        question: "Q. Does the number order matter?",
        type: 0, //normal
        answer: [
            "A. No, the number order doesn't matter so you can fill out your tickets in any order."
        ]
    },
    {
        question: "Q. When do the draws take place?",
        type: 0, //normal
        answer: [
            "A. All lotteries are held once a day. The draw is closed at 08:00 UTC, and winning numbers calculation starts at 10:00 UTC. The time for calculation varies, but it might take up to 2 hours. It takes approximately 10 minutes for one block to be found in blockchain. Please check the 'Draws History' for comparison."
        ]
    },
    {
        question: "Q. How can I see the statistics of my tickets?",
        type: 0, //normal
        answer: [
            "A. You can check all your tickets under the 'My tickets' section of your account."
        ]
    },
    {
        question: "Q. Where can I see the entire draws history?",
        type: 0, //normal
        answer: [
            "A. You can find this info under the 'Draws History' section of the main menu."
        ]
    }
];

export const security_faq = [
    {
        question: "Q. I forgot my password, please help!",
        type: 0, //normal
        answer: [
            "A. Use the 'Forgot password?' option for password recovery."
        ]
    },
    {
        question: "Q. How to change my password?",
        type: 0, //normal
        answer: [
            "A. You can change your password using 'Forgot password? option or in the 'Settings' section of your account menu using the 'Change Password' option. If you used Social Network for registration, you just need to set up your first password using any of the above mentioned options."
        ]
    },
    {
        question: "Q. How can I enable 2-step verification?",
        type: 0, //normal
        answer: [
            "A. Please Login your account and go to the 'Settings' section of your account menu to find the instructions."
        ]
    },
    {
        question: "Q. How can I be sure that you don't rig draw results?",
        type: 0, //normal
        answer: [
            "A. We use an open source algorithm for getting draw results. This formula takes the details of a certain block found on blockchain and calculates the drawn number. Please check it out here",
            "https://bitplay.club/draw/6-45/fairplay. If you are good in coding or have someone who's good in it, you will make sure that formula is working properly and we don't rig draw results."
        ]
    },
    {
        question: "Q. What does it mean 'lottery based on blockchain'?'",
        type: 0, //normal
        answer: [
            "A. Blockchain is the technology of future. This technology is used by numerous financial institutions as it provides 100% transparency and zero chance of being rigged. We use the formula that takes certain blocks from blockchain and based on their data calculates the drawn number. This way we show everybody that results are genuine and they can't be rigged as anyone who's good in coding can check our formula and confirm its fairness."
        ]
    },
    {
        question: "Q. How do you exactly calculate the drawing numbers?",
        type: 0, //normal
        answer: [
            "A. Please go to the 'Check Fair Play' section to find a detailed explanation for each lotto type."
        ]
    },
    {
        question: "Q. Can you give us some proof that you have jackpot funds that you mentioned?",
        type: 1, // need signature box
        answer: [
            "A. Transparency is our priority and we want everyone to be sure that we do have jackpot funds ready to be paid out to the lucky winner.",
            "Please use some Bitcoin Signature Verifier to verify our jackpot funds.",
            "Here are the details that you need:"
        ],
        address: "1LT5Rck8WdNbJQEngSZQHQv2CYwWHeP28j",
        message: "bitplay.club.jackpot",
        signature: "H86KYhHuesqnCfeiygLLLPowB2GtsMV/hcJuGGAm4LXVKSrTC78thWIRI9cMV/Xs2Du2HpdUsHjndbhjcsbd"
    }
];

export const payment_faq = [
    {
        question: "Q. How to buy a ticket?",
        type: 0, //normal
        answer: [
            "A. You can buy a ticket only from your internal account balance. If you don't have funds on the balance. please make a deposit first."
        ]
    },
    {
        question: "Q. How to make a deposit?",
        type: 0, //normal
        answer: [
            "A. You can make a deposit using the 'Deposit' option at 'My balance' section of your account menu. There you will see the direct BTC deposit option and the exchange service that allows you to top up your balance with altcoins, converting them to BTC automatically. The deposit address given to you is a unique one, and belongs only to your account."
        ]
    },
    {
        question: "Q. How to make a deposit in another cryptocurrency?",
        type: 2, //some between spacing
        answer: [
            "A. You can top up your BTC balance by paying with altcoins. We've integrated an exchange service to our payment form that allows you to convert your altcoins into BTC automatically.",

            "The whole process looks like this: You send a certain amount of altcoins available for exchange to the address generated in the deposit from.",
            "The exchange service converts altcoins into BTC and transfers that BTC to your Bitplay club account balance.",

            "You can find this payment option at 'My balance' -> 'Deposit' -> 'ALTCOINS' tab."
        ]
    },
    {
        question: "Q. How many tickets can I buy?",
        type: 0, //normal
        answer: [
            "A. You can buy unlimited number of tickets for the same draw."
        ]
    },
    {
        question: "Q. Why can't I buy the ticket?",
        type: 0, //normal
        answer: [
            "A. Please make sure you have enough funds on your account balance otherwise contact customer support."
        ]
    },
    {
        question: "Q. Do you accept credit cards?",
        type: 0, //normal
        answer: [
            "A. we accept only direct BTC deposits or deposits in altcoins through the integrated exchange service. We don't accept credit cards at the moment, but we are working on implementing this payment method. You can use your credit card, though, to buy bitcoins at some external exchange service, and then send these BTC to the BTC wallet address given to you at 'Deposit' -> 'BTC' tab of your Bitplay Club account. See section 'How to make a deposit?'."
        ]
    },
    {
        question: "Q. Why can't I see my money after the payment?",
        type: 0, //normal
        answer: [
            "A. Your BTC transfer needs to get 3 confirmations on blockchain before getting processed and added to your Bitplay Club account balance."
        ]
    }
];

export const winning_faq = [
    {
        question: "Q. What are the jackpot odds?",
        type: 0, //normal
        answer: [
            "A. For 5-36 lottery the jackpot odds are 1:376992.",
            "For 6-45 lottery the jackpot odds are 1:8145060."
        ]
    },
    {
        question: "Q. How can I check if I won or not?",
        type: 0, //normal
        answer: [
            "A. You can check all results under the 'My tickets' section of your account menu. There you will see if your ticket won anything or not."
        ]
    },
    {
        question: "Q. How to get my winnings?",
        type: 0, //normal
        answer: [
            "A. If your ticket is a winning one, the prize will be added to your account balance automatically after the draw. You may then withdraw it to your BTC wallet, exchange it or use for buying more tickets."
        ]
    },
    {
        question: "Q. How to make a withdrawal?",
        type: 0, //normal
        answer: [
            "A. You can withdraw your funds at 'My balance' -> 'Withdraw' section."
        ]
    },
    {
        question: "Q. How long does the withdrawal take?",
        type: 0, //normal
        answer: [
            "A. It might take up to 24 hours for the withdrawal to be processed after the request has benn placed."
        ]
    },
    {
        question: "Q. Is there any withdrawal fee?",
        type: 0, //normal
        answer: [
            "A. Yes, we take a withdrawal fee of 0.5% from the requested amount (while min is 0.001 BTC and max is 1 BTC)."
        ]
    }
];


export const common_faq = [
    {
        question: "Q. Couldn't find the answer?",
        type: 0, //normal
        answer: [
            "A. If you were unable to find the info you were looking for, please contact our customer support service using this contact form."
        ]
    }
];
