let bot;
let userInput;
let outputDiv;
let submitBtn;
let botReadyFlag = false;
const username = "local-user";

// Contenu des .rive intégré pour éviter CORS en file://
const BEGIN_RIVE = `! version = 2.0

! var name = Genuary Bot
! var age = 1

! sub i'm = i am
! sub don't = do not
! sub what's = what is
! sub it's = it is
! sub i've = i have
! sub you're = you are
! sub we're = we are
! sub they're = they are
! sub can't = cannot
! sub won't = will not
! sub isn't = is not
! sub aren't = are not
`;

const DIALOGUE_RIVE = `+ hello
- Salut ! Je suis <bot name>. Tu peux me poser des questions sur l'histoire des chatbots.
- Bonjour ! Parle-moi de ce que tu veux savoir sur les bots.

+ hi
- Hey ! Comment vas-tu ?
- Salut ! Je suis là pour discuter.

+ what was the earliest chatbot
- Le premier chatbot bien connu s'appelait ELIZA.

+ when was (the first chatbot|it) created
- ELIZA a été conçu en 1964 et présenté en 1966 au MIT.

+ who made (the first chatbot|it)
- Le chercheur Joseph Weizenbaum a créé le bot ELIZA en 1964 comme expérience.

+ (can machines think|are bots smart|are you as good as chatgpt|are computers and humans alike)
- Je ne pense pas. Mais je viens d'y penser, alors... c'est un paradoxe.{weight=1}
- Je ne réponds qu'aux questions auxquelles je peux répondre.{weight=1}
- « Je suis un bot. Tous les bots sont des menteurs. » — Mr. Mind (un bot){weight=2}
- Seul un bot me poserait cette question !{weight=3}

+ [*] bot [*]
- Je suis un bot. Toi aussi tu es un bot ?
- Seul un bot poserait cette question !

+ my name is *
- <set name=<star>>Ravi de te rencontrer, <name> !

+ what is my name
* <get name> == undefined => Tu ne me l'as jamais dit.
- Ton nom est <get name>.

+ (what is genuary|tell me about genuary)
- Genuary, c'est un défi : un dessin génératif par jour pendant tout le mois de janvier. Ces sketches p5.js en font partie !

+ (what is your favorite project|ton projet favori|parle moi du site|tell me about the site|the site|ce site|le site|dessins geometriques|dessins géométriques)
- Mon projet favori, c'est ce site ! Il affiche 31 dessins génératifs — un pour chaque jour de janvier — réalisés avec p5.js. C'est le défi Genuary : dessins géométriques et artistiques.
- Ce site est mon préféré : une galerie de 31 sketches Genuary (1 à 31 janvier), en p5.js. Tu peux cliquer sur n'importe quel jour pour voir le dessin du jour.

+ (who made the site|qui a fait le site|who made this|qui a fait ca|nicolas|author)
- Le site et les sketches Genuary sont de Nicolas SUNG, dans le cadre de Dessins géométriques et artistiques (IIM).

+ (how many sketches|combien de dessins|how many days|31)
- Il y a 31 sketches sur le site — un pour chaque jour de janvier. Tu peux les ouvrir depuis la page d'accueil en cliquant sur les cartes (JAN 01, JAN 02, etc.).

+ (who are you|what are you)
- Je suis <bot name>, un bot sans IA. Je fonctionne avec des règles RiveScript, comme ELIZA en 1964.

+ (help|what can you do)
- Tu peux me demander mon projet favori (ce site Genuary !), l'histoire des chatbots, ce qu'est Genuary, ou combien il y a de sketches. Dis « hello » pour commencer.

+ *
- Je ne suis pas sûr de comprendre. Tu peux reformuler ?
- Intéressant. Demande-moi mon projet favori (ce site !), ou « c'est quoi Genuary », ou « qui a fait le site ».
- Hmm. Pose-moi une question sur le site Genuary, les chatbots ou Genuary.
`;

function preload() {
    bot = new RiveScript({ utf8: true });
    const ok1 = bot.stream(BEGIN_RIVE);
    const ok2 = bot.stream(DIALOGUE_RIVE);
    if (ok1 && ok2) {
        bot.sortReplies();
        botReadyFlag = true;
    } else {
        console.error("Erreur parsing RiveScript.");
    }
}

function botReady() {
    console.log("Bot prêt.");
    if (submitBtn) submitBtn.attribute("disabled", null);
    addMessage(
        "bot",
        "Salut ! Je suis le bot Genuary. Mon projet favori, c'est ce site : 31 dessins génératifs (Genuary) en p5.js. Demande-moi « ton projet favori », « c'est quoi Genuary » ou « help »."
    );
}

function setup() {
    const container = select("#chat-container");
    if (!container) return;

    outputDiv = createDiv("").parent(container).class("chat-output");

    const form = createDiv("").parent(container).class("chat-form");
    userInput = createInput("")
        .parent(form)
        .class("chat-input")
        .attribute("placeholder", "Écris un message…");
    userInput.attribute("aria-label", "Message");
    submitBtn = createButton("Envoyer").parent(form).class("chat-submit");
    submitBtn.attribute("aria-label", "Envoyer le message");
    if (!botReadyFlag) submitBtn.attribute("disabled", "true");

    submitBtn.mousePressed(botChat);
    userInput.changed(botChat);
    userInput.elt.addEventListener("keydown", (e) => {
        if (e.key === "Enter") botChat();
    });

    if (botReadyFlag) {
        botReady();
    } else {
        submitBtn.attribute("disabled", null);
        addMessage("bot", "Désolé, le bot n'a pas pu charger ses réponses.");
    }
}

function addMessage(who, text) {
    if (!outputDiv) return;
    const p = createP(text)
        .class(who === "user" ? "user-msg" : "bot-msg")
        .parent(outputDiv);
    outputDiv.elt.scrollTop = outputDiv.elt.scrollHeight;
}

function botChat() {
    if (!bot || !userInput || !outputDiv) return;
    const inputValue = userInput.value().trim();
    if (!inputValue) return;

    bot.sortReplies();
    addMessage("user", inputValue);
    userInput.value("");

    bot.reply(username, inputValue)
        .then(function (reply) {
            addMessage("bot", reply);
        })
        .catch(function (err) {
            console.error(err);
            addMessage("bot", "Une erreur s'est produite.");
        });
}
