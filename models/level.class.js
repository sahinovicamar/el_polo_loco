class Level {
    bottles;
    coins;
    enemies;
    // endBoss;
    clouds;
    backgroundObjects;
    level_end_x = 2250;


    constructor(bottles, coins, enemies, clouds, backgroundObjects) { //wichtig ist wie zugeordnet ist
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        // this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}