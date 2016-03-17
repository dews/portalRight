// Disclaimer: Use with caution.

// ==UserScript==
// @name         portal plugin
// @namespace    https://i.exosite.com/git/testing/tree/master/calvinzheng
// @version      0.6.3
// @description  One click copy rid, cik. Copy last data. Create portal-level-datasource. Flush data. Delete portal.
// @author       Calvin
// @match        https://*.com/manage/data
// @match        https://*.com/manage/devices
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @require      https://cdn.rawgit.com/beautify-web/js-beautify/master/js/lib/beautify.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.5.0/codemirror.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/codemirror/4.12.0/mode/javascript/javascript.min.js
// ==/UserScript==

var defalutTimeZone = 'Asia/Taipei';
var timeZoneList = '<option value="Pacific/Midway">(GMT-11:00) Midway Island, Samoa</option><option value="America/Adak">(GMT-09:00) Aleutian</option><option value="Pacific/Honolulu">(GMT-10:00) Hawaii</option><option value="Pacific/Marquesas">(GMT-09:30) Marquesas Islands</option><option value="Pacific/Gambier">(GMT-09:00) Gambier Islands</option><option value="America/Anchorage">(GMT-08:00) Alaska</option><option value="Pacific/Pitcairn">(GMT-08:00) Pitcairn Islands</option><option value="America/Los_Angeles">(GMT-07:00) Pacific Time US &amp; Canada</option><option value="America/Denver">(GMT-06:00) Mountain Time US &amp; Canada</option><option value="America/Chihuahua">(GMT-06:00) Chihuahua, La Paz, Mazatlan</option><option value="America/Dawson_Creek">(GMT-07:00) Dawson Creek</option><option value="America/Phoenix">(GMT-07:00) Arizona</option><option value="America/Monterrey">(GMT-05:00) Central Time (Mexico City, Monterey)</option><option value="America/Belize">(GMT-06:00) Central America</option><option value="America/Regina">(GMT-06:00) Saskatchewan</option><option value="America/Cancun">(GMT-05:00) Guadalajara, Mexico City, Monterrey</option><option value="America/Chicago">(GMT-05:00) Central Time US &amp; Canada</option><option value="America/New_York">(GMT-04:00) Eastern Time US &amp; Canada</option><option value="America/Lima">(GMT-05:00) Lima</option><option value="America/Havana">(GMT-04:00) Cuba</option><option value="America/Bogota">(GMT-05:00) Bogota, Lima, Quito, Rio Branco</option><option value="America/Caracas">(GMT-04:30) Caracas</option><option value="America/Manaus">(GMT-04:00) Manaus</option><option value="America/La_Paz">(GMT-04:00) La Paz</option><option value="America/Goose_Bay">(GMT-03:00) Atlantic Time Goose Bay</option><option value="America/Glace_Bay">(GMT-03:00) Atlantic Time Canada</option><option value="America/Barbados">(GMT-04:00) Atlantic Time (Barbados)</option><option value="America/Thule">(GMT-03:00) Western Greenland Time</option><option value="America/St_Johns">(GMT-02:30) Newfoundland</option><option value="America/Santiago">(GMT-03:00) Santiago</option><option value="Atlantic/Stanley">(GMT-03:00) Faukland Islands</option><option value="America/Campo_Grande">(GMT-04:00) Brazil</option><option value="America/Miquelon">(GMT-02:00) Miquelon, St. Pierre</option><option value="America/Godthab">(GMT-02:00) Greenland</option><option value="America/Noronha">(GMT-02:00) Mid-Atlantic</option><option value="America/Sao_Paulo">(GMT-03:00) Brasilia</option><option value="America/Araguaina">(GMT-03:00) UTC-2</option><option value="America/Montevideo">(GMT-03:00) Montevideo</option><option value="Atlantic/Cape_Verde">(GMT-01:00) Cape Verde Is.</option><option value="Atlantic/Azores">(GMT) Azores</option><option value="America/Scoresbysund">(GMT) Eastern Greenland Time</option><option value="UTC">(UTC) Coordinated Universal Time</option><option value="Africa/Casablanca">(GMT+01:00) Casablanca</option><option value="Africa/Abidjan">(GMT) Monrovia, Reykjavik</option><option value="Atlantic/Reykjavik">(GMT) Western European Time (Iceland)</option><option value="Europe/Dublin">(GMT+01:00) Greenwich Mean Time : Dublin</option><option value="Europe/Lisbon">(GMT+01:00) Greenwich Mean Time : Lisbon</option><option value="Europe/London">(GMT+01:00) Greenwich Mean Time : London</option><option value="Africa/Algiers">(GMT+01:00) West Central Africa</option><option value="Europe/Paris">(GMT+02:00) Western European Time</option><option value="Europe/Sarajevo">(GMT+02:00) Sarajevo</option><option value="Europe/Amsterdam">(GMT+02:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna</option><option value="Europe/Belgrade">(GMT+02:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague</option><option value="Europe/Berlin">(GMT+02:00) Central European Time</option><option value="Europe/Brussels">(GMT+02:00) Brussels, Copenhagen, Madrid, Paris</option><option value="Africa/Windhoek">(GMT+01:00) Windhoek</option><option value="Africa/Cairo">(GMT+02:00) Cairo</option><option value="Africa/Blantyre">(GMT+02:00) Harare, Pretoria</option><option value="Asia/Amman">(GMT+03:00) Amman, Jordan</option><option value="Asia/Beirut">(GMT+03:00) Beirut, Lebanon</option><option value="Asia/Gaza">(GMT+03:00) Gaza</option><option value="Asia/Jerusalem">(GMT+03:00) Jerusalem</option><option value="Asia/Damascus">(GMT+03:00) Syria</option><option value="Europe/Athens">(GMT+03:00) Athens</option><option value="Europe/Bucharest">(GMT+03:00) Eastern European Time</option><option value="Europe/Istanbul">(GMT+03:00) Ankara, Istanbul</option><option value="Europe/Helsinki">(GMT+03:00) Helsinki</option><option value="Asia/Baghdad">(GMT+03:00) Baghdad</option><option value="Asia/Kuwait">(GMT+03:00) Kuwait</option><option value="Europe/Minsk">(GMT+03:00) Minsk</option><option value="Africa/Kampala">(GMT+03:00) Kampala</option><option value="Africa/Addis_Ababa">(GMT+03:00) Nairobi</option><option value="Asia/Tehran">(GMT+04:30) Tehran</option><option value="Asia/Baku">(GMT+05:00) Baku</option><option value="Asia/Tbilisi">(GMT+04:00) Tbilisi</option><option value="Europe/Moscow">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option><option value="Asia/Dubai">(GMT+04:00) Abu Dhabi, Muscat</option><option value="Asia/Yerevan">(GMT+04:00) Yerevan</option><option value="Asia/Kabul">(GMT+04:30) Kabul</option><option value="Asia/Karachi">(GMT+05:00) Pakistan Standard Time (Karachi, Islamabad)</option><option value="Asia/Oral">(GMT+05:00) Uralsk</option><option value="Asia/Tashkent">(GMT+05:00) Tashkent</option><option value="Asia/Calcutta">(GMT+05:30) India</option><option value="Asia/Colombo">(GMT+05:30) Sri Lanka</option><option value="Asia/Katmandu">(GMT+05:45) Kathmandu</option><option value="Asia/Yekaterinburg">(GMT+05:00) Ekaterinburg</option><option value="Asia/Dhaka">(GMT+06:00) Astana, Dhaka</option><option value="Asia/Rangoon">(GMT+06:30) Yangon Rangoon</option><option value="Asia/Novosibirsk">(GMT+06:00) Novosibirsk</option><option value="Asia/Bangkok">(GMT+07:00) Bangkok, Hanoi</option><option value="Asia/Jakarta">(GMT+07:00) Western Indonesian Time (Jakarta)</option><option value="Asia/Kuala_Lumpur">(GMT+08:00) Kuala Lumpur</option><option value="Asia/Krasnoyarsk">(GMT+07:00) Krasnoyarsk</option><option value="Asia/Hong_Kong">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option><option value="Asia/Singapore">(GMT+08:00) Singapore</option><option value="Asia/Taipei">(GMT+08:00) Taipei</option><option value="Australia/Perth">(GMT+08:00) Perth</option><option value="Australia/Eucla">(GMT+08:45) Eucla</option><option value="Asia/Irkutsk">(GMT+08:00) Irkutsk, Ulaan Bataar</option><option value="Asia/Tokyo">(GMT+09:00) Osaka, Sapporo, Tokyo</option><option value="Asia/Seoul">(GMT+09:00) Seoul</option><option value="Australia/Darwin">(GMT+09:30) Darwin</option><option value="Asia/Yakutsk">(GMT+09:00) Yakutsk</option><option value="Australia/Brisbane">(GMT+10:00) Brisbane</option><option value="Pacific/Guam">(GMT+10:00) Guam</option><option value="Australia/Adelaide">(GMT+09:30) Adelaide</option><option value="Australia/Hobart">(GMT+10:00) Hobart</option><option value="Asia/Vladivostok">(GMT+10:00) Vladivostok</option><option value="Australia/Lord_Howe">(GMT+10:30) Lord Howe Island</option><option value="Australia/Sydney">(GMT+10:00) Australian Eastern Time (Sydney, Canberra)</option><option value="Pacific/Noumea">(GMT+11:00) Noumea, New Caledonia</option><option value="Pacific/Norfolk">(GMT+11:30) Norfolk Island</option><option value="Asia/Magadan">(GMT+10:00) Magadan</option><option value="Asia/Anadyr">(GMT+12:00) Anadyr, Kamchatka</option><option value="Pacific/Tarawa">(GMT+12:00) Tarawa</option><option value="Pacific/Auckland">(GMT+12:00) Auckland, Wellington</option><option value="Pacific/Tongatapu">(GMT+13:00) Nuku\'alofa</option><option value="Pacific/Chatham">(GMT+12:45) Chatham Islands</option><option value="Pacific/Kiritimati">(GMT+14:00) Kiritimati</option>';
var api = new API();
var portalCik = '';

$.ajaxSetup({
    cache: true
});
$.getScript('//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.2.0/ZeroClipboard.js', main);

$('head').append('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.5.0/codemirror.css">');
 GM_addStyle([
    '.CodeMirror {height: auto;}' +
    '.CodeMirror-scroll div{overflow: initial;}' +
    'tr > td:nth-child(2), tr > th:nth-child(2) {width: 12em!important; }' +
    'tr > td:nth-child(3), tr > th:nth-child(3) {width: 24em!important; }' +
    'td:nth-child(4), tr > th:nth-child(4) {width: 8em!important; }' +
    'td > div.ellipsis{display: inline-block;vertical-align: top;}' +
    '.md {background-color: #AAB2C8; padding: 2px; width: 280px;}' +
    '.plugin form{display: inline;}' +
    '.input-data{width: 80px; border: 0;}' +
    '.plugin .detail, .plugin .datum{display: none;}' +
    '.plugin .btn, .plugin button{cursor:pointer}' +
    '.del.btn {background-color: #DBBFBC; padding: 2px; }' +
    '.plugin > td > .inspect {width: 24px;}' +
    '.plugin .detail .inspect {  width: 10px;  display: inline-block;}'
    ]);

$('[id="info_data"] tbody').append('<tr class="plugin"><td colspan=5>' +
        '   <div class="md">' +
        '    <span class="inspect btn" title="Show detail">+</span>' +
        '    <span class="copy-rid btn" data-clipboard-text="" title="Saving RID to clipboard">RID</span>' +
        '    <span class="copy-ds btn" title="Copy last data to clipboard">Copy</span>' +
        '       <span class="flush btn" title="Flush all records">Flush</span>' +
        '       <form>' +
        '         <input type="text" class="input-data">' +
        '         <span class="write-data btn" title="write data at">Submit</span>' +
        '       </form>' +
        '   </div>' +
        '   <div class="detail">' +
        '       <select class="convert-time" title="convert time"><option>Timestamp</option>' + timeZoneList +
        '       </select>' +
        '       Write At <input class="datetime" placeholder="timestamp">' +
        '       Stop Polling <input type="checkbox" name="polling">' +
        '   </div>' +
        '</td></tr>')
    .find('button')
    .click(function(e) {
        e.stopPropagation();
        e.preventDefault();
    });
    
function main() {
    portalLevel();
    deviceLevel();
    datasource();
}

function Copy(dom) {
    var client = new ZeroClipboard(dom);
    client.on('ready', function() {
        client.on('aftercopy', function(e) {
            console.log((e.success['text/plain'] ? 'Copied' : 'FAILED to copy') + ': ' + e.data['text/plain']);
        });
    });
}

function convertTime(timestamp, option) {
    var time;

    if (option === 'Timestamp') {
        return timestamp;
    }

    time = new Date(timestamp * 1000);
    time = time.toLocaleString('en-US', {
        'timeZone': option,
        'timeZoneName': 'short'
    });

    return time;
}

function portalLevel() {
    $.get('/api/portals/v1/portal/', function(portals) {
        var currentPortal = $('.current').text();
        var portalID = $('.current').attr('id').match(/\d{10}/);

        for (var i in portals) {
            if (portals[i].name === currentPortal) {
                var pcik = portals[i].key;
                var prid = portals[i].rid;
                portalCik = pcik;
                $('table tr:first-child table td')
                    .append(function() {
                        return '&nbsp<button class="pcik" data-clipboard-text="' + pcik + '" title="Saving CIK to clipboard">CIK</button>&nbsp<button class="prid" data-clipboard-text="' + prid + '" title="Saving RID to clipboard">RID</button></button>&nbsp<button class="del-portal" title="Delete current portal">Delete</button></button>&nbsp<button class="create-ds" title="Create portal-level-data-source">C DS</button>';
                    }).find('button').click(function(e) {
                        e.stopPropagation();
                        e.preventDefault();
                    })
                    .end()
                    .find('.del-portal')
                    .click(function() {
                        var confirmDel = confirm('Confirm delete portal?');

                        if (confirmDel === true) {
                            $.ajax({
                                url: '/api/portals/v1/portals/' + prid + '/ByRid',
                                type: 'delete'
                            }).then(function() {
                                location.reload();
                            });
                        }
                    })
                    .end()
                    .find('.create-ds')
                    .click(function() {
                        var ds = prompt('Please enter datasource info, format can be string, int, or float', '{"format":"string","name":"ds"}');
                        if (ds) {
                            try {
                                ds = JSON.parse(ds);
                                var temp = {
                                    'info': {
                                        'description': ds
                                    }
                                };

                                ds = temp;

                                $.ajax({
                                    url: '/api/portals/v1/portals/' + portalID + '/data-sources',
                                    data: JSON.stringify(ds),
                                    type: 'post'
                                }).then(function() {
                                    location.reload();
                                });

                            } catch (e) {
                                alert('Input error, should be json object');
                            }
                        }
                    });

                new Copy($('.pcik, .prid'));
            }
        }
    });
}

function deviceLevel() {
    $('#info_device tbody>tr>td:first-child').each(function() {
        var rid = $(this).find('a').attr('alt');
        var html = '&nbsp;<button class="rid btn" data-clipboard-text="' + rid + '">RID</button>';
        $(this).append(html).find('.btn').click(function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
    });

    new Copy($('.rid'));
}

function datasource() {
    $('#info_data tr:nth-child(1)').each(function() {
        var re = /[a-z0-9]{40}$/g;
        var str = $(this).find('span > a').attr('alt');
        var rid = str.match(re)[0];

        $(this).find('td:nth-child(3)').each(function() {
            var $newDiv = $(this).parents('tbody').eq(0).find('.plugin > td > .md');
            var text = $(this).find('div').text();

            if (defalutTimeZone) {
                $('.convert-time').val(defalutTimeZone);
            }

            $newDiv.find('.copy-rid').attr('data-clipboard-text', rid);
            $newDiv.find('.copy-ds').attr('data-clipboard-text', text);
            $newDiv.children('.inspect').bind('click', {
                rid: rid,
                $newDiv: $newDiv
            }, dataDetail);
            $newDiv.find('.flush').click(dataFlush.bind(this, rid));
            $newDiv.find('.write-data').click(dataWrite.bind(this, $newDiv, rid));
        });

    });

    new Copy($('.copy-rid, .copy-ds'));
}

function dataFlush(rid, timestamp) {
    var confirmFlush = confirm('Confirm flush?');

    if (confirmFlush === true) {
        $.ajax({
            url: '/api/portals/v1/data-sources/' + rid + '/data?starttime=1&endtime=1500000000&limit=infinity',
            type: 'delete'
        }).then(function() {
            location.reload();
        });
    }
}

function dataDetail(e) {
    var rid = e.data.rid;
    var $detail = e.data.$newDiv.parent().find('.detail');
    $detail.find('.convert-time').change(dataConvertTime);

    if ($detail.has('.datum').length) {
        $detail.toggle();

        if ($detail.css('display') === 'none') {
            $(this).text('+');
        } else {
            $(this).text('-');
        }
    } else {
        $(this).text('-');
        $detail.show();
        $.get('/api/portals/v1/data-sources/' + rid + '/data?limit=' + 10, function(texts) {
            texts.forEach(function(text, i) {
                var option = $detail.find('.convert-time').val();
                var timestamp = text[0];
                var time = convertTime(timestamp, option);

                $detail.append('<div class="' + timestamp + '"><span class="inspect btn">+</span> <span class="data-time" data-timestamp=' + timestamp + '> ' + time + ' </span> <span class="del btn">Delete</span> </div><div class="datum ' + timestamp + '"></div>');

                if (CodeMirror) {
                    var myCodeMirror = CodeMirror($detail.find('.datum.' + timestamp)[0], {
                        value: typeof text[1] === 'number' ? JSON.stringify(text[1]) : js_beautify(text[1]),
                        lineNumbers: true,
                        mode: 'javascript'
                    });
                    myCodeMirror.setSize('900px', null);
                }

                $detail.find('.' + timestamp + ' .inspect').click(function() {
                    $(this).parent().next().toggle();
                    myCodeMirror.refresh();

                    if ($(this).parent().next().css('display') === 'none') {
                        $(this).text('+');
                    } else {
                        $(this).text('-');
                    }
                });

                $detail.find('.' + timestamp + ' .del').click(function() {
                    var confirmFlush = confirm('Confirm delete?');

                    if (confirmFlush === true) {
                        api.delete(rid, timestamp - 1, timestamp + 1).then(function(x) {
                            $('.' + timestamp).remove();
                        });
                    }
                });

                if (i === 0) {
                    $detail.find('.' + timestamp).next().toggle();
                    $detail.find('.' + timestamp + ' .inspect').text('-');
                    myCodeMirror.refresh();
                }
            });
        });

        $detail.find('[name = "polling"]').click(function() {
            if (!$(this).attr("checked")) {
                polling(portalCik, rid);
            }
        });

        polling(portalCik, rid);

        function polling(cik, rid) {
            api.longPolling(cik, rid).then(function(d) {
                var data = JSON.parse(d);

                if (!data.error && data[0].status === 'ok') {
                    parsePollingData(data[0]);
                    if (!$detail.find('[name = "polling"]').attr("checked")) {
                        polling(cik, rid);
                    }
                }
            }, function () {
                console.log('polling failed ' , arguments);
            });
        }

        function parsePollingData(data) {
            var option = $detail.find('.convert-time').val();
            var timestamp = data.result[0];
            var time = convertTime(timestamp, option);
            $detail.find('[name="polling"]').after('<div class="' + timestamp + '"><span class="inspect btn">+</span> <span class="data-time" data-timestamp=' + timestamp + '> ' + time + '</span> <span class="del btn">Delete</span> </div><div class="datum ' + timestamp + '"></div>');

            if (CodeMirror) {
                var myCodeMirror = CodeMirror($detail.find('.datum.' + timestamp)[0], {
                    value: typeof data.result[1] === 'number' ? JSON.stringify(data.result[1]) : js_beautify(data.result[1]),
                    lineNumbers: true,
                    mode: 'javascript'
                });
                myCodeMirror.setSize('900px', null);
            }

            $detail.find('.' + timestamp + ' .inspect').click(function() {
                $(this).parent().next().toggle();
                myCodeMirror.refresh();

                if ($(this).parent().next().css('display') === 'none') {
                    $(this).text('+');
                } else {
                    $(this).text('-');
                }
            });

            $detail.find('.' + timestamp + ' .del').click(function() {
                var confirmFlush = confirm('Confirm delete?');

                if (confirmFlush === true) {
                    api.delete(rid, timestamp - 1, timestamp + 1).then(function(x) {
                        $('.' + timestamp).remove();
                    });
                }
            });
        }
    }
}

function dataConvertTime() {
    var $detail = $(this).parent();
    var option = $(this).val();

    $detail.find('.data-time').text(function() {
        var timestamp = $(this).data('timestamp');
        var time = convertTime(timestamp, option);
        return time;
    });
}

function dataWrite($newDiv, rid) {
    var inputData = $newDiv.find('.input-data').val();
    var dateTime = $newDiv.parent().find('.detail .datetime').val();

    if (!inputData) {
        var submitBlank = confirm('Submit blank?');

        if (submitBlank === false) {
            return;
        }
    }

    if (dateTime) {
        var timestamp;

        try {
            if (dateTime - parseFloat(dateTime) >= 0) {
                if (dateTime.toString().length === 13) {
                    timestamp = dateTime / 1000 | 0;
                } else if (dateTime.toString().length !== 10) {
                    throw 'timestamp(sec or ms)';
                } else {
                    timestamp = parseInt(dateTime);
                }
            } else {
                timestamp = +new Date(dateTime) / 1000;

                if (!Number.isInteger(timestamp))
                    throw 'yyyy/mm/dd hh:mm:ss or timestamp(sec or ms)';
            }

            inputData = [
                [timestamp, inputData]
            ];
        } catch (e) {
            alert(e);
            return false;
        }
    }

    api.write(rid, inputData).then(function(x) {
        $newDiv.find('.input-data').val('');
    });
}



function API() {}

API.prototype.write = function(rid, data) {
    return $.ajax({
        url: '/api/portals/v1/data-sources/' + rid + '/data',
        type: 'post',
        data: JSON.stringify(data)
    });
};
// rid: sting or array, options: json
API.prototype.read = function(rid, options) {
    var param = '';
    if (typeof rid === 'object') {
        rid = '[' + rid.toString() + ']';
    }
    if (typeof options === 'object') {
        param = '?' + $.param(options);
    }
    return $.ajax({
        url: '/api/portals/v1/data-sources/' + rid + '/data' + param,
        type: 'get',
        cache: false
    });

};

API.prototype.delete = function(rid, starttime, endtime) {
    var param = {};
    if (typeof rid === 'object') {
        rid = '[' + rid.toString() + ']';
    }
    Number.isInteger(starttime) && (param.starttime = starttime);
    Number.isInteger(endtime) && (param.endtime = endtime);
    param = Object.keys(param).length ? '?' + $.param(param) : '';

    return $.ajax({
        url: '/api/portals/v1/data-sources/' + rid + '/data' + param,
        type: 'delete',
        cache: false
    });

};
API.prototype.deviceInfo = function(rid) {
    return $.ajax({
        url: '/api/portals/v1/devices/' + rid,
        type: 'get',
        cache: false
    });
};

API.prototype.bulkRead = function(rid, options) {
    var param = '';
    if (typeof rid === 'object') {
        rid = '[' + rid.toString() + ']';
    }
    if (typeof options === 'object') {
        param = '?' + $.param(options);
    }
    return $.ajax({
        url: '/api/portals/v1/users/_this/data-sources/' + rid + param,
        type: 'get',
        cache: false
    });

};

API.prototype.longPolling = function(cik, rid) {
    var $def = $.Deferred();
    var domain = window.location.host.indexOf('exosite-dev') > 0 ? 'm2-dev' : 'm2';

    GM_xmlhttpRequest({
        method: "POST",
        url: "http://" + domain + ".exosite.com:80/onep:v1/rpc/process",
        data: JSON.stringify({
            "auth": {
                "cik": cik
            },
            "calls": [{
                "procedure": "wait",
                "arguments": [
                    rid, {
                        "timeout": 60 * 60 * 1000
                    }
                ],
                "id": 1
            }]
        }),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        onload: function(response) {
            $def.resolve(response.responseText);
        }
    });

    return $def;
};