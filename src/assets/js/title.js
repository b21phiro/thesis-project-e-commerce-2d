const adjectives = [
    'Light ',
    'Dark ',
    'Black ',
    'Sweet ',
    'Salty ',
    'Hot ',
    'Cool ',
    'Icy ',
    'Spicy ',
    ''
];

const nouns = [
    'Coffee',
    'Espresso',
    'Latte',
    'Homebrew',
    'Brew',
    'Caramel'
];

function title() {
    const randomAdjectiveIndex = Math.floor(Math.random() * (adjectives.length - 1)),
          randomNounIndex = Math.floor(Math.random() * (nouns.length - 1));
    return `${adjectives[randomAdjectiveIndex]}${nouns[randomNounIndex]}`;
}

export { title };