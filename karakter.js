export default class Karakter {
    constructor(name, classType, health, strength, defense) {
        this.name = name;
        this.cast = classType;
        this.health = health;
        this.strength = strength;
        this.defense = defense;

        this.validate();
    }

    validate() {
        if (!this.name) throw new Error("Kell egy név a karakternek.");
        if (!this.cast) throw new Error("Class nélkül nem lehet karaktert létrehozni.");
        if (this.health < 0 || this.strength < 0 || this.defense < 0) {
            throw new Error("Nem lehet negativ a health, strength vagy defense értéke.");
        }
    }

    getImage() {
        const images = {
            witch: 'imgs/Enchanted_Book.webp',
            archer: 'imgs/Enchanted_Bow.webp',
            warrior: 'imgs/Enchanted_Iron_Sword.webp'
        };
        return images[this.cast];
    }

    getColor() {
        const colors = {
            witch: 'text-bg-info',
            archer: 'text-bg-success',
            warrior: 'text-bg-secondary'
        };
        return colors[this.cast];
    }
}
