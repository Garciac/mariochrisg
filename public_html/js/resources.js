game.resources = [
    /* Graphics. 
     * @example
     * {name: "example", type:"image", src: "data/img/example.png"},
     */
    //what graphics it can load on the game
    {name: "background-tiles", type: "image", src: "data/img/background-tiles.png"},
    {name: "meta-tiles", type: "image", src: "data/img/meta-tiles.png"},
    {name: "mario", type: "image", src: "data/img/player1.png"},
    {name: "title-screen", type: "image", src: "data/img/mariobg.png"},
    {name: "slime", type: "image", src: "data/img/slime-spritesheet.png"},
    {name: "mushroom", type: "image", src: "data/img/mushroom.png"},
    /* Atlases 
     * @example
     * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
     */

    /* Maps. 
     * @example
     * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
     * {name: "example01", type: "tmx", src: "data/map/example01.json"},
     */
    //These levels will only load on the game
    {name: "ChrisLevel01", type: "tmx", src: "data/map/Chrislevel01.tmx"},
    {name: "ChrisLevel02", type: "tmx", src: "data/map/Chrislevel02.tmx"}

    /* Background music. 
     * @example
     * {name: "example_bgm", type: "audio", src: "data/bgm/"},
     */

    /* Sound effects. 
     * @example
     * {name: "example_sfx", type: "audio", src: "data/sfx/"}
     */
//    {name: "mushroom", type: "audio", src: "data/sfx/Squish.mp3"},
//    {name: "badguy", type: "audio", src: "data/sfx/bonk.mp3"}
    
];
