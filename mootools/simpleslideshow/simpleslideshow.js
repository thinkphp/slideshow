/*
  @Class          - SimpleSlideShow

  @Description    - Very minimalistic slideshow class

  @Constructor    - Initialize with following arguments(parameters formal - params)

                    Arguments  - wrapper (element DIV to insert images)
                               - images  (array of images with souces)
                               - options (options to set up)

                    Options    - fadeTime (time in ms for the fade between images)
                               - stayTime (time between two fade)

  @Method         - fade (public method)

  @Usage          new SimpleSlideShow(wrapper, arrayOfImagesSource,[, options]);

  License:
  MIT-Style-License
  Copyright: Adrian Statescu <me@thinkphp.ro>

*/


var SimpleSlideShow = new Class({

                    Implements: Options,

                    options: {

                          fadeTime: 1000,

                          stayTime: 2000
                    },

                    initialize: function(wrapper,images,options) { 

                          var params = Array.link(arguments,{wrapper: $defined, images: Array.type, options: Object.type}); 

                          this.wrapper = $(params.wrapper);

                          this.setOptions(params.options);

                          this.images = (params.images || JSON.decode(this.wrapper.get('images'))).map(function(image){

                                      return new Element('img',{

                                             src: image,

                                             width: '100%', 

                                             height: '100%',

                                             tween: {duration: this.options.fadeTime}
                                      });
                          },this);      

                          this.index = 0;

                          this.topImage = this.images[0].inject(this.wrapper);

                          this.fade.delay(this.options.stayTime, this);

                    },

                    fade: function() {

                         this.index = ( this.index + 1 ) % this.images.length;

                         this.topImage = this.images[this.index].fade('hide').inject(this.wrapper).fade('in');

                         this.fade.delay(this.options.stayTime + this.options.fadeTime, this);
                    }     

});//end class SimpleSlideShow

