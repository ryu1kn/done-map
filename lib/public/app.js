/* globals $ */

(function () {
    /**
     * @type {Array<{
     *   title: string,
     *   total: number,
     *   bands: Array<{begin: number, end: number}>
     * }}
     */
    $.get('/topics', function (topics) {
        /** @type {string} */
        var topicTpl = $('#tpl-topic').html();

        /** @type {string} */
        var bandTpl = $('#tpl-progress-band').html();

        topics.forEach(function (topic, index) {
            var topicHtml = makeTopicHtml(index, topic, topicTpl, bandTpl);
            $('#topic-container').append(topicHtml);
        });
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

})();
