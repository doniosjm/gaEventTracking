// gaEventTracking, Google Analytics event tracking using element attributes
// version 0.1.0
// (c) 2014 Jeff Donios (jeff@donios.com)
// released under the MIT license
(function($) {


    function Analytics(element, options) {
        this.$element = $(element);
        this.options = options;
    };

    Analytics.prototype = {
        send: function() {
            var category = this.$element.attr('analytics-event-category'),
                action = this.$element.attr('analytics-event-action'),
                label = this.$element.attr('analytics-event-label'),
                type = this.$element.attr('analytics-event-type');

            if(this.options.concatenateLabel){
                // concatenate the attribute values
                label = category + this.options.concatenateSeparator + action + this.options.concatenateSeparator + label + this.options.concatenateSeparator + type;
            }

            // the 'send' option must be true AND the ga object must be defined to send to ga. Otherwise, output is sent to the console.
            if(!this.options.send || typeof ga === 'undefined'){
                console.log('Google Analytics: ga(\'send\', \'event\', \''+category+'\', \''+action+'\', \''+label+'\');');
            } else{
                ga('send', 'event', category, action, label);
            }
        }
    };

    $.fn.gaEventTracking = function(options) {

        if (options === true) {
            return this.data('gaEventTracking');
        } else if (typeof options == 'string') {
            var gaEventTracking = this.data('gaEventTracking');
            if (gaEventTracking) gaEventTracking[options]();
            return this;
        }

        options = $.extend({}, $.fn.gaEventTracking.defaults, options);

        function get(ele) {
            var gaEventTracking = $.data(ele, 'gaEventTracking');
            if (!gaEventTracking) {
                gaEventTracking = new Analytics(ele, $.fn.gaEventTracking.elementOptions(ele, options));
                $.data(ele, 'gaEventTracking', gaEventTracking);
            }
            return gaEventTracking;
        }

        function send() {
            var analytics = get(this);
            analytics.send();
        };

        this.each(function() {
            get(this);
        });

        // bind the trigger. If set to 'manual' your code should use gaEventTracking("send") to trigger
        if(options.trigger != 'manual'){
            this['bind'](options.trigger, send);
        }

        return this;
    };

    // default options
    $.fn.gaEventTracking.defaults = {
        concatenateLabel: true,     // false: output analytics-event-label attribute value; true: concatenate all 'analytics-event-' attribute values
        concatenateSeparator: '|',  // character used to separate concatenated labels
        send: false,                // send the ga call, or output to the console. Will output to the console if the ga object has not been defined.
        trigger: 'click'            // DOM event to trigger the ga call
    };

    // get options from an element's attributes
    $.fn.gaEventTracking.elementOptions = function(ele, options) {
        return $.extend(
            {},
            options,
            {
                eventCategory: $(ele).attr('analytics-event-category'),
                eventAction: $(ele).attr('analytics-event-action'),
                eventAction: $(ele).attr('analytics-event-type'),
                eventLabel: $(ele).attr('analytics-event-label')
            }
        );
    };


})(jQuery);