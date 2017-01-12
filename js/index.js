var channels = 	[
					"ESL_SC2", "OgamingSC2", "cretetion", 
					"freecodecamp","storbeck", "habathcx",
					"RobotCaleb", "noobs2ninjas", "comster404",
					"brunofin" 
				];

function getChannelInfo() {
    channels.forEach(function (channel) {
        function makeURL(type, name) {
            return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
        };
        $.getJSON(makeURL('streams', channel), function (data) {
            var game, status;
            if (data.stream === null) {
                game = 'Offline';
                status = 'offline';
            } else if (data.stream === undefined) {
                game = 'Account Closed';
                status = 'offline';
            } else {
                game = data.stream.game;
                status = 'online';
            }
            ;
            $.getJSON(makeURL('channels', channel), function (data) {
                var logo = data.logo != null ? data.logo : 'https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F', name = data.display_name != null ? data.display_name : channel +' <span class="badge">Not existing</span>', description = status === 'online' ? ': ' + data.status : '';
                html = '<a target="_blank" href="'+ data.url + '"><div class="media ' + status + '"><div class="media-left" id="icon"><img src="' + logo + '" class="logo"></div><div class="media-body" id="name"><h4 class="media-heading">' + name + '</h4>' + game + ' <span class="hidden-xs">' + description + '</span></div></div></a><br>';
                status === 'online' ? $('#display').prepend(html) : $('#display').append(html);
            });
        });
    });
}
;
$(document).ready(function () {
    getChannelInfo();
    $('.selector').click(function () {
        $('.selector').removeClass('active');
        $(this).addClass('active');
        var status = $(this).attr('id');
        if (status === 'all') {
            $('.online, .offline').removeClass('hidden');
        } else if (status === 'online') {
            $('.online').removeClass('hidden');
            $('.offline').addClass('hidden');
        } else {
            $('.offline').removeClass('hidden');
            $('.online').addClass('hidden');
        }
    });
});
  