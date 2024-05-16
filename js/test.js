const UPDATE_AI_USER_RESPONSE = function (level, userMessage, userResponseAudioURL, AIMessage) {

    userResponseAudioURL = tempUserAudioURLStorage.textContent;

    // Level 1
    if (level == 1) {

        ACTIVATE_USER_CONTROL_PANEL(
            false,
            false,
            0
        );

        if (userResponseAudioURL != "") {

            GENERATE_AI_RESPONSE(
                "Amazing! Let me think of some beatboxing.",
                "",
                1
            );

            NAVIGATE_USER_LEVEL(
                2,
                1
            );

        } else {

            GENERATE_AI_RESPONSE(
                "I'm afraid I can't read your audio, please retry!",
                "",
                1
            );

        }
    }

    // Level 2
    if (level == 2) {

        // Inference done HERE...

        // Get AI predicted audio URL
        GENERATE_AI_RESPONSE(
            "",
            "assets/audio/You Give Love A Bad Name.mp3", // Placeholder audio
            1
        );

        GENERATE_AI_RESPONSE(
            "Hope I've understood your idea correctly. Would you like to fine tune my idea?",
            "",
            2
        );

        ACTIVATE_USER_CONTROL_PANEL(
            true,
            true,
            3
        );

        const optionsArray = ["Sure! Why not?", "Nope. Let's move on!"];
        getDialogueOptionsToStorage(optionsArray);

        getChatUserLevel(3);

    }

    // Level 3
    if (level == 3) {

        ACTIVATE_USER_CONTROL_PANEL(
            false,
            false,
            0
        );

        if (userMessage == "" && userResponseAudioURL != "") {

            NAVIGATE_USER_LEVEL(
                1,
                0
            );

        } else if (userMessage == "Sure! Why not?") {

            NAVIGATE_USER_LEVEL(
                2,
                0
            );

        } else {

            GENERATE_AI_RESPONSE(
                "Now, would you like to add another idea to this chat? If so, please record/upload your audio here! Can't wait to jam with your amazing ideas!",
                "",
                1
            );

            ACTIVATE_USER_CONTROL_PANEL(
                false,
                true,
                2
            );

            getChatUserLevel(4);

        }
    }

    // Level 4 - Back to level 1
    if (level == 4) {

        ACTIVATE_USER_CONTROL_PANEL(
            false,
            true,
            0
        );

        if (userMessage == "" && userResponseAudioURL != "") {

            NAVIGATE_USER_LEVEL(
                1,
                0
            )

        }

    }
}