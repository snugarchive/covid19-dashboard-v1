import LegendItem from './LegendItem'

var legendItems = [
  new LegendItem(
    '10,000,000 +',
    'var(--clr-orange-8)',
    (cases) => cases >= 10_000_000,
    'var(--clr-white)'
  ),

  new LegendItem(
    '5,000,000 - 9,999,999',
    'var(--clr-orange-7)',
    (cases) => cases >= 5_000_000 && cases < 10_000_000,
    'var(--clr-white)'
  ),

  new LegendItem(
    '1,000,000 - 4,999,999',
    'var(--clr-orange-6)',
    (cases) => cases >= 1_000_000 && cases < 5_000_000,
    'var(--clr-white)'
  ),

  new LegendItem(
    '500,000 - 999,999',
    'var(--clr-orange-5)',
    (cases) => cases >= 500_000 && cases < 1_000_000,
    'var(--clr-white)'
  ),

  new LegendItem(
    '250,000 - 499,999',
    'var(--clr-orange-4)',
    (cases) => cases >= 250_000 && cases < 500_000
  ),

  new LegendItem(
    '100,000 - 249,999',
    'var(--clr-orange-3)',
    (cases) => cases >= 100_000 && cases < 250_000
  ),

  new LegendItem(
    '50,000 - 99,999',
    'var(--clr-orange-2)',
    (cases) => cases >= 50_000 && cases < 100_000
  ),

  new LegendItem(
    '0 - 49,999',
    'var(--clr-orange-1)',
    (cases) => cases > 0 && cases < 50_000
  ),

  new LegendItem('No Data', 'var(--clr-white)', (cases) => true),
]

export default legendItems
