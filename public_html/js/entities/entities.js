// TODO
game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 128, 128)).toPolygon();
                }
            }]);

        this.renderable.addAnimation("idle", [3]);
        //create an animation called smallWalk using pictures of the image defines above(mario)
        //sets the animation to run through pictures 8-13
        //the last number says we switch between pictures every 80 milliseconds
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);

        this.renderable.setCurrentAnimation("idle");

        //sets the speed we go on the x axis(first number) and y axis (second number)
        this.body.setVelocity(5, 20);

        //sets the camera(viewport) to follow mario's position(pos) on both the x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function(delta) {
        //checks if the right key is pressed and if it is , executes the following statementn
        if (me.input.isKeyPressed("right")) {
        //sets the position of mario in the x axis by adding the x value from the setVelocity times the time
        //me.timer tick uses the tii,e since last animation 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            
        } else {
            this.body.vel.x = 0;
        }

        if (this.body.vel.x != 0) {
            if (!this.renderable.isCurrentAnimation("smallWalk")) {
                this.renderable.setCurrentAnimation("smallWalk");
                this.renderable.setAnimationFrame();
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }

        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    collideHandler: function(response) {

    }

});

game.LevelTrigger = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, settings]);
        //sets this object so that it will collide only with objects of type no_objects, when dpn't wxist
        //so really, makes it so this object will not collide with anything anymore
        this.body.onCollision = this.onCollision.bind(this);
        this.level = settings.level;
        this.xSpawn = settings.xSpawn;
        this.ySpawn = settings.ySpawn;
    },
    onCollision: function() {
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);
        me.levelDirector.loadLevel(this.level);
        me.state.current().resetPlayer(this.xSpawn, this.ySpawn);
    }
});
game.BadGuy = me.Entity.extend({
    init:function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "slime",
                spritewidth: "60",
                spriteheight: "28",
                width: 60,
                height: 28,
                getShape: function() {
                    return (new me.Rect(0, 0, 60, 28)).toPolygon();
            }
            }]);
                this.spritewidth = 60;
                x = this.pos.x;
                this.startX = x;
                this.endX = x + width - this.spritewidth;
                this.pos.x = x + width - this.spritewidth;
                this.updateBounds();
                
                this.alwaysUpdate; true;
                
                this.walkLeft = false;
                this.alive = true;
                this.type = "badguy";
                
                this.renderable.addAnimation("run", [0,1,2], 80);
               
                    },
    
    update: function(delta){
      
   }  
   
  });