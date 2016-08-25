import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) {
    return 'Work #' + (i + 1);
  },
  artist: function() {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  },
  workType: function(i) {
    if(i%3 === 0) {
      return 'Recording';
    }
    else {
      return 'Composition';
    }
  },
  description: function(i) {
    return 'Work Description #' + (i + 1);
  },
  media: [],
  entity: null,
  classification: null,
  mediumPreviewUrl: faker.image.imageUrl,
  featuredArtist: "n/a",
  writers: "Brian Feeney, Eric Rivera, Andy Mills, Peter Voakes",
  year: 2008,
  publisher: "Seasons Publishing",
  pro: "ASCAP",
  files: "to-the-end-master.mp3,to-the-end_raw_recording_11-28-2015.aiff,To-The-End_lyrics.txt,To-The-End_song_notes.md,To-The-End_birds_image.jpg"
});
