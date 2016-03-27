/* globals location */
require('./app.css');
var $ = require('jquery');

(function () {
    var topics = [];

    /**
     * @type {Array<{
     *   title: string,
     *   total: number,
     *   bands: Array<{begin: number, end: number}>
     * }}
     */
    $.get('/topics', function (_topics) {
        topics = _topics;

        /** @type {string} */
        var topicTpl = $('#tpl-topic').html();

        /** @type {string} */
        var bandTpl = $('#tpl-progress-band').html();

        topics.forEach(function (topic, index) {
            var topicHtml = makeTopicHtml(index, topic, topicTpl, bandTpl);
            $('#topic-container').append(topicHtml);
        });
    });

    $('#band-register').submit(function (event) {
        event.preventDefault();

        var index = parseInt($('input[name=topic-index]').val());
        var begin = parseInt($('input[name=band-begin]').val());
        var end = parseInt($('input[name=band-end]').val());
        if (!validateFormData(index, begin, end)) {
            return;
        } else {
            var onSuccess = function () { location.reload(); };
            postBand(index, begin, end, onSuccess);
        }
    });

    function makeTopicHtml(index, topic, topicTpl, bandTpl) {
        var bandHtml = (topic.bands || []).map(function (band) {
            return makeBandHtml(band, topic.total, bandTpl);
        }).join('');
        var progressPct = convertToPercent(calcBandSum(topic.bands) / topic.total);

        return topicTpl
            .replace('{{index}}', index + 1)
            .replace('{{title}}', topic.title || '')
            .replace('{{bands}}', bandHtml)
            .replace('{{progress_num}}', progressPct + '%');
    }

    function calcBandSum(bands) {
        return (bands || []).reduce(function (sum, band) {
            return sum + (band.end - band.begin + 1);
        }, 0);
    }

    function makeBandHtml(band, total, bandTpl) {
        var left = band.begin / total * 100;
        var width = (band.end - band.begin + 1) / total * 100;
        var styleText = [
            'left:', left.toFixed(2), '%;',
            'width:', width.toFixed(2), '%;'
        ].join('');
        return bandTpl.replace('{{style}}', styleText);
    }

    function convertToPercent(num) {
        var percent = num * 100;
        return num > 100 ? 100 : percent.toFixed(1);
    }

    function postBand(index, begin, end, successCallback) {
        $.ajax({
            url: '/topic/' + topics[index - 1].id + '/bands',
            type: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            contentType: 'application/json',
            data: JSON.stringify([{
                begin: begin,
                end: end
            }])
        })
        .done(successCallback);
    }

    function validateFormData(index, begin, end) {
        return [index, begin, end].reduce(function (prev, value) {
            return prev && !isNaN(value);
        }, true);
    }

})();
