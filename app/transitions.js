let duration = 500;
let preserve = ['background-color', 'color', 'font-size', 'font-family',
                  'font-weight', 'border-radius', 'padding', 'white-space',
                  'width', 'height', 'text-transform', 'border'];

export default function() {
  this.transition(
    this.fromRoute('works.index'),
    this.toRoute('works.work'),
    this.useAndReverse('explode', {
      pickOld: '.cs-search-topbar',
      preserve,
      use: ['toUp', duration]
    })
  );
};
