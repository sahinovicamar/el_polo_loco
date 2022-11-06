class Level {
    bottles;
    coins;
    enemies;
    endBoss;
    clouds;
    backgroundObjects;
    level_end_x = 2750;


    constructor(bottles, coins, enemies, endBoss, clouds, backgroundObjects) {
        this.bottles = bottles;
        this.coins = coins;
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}