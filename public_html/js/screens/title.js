game.TitleScreen = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    //Start Screen functions and start function
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10);
        me.input.bindKey(me.input.KEY.ENTER, "start");

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
                this.font = new me.Font("Arial", 46, "White");
            },
            //Title name           
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "Not Super Mario", 540, 130);
                this.font.draw(renderer.getContext(), "Press ENTER to begin to Play!", 250, 530);
            }

        })));
        //What to function first
        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "start") {
                me.state.change(me.state.PLAY);
            }
        });
    },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.event.unsubscribe(this.handler);
    }
});