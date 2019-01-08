let expect = require('chai').expect;
let SoftUniFy = require('../app');

describe("TESTS", function() {

   beforeEach(function() {
      let softunify = new SoftUniFy();
   });

    describe("allSongs property", function() {
        it("should be empty", function() {
            let softunify = new SoftUniFy();

            expect(softunify.allSongs).to.eql({})
        });
    });

    describe("downloadSong", function() {
       it("should return default values only with artist", function() {
           let softunify = new SoftUniFy();
           softunify.downloadSong("Eminem")
           expect(softunify.allSongs).to.eql({ Eminem: { rate: 0, votes: 0, songs: [ 'undefined - undefined' ] } })

       });

       it("should return the songs for the artist", function() {
           let softunify = new SoftUniFy();
           softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
           softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
           softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

            expect(softunify.allSongs).to.eql({ Eminem:
                    { rate: 0,
                        votes: 0,
                        songs:
                            [ 'Venom - Knock, Knock let the devil in...',
                                'Phenomenal - IM PHENOMENAL...' ] },
                'Dub Fx':
                    { rate: 0,
                        votes: 0,
                        songs: [ 'Light Me On Fire - You can call me a liar.. ' ] } }
            );
       });

       it("should check the artist properties", function() {
           let softunify = new SoftUniFy();

           softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
           softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
           softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

           expect(softunify.allSongs['Eminem']).to.eql({ rate: 0,
               votes: 0,
               songs:
                   [ 'Venom - Knock, Knock let the devil in...',
                       'Phenomenal - IM PHENOMENAL...' ] });

           expect(softunify.allSongs['Eminem']['songs']).to.eql([ 'Venom - Knock, Knock let the devil in...',
               'Phenomenal - IM PHENOMENAL...' ]);
           expect(softunify.allSongs['Eminem']['rate']).to.equal(0)
           expect(softunify.allSongs['Eminem']['votes']).to.equal(0)
       });

       //CHECK IF THE FUNCTION RETURNS THE CLASS
       // it("should return the entire class", function() {
       //     let softunify = new SoftUniFy();
       //
       //     expect(softunify.downloadSong()).to.eql();
       //
       // });
    });

    describe("playSong", function() {
        it("should return the songs in format", function() {
            let softunify = new SoftUniFy();

            softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');

            expect(softunify.playSong('Venom')).to.equal('Eminem:\nVenom - Knock, Knock let the devil in...\n');
            expect(softunify.playSong('Phenomenal')).to.equal('Eminem:\nPhenomenal - IM PHENOMENAL...\n');
        })
        it("should return a message if no song is passed", function() {
            let softunify = new SoftUniFy();

            expect(softunify.playSong()).to.equal('You have not downloaded a undefined song yet. Use SoftUniFy\'s function downloadSong() to change that!');
        })
        it("should return a message if the song is not downloaded", function() {
            let softunify = new SoftUniFy();

            softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');

            expect(softunify.playSong('BABA')).to.equal('You have not downloaded a BABA song yet. Use SoftUniFy\'s function downloadSong() to change that!');
        });
    });

    describe("songsList", function() {
        it("should get all downloaded songs", function() {
            let softunify = new SoftUniFy();

            softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

            expect(softunify.songsList).to.equal("Venom - Knock, Knock let the devil in...\n" +
                "Phenomenal - IM PHENOMENAL...\n" +
                "Light Me On Fire - You can call me a liar.. ")
        })
        it("should return a messge if there are no songs", function() {
            let softunify = new SoftUniFy();

            expect(softunify.songsList).to.equal("Your song list is empty")
        })
    })

    describe("rateArtist", function() {
        it("should return message if the artist is missing", function() {
            let softunify = new SoftUniFy();

            expect(softunify.rateArtist('Eminem')).to.equal('The Eminem is not on your artist list.');
            expect(softunify.rateArtist('Eminem', 50)).to.equal('The Eminem is not on your artist list.');
        })

        it("should return correct average rate", function() {
            let softunify = new SoftUniFy();

            softunify.downloadSong('Eminem', 'Venom', 'Knock, Knock let the devil in...');
            softunify.downloadSong('Eminem', 'Phenomenal', 'IM PHENOMENAL...');
            softunify.downloadSong('Dub Fx', 'Light Me On Fire', 'You can call me a liar.. ');

            expect(softunify.rateArtist('Eminem')).to.equal(0);
            expect(softunify.rateArtist('Eminem', 50)).to.equal(50);
        })
    })
});
