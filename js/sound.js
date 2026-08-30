const SoundSystem = {

    paths: {

        blacklist: 'sounds/failed.mp3',

        high_risk: 'sounds/failed.mp3',

        medium_risk: 'sounds/ohno.mp3',

        low_risk: 'sounds/meng.mp3',

        wrong_pin: 'sounds/stupid.mp3',

        success: 'sounds/meng.mp3',

        failed: 'sounds/failed.mp3'

    },


    play(soundType) {

        const path = this.paths[soundType];

        if (!path) {

            console.warn(
                `ไม่พบไฟล์เสียงสำหรับ: ${soundType}`
            );

            return;

        }


        console.log(
            `กำลังเล่นเสียง: ${soundType} → ${path}`
        );


        const audio = new Audio(path);

        audio.volume = 1.0;


        audio.play()

            .then(() => {

                console.log(
                    `เล่นเสียงสำเร็จ: ${path}`
                );

            })

            .catch(error => {

                console.error(
                    `เล่นเสียงไม่ได้: ${path}`,
                    error
                );

            });

    },


    playByRisk(user, riskLevel) {

        if (!user) return;


        if (user.isBlacklisted) {

            this.play('blacklist');

        }

        else if (riskLevel === 'HIGH') {

            this.play('high_risk');

        }

        else if (riskLevel === 'MEDIUM') {

            this.play('medium_risk');

        }

        else {

            this.play('low_risk');

        }

    }

};


function playSound(type) {

    SoundSystem.play(type);

}
