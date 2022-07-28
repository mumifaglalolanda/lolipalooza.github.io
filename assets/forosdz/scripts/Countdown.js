!function($, window, document, _undefined)
{
    "use strict";

    XF.XFACountdown = XF.Element.newHandler({
        options: {
            endDate: null
        },

        init: function()
        {
            this.$target.countdown((this.options.endDate * 1000), $.proxy(this.update, this));
        },

        update: function(event)
        {
            this.$target.html(event.strftime(''
                + '<div class="countdown-element"><span class="countdown-figures">%m</span><span class="countdown-type">' + XF.phrase('xfa_mcdn_months') + '</span></div>'
                + '<div class="countdown-element"><span class="countdown-figures">%n</span><span class="countdown-type">' + XF.phrase('xfa_mcdn_days') + '</span></div>'
                + '<div class="countdown-element"><span class="countdown-figures">%H</span><span class="countdown-type">' + XF.phrase('xfa_mcdn_hours') + '</span></div>'
                + '<div class="countdown-element"><span class="countdown-figures">%M</span><span class="countdown-type">' + XF.phrase('xfa_mcdn_minutes') + '</span></div>'
                + '<div class="countdown-element"><span class="countdown-figures">%S</span><span class="countdown-type">' + XF.phrase('xfa_mcdn_seconds') + '</span></div>'));
        }
    });

    XF.Element.register('xfa-countdown', 'XF.XFACountdown');
}
(jQuery, window, document);