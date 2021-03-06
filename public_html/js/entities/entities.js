
game.PlayerEntity = me.Entity.extend({
    //settings for "Mario"
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mario",
                spritewidth: "128",
                spriteheight: "128",
                width: 128,
                height: 128,
                getShape: function() {
                    return (new me.Rect(0, 0, 26, 128)).toPolygon();
                }
            }]);

        //These are all the characters actions
        this.renderable.addAnimation("idle", [3]);
        this.renderable.addAnimation("bigIdle",[19]);
        //create an animation called smallWalk using pictures of the image defines above(mario)
        //sets the animation to run through pictures 8-13
        //the last number says we switch between pictures every 80 milliseconds
        this.renderable.addAnimation("smallWalk", [8, 9, 10, 11, 12, 13], 80);
        this.renderable.addAnimation("bigWalk", [14, 15, 16, 17, 18, 19], 80);
        this.renderable.addAnimation("shrink", [0, 1, 2, 3], 80);
        this.renderable.addAnimation("grow", [4, 5, 6, 7], 80);

        this.renderable.setCurrentAnimation("idle");

        this.big = false;
        //sets the speed we go on the x axis(first number) and y axis (second number)
        this.body.setVelocity(5, 20);

        //sets the camera(viewport) to follow mario's position(pos) on both the x and y axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function(delta) {
        //checks if the right key is pressed and if it is , executes the following statement
        if (me.input.isKeyPressed("right")) {
            //sets the position of mario in the x axis by adding the x value from the setVelocity times the time
            //me.timer tick uses the tii,e since last animation 
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(false);
        //checks if the left key is pressed and if it is, it executes the following statements
        } else if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);
        } else {
            this.body.vel.x = 0;
        }
        //checks if the up key is pressed and if it is, it executes the following statements
        if (me.input.isKeyPressed("up")) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.jumping = true;
                this.body.vel.y -= this.body.accel.y * me.timer.tick;
            }
        }
        this.body.update(delta);
        me.collision.check(this, true, this.collideHandler.bind(this), true);
               //Animation for "mario"
        if (!this.big) {
            if (this.body.vel.x !== 0) {
                if (!this.renderable.isCurrentAnimation("smallWalk") && !this.renderable.isCurrentAnimation("grow") && !this.renderable.isCurrentAnimation) {
                    this.renderable.setCurrentAnimation("smallWalk");
                    this.renderable.setAnimationFrame();
                }
            } else {
                this.renderable.setCurrentAnimation("idle");
            }
        } else {
            if (this.body.vel.x !== 0) {
                if (!this.renderable.isCurrentAnimation("bigWalk") && !this.renderable.isCurrentAnimation("grow") && !this.renderable.isCurrentAnimation("shrink")) {
                    this.renderable.setCurrentAnimation("bigWalk");
                    this.renderable.setAnimationFrame();
                }
            } else {
                this.renderable.setCurrentAnimation("bigIdle");
            }
        }

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //response  for characters and collectable
    collideHandler: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        console.log(ydif);

        //response for bad guy
        if (response.b.type === 'badguy') {
            if (ydif <= -115) {
                response.b.alive = false;
            } else {
                if (this.big) {
                    this.big = false;
                    this.body.vel.y -= this.body.accel.y * me.timer.tick;
                    this.jumping = true;
                    this.renderable.setCurrentAnimation("shirnk", "bigIdle");
                    this.renderable.setAnimationFrame();
                } else {
                    me.state.change(me.state.MENU);
                }
            }
            //resonse for mushroom
        } else if (response.b.type === 'mushroom') {
            this.renderable.setCurrentAnimation("grow", "smallIdle");
            this.big = true;
            me.game.world.removeChild(response.b);
        }

    }

});
//response for door to next level
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
//actions for bad guy
game.BadGuy = me.Entity.extend({
    init: function(x, y, settings) {
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
        var width = settings.width;
        x = this.pos.x;
        this.startX = x;
        this.endX = x + width - this.spritewidth;
        this.pos.x = x + width - this.spritewidth;
        this.updateBounds();

        this.alwaysUpdate;
        true;

        this.walkLeft = false;
        this.alive = true;
        this.type = "badguy";

        this.renderable.addAnimation("run", [0, 1, 2], 80);
        this.renderable.setCurrentAnimation("run");

        this.body.setVelocity(4, 6);
    },
    update: function(delta) {
        this.body.update(delta);
//     me.collision.check(this, true, this.collideHandler.bind(this), true);

        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            this.flipX(!this.walkLeft);
            this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;

        } else {
            me.game.world.removeChild(this);
        }


        this._super(me.Entity, "update", [delta]);
    }

});
//Mushrooms settings
game.Mushroom = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "mushroom",
                spritewidth: "64",
                spriteheight: "64",
                width: 64,
                height: 64,
                getShape: function() {
                    return (new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);
        me.collision.check(this);
        this.type = "mushroom";
    }

});