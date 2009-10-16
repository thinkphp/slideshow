var Protofade = Class.create({

                  //constructor of class Protofade
                  initialize: function(element, options) {

                              this.options = {

                                   duration: 1,

                                   delay: 4.0,

                                   random: false,
 
                                   slideshow: true,

                                   controls: false 
                              };

                              Object.extend(this.options, options || {});

                              this.element = $(element);

                              this.slides = this.element.childElements();

                              this.num_slides = this.slides.length;

                              this.current_slide = (this.options.random) ? (Math.floor(Math.random()*this.num_slides)) : 0;

                              this.end_slide = this.num_slides - 1;

                              this.slides.invoke('hide');

                              this.slides[this.current_slide].show();


                              if(this.options.controls) {

                                      this._addControls();
                              }    

                              if(this.options.slideshow) {

                                      this._startSlideshow();
                              }    

                  },

                  _addControls: function() {

                              this.wrapper = this.element.up();

                              this.controls = new Element('div',{'class':'controls'}); 

                              this.wrapper.insert(this.controls);

                              this.button_next = new Element('a',{'class':'next','title':'next','href':'#'}).update('Next');

                              this.button_previous = new Element('a',{'class':'previous','title':'previous','href':'#'}).update('Previous');

                              this.button_play = new Element('a',{'class':'play','title':'play','href':'#'}).update('Play');

                              this.button_stop = new Element('a',{'class':'stop','title':'stop','href':'#'}).update('Stop');

                              this.buttons = [this.button_previous, this.button_next, this.button_play, this.button_stop];

                              this.buttons.each(function(el){
 
                                         this.controls.insert(el);

                              }.bind(this));

                              this.button_next.observe('click', this._moveToNext.bindAsEventListener(this));

                              this.button_previous.observe('click', this._moveToPrevious.bindAsEventListener(this));

                              this.button_play.observe('click', this._startSlideshow.bindAsEventListener(this));

                              this.button_stop.observe('click', this._stopSlideshow.bindAsEventListener(this));

                  }, 

                  _moveToNext: function(event) {

                         if(event) {Event.stop(event);}

                           this._stopSlideshow();

                           this.updateSlide(this.current_slide+1);

                  },                   

                  _moveToPrevious: function(event) {

                         if(event) {Event.stop(event);}

                           this._stopSlideshow();

                           this.updateSlide(this.current_slide-1);

                  },                   


                  _stopSlideshow: function(event) {

                         if(event) {Event.stop(event);}

                         if(this.executer) {

                                 this.executer.stop();

                                 this.running = false; 
                         }      

                  },


                  _startSlideshow: function(e) {

                             if(e) {

                                  Event.stop(e);
                             }

                             if(!this.running) {

                                  this.executer = new PeriodicalExecuter(function(){this.updateSlide(this.current_slide+1)}.bind(this),this.options.delay);

                                  this.running = true;
                             }

                  },

                  updateSlide: function(next_slide) {

                             if(next_slide > this.end_slide) {

                                      next_slide = 0;

                             } else if(next_slide == -1) {

                                      next_slide = this.end_slide;
                             }


                             this.fadeInOut(next_slide, this.current_slide);		
                  },

                  fadeInOut: function(next,current) {

                             new Effect.Parallel([new Effect.Fade(this.slides[current], { sync: true }),new Effect.Appear(this.slides[next], { sync: true }) ], { duration: this.options.duration });

                             this.current_slide = next;
                  } 

});//end class Protofade 